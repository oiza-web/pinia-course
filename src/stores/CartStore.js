import { defineStore } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "./authUserStore";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    };
  },
  getters: {
    isEmpty: (state) => state.count === 0,
    count: (state) => state.items.length,
    grouped: (state) => {
      const grouped = groupBy(state.items, (item) => item.name)
      const sorted = Object.keys(grouped).sort();
      let inOrder = {};
      sorted.forEach((key) => (inOrder[key] = grouped[key]))
      return inOrder
    },
    groupedCount: (state) => (name) => state.grouped[name].length,
    total: (state) => state.items.reduce((p, c) => p + c.price, 0),
    // using es5
    // using arrow functions
    // count: (state) => state.items.length,
    // isEmpty() {
    //   return this.count === 0
    // }
  },
  actions: {
    checkout() { 
      const authUserStore = useAuthUserStore();
      alert(
        ` ${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`
      );
    },
  
    addItems(count, item) {
      count = parseInt(count);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },
    clearItem(itemName) {
      this.items = this.items.filter((item) => item.name !== itemName);
    },
    setItemsCount(item, count) {
      this.clearItem(item.name)
      this.addItems(count, item)
    }
  },
  // example of patching in store where actions was used
  // addItems(count, item) {
  //   count = parseInt(count)
  //   this.$patch((state)=> {

  //     for (let index = 0; index < count; index++){
  //       state.this.items.push(item)
  //     }
  //   })

  // }
});