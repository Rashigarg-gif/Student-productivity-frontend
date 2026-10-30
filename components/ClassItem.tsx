import {View, Text} from 'react-native';
interface ClassProp{
    time: string;
    title: string;
}

export default function ClassItem(props: ClassProp) {
    return(
        <View className= "w-[75vw] rounded-xl bg-violet-100 justify-center p-8 gap-2">
            <Text className= "text-base">
                {props.time}
            </Text>
            <Text className= "text-2xl" numberOfLines={1}>
                {props.title}
            </Text>
        </View>
    )
}