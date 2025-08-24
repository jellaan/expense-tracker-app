import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import ManageExpense from './screens/ManageExpense';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';

import { GlobalStyles } from './constants/styles';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500
      }}
    >
      <Tab.Screen name="AllExpenses" component={AllExpenses} 
        options={{ 
          title: 'All Expenses', 
          tabBarLabel: 'All', 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          )
        }} 
      />
      <Tab.Screen name="RecentExpenses" component={RecentExpenses} 
        options={{ 
          title: 'Recent Expenses', 
          tabBarLabel: 'Recent', 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          )
        }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{ headerShown: false }}/>
          <Stack.Screen name="ManageExpense" component={ManageExpense} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
