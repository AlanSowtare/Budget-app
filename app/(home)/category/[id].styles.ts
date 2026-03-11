import { StyleSheet } from 'react-native';
import {colors, fontSize, radius, spacing} from "@/constants/theme";

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
        paddingVertical: spacing.md,
    },
    backBtn: {
        alignSelf: 'flex-start',
    },
    backBtnText: {
        fontFamily: 'DMSans-Medium',
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
        fontFamily: 'Syne-ExtraBold',
        fontSize: fontSize.xxl,
        color: colors.text,
    },
    catCount: {
        fontFamily: 'DMSans-Regular',
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
        fontFamily: 'DMSans-Regular',
        fontSize: fontSize.xs,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: spacing.xs,
    },
    amountValue: {
        fontFamily: 'Syne-ExtraBold',
        fontSize: fontSize.xl,
        color: colors.text,
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
        fontFamily: 'Syne-Bold',
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
        fontFamily: 'DMSans-Medium',
        fontSize: fontSize.md,
        color: colors.text,
    },
    expenseDate: {
        fontFamily: 'DMSans-Regular',
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
        fontFamily: 'Syne-Bold',
        fontSize: fontSize.md,
        color: colors.danger,
    },

    // ── EMPTY ──
    emptyWrap: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },
    emptyText: {
        fontFamily: 'Syne-Bold',
        fontSize: fontSize.lg,
        color: colors.textMuted,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    emptySubText: {
        fontFamily: 'DMSans-Regular',
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
        fontFamily: 'Syne-ExtraBold',
        fontSize: fontSize.lg,
        color: '#0d2e22',
    },

});