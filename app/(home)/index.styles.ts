import { StyleSheet } from 'react-native';
import {ThemeColors, spacing, radius, fontSize, fonts} from '@/constants/theme';

export const makeStyles = (colors: ThemeColors) => StyleSheet.create({

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
        fontFamily: fonts.bold,
        fontSize: fontSize.md,
        color: colors.textSoft,
        marginBottom: 2,
    },
    monthHeading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    monthTitle: {
        fontFamily: fonts.extraBold,
        fontSize: 26,
        color: colors.text,
        letterSpacing: -0.5,
    },
    pastMonthBadge: {
        backgroundColor: colors.surface2,
        borderRadius: radius.full,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
    },
    pastMonthBadgeText: {
        fontFamily: fonts.medium,
        fontSize: fontSize.xs,
        color: colors.textSoft,
    },
    createMonthBanner: {
        marginHorizontal: spacing.md,
        marginTop: spacing.sm,
        padding: spacing.md,
        borderRadius: radius.lg,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.sm,
    },
    createMonthText: {
        flex: 1,
        fontFamily: fonts.medium,
        fontSize: fontSize.sm,
        color: colors.textSoft,
    },
    createMonthButton: {
        backgroundColor: colors.accentDim,
        borderRadius: radius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    createMonthButtonText: {
        fontFamily: fonts.bold,
        fontSize: fontSize.sm,
        color: colors.accent,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.surface2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.surface2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    menuBtnText: {
        color: colors.text,
        fontFamily: fonts.bold,
        fontSize: 18,
        lineHeight: 20,
    },

    // ── BUDGET CARD ──
    budgetCard: {
        margin: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: radius.xl,
        padding: spacing.xl,
        borderWidth: 1,
        borderColor: colors.borderStrong,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.22,
        shadowRadius: 20,
        elevation: 8,
    },
    budgetTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    budgetLabel: {
        fontFamily: fonts.bold,
        fontSize: fontSize.sm,
        color: colors.text,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: spacing.xs,
    },
    budgetAmount: {
        fontFamily: fonts.extraBold,
        fontSize: fontSize.display,
        color: colors.text,
        letterSpacing: -0.6,
        lineHeight: 48,
    },
    currentBalance: {
        marginTop: spacing.xs,
        marginBottom: spacing.sm,
    },
    currentBalanceLabel: {
        fontFamily: fonts.medium,
        fontSize: fontSize.md,
        color: colors.textSoft,
    },
    currentBalanceValue: {
        fontFamily: fonts.bold,
        fontSize: fontSize.md,
        color: colors.text,
    },
    nextSubscriptionText: {
        fontFamily: fonts.regular,
        fontSize: fontSize.sm,
        color: colors.textMuted,
        marginTop: spacing.md,
    },
    budgetCurrency: {
        fontFamily: fonts.bold,
        fontSize: 20,
        color: colors.textSoft,
    },
    budgetSub: {
        fontFamily: fonts.regular,
        fontSize: fontSize.md,
        color: colors.textMuted,
        marginBottom: spacing.xl,
        lineHeight: 24,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: radius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBadgeText: {
        fontFamily: fonts.medium,
        fontSize: fontSize.xs,
        letterSpacing: 0.2,
    },
    budgetRemaining: {
        color: colors.accent,
        fontFamily: fonts.medium,
    },

    // ── PROGRESS ──
    progressWrap: {
        marginBottom: spacing.lg,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    progressLabel: {
        fontFamily: fonts.regular,
        fontSize: fontSize.sm,
        color: colors.textMuted,
    },
    progressValue: {
        fontFamily: fonts.medium,
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
        backgroundColor: colors.surfaceRaised,
        borderRadius: radius.lg,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
    },
    statLabel: {
        fontFamily: fonts.regular,
        fontSize: fontSize.xs,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    statValue: {
        fontFamily: fonts.bold,
        fontSize: fontSize.xl,
        color: colors.text,
    },
    statValueDanger: {
        color: colors.danger,
    },
    statValueEmphasis: {
        fontFamily: fonts.extraBold,
    },

    // ── SECTION TITLE ──
    sectionTitle: {
        fontFamily: fonts.bold,
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
        borderRadius: radius.xl,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
        gap: 4,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.14,
        shadowRadius: 16,
        elevation: 5,
    },
    catTileBorder: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 3,
        opacity: 0.95,
    },
    catPercentBadge: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
        borderRadius: radius.full,
        paddingHorizontal: 10,
        paddingVertical: 4,
        zIndex: 2,
    },
    catPercentBadgeText: {
        fontFamily: fonts.medium,
        fontSize: fontSize.xs,
        letterSpacing: 0.2,
    },
    catIcon: {
        width: 42,
        height: 42,
        borderRadius: radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    catEmoji: {
        fontSize: 19,
    },
    catName: {
        fontFamily: fonts.bold,
        fontSize: fontSize.md,
        color: colors.text,
        lineHeight: 20,
    },
    catCount: {
        fontFamily: fonts.regular,
        fontSize: fontSize.xs,
        color: colors.textMuted,
        marginBottom: spacing.sm,
    },
    catSpent: {
        fontFamily: fonts.extraBold,
        fontSize: fontSize.xl,
        color: colors.text,
        letterSpacing: -0.2,
    },
    catSpentOver: {
        color: colors.danger,
    },
    catBudget: {
        fontFamily: fonts.regular,
        fontSize: fontSize.xs,
        color: colors.textMuted,
        marginBottom: spacing.sm,
        lineHeight: 18,
    },
    catProgressTrack: {
        height: 4,
        backgroundColor: colors.surfaceRaisedStrong,
        borderRadius: radius.full,
        overflow: 'hidden',
        marginTop: spacing.xs,
    },
    catProgressFill: {
        height: '100%',
        borderRadius: radius.full,
    },
    overBadge: {
        marginTop: spacing.sm,
        backgroundColor: colors.dangerDim,
        borderRadius: radius.full,
        paddingHorizontal: 10,
        paddingVertical: 4,
        alignSelf: 'flex-start',
    },
    overBadgeText: {
        fontFamily: fonts.medium,
        fontSize: fontSize.xs,
        color: colors.danger,
        letterSpacing: 0.2,
    },

    // ── EMPTY STATE ──
    emptyWrap: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
        paddingHorizontal: spacing.lg,
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
        fontFamily: fonts.medium,
        fontSize: fontSize.md,
        color: colors.textMuted,
    },

    editHint: {
        fontFamily: fonts.regular,
        fontSize: fontSize.xs,
        color: colors.textMuted,
        textAlign: 'center',
        marginTop: spacing.md,
        opacity: 0.6,
    },
});