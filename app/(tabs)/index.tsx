import { useColorScheme } from "nativewind";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from 'react';
import TaskItem from "@/components/TaskItem";
import ClassItem from "@/components/ClassItem";
import { useStore } from '../../store/useStore';

export default function TabOneScreen() {
  const { colorScheme } = useColorScheme(); //getting a property out of an object.
  // const [task, setTask] = useState([{ id: 1, title: "evs assignment" }, { id: 2, title: "Maths Assigment to be done" }]);
  // const [newClass, setNewClass] = useState([{ id: 1, time: "10:00- 11:00 A.M", title: "Maths" }, { id: 2, time: "11:00- 12:00", title: "English" }]);
  const tasks = useStore((state: any) => state.tasks);
  const classes = useStore((state: any) => state.classes);
  const today = new Date().toISOString().split('T')[0];

  const now = new Date();
  const currentHours = now.getHours().toString().padStart(2, '0');
  const currentMinutes = now.getMinutes().toString().padStart(2, '0');
  const currentTime = `${currentHours}:${currentMinutes}`;
  return (
    <SafeAreaView className="flex-1 gap-8">
      {/*safe area view is used so app adjusts to the device like camera and all.
      flex is used so that element expands to 100% of screen rather than shrinking to its children.*/}

      <View className="bg-fuchsia-100 rounded-xl w-[97%] self-center p-8 justify-center">
        <Text className="font-bold text-8xl text-slate-700">
          Hello Rashi!
        </Text>
        <Text className="font-sans font-bold text-5xl text-slate-700 mt-1">
          What's new today?
        </Text>
      </View>


      <View className="px-3 gap-4">
        <Text className=" dark:text-white text-2xl">
          Today's Tasks
        </Text>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row "
            contentContainerStyle={{ gap: 16 }}
          >
            {tasks
            .filter((item: any) => item.date === today)
            .map((item:any) => {
              return (
                <TaskItem
                  key={item.id}
                  title={item.title}
                />
              )
            })}
          </ScrollView>
        </View>
      </View>



      <View className="px-3 gap-4">
        <Text className="dark:text-white text-2xl">
          Upcoming Classes
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row "
          contentContainerStyle={{ gap: 16 }}
        >
          {classes
          .filter((item: any) => item.date === today && item.time >= currentTime)
          .map((item: any) => {
            return (
              <ClassItem
                key={item.id} //id prop is necessary when rendering a list using .map()
                time={item.time}
                title={item.title}
              />
            )
          })}
        </ScrollView>
      </View>

    </SafeAreaView>
  );
}
{
  /*view is already a flexbox in react but is shrink-wrapped*/
}
{
  /* 
**three flex box properties:
Main axis: flexDirection, cross axis: opposite (default: column up to down is main axis and items sit vertically) 
PARENT:
1.alignItems: flex-start, center, flex-end.(default: stretch, works in the direction opposite of flexDirection)
2.flexDirection: row, column.(default: column, arragnged in one row or column)
3.justifyContent: flex-start, center, flex-end, space-between, space-around.(default: flex-start, works in direction of flexDirection)
CHILD:
1.flex: proportion(operates in the direction of flexDirection)
2.alignSelf: flex-end, flex-start, center(overrides the alignItems) 
**position properties
1.relative: normal
2.absolute:that element is completely igonred by its siblings
(it wont obey align-items:stretch, )
other properties companion to position properties:
1.top 2.bottom 3.left 4.right(acts as margin and no other siblings position is affected even if they are overlapping)
5. ...StyleSheet.absoluteFillObject(for child to completely fill the parent)
*/
}
