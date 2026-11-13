import { Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
interface ClassProps {
    id: string;
    time: string;
    title: string;
};
export default function ScheduleClassItem(props: ClassProps) {
    const deleteClass = useStore((state: any) => state.deleteClass);
    return (
        <View className="w-[75vw] rounded-xl bg-rose-200 dark:bg-rose-100 items-center justify-between p-6 flex-row">
            <View className="gap-2">
                <Text className="text-base">
                    {props.time}
                </Text>
                <Text className="text-2xl">
                    {props.title}
                </Text>
            </View>
            <Pressable onPress={() => deleteClass(props.id)} >
                <Ionicons name="trash-outline" size={20} />
            </Pressable>
        </View>
    )
}