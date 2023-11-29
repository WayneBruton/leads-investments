import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "John Doe",
  }),
  persist: true,
  getters: {},
  actions: {},
});
