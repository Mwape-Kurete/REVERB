import React from "react";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ headerShown: false }}>
      {/* Visible drawer screens */}
      <Drawer.Screen name="HomeScreen" options={{ title: "Home" }} />
      <Drawer.Screen name="NewScreen" options={{ title: "Record a Reverb" }} />
      <Drawer.Screen name="TimelineScreen" options={{ title: "Timeline" }} />
      <Drawer.Screen name="WeeklySumScreen" options={{ title: "Summary" }} />
      <Drawer.Screen name="ProfileScreen" options={{ title: "Profile" }} />

      {/* Hidden screen */}
      <Drawer.Screen
        name="PreviewScreen"
        options={{ drawerItemStyle: { display: "none" } }}
      />
    </Drawer>
  );
}
