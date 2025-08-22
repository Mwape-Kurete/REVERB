import React from "react";
import { Drawer } from "expo-router/drawer";
import { AudioRecordingProvider } from "@/contexts/AudioRecordingContext";
import { useRouter } from "expo-router";

export default function DrawerLayout() {
  const router = useRouter();

  const goToLoadingFeedback = (destination: string, message: string) => {
    router.push({
      pathname: "/FeedbackScreen",
      params: { destination, message },
    });
  };

  return (
    <AudioRecordingProvider>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerStyle: {
            backgroundColor: "#CB4955",
            width: 240,
          },
          drawerActiveTintColor: "#250206", // Active item text/icon color
          drawerInactiveTintColor: "#FEEFF0", // Inactive item text/icon color
          drawerLabelStyle: {
            fontFamily: "Michroma_400Regular",
            fontWeight: 300,
            fontSize: 14,
          },
          drawerItemStyle: {
            marginVertical: 8,
            borderRadius: 8,
          },
          headerStyle: {
            backgroundColor: "#F67C87",
            height: 96,
          },
          headerTintColor: "#250206", // Title & icon color in header
          headerTitleStyle: {
            fontFamily: "Michroma_400Regular",
            fontWeight: 300,
            fontSize: 14,
          },
        }}
      >
        {/* Visible drawer screens */}
        <Drawer.Screen
          name="HomeScreen"
          options={{ title: "Home" }}
          listeners={() => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              goToLoadingFeedback(
                "HomeScreen",
                "Audio Journaling made different"
              );
            },
          })}
        />
        <Drawer.Screen
          name="NewScreen"
          options={{ title: "New Reverb" }}
          listeners={() => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              goToLoadingFeedback(
                "NewScreen",
                "Ready to journal, and think deeper?"
              );
            },
          })}
        />
        <Drawer.Screen
          name="TimelineScreen"
          options={{ title: "Timeline" }}
          listeners={() => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              goToLoadingFeedback(
                "TimelineScreen",
                "Fetching all your REVERBs"
              );
            },
          })}
        />
        <Drawer.Screen
          name="WeeklySumScreen"
          options={{ title: "Weekly Summary" }}
          listeners={() => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              goToLoadingFeedback("WeeklySumScreen", "How has your week been?");
            },
          })}
        />
        <Drawer.Screen name="ProfileScreen" options={{ title: "Profile" }} />

        {/* Hidden screen */}
        <Drawer.Screen
          name="PreviewScreen"
          options={{
            drawerItemStyle: { display: "none" },
            title: "Save REVERB",
          }}
          listeners={() => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              goToLoadingFeedback("PreviewScreen", "Loading...");
            },
          })}
        />
        <Drawer.Screen
          name="ReverbViewScreen"
          options={{
            drawerItemStyle: { display: "none" },
            title: "Your REVERB",
          }}
          listeners={() => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              goToLoadingFeedback("ReverbViewScreen", "...");
            },
          })}
        />
        <Drawer.Screen
          name="index"
          options={{ drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="FeedbackScreen"
          options={{ drawerItemStyle: { display: "none" } }}
        />
      </Drawer>
    </AudioRecordingProvider>
  );
}
