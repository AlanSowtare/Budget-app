import React, { useMemo } from 'react';
import {
    Alert,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBudgetStore } from '@/store/budgetStore';
import { MONTHS } from '@/constants/months';
import { formatCurrency } from '@/utils/currency';
import { styles } from './budgets.styles';
import { Budget } from '@/domain/entities/Budget';
const getBudgetSortValue = (budget: Budget) => (budget.year * 100) + budget.month;
export default function BudgetsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const budgets = useBudgetStore(state => state.budgets);
    const activeBudgetId = useBudgetStore(state => state.activeBudgetId);
    const setActiveBudget = useBudgetStore(state => state.setActiveBudget);
    const deleteBudget = useBudgetStore(state => state.deleteBudget);
    const getDebitedSubscriptionsTotal = useBudgetStore(state => state.getDebitedSubscriptionsTotal);
    const orderedBudgets = useMemo(
        () => [...budgets].sort((a, b) => getBudgetSortValue(b) - getBudgetSortValue(a)),
        [budgets],
    );
    const selectBudget = (budgetId: string) => {
        setActiveBudget(budgetId);
        router.replace('/(home)' as any);
    };
    const handleDelete = (budget: Budget) => {
        if (budgets.length <= 1) {
            Alert.alert('Suppression impossible', 'Tu dois garder au moins un budget.');
            return;
        }
        Alert.alert(
            'Supprimer ce budget ?',
            `${MONTHS[budget.month - 1]} ${budget.year}`,
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => deleteBudget(budget.id),
                },
            ],
        );
    };
    const renderItem = ({ item }: { item: Budget }) => {
        const spent = item.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const debitedSubscriptions = getDebitedSubscriptionsTotal(item.id);
        const availableNow = item.totalAmount - spent - debitedSubscriptions;
        const isActive = item.id === activeBudgetId;
        return (
            <View style={styles.card}>
                <TouchableOpacity
                    style={styles.cardMain}
                    activeOpacity={0.85}
                    onPress={() => selectBudget(item.id)}
                >
                    <View style={styles.topRow}>
                        <Text style={styles.month}>{MONTHS[item.month - 1]} {item.year}</Text>
                        {isActive && (
                            <View style={styles.activeBadge}>
                                <Text style={styles.activeBadgeText}>Actif</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.amountLabel}>Disponible actuel</Text>
                            <Text style={styles.amountValue}>
                                {formatCurrency(availableNow, { compact: true, showCurrency: false })}{' '}
                                <Text style={styles.amountCurrency}>€</Text>
                            </Text>
                        </View>
                        <View style={styles.rightInfo}>
                            <Text style={styles.budgetLabel}>Budget du mois</Text>
                            <Text style={styles.budgetValue}>{formatCurrency(item.totalAmount, { compact: true })}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDelete(item)}
                >
                    <Text style={styles.deleteText}>Supprimer</Text>
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <View style={[styles.root, { paddingTop: insets.top }]}> 
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backBtn}>‹ Retour</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Mes budgets</Text>
                <View style={{ width: 58 }} />
            </View>
            <Text style={styles.subtitle}>
                Ouvre un budget pour consulter l&apos;accueil avec ce mois selectionne.
            </Text>
            <FlatList
                data={orderedBudgets}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyWrap}>
                        <Text style={styles.emptyTitle}>Aucun budget</Text>
                        <Text style={styles.emptyText}>
                            Cree ton premier budget pour commencer le suivi.
                        </Text>
                    </View>
                }
            />
            <TouchableOpacity
                style={styles.floatingCta}
                onPress={() => router.push('/add-budget' as any)}
            >
                <Text style={styles.floatingCtaText}>+ Nouveau budget</Text>
            </TouchableOpacity>
        </View>
    );
}
