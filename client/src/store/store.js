import create from "zustand";

export const useAuthStore = create((set) => ({
  auth: {
    username: "",
    active: false,
  },
  setUsername: (name) =>
    set((state) => ({ auth: { ...set.auth, username: name } })),
}));
