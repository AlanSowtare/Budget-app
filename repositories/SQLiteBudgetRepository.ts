import * as SQLite from 'expo-sqlite';
import {IBudgetRepository} from "@/repositories/IBudgetRepository";
import {Budget} from "@/domain/entities/Budget";

const db = SQLite.openDatabaseSync('budget.db');

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
        // Chaque row.data est un JSON — on le parse pour récupérer l'objet Budget
        return rows.map(row => JSON.parse(row.data) as Budget);
    }

    async save(budget: Budget): Promise<void> {
        db.runSync(
            // INSERT OR REPLACE = insère si n'existe pas, remplace si existe déjà
            'INSERT OR REPLACE INTO budgets (id, data) VALUES (?, ?)',
            [budget.id, JSON.stringify(budget)]
            // JSON.stringify convertit l'objet en string pour le stocker
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