import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useBudgetStore } from '../store/budgetStore';
import { colors } from '../constants/theme';

export default function Index() {

    const router = useRouter();

    const budgets = useBudgetStore(state => state.budgets);


    useEffect(() => {
        // Ce code s'exécute après le premier rendu.
        // On vérifie si l'utilisateur a déjà des budgets enregistrés.
        if (budgets.length === 0) {
            // Aucun budget → onboarding
            router.replace('/onboarding');
        } else {
            // Budget existant → Home
            router.replace('/(home)' as any);
        }
    }, [budgets, router]);

    return (
        <View style={{
            flex: 1,                        // prend tout l'espace disponible
            justifyContent: 'center',       // centre verticalement
            alignItems: 'center',           // centre horizontalement
            backgroundColor: colors.bg,    // notre fond sombre du theme
        }}>
            <ActivityIndicator
                size="large"
                color={colors.accent}   // le vert menthe de notre design
            />
        </View>
    );
}