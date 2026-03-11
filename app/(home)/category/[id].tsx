import React, { useMemo } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './[id].styles';
import {useBudgetStore} from "@/store/budgetStore";
import {colors} from "@/constants/theme";
import {Expense} from "@/domain/entities/Budget";

const COLOR_MAP: Record<string, { base: string; dim: string }> = {
    blue:   { base: colors.blue,   dim: colors.blueDim },
    purple: { base: colors.purple, dim: colors.purpleDim },
    orange: { base: colors.orange, dim: colors.orangeDim },
    pink:   { base: colors.pink,   dim: colors.pinkDim },
    danger: { base: colors.danger, dim: colors.dangerDim },
};

export default function CategoryDetail() {

    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Récupère l'id depuis la route /category/[id]
    const { id } = useLocalSearchParams<{ id: string }>();

    // Selector réactif — comme dans le Home
    const budgets = useBudgetStore(state => state.budgets);
    const activeBudgetId = useBudgetStore(state => state.activeBudgetId);
    const budget = budgets.find(b => b.id === activeBudgetId) ?? null;

    // On retrouve la catégorie concernée
    const category = budget?.categories.find(c => c.id === id);

    // Dépenses filtrées pour cette catégorie uniquement
    const expenses = useMemo(() => {
        return budget?.expenses.filter(e => e.categoryId === id) ?? [];
    }, [budget, id]);

    // Calculs
    const totalSpent = useMemo(() => {
        return expenses.reduce((sum, e) => sum + e.amount, 0);
    }, [expenses]);

    const remaining = (category?.allocatedAmount ?? 0) - totalSpent;

    const progressPercent = category
        ? Math.max((remaining / category.allocatedAmount) * 100, 0)
        : 100;

    const progressColor = progressPercent <= 10
        ? colors.danger
        : progressPercent <= 30
            ? colors.warning
            : colors.accent;

    const colorSet = COLOR_MAP[category?.color ?? 'blue'];
    const isOver = totalSpent > (category?.allocatedAmount ?? 0);

    // ── RENDU D'UNE LIGNE DE DÉPENSE ──
    const renderExpense = ({ item }: { item: Expense }) => {

        // Formate la date ISO en date lisible
        const date = new Date(item.date);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
        });
        // ex: "11 mars"

        return (
            <View style={styles.expenseRow}>
                <View style={styles.expenseEmoji}>
                    <Text style={styles.expenseEmojiText}>{item.emoji}</Text>
                </View>
                <View style={styles.expenseInfo}>
                    <Text style={styles.expenseLabel}>{item.label}</Text>
                    <Text style={styles.expenseDate}>{formattedDate}</Text>
                </View>
                <View style={styles.expenseAmountBadge}>
                    <Text style={styles.expenseAmount}>-{item.amount} €</Text>
                </View>
            </View>
        );
    };

    if (!category) return null;

    return (
        <View style={[styles.root, { paddingTop: insets.top }]}>

            <FlatList
                data={expenses}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}

                ListHeaderComponent={
                    <View>

                        {/* ── HEADER ── */}
                        <View style={styles.header}>
                            <TouchableOpacity
                                style={styles.backBtn}
                                onPress={() => router.back()}
                            >
                                <Text style={styles.backBtnText}>‹ Retour</Text>
                            </TouchableOpacity>
                        </View>

                        {/* ── TITRE CATÉGORIE ── */}
                        <View style={styles.catHeader}>
                            <View style={[styles.catIcon, { backgroundColor: colorSet.dim }]}>
                                <Text style={styles.catEmoji}>{category.emoji}</Text>
                            </View>
                            <View>
                                <Text style={styles.catName}>{category.name}</Text>
                                <Text style={styles.catCount}>
                                    {expenses.length} dépense{expenses.length > 1 ? 's' : ''} ce mois
                                </Text>
                            </View>
                        </View>

                        {/* ── CARTE BUDGET ── */}
                        <View style={styles.budgetCard}>
                            <View style={styles.amountsRow}>
                                <View style={styles.amountItem}>
                                    <Text style={styles.amountLabel}>Budget</Text>
                                    <Text style={styles.amountValue}>
                                        {category.allocatedAmount} €
                                    </Text>
                                </View>
                                <View style={styles.amountDivider} />
                                <View style={styles.amountItem}>
                                    <Text style={styles.amountLabel}>Dépensé</Text>
                                    <Text style={[styles.amountValue, { color: colors.danger }]}>
                                        {totalSpent} €
                                    </Text>
                                </View>
                                <View style={styles.amountDivider} />
                                <View style={styles.amountItem}>
                                    <Text style={styles.amountLabel}>Restant</Text>
                                    <Text style={[
                                        styles.amountValue,
                                        { color: isOver ? colors.danger : colors.accent }
                                    ]}>
                                        {remaining} €
                                    </Text>
                                </View>
                            </View>

                            {/* Barre de progression */}
                            <View style={styles.progressTrack}>
                                <View style={[
                                    styles.progressFill,
                                    {
                                        width: `${progressPercent}%` as any,
                                        backgroundColor: progressColor,
                                    }
                                ]} />
                            </View>

                        </View>

                        {/* Titre section dépenses */}
                        <Text style={styles.sectionTitle}>Dépenses</Text>

                    </View>
                }

                // État vide
                ListEmptyComponent={
                    <View style={styles.emptyWrap}>
                        <Text style={styles.emptyText}>Aucune dépense pour l&#39;instant</Text>
                        <Text style={styles.emptySubText}>
                            Appuie sur le bouton ci-dessous pour ajouter ta première dépense
                        </Text>
                    </View>
                }

                renderItem={renderExpense}
            />

            {/* ── FAB AJOUTER DÉPENSE ── */}
            {/* Position absolute — flotte au dessus du contenu */}
            <TouchableOpacity
                style={[styles.fab, { bottom: insets.bottom + 16 }]}
                onPress={() => router.push({
                    pathname: '/add-expense' as any,
                    params: { categoryId: id }
                })}
            >
                <Text style={styles.fabText}>＋ Ajouter une dépense</Text>
            </TouchableOpacity>

        </View>
    );
}