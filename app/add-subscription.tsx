import React, {useMemo, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useBudgetStore} from '@/store/budgetStore';
import {colors} from '@/constants/theme';
import {MONTHS} from '@/constants/months';
import {styles} from './add-subscription.styles';
import StepperInput from '@/components/StepperInput';
import {Subscription} from '@/domain/entities/Budget';

const frequencies: {value: Subscription['frequency']; label: string}[] = [
    {value: 'monthly', label: 'Mensuel'},
    {value: 'quarterly', label: 'Trimestriel'},
    {value: 'semiannual', label: 'Semestriel'},
    {value: 'annual', label: 'Annuel'},
];

export default function AddSubscription() {
    const router = useRouter();
    const {subscriptionId} = useLocalSearchParams<{ subscriptionId?: string }>();

    const addSubscription = useBudgetStore(state => state.addSubscription);
    const updateSubscription = useBudgetStore(state => state.updateSubscription);
    const budgets = useBudgetStore(state => state.budgets);
    const activeBudgetId = useBudgetStore(state => state.activeBudgetId);

    const budget = budgets.find(item => item.id === activeBudgetId) ?? null;
    const existingSubscription = useMemo(
        () => budget?.subscriptions.find(subscription => subscription.id === subscriptionId) ?? null,
        [budget, subscriptionId]
    );

    const isEditMode = Boolean(existingSubscription);

    const [label, setLabel] = useState(existingSubscription?.label ?? '');
    const [amount, setAmount] = useState(existingSubscription ? String(existingSubscription.amount) : '');
    const [dayOfMonth, setDayOfMonth] = useState(existingSubscription?.dayOfMonth ?? 5);
    const [frequency, setFrequency] = useState<Subscription['frequency']>(existingSubscription?.frequency ?? 'monthly');
    const [startMonth, setStartMonth] = useState(existingSubscription?.startMonth ?? new Date().getMonth() + 1);
    const [startYear] = useState(existingSubscription?.startYear ?? new Date().getFullYear());

    const isValid = () => {
        const amountNum = parseFloat(amount.replace(',', '.'));
        return label.trim().length > 0 && !isNaN(amountNum) && amountNum > 0;
    };

    const handleSubmit = () => {
        if (!isValid() || !budget) return;

        const payload = {
            label: label.trim(),
            amount: parseFloat(amount.replace(',', '.')),
            dayOfMonth,
            frequency,
            startMonth: !isEditMode && frequency === 'monthly' ? budget.month : startMonth,
            startYear: !isEditMode && frequency === 'monthly' ? budget.year : startYear,
        };

        if (isEditMode && existingSubscription) {
            updateSubscription(budget.id, existingSubscription.id, payload);
        } else {
            addSubscription(budget.id, payload);
        }

        router.back();
    };

    return (
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.handle} />

            <ScrollView
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>{isEditMode ? 'Modifier le prélèvement' : 'Nouveau prélèvement'}</Text>
                <Text style={styles.subtitle}>
                    {isEditMode
                        ? 'Ajuste le montant, le libellé ou la date du prélèvement.'
                        : 'Ajoute un prélèvement récurrent pour mieux anticiper ton budget mensuel.'}
                </Text>

                <View style={styles.sectionCard}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Montant du prélèvement</Text>
                        <View style={styles.amountDisplay}>
                            <Text style={styles.currency}>€</Text>
                            <TextInput
                                style={styles.amountInput}
                                placeholder="0"
                                placeholderTextColor={colors.textMuted}
                                keyboardType="decimal-pad"
                                value={amount}
                                onChangeText={setAmount}
                                autoFocus={!isEditMode}
                            />
                        </View>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Libellé</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex : Netflix, Loyer, Salle de sport"
                            placeholderTextColor={colors.textMuted}
                            value={label}
                            onChangeText={setLabel}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Fréquence</Text>
                        <View style={styles.frequencyOptions}>
                            {frequencies.map(option => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={[
                                        styles.frequencyOption,
                                        frequency === option.value && styles.frequencyOptionSelected,
                                    ]}
                                    onPress={() => setFrequency(option.value)}
                                >
                                    <Text
                                        style={[
                                            styles.frequencyOptionText,
                                            frequency === option.value && styles.frequencyOptionTextSelected,
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {frequency !== 'monthly' && (
                        <StepperInput
                            label="Mois de début"
                            value={startMonth}
                            min={1}
                            max={12}
                            onChange={setStartMonth}
                            displayValue={MONTHS[startMonth - 1]}
                        />
                    )}

                    <StepperInput
                        label="Date de prélèvement"
                        value={dayOfMonth}
                        min={1}
                        max={31}
                        onChange={setDayOfMonth}
                        displayValue={`Le ${dayOfMonth}`}
                    />
                </View>

                <View style={styles.tipCard}>
                    <Text style={styles.tipTitle}>Bon à savoir</Text>
                    <Text style={styles.tipText}>
                        Si un mois est plus court, considère ce prélèvement comme prévu en fin de mois.
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.button, !isValid() && styles.buttonDisabled]}
                    onPress={handleSubmit}
                    disabled={!isValid()}
                >
                    <Text style={styles.buttonText}>
                        {isEditMode ? 'Enregistrer les modifications' : 'Ajouter le prélèvement'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
