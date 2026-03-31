import { StyleSheet } from 'react-native';
import {colors, fontSize, radius, spacing, fonts} from "@/constants/theme";

export const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: colors.bg,
    },

    listContent: {
        paddingHorizontal: spacing.md,
        paddingBottom: 100, // espace pour le FAB
    },

    // ── HEADER ──
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between', // ← espace entre retour et supprimer
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    deleteBtn: {
        fontFamily: fonts.medium,
        fontSize: fontSize.sm,
        color: colors.danger,
    },
    backBtn: {
        alignSelf: 'flex-start',
    },
    backBtnText: {
        fontFamily: fonts.medium,
        fontSize: fontSize.md,
        color: colors.textMuted,
    },

    // ── CATÉGORIE ──
    catHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        marginBottom: spacing.lg,
    },
    catIcon: {
        width: 52,
        height: 52,
        borderRadius: radius.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    catEmoji: {
        fontSize: 24,
    },
    catName: {
        fontFamily: fonts.extraBold,
        fontSize: fontSize.xxl,
        color: colors.text,
        letterSpacing: -0.4,
    },
    catCount: {
        fontFamily: fonts.regular,
        fontSize: fontSize.sm,
        color: colors.textMuted,
        marginTop: 2,
    },

    // ── CARTE BUDGET ──
    budgetCard: {
        backgroundColor: colors.surface,
        borderRadius: radius.xl,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: spacing.lg,
    },
    amountsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.lg,
    },
    amountItem: {
        flex: 1,
        alignItems: 'center',
    },
    amountLabel: {
        fontFamily: fonts.regular,
        fontSize: fontSize.xs,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: spacing.xs,
    },
    amountValue: {
        fontFamily: fonts.extraBold,
        fontSize: fontSize.xl,
        color: colors.text,
        fontVariant: ['tabular-nums'],
    },
    amountDivider: {
        width: 1,
        backgroundColor: colors.border,
        alignSelf: 'stretch',
    },
    progressTrack: {
        height: 6,
        backgroundColor: colors.surface3,
        borderRadius: radius.full,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: radius.full,
    },

    // ── SECTION TITLE ──
    sectionTitle: {
        fontFamily: fonts.bold,
        fontSize: fontSize.sm,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: spacing.sm,
    },

    // ── EXPENSE ROW ──
    expenseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: spacing.sm,
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

    // ── EMPTY ──
    emptyWrap: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },
    emptyText: {
        fontFamily: fonts.bold,
        fontSize: fontSize.lg,
        color: colors.textMuted,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    emptySubText: {
        fontFamily: fonts.regular,
        fontSize: fontSize.md,
        color: colors.textMuted,
        textAlign: 'center',
        lineHeight: 22,
    },

    // ── FAB ──
    fab: {
        position: 'absolute',
        left: spacing.lg,
        right: spacing.lg,
        backgroundColor: colors.accent,
        borderRadius: radius.lg,
        paddingVertical: spacing.md,
        alignItems: 'center',
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
    },
    fabText: {
        fontFamily: fonts.bold,
        fontSize: fontSize.lg,
        color: '#0d2e22',
    },

});