import { StyleSheet } from 'react-native';
import { colors, spacing, radius, fontSize, fonts } from '@/constants/theme';

export const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: colors.bg,
    },

    scroll: {
        flexGrow: 1,
        padding: spacing.lg,
        justifyContent: 'center',
    },

    header: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },

    emoji: {
        fontSize: 56,
        marginBottom: spacing.md,
    },

    title: {
        fontFamily: fonts.extraBold,
        fontSize: 32,
        color: colors.text,
        letterSpacing: -0.5,
        marginBottom: spacing.sm,
    },

    subtitle: {
        fontFamily: fonts.regular,
        fontSize: fontSize.md,
        color: colors.textMuted,
        textAlign: 'center',
        lineHeight: 22,
    },

    form: {
        gap: spacing.md,
        marginBottom: spacing.xl,
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

    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: spacing.md,
    },

    currency: {
        fontFamily: fonts.bold,
        fontSize: fontSize.xl,
        color: colors.textMuted,
        marginRight: spacing.sm,
    },

    input: {
        flex: 1,
        fontFamily: fonts.bold,
        fontSize: fontSize.xl,
        color: colors.text,
        paddingVertical: spacing.md,
    },

    row: {
        flexDirection: 'row',
        gap: spacing.md,
    },

    flex1: {
        flex: 1,
    },

    button: {
        backgroundColor: colors.accent,
        borderRadius: radius.lg,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        alignSelf: 'center',
    },

    buttonDisabled: {
        opacity: 0.4,
    },

    buttonText: {
        fontFamily: fonts.extraBold,
        fontSize: fontSize.lg,
        color: colors.bg,
    },

});