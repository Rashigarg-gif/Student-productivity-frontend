import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useStore } from '../store/useStore';

export default function LoginScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = useStore((state: any) => state.login);

    const handleLogin = () => {
        if (name && email && password) {
            login(name, email);
        } else {
            console.log("Please fill all fields");
        }
    };

    return (
        <View className="flex-1 justify-center items-center px-6 bg-white">
            <View className="w-full">
                <Text className="text-3xl font-bold text-center mb-8 text-slate-800">
                    Welcome Back
                </Text>

                <TextInput
                    className="bg-slate-100 border border-slate-300 rounded-lg p-4 mb-4 text-base"
                    placeholder="Your Name"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    className="bg-slate-100 border border-slate-300 rounded-lg p-4 mb-4 text-base"
                    placeholder="Email address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    className="bg-slate-100 border border-slate-300 rounded-lg p-4 mb-8 text-base"
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <Pressable
                    className="bg-violet-700 rounded-lg p-4 items-center active:bg-violet-800"
                    onPress={handleLogin}
                >
                    <Text className="text-white text-lg font-semibold">Sign In</Text>
                </Pressable>
            </View>
        </View>
    );
}