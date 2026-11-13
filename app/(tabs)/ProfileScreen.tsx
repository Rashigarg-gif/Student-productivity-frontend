import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Pressable, Text, TextInput, View, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../../store/useStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
    const [about, setAbout] = useState("");
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const userName = useStore((state: any) => state.userName);
    const logout = useStore((state: any) => state.logout);
    useEffect(() => {
        const loadAbout = async () => {
            const savedAbout = await AsyncStorage.getItem('userAbout');
            if (savedAbout) setAbout(savedAbout);
        };
        loadAbout();
    }, []);

    // Save text to the phone's storage
    const handleAddAbout = async () => {
        await AsyncStorage.setItem('userAbout', about);
        Alert.alert("Saved", "Your about info has been updated.");
    }
    const handleLogOut = () => {
        Alert.alert(
            "Log Out?",
            "Do you really want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel", //This gives it the native "cancel" styling (like bold text on iOS)
                },
                {
                    text: "Yes",
                    style: "destructive", // Optional: makes the text red on iOS
                    onPress: () => logout()
                }
            ]
        )
    }

    return (
        <SafeAreaView className="gap-2 px-2 flex-1">

            <View className="rounded-lg bg-slate-100 p-5 flex-row justify-between items-center">
                <Text className="text-xl">{userName || "Student"}</Text>
                <Ionicons name="person-outline" size={30} />
            </View>

            <View className="rounded-lg bg-slate-100 p-5">
                <View className="flex-row justify-between items-center">
                    <Text className="text-xl">About</Text>
                    <Ionicons name="pencil-outline" size={30} />
                </View>
                <TextInput
                    placeholder="Tell us about your goals and aspirations"
                    placeholderTextColor="#a1a1aa"
                    autoCapitalize='sentences'
                    value={about}
                    multiline={true}
                    numberOfLines={3}
                    onChangeText={setAbout}
                    textAlignVertical="top"
                />
                <Pressable className="bg-red-300 w-20 p-2 rounded-lg items-center justify-center "
                    onPress={handleAddAbout}
                >
                    <Text className='text-xl'>
                        Save
                    </Text>
                </Pressable>
            </View>


            <View className="rounded-lg bg-slate-100 p-5 flex-row justify-between items-center">
                <Text className="text-xl">Notification</Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: '#cbd5e1', true: '#8b5cf6' }}
                />
            </View>


            <Pressable>
                <View className="rounded-lg bg-slate-100 p-5 flex-row justify-between items-center">
                    <Text className="text-xl">Settings</Text>
                    <Ionicons name="settings-outline" size={30} />
                </View>
            </Pressable>

            <Pressable onPress={handleLogOut}>
                <View className="rounded-lg bg-slate-100 p-5 flex-row justify-between items-center">
                    <Text className="text-xl">Log out</Text>
                    <Ionicons name="log-out-outline" size={30} />
                </View>
            </Pressable>

        </SafeAreaView>
    )
}