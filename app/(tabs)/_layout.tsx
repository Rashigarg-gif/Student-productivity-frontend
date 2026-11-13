import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { useStore } from '../../store/useStore'; 
import LoginScreen from '../LoginScreen'; 
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const userToken = useStore((state: any) => state.userToken);
  const checkAuth = useStore((state: any) => state.checkAuth);

  // Check phone storage for a saved login session when the app starts
  useEffect(() => {
    checkAuth();
  }, []);
  // If there is no token, show the Login screen instead of the Tabs
  if (!userToken) {
    return <LoginScreen />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => ( //renderprop: it will run for the first time and draws ui but every time it rerenders it runs with new info like tab is active or not
            <Ionicons name="clipboard" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ScheduleScreen"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
