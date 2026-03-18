import { StyleSheet } from 'react-native';
import { colors, spacing, radius, fontSize } from '@/constants/theme';

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
        padding: spacing.lg,
        gap: spacing.lg,
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
        marginTop: -spacing.sm,
    },

    currentLabel: {
        fontFamily: 'DMSans-Regular',
        fontSize: fontSize.sm,
        color: colors.textMuted,
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
    },

    field: {
        gap: spacing.xs,
    },

    label: {
        fontFamily: 'DMSans-Medium',
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
        borderColor: colors.border,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },

    currency: {
        fontFamily: 'Syne-ExtraBold',
        fontSize: 36,
        color: colors.textMuted,
        marginRight: spacing.sm,
    },

    amountInput: {
        flex: 1,
        fontFamily: 'Syne-ExtraBold',
        fontSize: 48,
        color: colors.text,
        letterSpacing: -1,
    },

    button: {
        backgroundColor: colors.accent,
        borderRadius: radius.lg,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: spacing.sm,
    },

    buttonDisabled: {
        opacity: 0.4,
    },

    buttonText: {
        fontFamily: 'Syne-ExtraBold',
        fontSize: fontSize.lg,
        color: '#0d2e22',
    },

});