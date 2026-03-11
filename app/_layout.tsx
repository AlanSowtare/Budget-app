import React, {useEffect, useState} from 'react';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {SafeAreaProvider} from "react-native-safe-area-context";

// Permet de cacher l'écran de chargement (SplashScreen) manuellement
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {

    const [isReady, setIsReady] = useState(false);


    const [fontsLoaded] = useFonts({
        'Syne-Bold': require('../assets/fonts/Syne-Bold.ttf'),
        'Syne-ExtraBold': require('../assets/fonts/Syne-ExtraBold.ttf'),
        'DMSans-Regular': require('../assets/fonts/DMSans-Regular.ttf'),
        'DMSans-Medium': require('../assets/fonts/DMSans-Medium.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync(); // Cache le splash screen
            setIsReady(true);         // Met à jour notre state local
        }
    }, [fontsLoaded]); // ← tableau de dépendances : ne se relance que si fontsLoaded change

    if (!isReady) return null;

    return (
        <SafeAreaProvider>
            <>
                <StatusBar style="light" />
                <Stack screenOptions={{headerShown: false}}>
                    <Stack.Screen name="index"/>
                    <Stack.Screen name="onboarding"/>
                    <Stack.Screen name="(home)/index"/>
                    <Stack.Screen
                        name="add-category"
                        options={{ presentation: 'modal' }}
                    />
                </Stack>
        </>
        </SafeAreaProvider>
    );
}