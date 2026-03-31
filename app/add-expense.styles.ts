import { StyleSheet } from 'react-native';
import { colors, spacing, radius, fontSize, fonts } from '@/constants/theme';

export const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: colors.bg,
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
    },

    handle: {
        width: 36,
        height: 4,
        backgroundColor: colors.surface3,
        borderRadius: radius.full,
        alignSelf: 'center',
        marginTop: spacing.md,
        marginBottom: spacing.sm,
    },

    scroll: {
        padding: spacing.xl,
        gap: spacing.xl,
    },

    title: {
        fontFamily: fonts.extraBold,
        fontSize: fontSize.xxl,
        color: colors.text,
        letterSpacing: -0.4,
    },
    subtitle: {
        fontFamily: fonts.regular,
        fontSize: fontSize.md,
        color: colors.textMuted,
        lineHeight: 22,
        marginTop: -spacing.md,
    },

    sectionCard: {
        backgroundColor: colors.surface,
        borderRadius: radius.xl,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        gap: spacing.lg,
    },

    field: {
        gap: spacing.xs,
    },

    label: {
        fontFamily: fonts.medium,
        fontSize: fontSize.sm,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },

    // Grand affichage du montant
    amountDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    currency: {
        fontFamily: fonts.bold,
        fontSize: 36,
        color: colors.textMuted,
        marginRight: spacing.sm,
        fontVariant: ['tabular-nums'],
    },
    amountInput: {
        flex: 1,
        fontFamily: fonts.extraBold,
        fontSize: 48,
        color: colors.text,
        letterSpacing: -1,
        fontVariant: ['tabular-nums'],
    },

    input: {
        fontFamily: fonts.regular,
        fontSize: fontSize.lg,
        color: colors.text,
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
    },

    helperText: {
        fontFamily: fonts.regular,
        fontSize: fontSize.sm,
        color: colors.textMuted,
        lineHeight: 20,
        marginTop: -spacing.xs,
    },

    emojiGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },

    emojiBtn: {
        width: 44,
        height: 44,
        borderRadius: radius.sm,
        backgroundColor: colors.surface,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.08)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    emojiBtnSelected: {
        borderColor: colors.accent,
        backgroundColor: colors.accentDim,
    },

    emojiText: {
        fontSize: 20,
    },

    button: {
        backgroundColor: colors.accent,
        borderRadius: radius.lg,
        minHeight: 52,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        alignSelf: 'stretch',
        marginTop: spacing.sm,
        justifyContent: 'center',
    },

    buttonDisabled: {
        opacity: 0.4,
    },

    buttonText: {
        fontFamily: fonts.bold,
        fontSize: fontSize.lg,
        color: '#0d2e22',
    },

});