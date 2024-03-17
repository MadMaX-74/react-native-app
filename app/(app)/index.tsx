import { StyleSheet, View, Text } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';
import { useAtom } from 'jotai';
import { profileAtom } from '../../entities/user/model/user.state';
import axios from 'axios';
import { API } from '../../entities/auth/api/auth.api';
import { useEffect } from 'react';
import { AuthResponse } from '../../entities/auth/model/auth.interface';

export default function App() {
	const [profile] = useAtom(profileAtom);
	const login = async () => {
		const { data } = await axios.post<AuthResponse>(API.login, {
			email: 'vasia@pupkin.ru',
			password: '12345678',
		});
		console.log(data);
	};
	useEffect(() => {
		login();
	}, []);
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={{ color: Colors.white }}>{profile.isLoading}</Text>
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
