import * as SQLite from 'expo-sqlite';
import {IBudgetRepository} from "@/repositories/IBudgetRepository";
import {Budget} from "@/domain/entities/Budget";

const db = SQLite.openDatabaseSync('budget.db');

const normalizeBudget = (budget: Budget): Budget => ({
    ...budget,
    subscriptions: budget.subscriptions ?? [],
});

export class SQLiteBudgetRepository implements IBudgetRepository {
    constructor() {
        this.init();
    }

    private init() {
        db.execSync(`
      CREATE TABLE IF NOT EXISTS budgets (
        id TEXT PRIMARY KEY,
        data TEXT NOT NULL
      );
    `);
    }

    async getAll(): Promise<Budget[]> {
        const rows = db.getAllSync<{ id: string; data: string }>(
            'SELECT * FROM budgets'
        );
        return rows.map(row => normalizeBudget(JSON.parse(row.data) as Budget));
    }

    async save(budget: Budget): Promise<void> {
        db.runSync(
            'INSERT OR REPLACE INTO budgets (id, data) VALUES (?, ?)',
            [budget.id, JSON.stringify(normalizeBudget(budget))]
        );
    }

    async saveAll(budgets: Budget[]): Promise<void> {
        for (const budget of budgets) {
            await this.save(budget);
        }
    }

    async deleteById(id: string): Promise<void> {
        db.runSync('DELETE FROM budgets WHERE id = ?', [id]);
    }
}

export const budgetRepository = new SQLiteBudgetRepository();