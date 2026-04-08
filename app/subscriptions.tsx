import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {useRouter} from 'expo-router';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useBudgetStore} from '@/store/budgetStore';
import {styles} from './subscriptions.styles';
import {Subscription} from '@/domain/entities/Budget';
import {formatCurrency} from '@/utils/currency';

const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

const getBillingDayForBudget = (month?: number, year?: number) => {
    if (!month || !year) return 0;

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return getDaysInMonth(year, month);
    }

    if (year === currentYear && month === currentMonth) {
        return now.getDate();
    }

    return 0;
};

export default function SubscriptionsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const budget = useBudgetStore(state => state.getActiveBudget());
    const deleteSubscription = useBudgetStore(state => state.deleteSubscription);
    const toggleSubscription = useBudgetStore(state => state.toggleSubscription);
    const getMonthlySubscriptionsTotal = useBudgetStore(state => state.getMonthlySubscriptionsTotal);

    const billingDay = getBillingDayForBudget(budget?.month, budget?.year);

    const subscriptions = [...(budget?.subscriptions ?? [])].sort((a, b) => {
        if (a.dayOfMonth !== b.dayOfMonth) return a.dayOfMonth - b.dayOfMonth;
        return a.label.localeCompare(b.label);
    });
    const monthlyTotal = budget ? getMonthlySubscriptionsTotal(budget.id) : 0;

    const handleDelete = (subscription: Subscription) => {
        if (!budget) return;

        Alert.alert(
            'Supprimer l’abonnement',
            `Supprimer "${subscription.label}" ?`,
            [
                {text: 'Annuler', style: 'cancel'},
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => deleteSubscription(budget.id, subscription.id),
                },
            ]
        );
    };

    const renderItem = ({item}: { item: Subscription }) => {
        const effectiveDay = budget
            ? Math.min(item.dayOfMonth, getDaysInMonth(budget.year, budget.month))
            : item.dayOfMonth;
        const isPast = item.isActive && effectiveDay <= billingDay;
        const isUpcoming = item.isActive && !isPast;

        return (
        <View
            style={[
                styles.row,
                item.isActive ? (isPast ? styles.rowPast : styles.rowUpcoming) : styles.rowInactive,
            ]}
        >
            <View style={styles.rowMain}>
                <View
                    style={[
                        styles.dayBadge,
                        isPast && styles.dayBadgePast,
                        isUpcoming && styles.dayBadgeUpcoming,
                    ]}
                >
                    <Text style={styles.dayValue}>{item.dayOfMonth}</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.label}>{item.label}</Text>
                </View>

                <View
                    style={[
                        styles.amountWrap,
                        isPast && styles.amountWrapPast,
                        isUpcoming && styles.amountWrapUpcoming,
                    ]}
                >
                    <View
                        style={[
                            styles.stateDot,
                            isPast ? styles.stateDotPast : styles.stateDotUpcoming,
                            !item.isActive && styles.stateDotInactive,
                        ]}
                    />
                    <Text style={[styles.amount, isUpcoming && styles.amountUpcoming]}>{formatCurrency(item.amount)}</Text>
                </View>
            </View>

            <View style={styles.actionsRow}>
                <TouchableOpacity
                    style={[styles.actionBtn, styles.editBtn]}
                    onPress={() => router.push({
                        pathname: '/add-subscription' as any,
                        params: {subscriptionId: item.id},
                    })}
                >
                    <Text style={styles.actionText}>Modifier</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionBtn, item.isActive ? styles.pauseBtn : styles.activateBtn]}
                    onPress={() => budget && toggleSubscription(budget.id, item.id)}
                >
                    <Text style={styles.actionText}>{item.isActive ? 'Mettre en pause' : 'Réactiver'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionBtn, styles.deleteBtn]}
                    onPress={() => handleDelete(item)}
                >
                    <Text style={styles.deleteText}>Supprimer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    };

    return (
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
                <Text style={styles.title}>Abonnements mensuels</Text>
                <View style={styles.totalBadge}>
                    <Text style={styles.totalValue}>{formatCurrency(monthlyTotal, {compact: true})}</Text>
                </View>
            </View>

            <FlatList
                data={subscriptions}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                ListEmptyComponent={
                    <View style={styles.emptyWrap}>
                        <Text style={styles.emptyTitle}>Aucun abonnement pour l’instant</Text>
                        <Text style={styles.emptyText}>
                            Ajoute tes prélèvements récurrents pour voir leur impact sur ton budget du mois.
                        </Text>
                        <TouchableOpacity
                            style={styles.emptyCta}
                            onPress={() => router.push('/add-subscription' as any)}
                        >
                            <Text style={styles.emptyCtaText}>Ajouter un abonnement</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    );
}
