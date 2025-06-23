import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function RegisterScreen() {
  const theme = useTheme(); 
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Create Account</Text>

      <TextInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={() => console.log('Register pressed')} style={styles.button}>
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 12,
    paddingVertical: 4,
  },
});
