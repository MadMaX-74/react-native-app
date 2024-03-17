import { StyleSheet, View, Image } from 'react-native';
import Input from '../../shared/Input/Input';
import { Colors, Gaps } from '../../shared/tokens';
import Button from '../../shared/Button/Button';
import { ErrorNotification } from '../../shared/ErrorNotification/ErrorNotification';
import { useState } from 'react';
import CustomLink from '../../shared/CustomLink/CustomLink';

export default function App() {
	const [error, setError] = useState<string | undefined>(undefined);
	const alert = () => {
		setError('Wrong login and password');
	};
	return (
		<View style={styles.container}>
			<ErrorNotification error={error} />
			<View style={styles.content}>
				<Image style={styles.logo} source={require('../../assets/logo.png')} resizeMode="contain" />
				<View style={styles.form}>
					<Input placeholder="Email" />
					<Input isPassword placeholder="Password" />
					<Button text="Войти" onPress={alert} />
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
