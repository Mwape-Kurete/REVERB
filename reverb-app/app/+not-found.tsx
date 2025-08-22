import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.baseText}>This screen does not exist.</Text>
        <Link href="/(auth)/LoginScreen" style={styles.link}>
          <Text style={styles.baseText}>Go to welcome screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  baseText: {
    alignItems: "center",
    justifyContent: "center",
  },
});
