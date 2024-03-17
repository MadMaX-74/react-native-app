import { Link } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '../shared/tokens';

const Restore = () => {
	return (
		<View>
			<Link href={'/'}>
				<Text style={styles.text}>restore</Text>
			</Link>
		</View>
	);
};

export default Restore;
const styles = StyleSheet.create({
	text: {
		color: Colors.white,
	},
});
