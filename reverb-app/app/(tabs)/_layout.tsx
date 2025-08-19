import React from "react";
import { Drawer } from "expo-router/drawer";
import { AudioRecordingProvider } from "@/contexts/AudioRecordingContext";

export default function DrawerLayout() {
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
        <Drawer.Screen name="HomeScreen" options={{ title: "Home" }} />
        <Drawer.Screen name="NewScreen" options={{ title: "New Reverb" }} />
        <Drawer.Screen name="TimelineScreen" options={{ title: "Timeline" }} />
        <Drawer.Screen
          name="WeeklySumScreen"
          options={{ title: "Weekly Summary" }}
        />
        <Drawer.Screen name="ProfileScreen" options={{ title: "Profile" }} />

        {/* Hidden screen */}
        <Drawer.Screen
          name="PreviewScreen"
          options={{
            drawerItemStyle: { display: "none" },
            title: "Save REVERB",
          }}
        />
        <Drawer.Screen
          name="ReverbViewScreen"
          options={{
            drawerItemStyle: { display: "none" },
            title: "Your REVERB",
          }}
        />
        <Drawer.Screen
          name="index"
          options={{ drawerItemStyle: { display: "none" } }}
        />
      </Drawer>
    </AudioRecordingProvider>
  );
}
