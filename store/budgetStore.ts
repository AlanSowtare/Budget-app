import {create} from 'zustand';
import {Budget, Category, Expense} from '@/domain/entities/Budget';
import {budgetRepository} from "@/repositories/SQLiteBudgetRepository";

interface BudgetStore {
    budgets: Budget[];
    activeBudgetId: string | null;
    isLoading: boolean; // nouveau — indique si les données sont en cours de chargement

    loadBudgets: () => Promise<void>; // nouveau — charge depuis SQLite
    getActiveBudget: () => Budget | null;
    createBudget: (month: number, year: number, totalAmount: number) => void;
    addCategory: (budgetId: string, category: Omit<Category, 'id'>) => void;
    addExpense: (budgetId: string, expense: Omit<Expense, 'id' | 'date'>) => void;
}

const generateId = () => Math.random().toString(36).slice(2);

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
        const newBudget: Budget = {
            id: generateId(),
            month,
            year,
            totalAmount,
            categories: [],
            expenses: [],
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

}));