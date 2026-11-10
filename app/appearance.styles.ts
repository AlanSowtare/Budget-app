import {StyleSheet} from 'react-native';
import {ThemeColors, fontSize, fonts, radius, spacing} from '@/constants/theme';

export const makeStyles = (colors: ThemeColors) => StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
    },
    backBtn: {
        color: colors.textMuted,
        fontFamily: fonts.medium,
        fontSize: fontSize.md,
    },
    title: {
        color: colors.text,
        fontFamily: fonts.extraBold,
        fontSize: fontSize.xl,
    },
    headerSpacer: {
        width: 58,
    },
    options: {
        paddingHorizontal: spacing.md,
        gap: spacing.sm,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.lg,
        padding: spacing.md,
    },
    optionSelected: {
        borderColor: colors.accent,
    },
    optionContent: {
        flex: 1,
        gap: spacing.xs,
    },
    optionLabel: {
        color: colors.text,
        fontFamily: fonts.bold,
        fontSize: fontSize.md,
    },
    optionDescription: {
        color: colors.textMuted,
        fontFamily: fonts.regular,
        fontSize: fontSize.xs,
    },
    preview: {
        flexDirection: 'row',
        gap: spacing.xs,
    },
    previewDot: {
        width: spacing.md,
        height: spacing.md,
        borderRadius: radius.full,
        borderWidth: 1,
        borderColor: colors.borderStrong,
    },
    radio: {
        width: spacing.md,
        height: spacing.md,
        borderRadius: radius.full,
        borderWidth: 1,
        borderColor: colors.textMuted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        borderColor: colors.accent,
    },
    radioCheck: {
        width: spacing.sm,
        height: spacing.sm,
        borderRadius: radius.full,
        backgroundColor: colors.accent,
    },
});
