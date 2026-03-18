import { StyleSheet } from 'react-native';
import { colors, spacing, radius, fontSize } from '../constants/theme';

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
        marginBottom: spacing.sm,
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

    input: {
        flex: 1,
        fontFamily: 'PlusJakartaSans-Bold',
        fontSize: fontSize.lg,
        color: colors.text,
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
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
        fontFamily: 'PlusJakartaSans-Bold',
        fontSize: fontSize.xl,
        color: colors.textMuted,
        marginRight: spacing.sm,
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
        borderColor: colors.border,
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
        fontFamily: 'PlusJakartaSans-Bold',
        fontSize: fontSize.sm,
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