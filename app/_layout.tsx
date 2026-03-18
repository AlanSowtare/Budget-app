import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useBudgetStore } from '@/store/budgetStore';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    const [fontsLoaded] = useFonts({
        'Syne-Bold': require('../assets/fonts/Syne-Bold.ttf'),
        'Syne-ExtraBold': require('../assets/fonts/Syne-ExtraBold.ttf'),
        'DMSans-Regular': require('../assets/fonts/DMSans-Regular.ttf'),
        'DMSans-Medium': require('../assets/fonts/DMSans-Medium.ttf'),
    });

    const loadBudgets = useBudgetStore(state => state.loadBudgets);
    const isLoading = useBudgetStore(state => state.isLoading);

    useEffect(() => {
        if (fontsLoaded) {
            loadBudgets().then(() => {
                SplashScreen.hideAsync();
            });
        }
    }, [fontsLoaded, loadBudgets]);

    // On attend que les fonts ET les données soient prêtes
    if (!fontsLoaded || isLoading) return null;

    return (
        <SafeAreaProvider>
            <>
                <StatusBar style="light" />
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="onboarding" />
                    <Stack.Screen name="(home)/index" />
                    <Stack.Screen name="category/[id]" />
                    <Stack.Screen name="add-category" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="add-expense" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="edit-budget" options={{ presentation: 'modal' }} />
                </Stack>
            </>
        </SafeAreaProvider>
    );
}