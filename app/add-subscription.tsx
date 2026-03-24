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
import {styles} from './add-subscription.styles';
import StepperInput from '@/components/StepperInput';

export default function AddSubscription() {
    const router = useRouter();
    const {subscriptionId} = useLocalSearchParams<{ subscriptionId?: string }>();

    const addSubscription = useBudgetStore(state => state.addSubscription);
    const updateSubscription = useBudgetStore(state => state.updateSubscription);
    const getActiveBudget = useBudgetStore(state => state.getActiveBudget);

    const budget = getActiveBudget();
    const existingSubscription = useMemo(
        () => budget?.subscriptions.find(subscription => subscription.id === subscriptionId) ?? null,
        [budget, subscriptionId]
    );

    const isEditMode = Boolean(existingSubscription);

    const [label, setLabel] = useState(existingSubscription?.label ?? '');
    const [amount, setAmount] = useState(existingSubscription ? String(existingSubscription.amount) : '');
    const [dayOfMonth, setDayOfMonth] = useState(existingSubscription?.dayOfMonth ?? 5);

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
                <Text style={styles.title}>{isEditMode ? 'Modifier l’abonnement' : 'Nouvel abonnement'}</Text>
                <Text style={styles.subtitle}>
                    {isEditMode
                        ? 'Ajuste le montant, le libellé ou le jour de prélèvement quand ton abonnement change.'
                        : 'Ajoute un prélèvement récurrent pour mieux anticiper ton budget mensuel.'}
                </Text>

                <View style={styles.sectionCard}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Montant mensuel</Text>
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
                        {isEditMode ? 'Enregistrer les modifications' : 'Ajouter l’abonnement'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
