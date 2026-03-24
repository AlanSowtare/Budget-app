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
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: fontSize.sm,
        color: colors.textMuted,
        marginBottom: 2,
    },
    monthTitle: {
        fontFamily: 'PlusJakartaSans-ExtraBold',
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
        padding: spacing.xl,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        shadowColor: '#000',
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
        fontFamily: 'PlusJakartaSans-Medium',
        fontSize: fontSize.xs,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: spacing.xs,
    },
    budgetAmount: {
        fontFamily: 'PlusJakartaSans-ExtraBold',
        fontSize: fontSize.display,
        color: colors.text,
        letterSpacing: -0.6,
        lineHeight: 48,
    },
    budgetCurrency: {
        fontFamily: 'PlusJakartaSans-Bold',
        fontSize: 20,
        color: colors.textSoft,
    },
    budgetSub: {
        fontFamily: 'PlusJakartaSans-Regular',
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
        fontFamily: 'PlusJakartaSans-Medium',
        fontSize: fontSize.xs,
        letterSpacing: 0.2,
    },
    budgetRemaining: {
        color: colors.accent,
        fontFamily: 'PlusJakartaSans-Medium',
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
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: fontSize.sm,
        color: colors.textMuted,
    },
    progressValue: {
        fontFamily: 'PlusJakartaSans-Medium',
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
        backgroundColor: '#202535',
        borderRadius: radius.lg,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    statLabel: {
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: fontSize.xs,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    statValue: {
        fontFamily: 'PlusJakartaSans-Bold',
        fontSize: fontSize.xl,
        color: colors.text,
    },
    statValueDanger: {
        color: colors.danger,
    },
    statValueEmphasis: {
        fontFamily: 'PlusJakartaSans-ExtraBold',
    },

    // ── SECTION TITLE ──
    sectionTitle: {
        fontFamily: 'PlusJakartaSans-Bold',
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
        borderColor: 'rgba(255,255,255,0.06)',
        overflow: 'hidden',
        gap: 4,
        shadowColor: '#000',
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
        fontFamily: 'PlusJakartaSans-Bold',
        fontSize: fontSize.md,
        color: colors.text,
        lineHeight: 20,
    },
    catCount: {
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: fontSize.xs,
        color: colors.textMuted,
        marginBottom: spacing.sm,
    },
    catSpent: {
        fontFamily: 'PlusJakartaSans-ExtraBold',
        fontSize: fontSize.xl,
        color: colors.text,
        letterSpacing: -0.2,
    },
    catSpentOver: {
        color: colors.danger,
    },
    catBudget: {
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: fontSize.xs,
        color: colors.textMuted,
        marginBottom: spacing.sm,
        lineHeight: 18,
    },
    catProgressTrack: {
        height: 4,
        backgroundColor: '#232838',
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
        fontFamily: 'PlusJakartaSans-Medium',
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
        fontFamily: 'PlusJakartaSans-Bold',
        fontSize: fontSize.lg,
        color: colors.textMuted,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    emptySubText: {
        fontFamily: 'PlusJakartaSans-Regular',
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
        fontFamily: 'PlusJakartaSans-Medium',
        fontSize: fontSize.md,
        color: colors.textMuted,
    },

    editHint: {
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: fontSize.xs,
        color: colors.textMuted,
        textAlign: 'center',
        marginTop: spacing.md,
        opacity: 0.6,
    },
});