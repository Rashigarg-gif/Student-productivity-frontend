import {create} from 'zustand';
export const useStore= create((set)=>({
    // passing your data and functions into create, and it hands you back a brand new, custom React Hook.
    // This custom hook can now be imported into any file in your app (Dashboard, Profile, Schedule) to share the exact same memory.
    tasks:[
        { id: 1, title: "Assignment to be done by me of mathematics and english.", date: "2026-10-03" }, 
        { id: 2, title: "maths", date: "2026-10-03" }, 
        { id: 3, title: "english", date: "2026-10-03" }
    ],
    classes : [
        { id: 1, title: "maths", date: "2026-10-03", time: "10:00" }, 
        { id: 2, title: "english", date: "2026-10-03", time: "10:00" }
    ],
    // set(), Zustand automatically knows to update the data and re-render any screen that is currently looking at that data.
    addTask: (newTask: any)=> set((state: any)=>({
        //You call set. Zustand hands you state (which contains everything currently in the store).
        tasks: [...state.tasks, newTask]

    })),
    addClasses: (newClass: any)=> set((state: any)=>({
        classes: [...state.classes, newClass]
    }))

}));