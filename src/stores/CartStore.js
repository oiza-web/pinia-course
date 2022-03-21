import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    };
  },
  getters: {
    counts() {
      return this.items.length
    },
    isEmpty() {
      this.counts === 0
    }
  },
  actions: {
    addItems(item, count) {
      count = parseInt(count);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },
  },
  // example of patching in store where actions was used
  // addItems(item, count) {
  //   count = parseInt(count)
  //   this.$patch((state)=> {

  //     for (let index = 0; index < count; index++){
  //       state.this.items.push(item)
  //     }
  //   })

  // }
});