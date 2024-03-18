import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';
import { useAtomValue, useSetAtom } from 'jotai';
import { authAtom, logoutAtom } from '../../entities/auth/model/auth.state';
import { useEffect } from 'react';
import { router, useRootNavigationState } from 'expo-router';
import Button from '../../shared/Button/Button';

export default function App() {
	// const [auth, login] = useAtom(loginAtom);
	const logout = useSetAtom(logoutAtom);
	const { access_token } = useAtomValue(authAtom);
	const state = useRootNavigationState();

	// const userLogin = () => {
	// 	login({ email: 'vasia@pupkin.ru', password: '12345678' });
	// };
	useEffect(() => {
		if (!state?.key) return;
		if (!access_token) {
			router.replace('/login');
		}
	}, [access_token]);

	return (
		<Pressable>
			<View style={styles.container}>
				<View style={styles.content}>
					<Text style={{ color: Colors.white }}>Test</Text>
					<Button text="Logout" onPress={logout} />
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		flex: 1,
		padding: 55,
		backgroundColor: Colors.black,
	},
	content: {
		alignItems: 'center',
		gap: Gaps.g50,
	},
});
