import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView, // monte le contenu quand le clavier apparaît
    Platform,             // détecte si on est sur iOS ou Android
} from 'react-native';
import { useRouter } from 'expo-router';
import { useBudgetStore } from '../store/budgetStore';
import { colors, spacing, radius, fontSize } from '../constants/theme';
import { styles } from './onboarding.styles';
import StepperInput from "@/components/StepperInput";
import {MONTHS} from "@/constants/months";

export default function Onboarding() {

    const router = useRouter();
    const createBudget = useBudgetStore(state => state.createBudget);

    const [amount, setAmount] = useState('');
    const [month, setMonth] = useState(new Date().getMonth() + 1); // mois actuel (getMonth() commence à 0)
    const [year, setYear] = useState(new Date().getFullYear());

    const isValid = () => {
        const amountNum = parseFloat(amount);

        return (
            !isNaN(amountNum) && amountNum > 0
        );
    };

    // ── SOUMISSION ──
    const handleCreate = () => {
        if (!isValid()) return; // sécurité — ne fait rien si invalide

        // On crée le budget dans le store
        createBudget(
            month,
            year,
            parseFloat(amount),
        );

        router.replace('/(home)');
    };

    // ── RENDU ──
    return (

        // KeyboardAvoidingView évite que le clavier cache les inputs.
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
                // ↑ permet de tapper ailleurs que sur l'input pour fermer le clavier
            >

                {/* ── HEADER ── */}
                <View style={styles.header}>
                    <Text style={styles.emoji}>💰</Text>
                    <Text style={styles.title}>Mon budget</Text>
                    <Text style={styles.subtitle}>
                        Crée ton budget du mois pour commencer à suivre tes dépenses
                    </Text>
                </View>

                {/* ── FORMULAIRE ── */}
                <View style={styles.form}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Montant total du budget</Text>
                        <View style={styles.inputRow}>
                            <Text style={styles.currency}>€</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="3 200"
                                placeholderTextColor={colors.textMuted}
                                keyboardType="decimal-pad" // clavier numérique sur mobile
                                value={amount}
                                onChangeText={setAmount} />
                        </View>

                        {/* Sélecteurs mois et année */}
                        <View style={styles.row}>

                            <StepperInput
                                label="Mois"
                                value={month}
                                min={1}
                                max={12}
                                onChange={setMonth}
                                displayValue={MONTHS[month - 1]} />

                            <StepperInput
                                label="Année"
                                value={year}
                                min={new Date().getFullYear() - 1}
                                max={new Date().getFullYear() + 2}
                                onChange={setYear} />

                        </View>
                    </View>

                    {/* ── BOUTON ── */}
                    <TouchableOpacity
                        style={[
                            styles.button,
                            !isValid() && styles.buttonDisabled,
                            // ↑ style conditionnel — si invalide, on applique
                            // le style grisé en plus. Équivalent de [class.disabled]="!isValid()" en Angular
                        ]}
                        onPress={handleCreate}
                        disabled={!isValid()}>
                        <Text style={styles.buttonText}>Créer mon budget →</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    )
        }