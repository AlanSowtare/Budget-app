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
        'PlusJakartaSans-Regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
        'PlusJakartaSans-Medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
        'PlusJakartaSans-Bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
        'PlusJakartaSans-ExtraBold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
        'DMSans-Regular': require('../assets/fonts/DMSans-Regular.ttf'),
        'DMSans-Medium': require('../assets/fonts/DMSans-Medium.ttf'),
        'Syne-Bold': require('../assets/fonts/Syne-Bold.ttf'),
        'Syne-ExtraBold': require('../assets/fonts/Syne-ExtraBold.ttf'),
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
                    <Stack.Screen name="subscriptions" />
                    <Stack.Screen name="add-category" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="add-expense" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="add-subscription" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="edit-budget" options={{ presentation: 'modal' }} />
                </Stack>
            </>
        </SafeAreaProvider>
    );
}