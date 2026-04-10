import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import HomeScreen from './screens/Home';
import LogScreen from './screens/Logs';
import StatsScreen from './screens/Stats';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'cafe';
            } else if (route.name === 'Stats') {
              iconName = 'bar-chart';
            } else if (route.name === 'Logs') {
              iconName = 'list-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#8B4513',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#F5F5DC',
          },
          headerTintColor: '#8B4513',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="Logs" component={LogScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
