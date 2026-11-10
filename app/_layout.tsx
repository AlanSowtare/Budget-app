import React, { useEffect } from 'react';
import {AppState} from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useBudgetStore } from '@/store/budgetStore';
import {useTheme} from '@/hooks/useTheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    const [fontsLoaded] = useFonts({
        'PlusJakartaSans-Regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
        'PlusJakartaSans-Medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
        'PlusJakartaSans-Bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
        'PlusJakartaSans-ExtraBold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    });

    const loadBudgets = useBudgetStore(state => state.loadBudgets);
    const isLoading = useBudgetStore(state => state.isLoading);
    const refreshToday = useBudgetStore(state => state.refreshToday);
    const {colors, isDark} = useTheme();

    useEffect(() => {
        if (fontsLoaded) {
            loadBudgets().then(() => {
                SplashScreen.hideAsync();
            });
        }
    }, [fontsLoaded, loadBudgets]);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', state => {
            if (state === 'active') refreshToday();
        });
        return () => subscription.remove();
    }, [refreshToday]);

    if (!fontsLoaded || isLoading) return null;

    return (
        <SafeAreaProvider>
            <>
                <StatusBar style={isDark ? 'light' : 'dark'} />
                <Stack screenOptions={{ headerShown: false, contentStyle: {backgroundColor: colors.bg} }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="onboarding" />
                    <Stack.Screen name="(home)/index" />
                    <Stack.Screen name="category/[id]" />
                    <Stack.Screen name="budgets" />
                    <Stack.Screen name="subscriptions" />
                    <Stack.Screen name="add-category" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="add-expense" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="add-budget" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="add-subscription" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="edit-budget" options={{ presentation: 'modal' }} />
                </Stack>
            </>
        </SafeAreaProvider>
    );
}