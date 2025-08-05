import React from "react";
import { Tabs } from "expo-router";

export default function DrawerLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="HomeScreen" />
      <Tabs.Screen name="NewScreen" />
      <Tabs.Screen name="PreviewScreen" />
      <Tabs.Screen name="ProfileScreen" />
      <Tabs.Screen name="TimelineScreen" />
      <Tabs.Screen name="WeeklySumScreen" />
    </Tabs>
  );
}
