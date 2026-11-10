import {Subscription} from '@/domain/entities/Budget';

const isMonth = (value: number | undefined): value is number =>
    typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 12;

export const normalizeSubscription = (
    raw: Subscription,
    budgetMonth: number,
    budgetYear: number,
): Subscription => {
    const createdAt = raw.createdAt ? new Date(raw.createdAt) : null;
    const hasValidCreatedAt = createdAt !== null && !Number.isNaN(createdAt.getTime());
    const fallbackMonth = hasValidCreatedAt ? createdAt.getMonth() + 1 : budgetMonth;
    const fallbackYear = hasValidCreatedAt ? createdAt.getFullYear() : budgetYear;
    const frequencies = ['monthly', 'quarterly', 'semiannual', 'annual'] as const;
    const frequency = frequencies.includes(raw.frequency) ? raw.frequency : 'monthly';

    return {
        ...raw,
        frequency,
        startMonth: isMonth(raw.startMonth) ? raw.startMonth : fallbackMonth,
        startYear: Number.isInteger(raw.startYear) ? raw.startYear : fallbackYear,
    };
};
