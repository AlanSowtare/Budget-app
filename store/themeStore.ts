import * as SQLite from 'expo-sqlite';
import {create} from 'zustand';
import {ThemeName} from '@/constants/theme';

export type ThemePreference = 'system' | ThemeName;

interface ThemeStore {
    preference: ThemePreference;
    setPreference: (preference: ThemePreference) => void;
}

const db = SQLite.openDatabaseSync('budget.db');
db.execSync('CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT)');

const storedPreference = db.getFirstSync<{value: string}>(
    'SELECT value FROM settings WHERE key = ?',
    ['theme_preference'],
)?.value;

const isThemePreference = (value: string | undefined): value is ThemePreference =>
    value === 'system' || value === 'dark' || value === 'light';

export const useThemeStore = create<ThemeStore>(set => ({
    preference: isThemePreference(storedPreference) ? storedPreference : 'system',
    setPreference: preference => {
        db.runSync(
            'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
            ['theme_preference', preference],
        );
        set({preference});
    },
}));
