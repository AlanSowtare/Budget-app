import React, {useMemo} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {useRouter} from 'expo-router';
import {useBudgetStore} from '@/store/budgetStore';
import {colors} from '@/constants/theme';
import {styles} from './index.styles';
import {subscriptionCardStyles} from './subscription-card.styles';
import {Category} from '@/domain/entities/Budget';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {MONTHS} from "@/constants/months";


// Map couleur → valeurs du theme
// Permet de retrouver la bonne couleur à partir du champ "color" d'une Category
const COLOR_MAP: Record<string, { base: string; dim: string }> = {
    blue: {base: colors.blue, dim: colors.blueDim},
    purple: {base: colors.purple, dim: colors.purpleDim},
    orange: {base: colors.orange, dim: colors.orangeDim},
    pink: {base: colors.pink, dim: colors.pinkDim},
    danger: {base: colors.danger, dim: colors.dangerDim},
};

export default function HomeScreen() {
    const router = useRouter();
    const budgets = useBudgetStore(state => state.budgets);
    const activeBudgetId = useBudgetStore(state => state.activeBudgetId);
    const budget = budgets.find(b => b.id === activeBudgetId) ?? null;

    const deleteCategory = useBudgetStore(state => state.deleteCategory);
    const getMonthlySubscriptionsTotal = useBudgetStore(state => state.getMonthlySubscriptionsTotal);
    const getRemainingSubscriptionsTotal = useBudgetStore(state => state.getRemainingSubscriptionsTotal);
    const getNextSubscriptionDay = useBudgetStore(state => state.getNextSubscriptionDay);

    const insets = useSafeAreaInsets();

    // useMemo — calcule le total dépensé uniquement si budget change
    const totalSpent = useMemo(() => {
        if (!budget) return 0;
        return budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        // ↑ reduce parcourt toutes les dépenses et additionne les montants
        // sum = accumulateur (commence à 0)
        // expense = élément courant
    }, [budget]);

    const monthlySubscriptions = budget
        ? getMonthlySubscriptionsTotal(budget.id)
        : 0;

    const upcomingSubscriptions = budget
        ? getRemainingSubscriptionsTotal(budget.id)
        : 0;

    const nextSubscriptionDay = budget
        ? getNextSubscriptionDay(budget.id)
        : null;

    const currentAvailable = (budget?.totalAmount ?? 0) - totalSpent;
    const estimatedAvailable = currentAvailable - upcomingSubscriptions;
    const hasUpcomingSubscriptions = upcomingSubscriptions > 0;
    const estimatedSubtitle = hasUpcomingSubscriptions
        ? `${estimatedAvailable.toFixed(2)} € après charges à venir`
        : 'Aucune charge récurrente restante ce mois';

    const subscriptionsHelperText = nextSubscriptionDay && hasUpcomingSubscriptions
        ? `Prochain prélèvement le ${nextSubscriptionDay} · ${monthlySubscriptions.toFixed(2)} € au total ce mois`
        : monthlySubscriptions > 0
            ? `${monthlySubscriptions.toFixed(2)} € d’abonnements actifs ce mois`
            : 'Aucun abonnement actif pour le moment';

    const progressPercent = budget && budget.totalAmount > 0
        ? Math.max((currentAvailable / budget.totalAmount) * 100, 0)
        : 100;

    const progressColor = progressPercent <= 10
        ? colors.danger
        : progressPercent <= 30
            ? colors.warning
            : colors.accent;

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

        const categoryPercent = Math.max(
            ((item.allocatedAmount - categorySpent) / item.allocatedAmount) * 100, 0
        );

        const isOver = categorySpent > item.allocatedAmount;
        const colorSet = COLOR_MAP[item.color] ?? COLOR_MAP.blue;

        return (
            <TouchableOpacity
                style={styles.catTile}
                onPress={() => router.push(`/category/${item.id}` as any)}
                onLongPress={() => handleLongPressCategory(item)}
                delayLongPress={400}
            >
                {/* Bordure colorée en haut */}
                <View style={[styles.catTileBorder, {backgroundColor: colorSet.base}]}/>

                {/* Icône */}
                <View style={[styles.catIcon, {backgroundColor: colorSet.dim}]}>
                    <Text style={styles.catEmoji}>{item.emoji}</Text>
                </View>

                {/* Nom + nb dépenses */}
                <Text style={styles.catName}>{item.name}</Text>
                <Text style={styles.catCount}>
                    {budget?.expenses.filter(e => e.categoryId === item.id).length ?? 0} dépenses
                </Text>

                {/* Montant */}
                <Text style={[styles.catSpent, isOver && styles.catSpentOver]}>
                    {item.allocatedAmount - categorySpent} €
                </Text>
                <Text style={styles.catBudget}>restant sur {item.allocatedAmount} €</Text>

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
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Bonjour 👋</Text>
                    <Text style={styles.monthTitle}>
                        {MONTHS[(budget?.month ?? 1) - 1]} {budget?.year}
                    </Text>
                </View>
                {/* Avatar placeholder */}
                <View style={styles.avatar}>
                    <Text>👤</Text>
                </View>
            </View>

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
                                <Text style={styles.budgetLabel}>Disponible actuel</Text>
                                <Text style={styles.budgetAmount}>
                                    {currentAvailable.toFixed(2)} <Text style={styles.budgetCurrency}>€</Text>
                                </Text>
                                <Text style={styles.budgetSub}>
                                    {estimatedSubtitle}
                                </Text>

                                {/* Barre de progression globale */}
                                <View style={styles.progressWrap}>
                                    <View style={styles.progressHeader}>
                                        <Text style={styles.progressLabel}>Budget consommé</Text>
                                        <Text style={styles.progressValue}>
                                            {totalSpent.toFixed(2)} € / {budget?.totalAmount ?? 0} €
                                        </Text>
                                    </View>
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

                                {/* Stats dépensé / restant */}
                                <View style={styles.statsRow}>
                                    <View style={styles.statBox}>
                                        <Text style={styles.statLabel}>Disponible estimé</Text>
                                        <Text
                                            style={[
                                                styles.statValue,
                                                estimatedAvailable < 0 && styles.statValueDanger,
                                            ]}
                                        >
                                            {estimatedAvailable.toFixed(2)} €
                                        </Text>
                                    </View>
                                    <View style={styles.statBox}>
                                        <Text style={styles.statLabel}>Budget total</Text>
                                        <Text style={styles.statValue}>{(budget?.totalAmount ?? 0).toFixed(2)} €</Text>
                                    </View>
                                </View>

                                <Text style={styles.editHint}>
                                    Appuie pour modifier ton budget du mois
                                </Text>
                            </View>
                        </TouchableOpacity>


                        {/* ── ABONNEMENTS MENSUELS ── */}
                        <TouchableOpacity
                            style={subscriptionCardStyles.card}
                            activeOpacity={0.88}
                            onPress={() => router.push('/subscriptions' as any)}
                        >
                            <View style={subscriptionCardStyles.header}>
                                <View>
                                    <Text style={subscriptionCardStyles.eyebrow}>Abonnements</Text>
                                    <Text style={subscriptionCardStyles.title}>Charges à venir</Text>
                                </View>
                                <Text style={subscriptionCardStyles.link}>Voir tout</Text>
                            </View>

                            <Text style={subscriptionCardStyles.highlightValue}>
                                {upcomingSubscriptions.toFixed(2)} €
                            </Text>
                            <Text style={subscriptionCardStyles.helperText}>
                                {subscriptionsHelperText}
                            </Text>

                            <TouchableOpacity
                                style={subscriptionCardStyles.addBtn}
                                onPress={() => router.push('/add-subscription' as any)}
                            >
                                <Text style={subscriptionCardStyles.addBtnText}>＋ Ajouter un abonnement</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>

                        {/* Titre section catégories */}
                        <Text style={styles.sectionTitle}>Catégories</Text>

                    </View>
                }

                // ── FOOTER ──
                // Bouton "Ajouter une catégorie" en bas de liste
                ListFooterComponent={
                    <TouchableOpacity
                        style={styles.addCatBtn}
                        onPress={() => router.push('/add-category' as any)}
                    >
                        <Text style={styles.addCatBtnText}>＋ Ajouter une catégorie</Text>
                    </TouchableOpacity>
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