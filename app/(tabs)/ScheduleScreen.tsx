import { useState } from 'react';
import { ScrollView, View, Text, Pressable, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import ScheduleTaskItem from '@/components/ScheduleTaskItem';
import ScheduleClassItem from '@/components/ScheduleClassItem';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useStore } from '../../store/useStore';

export default function ScheduleScreen() {
  const today = new Date().toISOString().split('T')[0]; //to take the current date from users phones internal system clock
  const [selectedDate, setSelectedDate] = useState(today);
  // const mockData = [{ id: 1, title: "Assignment to be done by me of mathematics and english.", date: "2026-09-10" }, { id: 2, title: "maths", date: "2026-09-10" }, { id: 3, title: "english", date: "2026-09-10" }];
  // const [tasks, setTasks] = useState(mockData);
  // const mockClasses = [{ id: 1, title: "maths", date: "2026-09-10", time: "10:00" }, { id: 2, title: "english", date: "2026-09-10", time: "10:00" }]
  // const [newClass, setNewClass] = useState(mockClasses);
  const tasks = useStore((state: any) => state.tasks);
  const classes = useStore((state: any) => state.classes);
  const addTask = useStore((state: any) => state.addTask);
  const addClasses = useStore((state: any) => state.addClasses);
  const [newdate, setNewDate] = useState(new Date());
  const [clock, setClock] = useState(false);
  const [subject, setSubject] = useState("")
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObj = {
        id: Date.now(),
        title: newTask,
        date: selectedDate
      }
      addTask(newTaskObj);
      setNewTask("");
    }
  }
  const handleAddClass = (timeString: any) => {
    if (subject.trim() !== "") {
      const newSubjectObj = {
        id: Date.now(),
        title: subject,
        date: selectedDate,
        time: timeString
      }
      addClasses(newSubjectObj);
      setSubject("");
    }
  }


  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="gap-8 px-2">

          <View className="border-4 border-rose-400 rounded-lg">
            <Calendar
              onDayPress={day => {
                setSelectedDate(day.dateString);
              }}
              markedDates={{
                [selectedDate]: { selected: true }
              }}
              theme={{    //we cannot use tailwind inside theme
                todayTextColor: 'red'
              }}
            >
            </Calendar>
          </View>


          <View className="gap-4">
            <Text className="dark:text-white text-2xl">
              Let's crush them out!!
            </Text>
            <View className="gap-2">
              {
                tasks
                  .filter((item: any) => item.date == selectedDate)
                  .map((item: any) => (
                    <ScheduleTaskItem
                      key={item.id}
                      title={item.title}
                    />
                  ))
              }
            </View>
            <View className="flex-row items-center gap-4">
              <TextInput
                placeholder='Type new task...'
                placeholderTextColor="#a1a1aa"
                autoCapitalize='sentences'
                className="bg-slate-100 dark:bg-slate-800 rounded-lg flex-1 text-black dark:text-white px-4 text-lg"
                value={newTask}
                onChangeText={setNewTask}
              />
              <Pressable onPress={handleAddTask}>
                <Text className="text-xl text-amber-500">
                  Add task
                </Text>
              </Pressable>
            </View>
          </View>


          <View className="gap-4">
            <Text className="dark:text-white text-2xl">
              Today's Classes
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row "
              contentContainerStyle={{ gap: 8 }}
            >
              {classes
                .filter((item: any) => item.date == selectedDate)
                .map((item: any) => {
                  return (
                    <ScheduleClassItem
                      key={item.id} //id prop is necessary when rendering a list using .map()
                      time={item.time}
                      title={item.title}
                    />
                  )
                })}
            </ScrollView>
            <View className=" flex-row items-center gap-4">
              <TextInput
                placeholder='Type subject name...'
                placeholderTextColor="#a1a1aa"
                autoCapitalize='sentences'
                className="bg-slate-100 dark:bg-slate-800 flex-1 rounded-lg text-black dark:text-white px-4 text-lg"
                value={subject}
                onChangeText={setSubject}
              />
              <Pressable
                onPress={() => setClock(true)}
              >
                <Text className="text-xl text-amber-500">Set Time</Text>
              </Pressable>

            </View>
          </View>

        </View>
      </ScrollView>
      {clock && (
        <DateTimePicker
          mode="time"
          value={newdate}
          onChange={(event, selectedDate) => {
            setClock(false);
            if (event.type === "set" && selectedDate) {
              setNewDate(selectedDate);
              const hours = selectedDate.getHours().toString().padStart(2, '0');
              const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
              const formattedTime = `${hours}:${minutes}`;
              handleAddClass(formattedTime);
            }
          }}
        />
      )}
    </SafeAreaView>
  );
}