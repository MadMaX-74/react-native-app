import { Stack, SplashScreen, Redirect } from 'expo-router';
import { Colors } from '../../shared/tokens';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAtomValue } from 'jotai';
import { authAtom } from '../../entities/auth/model/auth.state';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const { access_token } = useAtomValue(authAtom);
	if (!access_token) {
		return <Redirect href={'/login'} />;
	}
	return (
		<SafeAreaProvider>
			<StatusBar style="light" />
			<Stack
				screenOptions={{
					statusBarColor: Colors.black,
					contentStyle: {
						backgroundColor: Colors.black,
					},
					headerShown: false,
				}}
			>
				<Stack.Screen name="index" />
			</Stack>
		</SafeAreaProvider>
	);
}
