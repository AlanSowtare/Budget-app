import {StyleSheet} from 'react-native';
import {colors, fontSize, radius, spacing, fonts} from '@/constants/theme';

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
    },
    backBtn: {
        fontFamily: fonts.medium,
        fontSize: fontSize.md,
        color: colors.textMuted,
    },
    addBtn: {
        fontFamily: fonts.bold,
        fontSize: fontSize.md,
        color: colors.accent,
    },
    hero: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
        gap: spacing.md,
    },
    title: {
        flex: 1,
        fontFamily: fonts.extraBold,
        fontSize: fontSize.xxl,
        color: colors.text,
        letterSpacing: -0.4,
    },
    totalBadge: {
        backgroundColor: colors.accentDim,
        borderRadius: radius.full,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderWidth: 1,
        borderColor: 'rgba(110,231,183,0.14)',
        flexShrink: 0,
    },
    totalValue: {
        fontFamily: fonts.bold,
        fontSize: fontSize.md,
        color: colors.accent,
        fontVariant: ['tabular-nums'],
    },
    listContent: {
        padding: spacing.md,
        paddingBottom: spacing.xl,
        gap: spacing.sm,
    },
    row: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.md,
        gap: spacing.md,
    },
    rowInactive: {
        opacity: 0.55,
    },
    rowMain: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    dayBadge: {
        width: 58,
        height: 58,
        borderRadius: radius.md,
        backgroundColor: colors.surface2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayValue: {
        fontFamily: fonts.extraBold,
        fontSize: fontSize.xl,
        color: colors.text,
        fontVariant: ['tabular-nums'],
    },
    dayLabel: {
        fontFamily: fonts.regular,
        fontSize: fontSize.xs,
        color: colors.textMuted,
        textTransform: 'uppercase',
    },
    info: {
        flex: 1,
    },
    label: {
        fontFamily: fonts.bold,
        fontSize: fontSize.lg,
        color: colors.text,
    },
    amountWrap: {
        backgroundColor: colors.accentDim,
        borderRadius: radius.md,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
    },
    amount: {
        fontFamily: fonts.bold,
        fontSize: fontSize.md,
        color: colors.accent,
        fontVariant: ['tabular-nums'],
    },
    actionsRow: {
        flexDirection: 'row',
        gap: spacing.sm,
        flexWrap: 'wrap',
    },
    actionBtn: {
        flex: 1,
        minWidth: 96,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.md,
        paddingVertical: spacing.sm,
        borderWidth: 1,
    },
    editBtn: {
        backgroundColor: colors.surface2,
        borderColor: colors.border,
    },
    pauseBtn: {
        backgroundColor: colors.surface2,
        borderColor: colors.border,
    },
    activateBtn: {
        backgroundColor: colors.accentDim,
        borderColor: 'transparent',
    },
    actionText: {
        fontFamily: fonts.medium,
        fontSize: fontSize.sm,
        color: colors.text,
    },
    deleteBtn: {
        backgroundColor: colors.dangerDim,
        borderColor: 'transparent',
    },
    deleteText: {
        fontFamily: fonts.medium,
        fontSize: fontSize.sm,
        color: colors.danger,
    },
    emptyWrap: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
        paddingHorizontal: spacing.lg,
        gap: spacing.sm,
    },
    emptyTitle: {
        fontFamily: fonts.bold,
        fontSize: fontSize.lg,
        color: colors.text,
        textAlign: 'center',
    },
    emptyText: {
        fontFamily: fonts.regular,
        fontSize: fontSize.md,
        color: colors.textMuted,
        textAlign: 'center',
        lineHeight: 22,
    },
    emptyCta: {
        marginTop: spacing.sm,
        backgroundColor: colors.accent,
        borderRadius: radius.lg,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
    },
    emptyCtaText: {
        fontFamily: fonts.bold,
        fontSize: fontSize.md,
        color: '#0d2e22',
    },
});
