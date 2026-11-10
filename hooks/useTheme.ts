import {useColorScheme} from 'react-native';
import {ThemeName, themes} from '@/constants/theme';
import {useThemeStore} from '@/store/themeStore';

export const useTheme = () => {
    const preference = useThemeStore(state => state.preference);
    const systemColorScheme = useColorScheme();
    const name: ThemeName = preference === 'system'
        ? systemColorScheme === 'light' ? 'light' : 'dark'
        : preference;

    return {
        colors: themes[name],
        name,
        isDark: name === 'dark',
    };
};
