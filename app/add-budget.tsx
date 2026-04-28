import React, { useMemo, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useBudgetStore } from '@/store/budgetStore';
import { colors } from '@/constants/theme';
import { MONTHS } from '@/constants/months';
import StepperInput from '@/components/StepperInput';
import { styles } from './add-budget.styles';
export default function AddBudgetScreen() {
    const router = useRouter();
    const budgets = useBudgetStore(state => state.budgets);
    const createBudget = useBudgetStore(state => state.createBudget);
    const setActiveBudget = useBudgetStore(state => state.setActiveBudget);
    const now = useMemo(() => new Date(), []);
    const [amount, setAmount] = useState('');
    const [month, setMonth] = useState(now.getMonth() + 1);
    const [year, setYear] = useState(now.getFullYear());
    const parsedAmount = Number.parseFloat(amount.replace(',', '.'));
    const isValid = Number.isFinite(parsedAmount) && parsedAmount > 0;
    const handleSubmit = () => {
        if (!isValid) return;
        const existingBudget = budgets.find(budget => budget.month === month && budget.year === year);
        if (existingBudget) {
            Alert.alert(
                'Budget deja existant',
                `Un budget existe deja pour ${MONTHS[month - 1]} ${year}.`,
                [
                    { text: 'Annuler', style: 'cancel' },
                    {
                        text: 'Ouvrir',
                        onPress: () => {
                            setActiveBudget(existingBudget.id);
                            router.dismissTo('/(home)' as any);
                        },
                    },
                ],
            );
            return;
        }
        createBudget(month, year, parsedAmount);
        router.back();
    };
    return (
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.handle} />
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
                <Text style={styles.title}>Nouveau budget</Text>
                <Text style={styles.subtitle}>
                    Cree une nouvelle enveloppe mensuelle sans quitter ton flux.
                </Text>
                <View style={styles.field}>
                    <Text style={styles.label}>Montant total</Text>
                    <View style={styles.amountDisplay}>
                        <Text style={styles.currency}>€</Text>
                        <TextInput
                            style={styles.amountInput}
                            keyboardType="decimal-pad"
                            placeholder="0"
                            placeholderTextColor={colors.textMuted}
                            value={amount}
                            onChangeText={setAmount}
                            autoFocus
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <StepperInput
                        label="Mois"
                        value={month}
                        min={1}
                        max={12}
                        onChange={setMonth}
                        displayValue={MONTHS[month - 1]}
                    />
                    <StepperInput
                        label="Annee"
                        value={year}
                        min={now.getFullYear() - 1}
                        max={now.getFullYear() + 3}
                        onChange={setYear}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.button, !isValid && styles.buttonDisabled]}
                    disabled={!isValid}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Creer le budget</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
                    <Text style={styles.cancelText}>Annuler</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
