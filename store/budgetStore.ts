import { create } from 'zustand';
import { Budget, Category, Expense } from '../domain/entities/Budget';


interface BudgetStore {

    budgets: Budget[];
    activeBudgetId: string | null;  // l'ID du budget affiché en ce moment

    getActiveBudget: () => Budget | null;
    createBudget: (month: number, year: number, totalAmount: number) => void;
    addCategory: (budgetId: string, category: Omit<Category, 'id'>) => void;
    addExpense: (budgetId: string, expense: Omit<Expense, 'id' | 'date'>) => void;
}

const generateId = () => Math.random().toString(36).slice(2);

export const useBudgetStore = create<BudgetStore>((set, get) => ({
    budgets: [],
    activeBudgetId: null,

    getActiveBudget: () => {
        const { budgets, activeBudgetId } = get();
        return budgets.find(b => b.id === activeBudgetId) ?? null;
    },


    // ── createBudget ──
    // Crée un nouveau budget et le définit comme actif.
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
            budgets: [...state.budgets, newBudget],  // nouveau tableau avec le budget ajouté
            activeBudgetId: newBudget.id,            // on le définit comme actif
        }));
    },
    addCategory: (budgetId, category) => {
        set(state => ({
            budgets: state.budgets.map(budget =>
                budget.id === budgetId
                    ? {
                        ...budget, // on copie tout le budget existant
                        categories: [
                            ...budget.categories,                    // les catégories existantes
                            { ...category, id: generateId() },       // + la nouvelle avec son id
                        ],
                    }
                    : budget
            ),
        }));
    },

    addExpense: (budgetId, expense) => {
        set(state => ({
            budgets: state.budgets.map(budget =>
                budget.id === budgetId
                    ? {
                        ...budget,
                        expenses: [
                            ...budget.expenses,
                            {
                                ...expense,
                                id: generateId(),
                                date: new Date().toISOString(), // date actuelle au format ISO
                            },
                        ],
                    }
                    : budget
            ),
        }));
    },

}));