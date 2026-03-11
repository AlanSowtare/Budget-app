import {Budget} from "@/domain/entities/Budget";

export interface IBudgetRepository {
    getAll: () => Promise<Budget[]>;
    save: (budget: Budget) => Promise<void>;
    saveAll: (budgets: Budget[]) => Promise<void>;
    deleteById: (id: string) => Promise<void>;
}