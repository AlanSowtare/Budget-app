import React, {useMemo} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,  // respecte les encoches iPhone (notch, dynamic island)
} from 'react-native';
import {useRouter} from 'expo-router';
import {useBudgetStore} from '@/store/budgetStore';
import {colors} from '@/constants/theme';
import {styles} from './index.styles';
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

    const insets = useSafeAreaInsets();

    // useMemo — calcule le total dépensé uniquement si budget change
    const totalSpent = useMemo(() => {
        if (!budget) return 0;
        return budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        // ↑ reduce parcourt toutes les dépenses et additionne les montants
        // sum = accumulateur (commence à 0)
        // expense = élément courant
    }, [budget]);

    const remaining = (budget?.totalAmount ?? 0) - totalSpent;

    const progressPercent = budget
        ? Math.max((remaining / budget.totalAmount) * 100, 0)
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
                                <Text style={styles.budgetLabel}>Budget du mois</Text>
                                <Text style={styles.budgetAmount}>
                                    {remaining} <Text style={styles.budgetCurrency}>€</Text>
                                </Text>
                                <Text style={styles.budgetSub}>
                                    sur <Text style={styles.budgetRemaining}>{budget?.totalAmount ?? 0} €</Text> ce mois
                                </Text>

                                {/* Barre de progression globale */}
                                <View style={styles.progressWrap}>
                                    <View style={styles.progressHeader}>
                                        <Text style={styles.progressLabel}>Dépensé</Text>
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
                                        <Text style={styles.statLabel}>Dépensé</Text>
                                        <Text style={styles.statValue}>{totalSpent} €</Text>
                                    </View>
                                    <View style={styles.statBox}>
                                        <Text style={styles.statLabel}>Restant</Text>
                                        <Text style={[styles.statValue, {color: colors.accent}]}>
                                            {remaining} €
                                        </Text>
                                    </View>
                                </View>
                            </View>
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