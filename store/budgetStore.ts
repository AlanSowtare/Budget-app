import {create} from 'zustand';
import {Budget, Category, Expense, Subscription} from '@/domain/entities/Budget';
import {budgetRepository} from "@/repositories/SQLiteBudgetRepository";

interface BudgetStore {
    budgets: Budget[];
    activeBudgetId: string | null;
    isLoading: boolean;

    loadBudgets: () => Promise<void>;
    getActiveBudget: () => Budget | null;
    createBudget: (month: number, year: number, totalAmount: number) => void;
    addCategory: (budgetId: string, category: Omit<Category, 'id'>) => void;
    addExpense: (budgetId: string, expense: Omit<Expense, 'id' | 'date'>) => void;
    deleteExpense: (budgetId: string, expenseId: string) => void;
    deleteCategory: (budgetId: string, categoryId: string) => void;
    updateBudgetAmount: (budgetId: string, totalAmount: number) => void;
    addSubscription: (budgetId: string, subscription: Omit<Subscription, 'id' | 'createdAt' | 'isActive'>) => void;
    updateSubscription: (budgetId: string, subscriptionId: string, patch: Pick<Subscription, 'label' | 'amount' | 'dayOfMonth'>) => void;
    deleteSubscription: (budgetId: string, subscriptionId: string) => void;
    toggleSubscription: (budgetId: string, subscriptionId: string) => void;
    getMonthlySubscriptionsTotal: (budgetId: string) => number;
    getRemainingSubscriptionsTotal: (budgetId: string) => number;
    getNextSubscriptionDay: (budgetId: string) => number | null;
}

const generateId = () => Math.random().toString(36).slice(2);

const getTodayForBudget = (budget: Budget | undefined) => {
    const now = new Date();

    if (!budget) return now.getDate();

    const isCurrentMonth = now.getMonth() + 1 === budget.month && now.getFullYear() === budget.year;
    return isCurrentMonth ? now.getDate() : 1;
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

    // ── CHARGE LES DONNÉES AU DÉMARRAGE ──
    loadBudgets: async () => {
        const budgets = await budgetRepository.getAll();

        // Le budget actif = le plus récent (dernier du tableau)
        const activeBudgetId = budgets.length > 0
            ? budgets[budgets.length - 1].id
            : null;

        set({budgets, activeBudgetId, isLoading: false});
    },

    getActiveBudget: () => {
        const {budgets, activeBudgetId} = get();
        return budgets.find(b => b.id === activeBudgetId) ?? null;
    },

    createBudget: (month, year, totalAmount) => {
        const previousBudget = get().budgets[get().budgets.length - 1];

        const newBudget: Budget = {
            id: generateId(),
            month,
            year,
            totalAmount,
            categories: [],
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
        return (budget?.subscriptions ?? [])
            .filter(subscription => subscription.isActive)
            .reduce((sum, subscription) => sum + subscription.amount, 0);
    },

    getRemainingSubscriptionsTotal: (budgetId) => {
        const budget = get().budgets.find(item => item.id === budgetId);
        const today = getTodayForBudget(budget);

        return (budget?.subscriptions ?? [])
            .filter(subscription => subscription.isActive && subscription.dayOfMonth >= today)
            .reduce((sum, subscription) => sum + subscription.amount, 0);
    },

    getNextSubscriptionDay: (budgetId) => {
        const budget = get().budgets.find(item => item.id === budgetId);
        const activeSubscriptions = (budget?.subscriptions ?? [])
            .filter(subscription => subscription.isActive)
            .sort((a, b) => a.dayOfMonth - b.dayOfMonth);

        if (activeSubscriptions.length === 0) return null;

        const today = getTodayForBudget(budget);
        const nextUpcoming = activeSubscriptions.find(subscription => subscription.dayOfMonth >= today);

        return nextUpcoming?.dayOfMonth ?? activeSubscriptions[0].dayOfMonth;
    },

}));