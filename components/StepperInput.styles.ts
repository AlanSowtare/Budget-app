import { StyleSheet } from 'react-native';
import { colors, spacing, radius, fontSize } from '../constants/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacing.xs,
    },
    label: {
        fontFamily: 'DMSans-Medium',
        fontSize: fontSize.sm,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    btn: {
        padding: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
    },
    btnDisabled: {
        opacity: 0.3,
    },
    btnText: {
        fontFamily: 'Syne-Bold',
        fontSize: 22,
        color: colors.accent,
        lineHeight: 24,
    },
    valueWrap: {
        flex: 1,
        alignItems: 'center',
    },
    value: {
        fontFamily: 'Syne-Bold',
        fontSize: fontSize.xl,
        color: colors.text,
    },
});