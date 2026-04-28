import { StyleSheet } from 'react-native';
import { colors, fontSize, fonts, radius, spacing } from '@/constants/theme';
export const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    handle: {
        width: 44,
        height: 4,
        borderRadius: radius.full,
        backgroundColor: colors.surface3,
        alignSelf: 'center',
        marginTop: spacing.sm,
        marginBottom: spacing.md,
    },
    content: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xl,
        gap: spacing.md,
    },
    title: {
        color: colors.text,
        fontFamily: fonts.extraBold,
        fontSize: 24,
        letterSpacing: -0.4,
    },
    subtitle: {
        color: colors.textMuted,
        fontFamily: fonts.regular,
        fontSize: fontSize.md,
        lineHeight: 22,
    },
    field: {
        gap: spacing.sm,
    },
    label: {
        color: colors.textMuted,
        fontFamily: fonts.medium,
        fontSize: fontSize.sm,
        textTransform: 'uppercase',
        letterSpacing: 0.7,
    },
    amountDisplay: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    currency: {
        color: colors.textSoft,
        fontFamily: fonts.bold,
        fontSize: fontSize.xl,
    },
    amountInput: {
        flex: 1,
        color: colors.text,
        fontFamily: fonts.extraBold,
        fontSize: 34,
        letterSpacing: -0.3,
        paddingVertical: spacing.xs,
    },
    row: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    button: {
        marginTop: spacing.sm,
        backgroundColor: colors.accent,
        borderRadius: radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.sm + 3,
    },
    buttonDisabled: {
        opacity: 0.45,
    },
    buttonText: {
        color: '#0b0d12',
        fontFamily: fonts.bold,
        fontSize: fontSize.md,
    },
    cancelBtn: {
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    cancelText: {
        color: colors.textSoft,
        fontFamily: fonts.medium,
        fontSize: fontSize.md,
    },
});
