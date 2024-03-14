import { Stack } from 'expo-router';
import { Colors } from '../shared/tokens';

export default function RootLayout() {
	return (
		<Stack
			screenOptions={{
				statusBarColor: Colors.black,
				contentStyle: {
					backgroundColor: Colors.black,
				},
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="restore" />
		</Stack>
	);
}
