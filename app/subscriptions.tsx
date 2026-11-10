import React, {useEffect, useMemo, useState} from 'react';
import {
    Alert,
    Pressable,
    SectionList,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useRouter} from 'expo-router';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useBudgetStore} from '@/store/budgetStore';
import {styles} from './subscriptions.styles';
import {Subscription} from '@/domain/entities/Budget';
import {formatCurrency} from '@/utils/currency';
import {getSubscriptionsForMonth, ScheduledSubscription} from '@/utils/subscriptionSchedule';
import {MONTHS} from '@/constants/months';
import {SwipeableSubscriptionRow, SubscriptionRowItem} from '@/components/SwipeableSubscriptionRow';

const db = SQLite.openDatabaseSync('budget.db');
const SWIPE_HINT_FLAG = 'subscriptions_swipe_hint_shown';

interface SubscriptionSection {
    key: 'upcoming' | 'debited' | 'paused';
    title: string;
    data: SubscriptionRowItem[];
}

const getDaysUntil = (year: number, month: number, day: number, todayKey: string) => {
    const [todayYear, todayMonth, todayDay] = todayKey.split('-').map(Number);
    const targetTime = Date.UTC(year, month - 1, day);
    const todayTime = Date.UTC(todayYear, todayMonth - 1, todayDay);
    return Math.round((targetTime - todayTime) / 86_400_000);
};

const toRowItem = (
    subscription: Subscription,
    status: SubscriptionRowItem['status'],
    effectiveDay: number,
    year: number,
    month: number,
    todayKey: string,
): SubscriptionRowItem => ({
    id: subscription.id,
    label: subscription.label,
    amount: subscription.amount,
    dayOfMonth: subscription.dayOfMonth,
    frequency: subscription.frequency,
    status,
    effectiveDay,
    daysUntil: status === 'upcoming' ? getDaysUntil(year, month, effectiveDay, todayKey) : null,
});

export default function SubscriptionsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const budgets = useBudgetStore(state => state.budgets);
    const activeBudgetId = useBudgetStore(state => state.activeBudgetId);
    const todayKey = useBudgetStore(state => state.today);
    const deleteSubscription = useBudgetStore(state => state.deleteSubscription);
    const toggleSubscription = useBudgetStore(state => state.toggleSubscription);
    const monthlyTotal = useBudgetStore(state =>
        activeBudgetId ? state.getMonthlySubscriptionsTotal(activeBudgetId) : 0
    );
    const upcomingTotal = useBudgetStore(state =>
        activeBudgetId ? state.getRemainingSubscriptionsTotal(activeBudgetId) : 0
    );
    const [pausedExpanded, setPausedExpanded] = useState(false);
    const [previewItemId, setPreviewItemId] = useState<string | null>(null);

    const budget = budgets.find(item => item.id === activeBudgetId) ?? null;
    const sections = useMemo<SubscriptionSection[]>(() => {
        if (!budget) return [];

        const [todayYear, todayMonth, todayDay] = todayKey.split('-').map(Number);
        const today = new Date(todayYear, todayMonth - 1, todayDay);
        const scheduled = getSubscriptionsForMonth(
            budget.subscriptions ?? [],
            budget.year,
            budget.month,
            today,
        );
        const daysInMonth = new Date(budget.year, budget.month, 0).getDate();
        const toScheduledRow = (
            item: ScheduledSubscription,
        ): SubscriptionRowItem => toRowItem(
            item,
            item.status,
            item.effectiveDay,
            budget.year,
            budget.month,
            todayKey,
        );
        const upcoming = scheduled
            .filter(item => item.status === 'upcoming')
            .sort((a, b) => a.effectiveDay - b.effectiveDay)
            .map(toScheduledRow);
        const debited = scheduled
            .filter(item => item.status === 'debited')
            .sort((a, b) => a.effectiveDay - b.effectiveDay)
            .map(toScheduledRow);
        const paused = (budget.subscriptions ?? [])
            .filter(item => !item.isActive)
            .sort((a, b) =>
                Math.min(a.dayOfMonth, daysInMonth) - Math.min(b.dayOfMonth, daysInMonth)
            )
            .map(item => toRowItem(
                item,
                'paused',
                Math.min(item.dayOfMonth, daysInMonth),
                budget.year,
                budget.month,
                todayKey,
            ));

        return [
            ...(upcoming.length ? [{key: 'upcoming' as const, title: 'À VENIR', data: upcoming}] : []),
            ...(debited.length ? [{key: 'debited' as const, title: 'PRÉLEVÉS', data: debited}] : []),
            ...(paused.length
                ? [{
                    key: 'paused' as const,
                    title: `EN PAUSE (${paused.length})`,
                    data: pausedExpanded ? paused : [],
                }]
                : []),
        ];
    }, [budget, todayKey, pausedExpanded]);

    const firstItemId = sections.find(section => section.key !== 'paused')?.data[0]?.id ?? null;

    useEffect(() => {
        if (!firstItemId) return;

        db.execSync('CREATE TABLE IF NOT EXISTS app_ui_flags (flag TEXT PRIMARY KEY, value TEXT NOT NULL)');
        const flag = db.getFirstSync<{value: string}>(
            'SELECT value FROM app_ui_flags WHERE flag = ?',
            [SWIPE_HINT_FLAG],
        );
        if (flag) return;

        db.runSync('INSERT INTO app_ui_flags (flag, value) VALUES (?, ?)', [SWIPE_HINT_FLAG, '1']);
        const timer = setTimeout(() => setPreviewItemId(firstItemId), 0);
        return () => clearTimeout(timer);
    }, [firstItemId]);

    const confirmDelete = (subscription: Subscription) => {
        if (!budget) return;
        Alert.alert(
            'Supprimer le prélèvement',
            `Supprimer "${subscription.label}" ?`,
            [
                {text: 'Annuler', style: 'cancel'},
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => deleteSubscription(budget.id, subscription.id),
                },
            ],
        );
    };

    const editSubscription = (subscriptionId: string) => {
        router.push({
            pathname: '/add-subscription' as any,
            params: {subscriptionId},
        });
    };

    const renderItem = ({item}: {item: SubscriptionRowItem}) => {
        const subscription = budget?.subscriptions.find(entry => entry.id === item.id);
        if (!budget || !subscription) return null;

        return (
            <SwipeableSubscriptionRow
                item={item}
                previewSwipe={item.id === previewItemId}
                onEdit={() => editSubscription(item.id)}
                onToggle={() => toggleSubscription(budget.id, item.id)}
                onDelete={() => confirmDelete(subscription)}
            />
        );
    };

    const renderSectionHeader = ({section}: {section: SubscriptionSection}) => (
        section.key === 'paused' ? (
            <Pressable
                style={styles.sectionHeader}
                onPress={() => setPausedExpanded(expanded => !expanded)}
                accessibilityRole="button"
                accessibilityState={{expanded: pausedExpanded}}
            >
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionToggle}>{pausedExpanded ? 'Masquer' : 'Afficher'}</Text>
            </Pressable>
        ) : (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
        )
    );

    return (
        <GestureHandlerRootView style={styles.root}>
        <View style={[styles.root, {paddingTop: insets.top}]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backBtn}>‹ Retour</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/add-subscription' as any)}>
                    <Text style={styles.addBtn}>＋ Ajouter</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.hero}>
                <Text style={styles.title}>
                    Prélèvements de {budget ? MONTHS[budget.month - 1] : 'ce mois'}
                </Text>
            </View>
            <View style={styles.summary}>
                <Text style={styles.summarySecondary}>{formatCurrency(monthlyTotal, {compact: true})} ce mois</Text>
                <Text style={styles.summarySeparator}>·</Text>
                {upcomingTotal > 0 ? (
                    <Text style={styles.summaryAccent}>{formatCurrency(upcomingTotal, {compact: true})} à venir</Text>
                ) : (
                    <Text style={styles.summarySecondary}>tout est prélevé</Text>
                )}
            </View>

            <SectionList
                sections={sections}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                stickySectionHeadersEnabled={false}
                ListEmptyComponent={
                    <View style={styles.emptyWrap}>
                        <Text style={styles.emptyTitle}>
                            {budget?.subscriptions.length
                                ? 'Aucun prélèvement prévu pour ce mois'
                                : 'Aucun prélèvement pour l’instant'}
                        </Text>
                        <Text style={styles.emptyText}>
                            {budget?.subscriptions.length
                                ? 'Tes prélèvements actifs ne tombent pas ce mois-ci.'
                                : 'Ajoute tes prélèvements récurrents pour voir leur impact sur ton budget du mois.'}
                        </Text>
                        {!budget?.subscriptions.length && (
                            <TouchableOpacity
                                style={styles.emptyCta}
                                onPress={() => router.push('/add-subscription' as any)}
                            >
                                <Text style={styles.emptyCtaText}>Ajouter un prélèvement</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                }
            />
        </View>
        </GestureHandlerRootView>
    );
}
