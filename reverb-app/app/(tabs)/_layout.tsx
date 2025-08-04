import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./HomeScreen";
import NewScreen from "./NewScreen";
import TimelineScreen from "./TimelineScreen";
import WeeklySumScreen from "./WeeklySumScreen";
import ProfileScreen from "./ProfileScreen";
import PreviewScreen from "./PreviewScreen";

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {/* Visible drawer screens */}
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Record" component={NewScreen} />
        <Drawer.Screen name="Timeline" component={TimelineScreen} />
        <Drawer.Screen name="Summary" component={WeeklySumScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />

        {/* Hidden screen */}
        <Drawer.Screen
          name="Preview"
          component={PreviewScreen}
          options={{ drawerItemStyle: { display: "none" } }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
