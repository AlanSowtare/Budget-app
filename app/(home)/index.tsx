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
import {formatCurrency} from '@/utils/currency';


// Map couleur → valeurs du theme
// Permet de retrouver la bonne couleur à partir du champ "color" d'une Category
const COLOR_MAP: Record<string, { base: string; dim: string }> = {
    blue: {base: colors.blue, dim: colors.blueDim},
    purple: {base: colors.purple, dim: colors.purpleDim},
    orange: {base: colors.orange, dim: colors.orangeDim},
    pink: {base: colors.pink, dim: colors.pinkDim},
    danger: {base: colors.danger, dim: colors.dangerDim},
};

const getCategoryRemainingBadge = (remainingPercent: number) => {
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
    const budgets = useBudgetStore(state => state.budgets);
    const activeBudgetId = useBudgetStore(state => state.activeBudgetId);
    const budget = budgets.find(b => b.id === activeBudgetId) ?? null;

    const deleteCategory = useBudgetStore(state => state.deleteCategory);
    const getDebitedSubscriptionsTotal = useBudgetStore(state => state.getDebitedSubscriptionsTotal);
    const getRemainingSubscriptionsTotal = useBudgetStore(state => state.getRemainingSubscriptionsTotal);

    const insets = useSafeAreaInsets();

    // useMemo — calcule le total dépensé uniquement si budget change
    const totalSpent = useMemo(() => {
        if (!budget) return 0;
        return budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        // ↑ reduce parcourt toutes les dépenses et additionne les montants
        // sum = accumulateur (commence à 0)
        // expense = élément courant
    }, [budget]);

    const debitedSubscriptions = budget
        ? getDebitedSubscriptionsTotal(budget.id)
        : 0;

    const upcomingSubscriptions = budget
        ? getRemainingSubscriptionsTotal(budget.id)
        : 0;

    const currentAvailable = (budget?.totalAmount ?? 0) - totalSpent - debitedSubscriptions;
    const estimatedAvailable = currentAvailable - upcomingSubscriptions;
    const totalConsumed = totalSpent + debitedSubscriptions;

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
        const colorSet = COLOR_MAP[item.color] ?? COLOR_MAP.blue;
        const remainingBadge = getCategoryRemainingBadge(remainingPercent);

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
                                <View style={styles.budgetTopRow}>
                                    <Text style={styles.budgetLabel}>Disponible maintenant</Text>
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
                                    {formatCurrency(currentAvailable, {compact: true, showCurrency: false})} <Text style={styles.budgetCurrency}>€</Text>
                                </Text>

                                {/* Barre de progression globale */}
                                <View style={styles.progressWrap}>
                                    <View style={styles.progressHeader}>
                                        <Text style={styles.progressValue}>
                                            {formatCurrency(totalConsumed, {compact: true})} / {formatCurrency(budget?.totalAmount ?? 0, {compact: true})}
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
                                                styles.statValueEmphasis,
                                                {color: budgetHealth.color},
                                            ]}
                                        >
                                            {formatCurrency(estimatedAvailable, {compact: true})}
                                        </Text>
                                    </View>
                                    <View style={styles.statBox}>
                                        <Text style={styles.statLabel}>Budget du mois</Text>
                                        <Text style={styles.statValue}>{formatCurrency(budget?.totalAmount ?? 0, {compact: true})}</Text>
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
                // Carte abonnements + bouton catégorie en bas de liste
                ListFooterComponent={
                    <View>
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
                                {formatCurrency(upcomingSubscriptions, {compact: true})}
                            </Text>

                            <TouchableOpacity
                                style={subscriptionCardStyles.addBtn}
                                onPress={() => router.push('/add-subscription' as any)}
                            >
                                <Text style={subscriptionCardStyles.addBtnText}>＋ Ajouter un abonnement</Text>
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