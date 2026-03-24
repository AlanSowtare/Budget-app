import {StyleSheet} from 'react-native';
import {colors, spacing, radius, fontSize} from '@/constants/theme';

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
        padding: spacing.lg,
        gap: spacing.lg,
    },
    title: {
        fontFamily: 'PlusJakartaSans-ExtraBold',
        fontSize: fontSize.xxl,
        color: colors.text,
    },
    subtitle: {
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: fontSize.md,
        color: colors.textMuted,
        lineHeight: 22,
        marginTop: spacing.xs,
    },
    field: {
        gap: spacing.xs,
    },
    label: {
        fontFamily: 'PlusJakartaSans-Medium',
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
        fontFamily: 'PlusJakartaSans-ExtraBold',
        fontSize: 36,
        color: colors.textMuted,
        marginRight: spacing.sm,
    },
    amountInput: {
        flex: 1,
        fontFamily: 'PlusJakartaSans-ExtraBold',
        fontSize: 48,
        color: colors.text,
        letterSpacing: -1,
    },
    input: {
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: fontSize.lg,
        color: colors.text,
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
    },
    tipCard: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.md,
        gap: spacing.xs,
    },
    tipTitle: {
        fontFamily: 'PlusJakartaSans-Bold',
        fontSize: fontSize.md,
        color: colors.text,
    },
    tipText: {
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: fontSize.sm,
        color: colors.textMuted,
        lineHeight: 20,
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
        fontFamily: 'PlusJakartaSans-ExtraBold',
        fontSize: fontSize.lg,
        color: '#0d2e22',
    },
});

