import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Purple School</Text>
        <View style={styles.form}>
          <TextInput style={styles.input}/>
          <TextInput style={styles.input}/>
          <Button title='Войти' />
        </View>
        <Text>Востановить пароль</Text> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 55
  },
  content: {
    alignItems: 'center',
    gap: 50
  },
  form: {
    alignSelf: 'stretch',
    gap: 16
  },
  input: {
    backgroundColor: '#2E2D3D'
  }
});
