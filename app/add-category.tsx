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
import { useRouter } from 'expo-router';
import { useBudgetStore } from '@/store/budgetStore';
import { colors } from '@/constants/theme';
import { styles } from './add-category.styles';

// Les couleurs disponibles pour une catégorie
const COLORS: { key: string; base: string }[] = [
    { key: 'blue',   base: colors.blue },
    { key: 'purple', base: colors.purple },
    { key: 'orange', base: colors.orange },
    { key: 'pink',   base: colors.pink },
    { key: 'danger', base: colors.danger },
];

// Emojis suggérés
const EMOJIS = [
    '🏠', '🛒', '🎮', '🚗', '👗', '💊', '✈️', '🎓',
    '🍕', '☕', '🏋️', '🎬', '📱', '💡', '🐶', '🎁',
];

export default function AddCategory() {

    const router = useRouter();
    const addCategory = useBudgetStore(state => state.addCategory);
    const getActiveBudget = useBudgetStore(state => state.getActiveBudget);

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedEmoji, setSelectedEmoji] = useState('🏠');
    const [selectedColor, setSelectedColor] = useState('blue');

    const isValid = () => {
        const amountNum = parseFloat(amount);
        return name.trim().length > 0 && !isNaN(amountNum) && amountNum > 0;
    };

    const handleCreate = () => {
        if (!isValid()) return;

        const budget = getActiveBudget();
        if (!budget) return;

        addCategory(budget.id, {
            name: name.trim(),
            emoji: selectedEmoji,
            color: selectedColor,
            allocatedAmount: parseFloat(amount),
        });

        router.back(); // ferme le modal et retourne au Home
    };

    return (
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* Handle — la petite barre en haut du modal */}
            <View style={styles.handle} />

            <ScrollView
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>Nouvelle catégorie</Text>
                <Text style={styles.subtitle}>
                    Crée une enveloppe claire pour piloter ton budget plus facilement tout au long du mois.
                </Text>

                <View style={styles.sectionCard}>
                    {/* ── NOM ── */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Nom</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex : Alimentation"
                            placeholderTextColor={colors.textMuted}
                            value={name}
                            onChangeText={setName}
                            autoFocus
                        />
                    </View>

                    {/* ── MONTANT ── */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Budget alloué</Text>
                        <View style={styles.inputRow}>
                            <Text style={styles.currency}>€</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="500"
                                placeholderTextColor={colors.textMuted}
                                keyboardType="decimal-pad"
                                value={amount}
                                onChangeText={setAmount}
                            />
                        </View>
                        <Text style={styles.helperText}>Définis un montant réaliste pour suivre cette catégorie sans te surcharger.</Text>
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

                    {/* ── COULEUR ── */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Couleur</Text>
                        <View style={styles.colorRow}>
                            {COLORS.map(color => (
                                <TouchableOpacity
                                    key={color.key}
                                    style={[
                                        styles.colorBtn,
                                        { backgroundColor: color.base },
                                        selectedColor === color.key && styles.colorBtnSelected,
                                    ]}
                                    onPress={() => setSelectedColor(color.key)}
                                >
                                    {selectedColor === color.key && (
                                        <Text style={styles.colorCheck}>✓</Text>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                {/* ── BOUTON ── */}
                <TouchableOpacity
                    style={[styles.button, !isValid() && styles.buttonDisabled]}
                    onPress={handleCreate}
                    disabled={!isValid()}
                >
                    <Text style={styles.buttonText}>Créer la catégorie</Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}