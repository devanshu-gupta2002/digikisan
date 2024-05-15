import { View, Text, Image, StatusBar } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'

import {icons} from "../../constants"

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#FFFFFF"
      />
      <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#E5E5F7",
        tabBarStyle: {
          backgroundColor: "#008A29",
          borderTopWidth: 2,
          borderTopColor: '#FFA001',
          height: 84
        }
      }}>
      <Tabs.Screen
          name="sampling"
          options={{
            title: "Sampling",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Sampling"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="History"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="marketplace"
          options={{
            title: "Marketplace",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Marketplace"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="scheme"
          options={{
            title: "Scheme",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.govt}
                color={color}
                name="Govt. Scheme"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout