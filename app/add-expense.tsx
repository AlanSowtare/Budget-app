import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useBudgetStore } from '@/store/budgetStore';
import { colors } from '@/constants/theme';
import { styles } from './add-expense.styles';

const EMOJIS = [
    '🛒', '🧃', '🥩', '🍕', '☕', '🥗', '🍰', '🥤',
    '🚗', '⛽', '🚌', '✈️', '🎮', '🎬', '📱', '👗',
    '💊', '🏋️', '🎁', '📚', '🏠', '💡', '🐶', '🍺',
];

export default function AddExpense() {

    const router = useRouter();

    // Récupère le categoryId passé en paramètre depuis l'écran détail
    const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

    const addExpense = useBudgetStore(state => state.addExpense);
    const getActiveBudget = useBudgetStore(state => state.getActiveBudget);

    const [label, setLabel] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedEmoji, setSelectedEmoji] = useState('🛒');

    const isValid = () => {
        const amountNum = parseFloat(amount);
        return label.trim().length > 0 && !isNaN(amountNum) && amountNum > 0;
    };

    const handleCreate = () => {
        if (!isValid()) return;

        const budget = getActiveBudget();
        if (!budget || !categoryId) return;

        addExpense(budget.id, {
            categoryId,
            label: label.trim(),
            emoji: selectedEmoji,
            amount: parseFloat(amount),
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
                <Text style={styles.title}>Nouvelle dépense</Text>

                {/* ── MONTANT ── */}
                <View style={styles.field}>
                    <Text style={styles.label}>Montant</Text>
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

                {/* ── LIBELLÉ ── */}
                <View style={styles.field}>
                    <Text style={styles.label}>Libellé</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex : Courses Monoprix"
                        placeholderTextColor={colors.textMuted}
                        value={label}
                        onChangeText={setLabel}
                    />
                </View>

                {/* ── EMOJI ── */}
                <View style={styles.field}>
                    <Text style={styles.label}>Icône</Text>
                    <View style={styles.emojiGrid}>
                        {EMOJIS.map(emoji => (
                            <TouchableOpacity
                                key={emoji}
                                style={[
                                    styles.emojiBtn,
                                    selectedEmoji === emoji && styles.emojiBtnSelected,
                                ]}
                                onPress={() => setSelectedEmoji(emoji)}
                            >
                                <Text style={styles.emojiText}>{emoji}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* ── BOUTON ── */}
                <TouchableOpacity
                    style={[styles.button, !isValid() && styles.buttonDisabled]}
                    onPress={handleCreate}
                    disabled={!isValid()}
                >
                    <Text style={styles.buttonText}>Ajouter la dépense</Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}