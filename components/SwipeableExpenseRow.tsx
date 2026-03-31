import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
} from 'react-native-gesture-handler';
import { Expense } from '@/domain/entities/Budget';
import { colors, spacing, radius, fontSize, fonts } from '@/constants/theme';

interface Props {
    item: Expense;
    onDelete: (id: string) => void;
}

const DELETE_THRESHOLD = -80; // distance en px pour déclencher la suppression
const DELETE_BTN_WIDTH = 80;

export function SwipeableExpenseRow({ item, onDelete }: Props) {

    // useSharedValue = valeur réactive de Reanimated
    // Contrairement à useState, les changements ne causent pas de re-render React
    // Ils sont directement appliqués sur le thread UI → animations fluides
    const translateX = useSharedValue(0);
    const rowHeight = useSharedValue<number | 'auto'>('auto');

    // Formate la date
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
    });

    // Fonction appelée sur le thread JS pour déclencher la suppression
    const triggerDelete = (id: string) => {
        Alert.alert(
            'Supprimer la dépense',
            `Supprimer "${item.label}" ?`,
            [
                {
                    text: 'Annuler',
                    onPress: () => {
                        // Remet la ligne en place
                        translateX.value = withSpring(0);
                    },
                    style: 'cancel',
                },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => {
                        // Anime la disparition avant de supprimer
                        translateX.value = withTiming(-400, { duration: 200 });
                        rowHeight.value = withTiming(0, { duration: 250 }, () => {
                            // Ce callback tourne sur le thread UI
                            // runOnJS permet d'appeler une fonction JS depuis le thread UI
                            runOnJS(onDelete)(id);
                        });
                    },
                },
            ]
        );
    };

    // Gesture de pan (swipe horizontal)
    const panGesture = Gesture.Pan()
        .activeOffsetX([-10, 10]) // démarre après 10px de mouvement horizontal
        .onUpdate(event => {
            // Limite le swipe à gauche uniquement (valeur négative)
            // et ne dépasse pas -DELETE_BTN_WIDTH * 1.5
            translateX.value = Math.max(
                event.translationX,
                -DELETE_BTN_WIDTH * 1.5
            );
        })
        .onEnd(() => {
            if (translateX.value < DELETE_THRESHOLD) {
                // Seuil atteint — affiche la confirmation sur le thread JS
                runOnJS(triggerDelete)(item.id);
            } else {
                // Pas assez loin — remet en place avec un effet ressort
                translateX.value = withSpring(0);
            }
        });

    // Style animé de la ligne — suit translateX
    const rowStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    // Style animé de la hauteur — pour l'animation de disparition
    const containerStyle = useAnimatedStyle(() => ({
        height: rowHeight.value === 'auto' ? undefined : rowHeight.value,
        overflow: 'hidden',
    }));

    return (
        // Animated.View pour le conteneur — anime la hauteur
        <Animated.View style={[containerStyle, styles.container]}>

            {/* Bouton delete visible derrière la ligne quand on swipe */}
            <View style={styles.deleteBackground}>
                <Text style={styles.deleteIcon}>🗑</Text>
            </View>

            {/* GestureDetector intercepte le swipe */}
            <GestureDetector gesture={panGesture}>
                {/* Animated.View pour la ligne — suit le translateX */}
                <Animated.View style={[styles.row, rowStyle]}>
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
                </Animated.View>
            </GestureDetector>

        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.sm,
        borderRadius: radius.md,
        overflow: 'hidden',
    },
    deleteBackground: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: DELETE_BTN_WIDTH,
        backgroundColor: colors.danger,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.md,
    },
    deleteIcon: {
        fontSize: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
    },
    expenseEmoji: {
        width: 36,
        height: 36,
        backgroundColor: colors.surface2,
        borderRadius: radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    expenseEmojiText: {
        fontSize: 16,
    },
    expenseInfo: {
        flex: 1,
    },
    expenseLabel: {
        fontFamily: fonts.medium,
        fontSize: fontSize.md,
        color: colors.text,
    },
    expenseDate: {
        fontFamily: fonts.regular,
        fontSize: fontSize.xs,
        color: colors.textMuted,
        marginTop: 2,
    },
    expenseAmountBadge: {
        backgroundColor: colors.dangerDim,
        borderRadius: radius.sm,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
    },
    expenseAmount: {
        fontFamily: fonts.bold,
        fontSize: fontSize.md,
        color: colors.danger,
        fontVariant: ['tabular-nums'],
    },
});