import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
                <Stack.Screen name="home/index" options={{ title: 'Home' }} />

        <Stack.Screen name="register/index" options={{ title: 'Register' }} />
        <Stack.Screen name="login/index" options={{ title: 'Login' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
