import React, {useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useRouter} from 'expo-router';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@/hooks/useTheme';
import {themes} from '@/constants/theme';
import {useThemeStore, ThemePreference} from '@/store/themeStore';
import {makeStyles} from './appearance.styles';

const options: {value: ThemePreference; label: string; description?: string}[] = [
    {value: 'system', label: 'Système', description: 'Suit le réglage de ton iPhone'},
    {value: 'dark', label: 'Sombre'},
    {value: 'light', label: 'Clair'},
];

export default function AppearanceScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const {colors, name} = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    const preference = useThemeStore(state => state.preference);
    const setPreference = useThemeStore(state => state.setPreference);

    return (
        <View style={[styles.root, {paddingTop: insets.top}]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} accessibilityRole="button">
                    <Text style={styles.backBtn}>‹ Retour</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Apparence</Text>
                <View style={styles.headerSpacer}/>
            </View>

            <View style={styles.options}>
                {options.map(option => {
                    const selected = preference === option.value;
                    const previewTheme = option.value === 'system'
                        ? themes[name]
                        : themes[option.value];

                    return (
                        <TouchableOpacity
                            key={option.value}
                            style={[styles.option, selected && styles.optionSelected]}
                            onPress={() => setPreference(option.value)}
                            accessibilityRole="radio"
                            accessibilityState={{checked: selected}}
                        >
                            <View style={styles.optionContent}>
                                <Text style={styles.optionLabel}>{option.label}</Text>
                                {option.description && (
                                    <Text style={styles.optionDescription}>{option.description}</Text>
                                )}
                            </View>
                            <View style={styles.preview}>
                                <View style={[styles.previewDot, {backgroundColor: previewTheme.bg}]}/>
                                <View style={[styles.previewDot, {backgroundColor: previewTheme.surface}]}/>
                                <View style={[styles.previewDot, {backgroundColor: previewTheme.accent}]}/>
                            </View>
                            <View style={[styles.radio, selected && styles.radioSelected]}>
                                {selected && <View style={styles.radioCheck}/>}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
