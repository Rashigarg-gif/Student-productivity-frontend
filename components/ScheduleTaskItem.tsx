import { Ionicons } from '@expo/vector-icons';
import {Text, View, Pressable } from 'react-native';
import {useState} from 'react';
interface ScheduleTaskProps {
    title: string;
}

export default function ScheduleTaskItem({title}: ScheduleTaskProps) {
    const [isChecked, setIsChecked] = useState(false);
    return(
        <View className= 'bg-rose-200 dark:bg-rose-100 rounded-lg p-6 flex-row justify-between gap-2'>
            <Pressable
                className="items-center justify-center w-6 h-6 border-2 border-rose-400 rounded-md mt-1"
                onPress={() => setIsChecked(!isChecked)}
            >
                {isChecked && (
                    <Ionicons name="checkmark-sharp" size={20} color="green" />
                )}
            </Pressable>
            <Text className= "flex-1 text-xl">{title}</Text>
            {/* flex-1: Forces the text to respect the boundaries of its parent container. 
            If it hits the edge, it will neatly wrap the long sentence onto a second or third line instead of pushing siblings away. */}
            <Pressable>
                <Ionicons name="trash-outline" size={20} />
            </Pressable>
        </View>
    );
}