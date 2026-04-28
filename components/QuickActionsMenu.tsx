import React from 'react';
import { Modal, Pressable, Text, TouchableOpacity } from 'react-native';
import { colors, fonts, radius, spacing, fontSize } from '@/constants/theme';

interface QuickActionsMenuProps {
    visible: boolean;
    onClose: () => void;
    onOpenBudgets: () => void;
    onOpenSubscriptions: () => void;
    onOpenCurrentBudget: () => void;
}

const itemBase = {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
};

const labelStyle = {
    color: colors.text,
    fontFamily: fonts.medium,
    fontSize: fontSize.md,
};

export default function QuickActionsMenu({
    visible,
    onClose,
    onOpenBudgets,
    onOpenSubscriptions,
    onOpenCurrentBudget,
}: QuickActionsMenuProps) {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <Pressable
                onPress={onClose}
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.45)',
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
                            onOpenCurrentBudget();
                        }}
                    >
                        <Text style={labelStyle}>Budget du mois</Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

