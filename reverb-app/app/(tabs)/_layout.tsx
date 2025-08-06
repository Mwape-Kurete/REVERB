import React from "react";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: "#F5EDFC",
          width: 240,
        },
        drawerActiveTintColor: "#B171E4", // Active item text/icon color
        drawerInactiveTintColor: "#020103", // Inactive item text/icon color
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
          backgroundColor: "#F5EDFC",
          height: 96,
        },
        headerTintColor: "#020103", // Title & icon color in header
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
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="index"
        options={{ drawerItemStyle: { display: "none" } }}
      />
    </Drawer>
  );
}
