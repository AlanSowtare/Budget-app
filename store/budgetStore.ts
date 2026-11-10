import {create} from 'zustand';
import {Budget, Category, Expense, Subscription} from '@/domain/entities/Budget';
import {budgetRepository} from "@/repositories/SQLiteBudgetRepository";
import {getSubscriptionsForMonth} from '@/utils/subscriptionSchedule';

interface BudgetStore {
    budgets: Budget[];
    activeBudgetId: string | null;
    isLoading: boolean;
    today: string;
    hasManuallySelectedBudget: boolean;

    loadBudgets: () => Promise<void>;
    refreshToday: () => void;
    getActiveBudget: () => Budget | null;
    setActiveBudget: (budgetId: string) => void;
    createBudget: (month: number, year: number, totalAmount: number, copyCategories?: boolean) => void;
    createCurrentMonthBudget: () => void;
    deleteBudget: (budgetId: string) => void;
    addCategory: (budgetId: string, category: Omit<Category, 'id'>) => void;
    addExpense: (budgetId: string, expense: Omit<Expense, 'id' | 'date'>) => void;
    deleteExpense: (budgetId: string, expenseId: string) => void;
    deleteCategory: (budgetId: string, categoryId: string) => void;
    updateBudgetAmount: (budgetId: string, totalAmount: number) => void;
    addSubscription: (budgetId: string, subscription: Omit<Subscription, 'id' | 'createdAt' | 'isActive'>) => void;
    updateSubscription: (budgetId: string, subscriptionId: string, patch: Pick<Subscription, 'label' | 'amount' | 'dayOfMonth' | 'frequency' | 'startMonth' | 'startYear'>) => void;
    deleteSubscription: (budgetId: string, subscriptionId: string) => void;
    toggleSubscription: (budgetId: string, subscriptionId: string) => void;
    getMonthlySubscriptionsTotal: (budgetId: string) => number;
    getDebitedSubscriptionsTotal: (budgetId: string) => number;
    getRemainingSubscriptionsTotal: (budgetId: string) => number;
    getNextSubscriptionDay: (budgetId: string) => number | null;
}

const generateId = () => Math.random().toString(36).slice(2);

const getTodayKey = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
};

const parseToday = (today: string) => {
    const [year, month, day] = today.split('-').map(Number);
    return new Date(year, month - 1, day);
};

const getDefaultBudgetId = (budgets: Budget[], today: string) => {
    const [year, month] = today.split('-').map(Number);
    const currentMonthBudget = budgets.find(budget => budget.year === year && budget.month === month);
    return currentMonthBudget?.id ?? budgets[budgets.length - 1]?.id ?? null;
};

const cloneActiveSubscriptions = (budget: Budget | undefined): Subscription[] => {
    if (!budget) return [];

    return (budget.subscriptions ?? [])
        .filter(subscription => subscription.isActive)
        .map(subscription => ({
            ...subscription,
            id: generateId(),
            createdAt: new Date().toISOString(),
        }));
};

export const useBudgetStore = create<BudgetStore>((set, get) => ({

    budgets: [],
    activeBudgetId: null,
    isLoading: true,
    today: getTodayKey(),
    hasManuallySelectedBudget: false,

    // ── CHARGE LES DONNÉES AU DÉMARRAGE ──
    loadBudgets: async () => {
        const budgets = await budgetRepository.getAll();

        const activeBudgetId = getDefaultBudgetId(budgets, get().today);

        set({budgets, activeBudgetId, isLoading: false});
    },

    refreshToday: () => set(state => {
        const today = getTodayKey();
        return {
            today,
            ...(!state.hasManuallySelectedBudget
                ? {activeBudgetId: getDefaultBudgetId(state.budgets, today)}
                : {}),
        };
    }),

    getActiveBudget: () => {
        const {budgets, activeBudgetId} = get();
        return budgets.find(b => b.id === activeBudgetId) ?? null;
    },

    setActiveBudget: (budgetId) => {
        set(state => {
            const exists = state.budgets.some(budget => budget.id === budgetId);
            if (!exists) return state;
            return {activeBudgetId: budgetId, hasManuallySelectedBudget: true};
        });
    },

    createBudget: (month, year, totalAmount, copyCategories = false) => {
        const previousBudget = get().budgets[get().budgets.length - 1];

        const newBudget: Budget = {
            id: generateId(),
            month,
            year,
            totalAmount,
            categories: copyCategories && previousBudget
                ? previousBudget.categories.map(category => ({...category, id: generateId()}))
                : [],
            expenses: [],
            subscriptions: cloneActiveSubscriptions(previousBudget),
        };

        set(state => ({
            budgets: [...state.budgets, newBudget],
            activeBudgetId: newBudget.id,
        }));

        // Sauvegarde en base après la mise à jour du state
        budgetRepository.save(newBudget);
    },

    createCurrentMonthBudget: () => {
        const [year, month] = get().today.split('-').map(Number);
        const existing = get().budgets.some(budget => budget.year === year && budget.month === month);
        if (existing) return;

        const previousBudget = get().budgets[get().budgets.length - 1];
        if (!previousBudget) return;

        get().createBudget(month, year, previousBudget.totalAmount, true);
    },

    deleteBudget: (budgetId) => {
        set(state => {
            const updatedBudgets = state.budgets.filter(budget => budget.id !== budgetId);

            const nextActiveBudgetId = state.activeBudgetId === budgetId
                ? (updatedBudgets.length > 0 ? updatedBudgets[updatedBudgets.length - 1].id : null)
                : state.activeBudgetId;

            budgetRepository.deleteById(budgetId);

            return {
                budgets: updatedBudgets,
                activeBudgetId: nextActiveBudgetId,
            };
        });
    },

    addCategory: (budgetId, category) => {
        set(state => {
            const updatedBudgets = state.budgets.map(b =>
                b.id === budgetId
                    ? {...b, categories: [...b.categories, {...category, id: generateId()}]}
                    : b
            );

            // Trouve le budget modifié et le sauvegarde
            const updatedBudget = updatedBudgets.find(b => b.id === budgetId);
            if (updatedBudget) budgetRepository.save(updatedBudget);

            return {budgets: updatedBudgets};
        });
    },

    addExpense: (budgetId, expense) => {
        set(state => {
            const updatedBudgets = state.budgets.map(b =>
                b.id === budgetId
                    ? {
                        ...b,
                        expenses: [
                            ...b.expenses,
                            {...expense, id: generateId(), date: new Date().toISOString()},
                        ],
                    }
                    : b
            );

            const updatedBudget = updatedBudgets.find(b => b.id === budgetId);
            if (updatedBudget) budgetRepository.save(updatedBudget);

            return {budgets: updatedBudgets};
        });
    },

    deleteExpense: (budgetId, expenseId) => {
        set(state => {
            const updatedBudgets = state.budgets.map(b =>
                b.id === budgetId
                    ? { ...b, expenses: b.expenses.filter(e => e.id !== expenseId) }
                    : b
            );

            const updatedBudget = updatedBudgets.find(b => b.id === budgetId);
            if (updatedBudget) budgetRepository.save(updatedBudget);

            return { budgets: updatedBudgets };
        });
    },

    deleteCategory: (budgetId, categoryId) => {
        set(state => {
            const updatedBudgets = state.budgets.map(b =>
                b.id === budgetId
                    ? {
                        ...b,
                        categories: b.categories.filter(c => c.id !== categoryId),
                        // On supprime aussi toutes les dépenses liées à cette catégorie
                        expenses: b.expenses.filter(e => e.categoryId !== categoryId),
                    }
                    : b
            );

            const updatedBudget = updatedBudgets.find(b => b.id === budgetId);
            if (updatedBudget) budgetRepository.save(updatedBudget);

            return { budgets: updatedBudgets };
        });
    },

    updateBudgetAmount: (budgetId, totalAmount) => {
        set(state => {
            const updatedBudgets = state.budgets.map(b =>
                b.id === budgetId ? { ...b, totalAmount } : b
            );

            const updatedBudget = updatedBudgets.find(b => b.id === budgetId);
            if (updatedBudget) budgetRepository.save(updatedBudget);

            return { budgets: updatedBudgets };
        });
    },

    addSubscription: (budgetId, subscription) => {
        set(state => {
            const updatedBudgets = state.budgets.map(b =>
                b.id === budgetId
                    ? {
                        ...b,
                        subscriptions: [
                            ...(b.subscriptions ?? []),
                            {
                                ...subscription,
                                id: generateId(),
                                isActive: true,
                                createdAt: new Date().toISOString(),
                            },
                        ],
                    }
                    : b
            );

            const updatedBudget = updatedBudgets.find(b => b.id === budgetId);
            if (updatedBudget) budgetRepository.save(updatedBudget);

            return {budgets: updatedBudgets};
        });
    },

    updateSubscription: (budgetId, subscriptionId, patch) => {
        set(state => {
            const updatedBudgets = state.budgets.map(b =>
                b.id === budgetId
                    ? {
                        ...b,
                        subscriptions: (b.subscriptions ?? []).map(subscription =>
                            subscription.id === subscriptionId
                                ? {
                                    ...subscription,
                                    ...patch,
                                    label: patch.label.trim(),
                                }
                                : subscription
                        ),
                    }
                    : b
            );

            const updatedBudget = updatedBudgets.find(b => b.id === budgetId);
            if (updatedBudget) budgetRepository.save(updatedBudget);

            return {budgets: updatedBudgets};
        });
    },

    deleteSubscription: (budgetId, subscriptionId) => {
        set(state => {
            const updatedBudgets = state.budgets.map(b =>
                b.id === budgetId
                    ? {
                        ...b,
                        subscriptions: (b.subscriptions ?? []).filter(subscription => subscription.id !== subscriptionId),
                    }
                    : b
            );

            const updatedBudget = updatedBudgets.find(b => b.id === budgetId);
            if (updatedBudget) budgetRepository.save(updatedBudget);

            return {budgets: updatedBudgets};
        });
    },

    toggleSubscription: (budgetId, subscriptionId) => {
        set(state => {
            const updatedBudgets = state.budgets.map(b =>
                b.id === budgetId
                    ? {
                        ...b,
                        subscriptions: (b.subscriptions ?? []).map(subscription =>
                            subscription.id === subscriptionId
                                ? {...subscription, isActive: !subscription.isActive}
                                : subscription
                        ),
                    }
                    : b
            );

            const updatedBudget = updatedBudgets.find(b => b.id === budgetId);
            if (updatedBudget) budgetRepository.save(updatedBudget);

            return {budgets: updatedBudgets};
        });
    },

    getMonthlySubscriptionsTotal: (budgetId) => {
        const budget = get().budgets.find(item => item.id === budgetId);
        if (!budget) return 0;
        const today = parseToday(get().today);
        return getSubscriptionsForMonth(budget.subscriptions ?? [], budget.year, budget.month, today)
            .reduce((sum, subscription) => sum + subscription.amount, 0);
    },

    getDebitedSubscriptionsTotal: (budgetId) => {
        const budget = get().budgets.find(item => item.id === budgetId);
        if (!budget) return 0;
        const today = parseToday(get().today);
        return getSubscriptionsForMonth(budget.subscriptions ?? [], budget.year, budget.month, today)
            .filter(subscription => subscription.status === 'debited')
            .reduce((sum, subscription) => sum + subscription.amount, 0);
    },

    getRemainingSubscriptionsTotal: (budgetId) => {
        const budget = get().budgets.find(item => item.id === budgetId);
        if (!budget) return 0;
        const today = parseToday(get().today);
        return getSubscriptionsForMonth(budget.subscriptions ?? [], budget.year, budget.month, today)
            .filter(subscription => subscription.status === 'upcoming')
            .reduce((sum, subscription) => sum + subscription.amount, 0);
    },

    getNextSubscriptionDay: (budgetId) => {
        const budget = get().budgets.find(item => item.id === budgetId);
        if (!budget) return null;
        const today = parseToday(get().today);
        const nextUpcoming = getSubscriptionsForMonth(
            budget.subscriptions ?? [],
            budget.year,
            budget.month,
            today,
        )
            .filter(subscription => subscription.status === 'upcoming')
            .sort((a, b) => a.effectiveDay - b.effectiveDay)[0];

        return nextUpcoming?.effectiveDay ?? null;
    },

}));