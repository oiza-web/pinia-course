import { defineStore } from "pinia";

export const useAuthUserStore =  defineStore("useAuthUserStore", {
  state: () => {
    return {
      username: "mary_oiza"
    }
  }
});