import { useLogin } from "@/components/hooks/useLogin";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login, loading, error } = useLogin();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const data = await login({ email, password });
      Alert.alert("Login Successful");
      console.log("User:", data);
      // router.push("/dashboard");
    } catch {
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Login
      </Text>

      <TextInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        left={<TextInput.Icon icon="email-outline" />}
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry={!passwordVisible}
        left={<TextInput.Icon icon="lock-outline" />}
        right={
          <TextInput.Icon
            icon={passwordVisible ? "eye-off-outline" : "eye-outline"}
            onPress={() => setPasswordVisible((prev) => !prev)}
          />
        }
        style={styles.input}
      />

      {error && (
        <Text style={styles.error} variant="bodyMedium">
          {error}
        </Text>
      )}

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        disabled={loading}
        contentStyle={{ paddingVertical: 6 }}
      >
        {loading ? <ActivityIndicator color="#fff" /> : "Login"}
      </Button>

      <View style={styles.footer}>
        <Text>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.link}> Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    color: "#0D47A1",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 12,
    backgroundColor: "#0D47A1",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  link: {
    color: "#0D47A1",
    fontWeight: "bold",
  },
});
