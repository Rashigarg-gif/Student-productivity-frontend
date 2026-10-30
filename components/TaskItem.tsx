import { Text, View, Pressable } from 'react-native';
import { useState } from 'react';
import {Ionicons} from '@expo/vector-icons';
interface TaskProps {
    title: string;
}

export default function TaskItem({ title }: TaskProps) {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <View className=" flex-row items-center w-[75vw] rounded-xl bg-violet-100 gap-2 p-8">
            <Pressable
                className="items-center justify-center w-6 h-6 border-2 border-violet-700 rounded-md"
                onPress={() => setIsChecked(!isChecked)}
            >
                {isChecked && (
                    <Ionicons name="checkmark-sharp" size={20} color="green" />
                )}
                {/* It is called Conditional Rendering. && means "AND". if left side is true then render the right otherwise don't */}
            </Pressable>
            <Text className="text-2xl" numberOfLines={1}>
                {title}
            </Text>
        </View>
    );
}