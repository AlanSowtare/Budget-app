import {Subscription} from '@/domain/entities/Budget';

const FREQUENCY_INTERVALS: Record<Subscription['frequency'], number> = {
    monthly: 1,
    quarterly: 3,
    semiannual: 6,
    annual: 12,
};

export interface ScheduledSubscription extends Subscription {
    effectiveDay: number;
    status: 'debited' | 'upcoming';
}

export const getSubscriptionsForMonth = (
    subscriptions: Subscription[],
    year: number,
    month: number,
    today: Date,
): ScheduledSubscription[] => {
    const monthsInTarget = year * 12 + month - 1;
    const monthsToday = today.getFullYear() * 12 + today.getMonth();
    const daysInMonth = new Date(year, month, 0).getDate();
    const isPastMonth = monthsInTarget < monthsToday;
    const isFutureMonth = monthsInTarget > monthsToday;

    return subscriptions
        .filter(subscription => subscription.isActive)
        .flatMap(subscription => {
            const startMonth = subscription.startYear * 12 + subscription.startMonth - 1;
            const monthsSinceStart = monthsInTarget - startMonth;
            const interval = FREQUENCY_INTERVALS[subscription.frequency];

            if (monthsSinceStart < 0 || monthsSinceStart % interval !== 0) return [];

            const effectiveDay = Math.min(subscription.dayOfMonth, daysInMonth);
            const status = isPastMonth || (!isFutureMonth && effectiveDay <= today.getDate())
                ? 'debited'
                : 'upcoming';

            return [{...subscription, effectiveDay, status}];
        });
};
