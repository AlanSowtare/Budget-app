import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './StepperInput.styles';

interface StepperInputProps {
    label: string;  // ex: "Mois" ou "Année"
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    displayValue?: string; // optionnel — texte custom à afficher (ex: "Mars" au lieu de "3")
}

export default function StepperInput({
                                         label,
                                         value,
                                         min,
                                         max,
                                         onChange,
                                         displayValue,
                                     }: StepperInputProps) {

    const decrement = () => {
        if (value > min) onChange(value - 1);
    };

    const increment = () => {
        if (value < max) onChange(value + 1);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <View style={styles.stepper}>

                {/* Bouton moins */}
                <TouchableOpacity
                    style={[
                        styles.btn,
                        value <= min && styles.btnDisabled,
                    ]}
                    onPress={decrement}
                    disabled={value <= min}
                >
                    <Text style={styles.btnText}>‹</Text>
                </TouchableOpacity>

                {/* Valeur affichée au centre */}
                <View style={styles.valueWrap}>
                    <Text style={styles.value}>
                        {displayValue ?? String(value)}
                    </Text>
                </View>

                {/* Bouton plus */}
                <TouchableOpacity
                    style={[
                        styles.btn,
                        value >= max && styles.btnDisabled,
                    ]}
                    onPress={increment}
                    disabled={value >= max}
                >
                    <Text style={styles.btnText}>›</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}