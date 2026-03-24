import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import {useRouter} from 'expo-router';
import {useBudgetStore} from '@/store/budgetStore';
import {colors} from '@/constants/theme';
import {styles} from './add-subscription.styles';
import StepperInput from '@/components/StepperInput';

export default function AddSubscription() {
    const router = useRouter();

    const addSubscription = useBudgetStore(state => state.addSubscription);
    const getActiveBudget = useBudgetStore(state => state.getActiveBudget);

    const [label, setLabel] = useState('');
    const [amount, setAmount] = useState('');
    const [dayOfMonth, setDayOfMonth] = useState(5);

    const isValid = () => {
        const amountNum = parseFloat(amount.replace(',', '.'));
        return label.trim().length > 0 && !isNaN(amountNum) && amountNum > 0;
    };

    const handleCreate = () => {
        if (!isValid()) return;

        const budget = getActiveBudget();
        if (!budget) return;

        addSubscription(budget.id, {
            label: label.trim(),
            amount: parseFloat(amount.replace(',', '.')),
            dayOfMonth,
        });

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
                <Text style={styles.title}>Nouvel abonnement</Text>
                <Text style={styles.subtitle}>
                    Ajoute un prélèvement récurrent pour mieux anticiper ton budget mensuel.
                </Text>

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
                            autoFocus
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

                <View style={styles.tipCard}>
                    <Text style={styles.tipTitle}>Bon à savoir</Text>
                    <Text style={styles.tipText}>
                        Si un mois est plus court, considère ce prélèvement comme prévu en fin de mois.
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.button, !isValid() && styles.buttonDisabled]}
                    onPress={handleCreate}
                    disabled={!isValid()}
                >
                    <Text style={styles.buttonText}>Ajouter l’abonnement</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

