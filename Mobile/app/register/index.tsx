import { useRegisterForm } from '@/components/hooks/useRegisterForm';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordVisible,
    togglePasswordVisibility,
    handleRegister,
  } = useRegisterForm();

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Create Account
      </Text>

      <TextInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        left={<TextInput.Icon icon="email" />}
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry={!passwordVisible}
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon={passwordVisible ? 'eye-off' : 'eye'}
            onPress={togglePasswordVisibility}
          />
        }
        style={styles.input}
      />

      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>

      <View style={styles.footer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.link}> Login</Text>
        </TouchableOpacity>
      </View>
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
    color: '#0D47A1',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 12,
    paddingVertical: 4,
    backgroundColor: '#0D47A1',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  link: {
    color: '#0D47A1',
    fontWeight: 'bold',
  },
});
