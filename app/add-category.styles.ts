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
        marginBottom: spacing.sm,
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

    input: {
        flex: 1,
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

    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        paddingHorizontal: spacing.md,
    },

    currency: {
        fontFamily: fonts.extraBold,
        fontSize: fontSize.xl,
        color: colors.textMuted,
        marginRight: spacing.sm,
    },

    helperText: {
        fontFamily: fonts.regular,
        fontSize: fontSize.sm,
        color: colors.textMuted,
        lineHeight: 20,
        marginTop: -spacing.xs,
    },

    // Grille emoji — 8 par ligne
    emojiGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap', // retour à la ligne automatique
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

    // Sélecteur couleur
    colorRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },

    colorBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },

    colorBtnSelected: {
        borderWidth: 3,
        borderColor: colors.text,
    },

    colorCheck: {
        color: colors.text,
        fontFamily: fonts.bold,
        fontSize: fontSize.sm,
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