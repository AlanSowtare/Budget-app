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
        fontFamily: 'DMSans-Medium',
        fontSize: fontSize.xs,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 2,
    },
    title: {
        fontFamily: 'Syne-Bold',
        fontSize: fontSize.xl,
        color: colors.text,
        flexShrink: 1,
    },
    link: {
        fontFamily: 'DMSans-Medium',
        fontSize: fontSize.sm,
        color: colors.accent,
        marginTop: 2,
    },
    highlightValue: {
        fontFamily: 'Syne-ExtraBold',
        fontSize: fontSize.display,
        color: colors.text,
        letterSpacing: -0.8,
        lineHeight: 46,
    },
    helperText: {
        fontFamily: 'DMSans-Regular',
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
        fontFamily: 'DMSans-Medium',
        fontSize: fontSize.md,
        color: colors.accent,
    },
});
