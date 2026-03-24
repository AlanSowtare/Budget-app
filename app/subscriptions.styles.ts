import {StyleSheet} from 'react-native';
import {colors, fontSize, radius, spacing} from '@/constants/theme';

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
        fontFamily: 'DMSans-Medium',
        fontSize: fontSize.md,
        color: colors.textMuted,
    },
    addBtn: {
        fontFamily: 'Syne-Bold',
        fontSize: fontSize.md,
        color: colors.accent,
    },
    hero: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
        gap: spacing.xs,
    },
    title: {
        fontFamily: 'Syne-ExtraBold',
        fontSize: fontSize.xxl,
        color: colors.text,
    },
    subtitle: {
        fontFamily: 'DMSans-Regular',
        fontSize: fontSize.md,
        color: colors.textMuted,
        lineHeight: 22,
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
        fontFamily: 'Syne-ExtraBold',
        fontSize: fontSize.xl,
        color: colors.text,
    },
    dayLabel: {
        fontFamily: 'DMSans-Regular',
        fontSize: fontSize.xs,
        color: colors.textMuted,
        textTransform: 'uppercase',
    },
    info: {
        flex: 1,
        gap: 2,
    },
    label: {
        fontFamily: 'Syne-Bold',
        fontSize: fontSize.lg,
        color: colors.text,
    },
    caption: {
        fontFamily: 'DMSans-Regular',
        fontSize: fontSize.sm,
        color: colors.textMuted,
        lineHeight: 20,
    },
    amountWrap: {
        backgroundColor: colors.accentDim,
        borderRadius: radius.md,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
    },
    amount: {
        fontFamily: 'Syne-Bold',
        fontSize: fontSize.md,
        color: colors.accent,
    },
    actionsRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    actionBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.md,
        paddingVertical: spacing.sm,
        borderWidth: 1,
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
        fontFamily: 'DMSans-Medium',
        fontSize: fontSize.sm,
        color: colors.text,
    },
    deleteBtn: {
        backgroundColor: colors.dangerDim,
        borderColor: 'transparent',
    },
    deleteText: {
        fontFamily: 'DMSans-Medium',
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
        fontFamily: 'Syne-Bold',
        fontSize: fontSize.lg,
        color: colors.text,
        textAlign: 'center',
    },
    emptyText: {
        fontFamily: 'DMSans-Regular',
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
        fontFamily: 'Syne-Bold',
        fontSize: fontSize.md,
        color: '#0d2e22',
    },
});

