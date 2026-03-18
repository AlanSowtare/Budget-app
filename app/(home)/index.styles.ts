import { StyleSheet } from 'react-native';
import { colors, spacing, radius, fontSize } from '@/constants/theme';

export const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: colors.bg,
    },

    // ── HEADER ──
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.sm,
    },
    greeting: {
        fontFamily: 'DMSans-Regular',
        fontSize: fontSize.sm,
        color: colors.textMuted,
        marginBottom: 2,
    },
    monthTitle: {
        fontFamily: 'Syne-ExtraBold',
        fontSize: 26,
        color: colors.text,
        letterSpacing: -0.5,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.surface2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // ── BUDGET CARD ──
    budgetCard: {
        margin: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: radius.xl,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
    },
    budgetLabel: {
        fontFamily: 'DMSans-Medium',
        fontSize: fontSize.xs,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: spacing.xs,
    },
    budgetAmount: {
        fontFamily: 'Syne-ExtraBold',
        fontSize: fontSize.display,
        color: colors.text,
        letterSpacing: -1,  // ← si cette valeur est trop négative, ça compresse
        lineHeight: 48,
    },
    budgetCurrency: {
        fontSize: 22,
        color: colors.textMuted,
    },
    budgetSub: {
        fontFamily: 'DMSans-Regular',
        fontSize: fontSize.md,
        color: colors.textMuted,
        marginBottom: spacing.lg,
    },
    budgetRemaining: {
        color: colors.accent,
        fontFamily: 'DMSans-Medium',
    },

    // ── PROGRESS ──
    progressWrap: {
        marginBottom: spacing.md,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    progressLabel: {
        fontFamily: 'DMSans-Regular',
        fontSize: fontSize.sm,
        color: colors.textMuted,
    },
    progressValue: {
        fontFamily: 'DMSans-Medium',
        fontSize: fontSize.sm,
        color: colors.textSoft,
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

    // ── STATS ──
    statsRow: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginTop: spacing.md,
    },
    statBox: {
        flex: 1,
        backgroundColor: colors.surface2,
        borderRadius: radius.md,
        padding: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
    },
    statLabel: {
        fontFamily: 'DMSans-Regular',
        fontSize: fontSize.xs,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    statValue: {
        fontFamily: 'Syne-Bold',
        fontSize: fontSize.xl,
        color: colors.text,
    },

    // ── SECTION TITLE ──
    sectionTitle: {
        fontFamily: 'Syne-Bold',
        fontSize: fontSize.sm,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        paddingHorizontal: spacing.md,
        marginBottom: spacing.sm,
    },

    // ── CATEGORY TILES ──
    listContent: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.xl,
    },
    columnWrapper: {
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    catTile: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
        gap: 3,
    },
    catTileBorder: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 2,
    },
    catIcon: {
        width: 38,
        height: 38,
        borderRadius: radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xs,
    },
    catEmoji: {
        fontSize: 18,
    },
    catName: {
        fontFamily: 'Syne-Bold',
        fontSize: fontSize.md,
        color: colors.text,
    },
    catCount: {
        fontFamily: 'DMSans-Regular',
        fontSize: fontSize.xs,
        color: colors.textMuted,
        marginBottom: spacing.xs,
    },
    catSpent: {
        fontFamily: 'Syne-ExtraBold',
        fontSize: fontSize.xl,
        color: colors.text,
    },
    catSpentOver: {
        color: colors.danger,
    },
    catBudget: {
        fontFamily: 'DMSans-Regular',
        fontSize: fontSize.xs,
        color: colors.textMuted,
        marginBottom: spacing.xs,
    },
    catProgressTrack: {
        height: 3,
        backgroundColor: colors.surface3,
        borderRadius: radius.full,
        overflow: 'hidden',
        marginTop: spacing.xs,
    },
    catProgressFill: {
        height: '100%',
        borderRadius: radius.full,
    },
    overBadge: {
        marginTop: spacing.xs,
        backgroundColor: colors.dangerDim,
        borderRadius: radius.full,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        alignSelf: 'flex-start',
    },
    overBadgeText: {
        fontFamily: 'DMSans-Medium',
        fontSize: fontSize.xs,
        color: colors.danger,
    },

    // ── EMPTY STATE ──
    emptyWrap: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
        paddingHorizontal: spacing.lg,
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

    // ── ADD CATEGORY BUTTON ──
    addCatBtn: {
        margin: spacing.md,
        padding: spacing.md,
        borderRadius: radius.lg,
        borderWidth: 1.5,
        borderColor: colors.border,
        borderStyle: 'dashed',
        alignItems: 'center',
    },
    addCatBtnText: {
        fontFamily: 'DMSans-Medium',
        fontSize: fontSize.md,
        color: colors.textMuted,
    },

    editHint: {
        fontFamily: 'DMSans-Regular',
        fontSize: fontSize.xs,
        color: colors.textMuted,
        textAlign: 'center',
        marginTop: spacing.md,
        opacity: 0.6,
    },
});