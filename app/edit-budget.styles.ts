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

    content: {
        padding: spacing.xl,
        gap: spacing.xl,
    },

    title: {
        fontFamily: fonts.extraBold,
        fontSize: fontSize.xxl,
        color: colors.text,
    },

    subtitle: {
        fontFamily: fonts.regular,
        fontSize: fontSize.md,
        color: colors.textMuted,
        lineHeight: 22,
        marginTop: -spacing.md,
    },

    currentLabel: {
        fontFamily: fonts.regular,
        fontSize: fontSize.sm,
        color: colors.textMuted,
        backgroundColor: colors.surface,
        borderRadius: radius.xl,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
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
        fontFamily: fonts.extraBold,
        fontSize: fontSize.lg,
        color: '#0d2e22',
    },

});