export interface Category {
    id: string;
    name: string;
    emoji: string;
    color: string;
    allocatedAmount: number;
}

export interface Expense {
    id: string;
    categoryId: string;
    label: string;
    emoji: string;
    amount: number;
    date: string;
}

export interface Budget {
    id: string;
    month: number;
    year: number;
    totalAmount: number;
    categories: Category[];
    expenses: Expense[];
}