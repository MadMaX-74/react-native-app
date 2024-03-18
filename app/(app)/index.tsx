import { StyleSheet, View, Text } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';
import Button from '../../shared/Button/Button';
import { logoutAtom } from '../../entities/auth/model/auth.state';
import { useSetAtom } from 'jotai';

export default function App() {
	const logout = useSetAtom(logoutAtom);
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={{ color: Colors.white }}>Test</Text>
				<Button text="Logout" onPress={logout} />
			</View>
		</View>
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
