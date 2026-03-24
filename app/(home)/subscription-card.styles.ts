import {StyleSheet} from 'react-native';
import {colors, fontSize, radius, spacing} from '@/constants/theme';

export const subscriptionCardStyles = StyleSheet.create({
    card: {
        marginHorizontal: spacing.md,
        marginBottom: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: radius.xl,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
        gap: spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: spacing.md,
    },
    eyebrow: {
        fontFamily: 'PlusJakartaSans-Medium',
        fontSize: fontSize.xs,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 2,
    },
    title: {
        fontFamily: 'PlusJakartaSans-Bold',
        fontSize: fontSize.xl,
        color: colors.text,
        flexShrink: 1,
    },
    link: {
        fontFamily: 'PlusJakartaSans-Medium',
        fontSize: fontSize.sm,
        color: colors.accent,
        marginTop: 2,
    },
    highlightValue: {
        fontFamily: 'PlusJakartaSans-ExtraBold',
        fontSize: fontSize.display,
        color: colors.text,
        letterSpacing: -0.4,
        lineHeight: 46,
    },
    helperText: {
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: fontSize.sm,
        color: colors.textMuted,
        lineHeight: 20,
        maxWidth: '92%',
    },
    addBtn: {
        backgroundColor: colors.accentDim,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    addBtnText: {
        fontFamily: 'PlusJakartaSans-Medium',
        fontSize: fontSize.md,
        color: colors.accent,
    },
});
