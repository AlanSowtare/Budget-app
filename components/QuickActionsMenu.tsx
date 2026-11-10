import React, {useMemo} from 'react';
import { Modal, Pressable, Text, TouchableOpacity } from 'react-native';
import { fonts, radius, spacing, fontSize } from '@/constants/theme';
import {useTheme} from '@/hooks/useTheme';

interface QuickActionsMenuProps {
    visible: boolean;
    onClose: () => void;
    onOpenBudgets: () => void;
    onOpenSubscriptions: () => void;
    onOpenAppearance: () => void;
}

export default function QuickActionsMenu({
    visible,
    onClose,
    onOpenBudgets,
    onOpenSubscriptions,
    onOpenAppearance,
}: QuickActionsMenuProps) {
    const {colors} = useTheme();
    const itemBase = useMemo(() => ({
        paddingVertical: spacing.sm + 2,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
    }), []);
    const labelStyle = useMemo(() => ({
        color: colors.text,
        fontFamily: fonts.medium,
        fontSize: fontSize.md,
    }), [colors]);
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <Pressable
                onPress={onClose}
                style={{
                    flex: 1,
                    backgroundColor: colors.overlay,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end',
                    paddingTop: 90,
                    paddingHorizontal: spacing.md,
                }}
            >
                <Pressable
                    style={{
                        width: 230,
                        backgroundColor: colors.surface,
                        borderRadius: radius.lg,
                        borderWidth: 1,
                        borderColor: colors.border,
                        padding: spacing.sm,
                        gap: 2,
                    }}
                >
                    <TouchableOpacity
                        style={itemBase}
                        onPress={() => {
                            onClose();
                            onOpenBudgets();
                        }}
                    >
                        <Text style={labelStyle}>Mes budgets</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={itemBase}
                        onPress={() => {
                            onClose();
                            onOpenSubscriptions();
                        }}
                    >
                        <Text style={labelStyle}>Prélèvements</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={itemBase}
                        onPress={() => {
                            onClose();
                            onOpenAppearance();
                        }}
                    >
                        <Text style={labelStyle}>Apparence</Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
}
