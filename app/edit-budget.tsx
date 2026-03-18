import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useBudgetStore } from '@/store/budgetStore';
import { colors } from '@/constants/theme';
import { MONTHS } from '@/constants/months';
import {styles} from "@/app/edit-budget.styles";

export default function EditBudget() {

    const router = useRouter();
    const budgets = useBudgetStore(state => state.budgets);
    const activeBudgetId = useBudgetStore(state => state.activeBudgetId);
    const updateBudgetAmount = useBudgetStore(state => state.updateBudgetAmount);

    const budget = budgets.find(b => b.id === activeBudgetId) ?? null;

    const [amount, setAmount] = useState(String(budget?.totalAmount ?? ''));

    const isValid = () => {
        const amountNum = parseFloat(amount);
        return !isNaN(amountNum) && amountNum > 0;
    };

    const handleSave = () => {
        if (!isValid() || !budget) return;
        updateBudgetAmount(budget.id, parseFloat(amount));
        router.back();
    };

    return (
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.handle} />

            <View style={styles.content}>
                <Text style={styles.title}>Modifier le budget</Text>
                <Text style={styles.subtitle}>
                    {MONTHS[(budget?.month ?? 1) - 1]} {budget?.year}
                </Text>

                {/* Montant actuel en petit */}
                <Text style={styles.currentLabel}>
                    Budget actuel : {budget?.totalAmount} €
                </Text>

                {/* Champ montant */}
                <View style={styles.field}>
                    <Text style={styles.label}>Nouveau montant</Text>
                    <View style={styles.amountDisplay}>
                        <Text style={styles.currency}>€</Text>
                        <TextInput
                            style={styles.amountInput}
                            placeholder="0"
                            placeholderTextColor={colors.textMuted}
                            keyboardType="decimal-pad"
                            value={amount}
                            onChangeText={setAmount}
                            autoFocus
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.button, !isValid() && styles.buttonDisabled]}
                    onPress={handleSave}
                    disabled={!isValid()}
                >
                    <Text style={styles.buttonText}>Enregistrer</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}