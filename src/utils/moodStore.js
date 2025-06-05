import { create } from "zustand";

const useMoodStore = create((set) => ({
    userExpression: "",
    setUserExpression: (expression) => set({ userExpression: expression }),
}));

export default useMoodStore;
