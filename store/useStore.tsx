import { create } from 'zustand';
const API_URL = 'http://192.168.137.1:3000';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const useStore = create((set) => ({
    // passing your data and functions into create, and it hands you back a brand new, custom React Hook.
    // This custom hook can now be imported into any file in your app (Dashboard, Profile, Schedule) to share the exact same memory.
    tasks: [],
    classes: [],
    userToken: null,
    userName: null,
    // set(), Zustand automatically knows to update the data and re-render any screen that is currently looking at that data.
    fetchTasks: async () => {
        try {
            const response = await fetch(`${API_URL}/tasks`);
            const data = await response.json();
            set({ tasks: data });
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    },

    fetchClasses: async () => {
        try {
            const response = await fetch(`${API_URL}/classes`);
            const data = await response.json();
            set({ classes: data });
        } catch (error) {
            console.error("Error fetching classes:", error);
        }
    },

    // CREATE (POST) data to server and update UI
    addTask: async (newTaskObj: any) => {
        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, // it tells the receiving server that the accompanying text string in post req is formatted as JSON.
                body: JSON.stringify(newTaskObj) // it converts react native json string to flat text string because HTTP network protocols can only transmit raw text.
            });
            const savedTask = await response.json();
            set((state: any) => ({ tasks: [...state.tasks, savedTask] }));
        } catch (error) {
            console.error("Error adding task:", error);
        }
    },

    addClasses: async (newClassObj: any) => {
        try {
            const response = await fetch(`${API_URL}/classes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newClassObj)
            });
            const savedClass = await response.json();
            set((state: any) => ({ classes: [...state.classes, savedClass] }));
        } catch (error) {
            console.error("Error adding class:", error);
        }
    },

    updateTask: async (id: any, newStatus: boolean) => {
        try {
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isCompleted: newStatus })
            });
            const updatedTask = await response.json();
            set((state: any) => ({
                tasks: state.tasks.map((task: any) =>
                    task._id === id ? updatedTask : task
                )
            }));
        }
        catch (error) {
            console.error("Error in updating task: ", error);
        }
    },

    deleteTask: async (id: string) => {
        try {
            await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
            // Filter out the deleted item from the frontend state
            set((state: any) => ({ tasks: state.tasks.filter((task: any) => task._id !== id) }));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    },

    deleteClass: async (id: string) => {
        try {
            await fetch(`${API_URL}/classes/${id}`, { method: 'DELETE' });
            set((state: any) => ({ classes: state.classes.filter((c: any) => c._id !== id) }));
        } catch (error) {
            console.error("Error deleting class:", error);
        }
    },
    login: async (name: string, email: string) => {
        try {
            const dummyToken = 'user-auth-token-123';

            // Save to phone's permanent storage
            await AsyncStorage.setItem('userToken', dummyToken);
            await AsyncStorage.setItem('userName', name);

            // Update local global memory instantly
            set({ userToken: dummyToken, userName: name });
        } catch (error) {
            console.error("Error during login:", error);
        }
    },

    checkAuth: async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const name = await AsyncStorage.getItem('userName');
            if (token) {
                set({ userToken: token, userName: name });
            }
        } catch (error) {
            console.error("Error checking auth:", error);
        }
    },

    logout: async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userName');
            set({ userToken: null, userName: null });
        } catch (error) {
            console.error("Error during logout:", error);
        }
    },
}));