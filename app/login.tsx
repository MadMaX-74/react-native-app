import { StyleSheet, View, Image } from 'react-native';
import Input from '../shared/Input/Input';
import { Colors, Gaps } from '../shared/tokens';
import Button from '../shared/Button/Button';
import { ErrorNotification } from '../shared/ErrorNotification/ErrorNotification';
import { useEffect, useState } from 'react';
import CustomLink from '../shared/CustomLink/CustomLink';
import { useAtom } from 'jotai';
import { loginAtom } from '../entities/auth/model/auth.state';
import { router } from 'expo-router';

export default function App() {
	const [localError, setLocalError] = useState<string | undefined>(undefined);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [{ access_token, isLoading, error }, login] = useAtom(loginAtom);

	const submit = () => {
		if (!email) {
			setLocalError('Отсутвует email');
			return;
		}
		if (!password) {
			setLocalError('Отсутвует пароль');
			return;
		}
		login({ email, password });
	};
	useEffect(() => {
		if (error) {
			setLocalError(error);
		}
	}, [error]);
	useEffect(() => {
		if (access_token) {
			router.replace('/');
		}
	}, [access_token]);

	return (
		<View style={styles.container}>
			<ErrorNotification error={localError} />
			<View style={styles.content}>
				<Image style={styles.logo} source={require('../assets/logo.png')} resizeMode="contain" />
				<View style={styles.form}>
					<Input placeholder="Email" onChangeText={setEmail} />
					<Input isPassword placeholder="Password" onChangeText={setPassword} />
					<Button text="Войти" onPress={submit} isLoading={isLoading} />
				</View>
				<CustomLink href={'/restore'} text="Востановить пароль" />
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
	form: {
		alignSelf: 'stretch',
		gap: Gaps.g16,
	},
	logo: {
		width: 220,
	},
});
