import { SplashScreen, Redirect } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useAtomValue } from 'jotai';
import { authAtom } from '../../entities/auth/model/auth.state';
import { Colors, Fonts } from '../../shared/tokens';
import MenuIcon from '../../assets/icons/menu';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const { access_token } = useAtomValue(authAtom);
	if (!access_token) {
		return <Redirect href={'/login'} />;
	}
	return (
		// eslint-disable-next-line react-native/no-inline-styles
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer
				screenOptions={({ navigation }) => ({
					headerStyle: {
						backgroundColor: Colors.blackLight,
						shadowColor: Colors.blackLight,
						shadowOpacity: 0,
					},
					headerLeft: () => {
						return <MenuIcon />;
					},
					headerTitleStyle: {
						color: Colors.white,
						fontFamily: Fonts.regular,
						fontSize: Fonts.fs20,
					},
					headerTitleAlign: 'center',
					sceneContainerStyle: {
						backgroundColor: Colors.black,
					},
				})}
			>
				<Drawer.Screen
					name="index"
					options={{
						title: 'Мои курсы',
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}
