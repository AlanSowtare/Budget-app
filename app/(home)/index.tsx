import React, {useMemo, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {useRouter} from 'expo-router';
import {useBudgetStore} from '@/store/budgetStore';
import {ThemeColors} from '@/constants/theme';
import {makeStyles} from './index.styles';
import {makeSubscriptionCardStyles} from './subscription-card.styles';
import {getSubscriptionsForMonth} from '@/utils/subscriptionSchedule';
import {Category} from '@/domain/entities/Budget';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {MONTHS} from "@/constants/months";
import {formatCurrency} from '@/utils/currency';
import QuickActionsMenu from '@/components/QuickActionsMenu';
import {useTheme} from '@/hooks/useTheme';


// Map couleur → valeurs du theme
// Permet de retrouver la bonne couleur à partir du champ "color" d'une Category
const getCategoryColorMap = (colors: ThemeColors): Record<string, { base: string; dim: string }> => ({
    blue: {base: colors.blue, dim: colors.blueDim},
    purple: {base: colors.purple, dim: colors.purpleDim},
    orange: {base: colors.orange, dim: colors.orangeDim},
    pink: {base: colors.pink, dim: colors.pinkDim},
    danger: {base: colors.danger, dim: colors.dangerDim},
});

const getCategoryRemainingBadge = (colors: ThemeColors, remainingPercent: number) => {
    if (remainingPercent <= 10) {
        return {
            textColor: colors.danger,
            backgroundColor: colors.dangerDim,
        };
    }

    if (remainingPercent <= 30) {
        return {
            textColor: colors.warning,
            backgroundColor: colors.orangeDim,
        };
    }

    return {
        textColor: colors.accent,
        backgroundColor: colors.accentDim,
    };
};

export default function HomeScreen() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {colors} = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    const subscriptionCardStyles = useMemo(() => makeSubscriptionCardStyles(colors), [colors]);
    const categoryColorMap = getCategoryColorMap(colors);
    const budgets = useBudgetStore(state => state.budgets);
    const activeBudgetId = useBudgetStore(state => state.activeBudgetId);
    const todayKey = useBudgetStore(state => state.today);
    const createCurrentMonthBudget = useBudgetStore(state => state.createCurrentMonthBudget);
    const budget = budgets.find(b => b.id === activeBudgetId) ?? null;
    const currentMonthBudgetExists = budgets.some(
        item => item.year === Number(todayKey.slice(0, 4)) && item.month === Number(todayKey.slice(5, 7))
    );
    const isDisplayedMonthPast = budget !== null &&
        (budget.year < Number(todayKey.slice(0, 4)) ||
            (budget.year === Number(todayKey.slice(0, 4)) && budget.month < Number(todayKey.slice(5, 7))));
    const monthlySubscriptions = useBudgetStore(state =>
        activeBudgetId ? state.getMonthlySubscriptionsTotal(activeBudgetId) : 0
    );
    const debitedSubscriptions = useBudgetStore(state =>
        state.activeBudgetId ? state.getDebitedSubscriptionsTotal(state.activeBudgetId) : 0
    );
    const upcomingSubscriptions = useBudgetStore(state =>
        state.activeBudgetId ? state.getRemainingSubscriptionsTotal(state.activeBudgetId) : 0
    );

    const deleteCategory = useBudgetStore(state => state.deleteCategory);

    const insets = useSafeAreaInsets();

    // useMemo — calcule le total dépensé uniquement si budget change
    const totalSpent = useMemo(() => {
        if (!budget) return 0;
        return budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        // ↑ reduce parcourt toutes les dépenses et additionne les montants
        // sum = accumulateur (commence à 0)
        // expense = élément courant
    }, [budget]);

    const [todayYear, todayMonth, todayDay] = todayKey.split('-').map(Number);
    const today = new Date(todayYear, todayMonth - 1, todayDay);
    const nextSubscription = budget
        ? getSubscriptionsForMonth(budget.subscriptions ?? [], budget.year, budget.month, today)
            .filter(subscription => subscription.status === 'upcoming')
            .sort((a, b) => a.effectiveDay - b.effectiveDay)[0] ?? null
        : null;

    const currentAvailable = (budget?.totalAmount ?? 0) - totalSpent - debitedSubscriptions;
    const estimatedAvailable = (budget?.totalAmount ?? 0) - totalSpent - monthlySubscriptions;

    const progressPercent = budget && budget.totalAmount > 0
        ? Math.max((currentAvailable / budget.totalAmount) * 100, 0)
        : 100;

    const progressColor = progressPercent <= 10
        ? colors.danger
        : progressPercent <= 30
            ? colors.warning
            : colors.accent;

    const budgetHealth = estimatedAvailable < 0
        ? {
            label: 'Tendu',
            color: colors.danger,
            backgroundColor: colors.dangerDim,
        }
        : progressPercent <= 30
            ? {
                label: 'À surveiller',
                color: colors.warning,
                backgroundColor: colors.orangeDim,
            }
            : {
                label: 'Sain',
                color: colors.accent,
                backgroundColor: colors.accentDim,
            };

    const handleLongPressCategory = (item: Category) => {
        Alert.alert(
            `Supprimer "${item.name}" ?`,
            'Toutes les dépenses associées seront supprimées.',
            [
                {text: 'Annuler', style: 'cancel'},
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => {
                        if (budget) deleteCategory(budget.id, item.id);
                    },
                },
            ]
        );
    };

    const renderCategory = ({item}: { item: Category }) => {

        const categorySpent = budget?.expenses
            .filter(e => e.categoryId === item.id)
            .reduce((sum, e) => sum + e.amount, 0) ?? 0;

        const categoryPercent = item.allocatedAmount > 0
            ? Math.max(((item.allocatedAmount - categorySpent) / item.allocatedAmount) * 100, 0)
            : 0;

        const remainingPercent = Math.min(Math.round(categoryPercent), 100);

        const isOver = categorySpent > item.allocatedAmount;
        const colorSet = categoryColorMap[item.color] ?? categoryColorMap.blue;
        const remainingBadge = getCategoryRemainingBadge(colors, remainingPercent);

        return (
            <TouchableOpacity
                style={styles.catTile}
                onPress={() => router.push(`/category/${item.id}` as any)}
                onLongPress={() => handleLongPressCategory(item)}
                delayLongPress={400}
            >
                {/* Bordure colorée en haut */}
                <View style={[styles.catTileBorder, {backgroundColor: colorSet.base}]}/>

                {/* Badge pourcentage restant */}
                <View style={[styles.catPercentBadge, {backgroundColor: remainingBadge.backgroundColor}]}>
                    <Text style={[styles.catPercentBadgeText, {color: remainingBadge.textColor}]}>
                        {remainingPercent}%
                    </Text>
                </View>

                {/* Icône */}
                <View style={[styles.catIcon, {backgroundColor: colorSet.dim}]}>
                    <Text style={styles.catEmoji}>{item.emoji}</Text>
                </View>

                {/* Nom */}
                <Text style={styles.catName}>{item.name}</Text>

                {/* Montant */}
                <Text style={[styles.catSpent, isOver && styles.catSpentOver]}>
                    {formatCurrency(item.allocatedAmount - categorySpent, {compact: true})}
                </Text>

                {/* Barre de progression */}
                <View style={styles.catProgressTrack}>
                    <View style={[
                        styles.catProgressFill,
                        {
                            width: `${categoryPercent}%` as any,
                            backgroundColor: isOver ? colors.danger : colorSet.base,
                        }
                    ]}/>
                </View>

                {/* Badge dépassement */}
                {isOver && (
                    <View style={styles.overBadge}>
                        <Text style={styles.overBadgeText}>⚠ Dépassé</Text>
                    </View>
                )}

            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.root, {paddingTop: insets.top}]}>

            {/* ── HEADER ── */}
            {!currentMonthBudgetExists && (
                <View style={styles.createMonthBanner}>
                    <Text style={styles.createMonthText}>
                        Le budget de {MONTHS[todayMonth - 1].toLowerCase()} n’existe pas encore
                    </Text>
                    <TouchableOpacity
                        style={styles.createMonthButton}
                        onPress={createCurrentMonthBudget}
                    >
                        <Text style={styles.createMonthButtonText}>Créer</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>{budget?.year ?? todayYear}</Text>
                    <View style={styles.monthHeading}>
                        <Text style={styles.monthTitle}>
                            {MONTHS[(budget?.month ?? todayMonth) - 1]}
                        </Text>
                        {isDisplayedMonthPast && (
                            <View style={styles.pastMonthBadge}>
                                <Text style={styles.pastMonthBadgeText}>Mois passé</Text>
                            </View>
                        )}
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.menuBtn}
                    onPress={() => setIsMenuOpen(true)}
                    accessibilityRole="button"
                    accessibilityLabel="Ouvrir le menu"
                >
                    <Text style={styles.menuBtnText}>≡</Text>
                </TouchableOpacity>
            </View>

            <QuickActionsMenu
                visible={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onOpenBudgets={() => router.push('/budgets' as any)}
                onOpenSubscriptions={() => router.push('/subscriptions' as any)}
                onOpenAppearance={() => router.push('/appearance' as any)}
            />

            <FlatList
                data={budget?.categories ?? []}
                keyExtractor={item => item.id}
                // ↑ équivalent du trackBy en Angular — aide React à identifier
                //   chaque élément pour optimiser les re-renders
                numColumns={2}          // grille 2 colonnes
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}

                // ── HEADER DE LA LISTE (carte budget) ──
                // ListHeaderComponent = contenu affiché AU DESSUS de la liste
                // Parfait pour notre carte budget — elle scrolle avec la liste
                ListHeaderComponent={
                    <View>
                        <TouchableOpacity
                            onPress={() => router.push('/edit-budget' as any)}
                            activeOpacity={0.8}
                        >
                            {/* Carte budget global */}
                            <View style={styles.budgetCard}>
                                <View style={styles.budgetTopRow}>
                                    <Text style={styles.budgetLabel}>RESTE À DÉPENSER</Text>
                                    <View
                                        style={[
                                            styles.statusBadge,
                                            {backgroundColor: budgetHealth.backgroundColor},
                                        ]}
                                    >
                                        <Text style={[styles.statusBadgeText, {color: budgetHealth.color}]}>● {budgetHealth.label}</Text>
                                    </View>
                                </View>
                                <Text style={styles.budgetAmount}>
                                    {formatCurrency(estimatedAvailable, {compact: true, showCurrency: false})} <Text style={styles.budgetCurrency}>€</Text>
                                </Text>
                                <Text style={styles.currentBalance}>
                                    <Text style={styles.currentBalanceLabel}>Solde actuel </Text>
                                    <Text style={styles.currentBalanceValue}>
                                        {formatCurrency(currentAvailable, {compact: true})}
                                    </Text>
                                </Text>
                                {nextSubscription ? (
                                    <Text style={styles.nextSubscriptionText}>
                                        Prochain : {nextSubscription.label} · {formatCurrency(nextSubscription.amount)} · le {nextSubscription.effectiveDay}
                                    </Text>
                                ) : null}

                                {/* Barre de progression globale */}
                                <View style={styles.progressWrap}>
                                    <View style={styles.progressTrack}>
                                        <View style={[
                                            styles.progressFill,
                                            {
                                                width: `${progressPercent}%` as any,
                                                backgroundColor: progressColor,
                                            }
                                        ]}/>
                                    </View>
                                </View>

                                <Text style={styles.editHint}>
                                    Appuie pour ajuster ton budget mensuel
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Titre section catégories */}
                        <Text style={styles.sectionTitle}>Catégories</Text>

                    </View>
                }

                // ── FOOTER ──
                // Carte des prélèvements + bouton catégorie en bas de liste
                ListFooterComponent={
                    <View>
                        <TouchableOpacity
                            style={subscriptionCardStyles.card}
                            activeOpacity={0.88}
                            onPress={() => router.push('/subscriptions' as any)}
                        >
                            <View style={subscriptionCardStyles.header}>
                                <View>
                                    <Text style={subscriptionCardStyles.eyebrow}>Prélèvements</Text>
                                    <Text style={subscriptionCardStyles.title}>Charges à venir</Text>
                                </View>
                                <Text style={subscriptionCardStyles.link}>Voir tout</Text>
                            </View>

                            <Text style={subscriptionCardStyles.highlightValue}>
                                {formatCurrency(upcomingSubscriptions, {compact: true})}
                            </Text>

                            <TouchableOpacity
                                style={subscriptionCardStyles.addBtn}
                                onPress={() => router.push('/add-subscription' as any)}
                            >
                                <Text style={subscriptionCardStyles.addBtnText}>＋ Ajouter un prélèvement</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.addCatBtn}
                            onPress={() => router.push('/add-category' as any)}
                        >
                            <Text style={styles.addCatBtnText}>＋ Ajouter une catégorie</Text>
                        </TouchableOpacity>
                    </View>
                }

                // ── LISTE VIDE ──
                // Affiché si budget.categories est vide
                ListEmptyComponent={
                    <View style={styles.emptyWrap}>
                        <Text style={styles.emptyText}>
                            Aucune catégorie pour l&#39;instant
                        </Text>
                        <Text style={styles.emptySubText}>
                            Ajoute ta première catégorie pour commencer à suivre tes dépenses
                        </Text>
                    </View>
                }

                renderItem={renderCategory}
            />

        </View>
    );
}