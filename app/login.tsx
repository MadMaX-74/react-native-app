import { StyleSheet, View, Image, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import Input from '../shared/Input/Input';
import { Colors, Gaps } from '../shared/tokens';
import Button from '../shared/Button/Button';
import { ErrorNotification } from '../shared/ErrorNotification/ErrorNotification';
import { useEffect, useState } from 'react';
import CustomLink from '../shared/CustomLink/CustomLink';
import { useAtom } from 'jotai';
import { loginAtom } from '../entities/auth/model/auth.state';
import { router } from 'expo-router';
import { useScreenOrientation } from '../shared/hooks';
import { Orientation } from 'expo-screen-orientation';

export default function App() {
	const [localError, setLocalError] = useState<string | undefined>(undefined);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [{ access_token, isLoading, error }, login] = useAtom(loginAtom);
	const orientation = useScreenOrientation();

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
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.content}
			>
				<Image style={styles.logo} source={require('../assets/logo.png')} resizeMode="contain" />
				<View style={styles.form}>
					<View
						// eslint-disable-next-line react-native/no-inline-styles
						style={{
							...styles.inputs,
							flexDirection: orientation === Orientation.PORTRAIT_UP ? 'column' : 'row',
						}}
					>
						<Input
							// eslint-disable-next-line react-native/no-inline-styles
							style={{
								width:
									orientation === Orientation.PORTRAIT_UP
										? 'auto'
										: Dimensions.get('window').width / 2 - 16 - 48,
							}}
							placeholder="Email"
							onChangeText={setEmail}
						/>
						<Input
							// eslint-disable-next-line react-native/no-inline-styles
							style={{
								width:
									orientation === Orientation.PORTRAIT_UP
										? 'auto'
										: Dimensions.get('window').width / 2 - 16 - 48,
							}}
							isPassword
							placeholder="Password"
							onChangeText={setPassword}
						/>
					</View>
					<Button text="Войти" onPress={submit} isLoading={isLoading} />
				</View>
				<CustomLink href={'/restore'} text="Востановить пароль" />
			</KeyboardAvoidingView>
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
	inputs: {
		gap: Gaps.g16,
	},
});
