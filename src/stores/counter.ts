// import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// const store = createPinia()
// store.use(piniaPluginPersistedstate)
// export default store

import { defineStore } from 'pinia';
import { ref } from 'vue';

// export const useCounterStore = defineStore('counter', {
//   state: () => {
//     return { count: 0 };
//   },
//   // state: () => ({ count: 0 }),
//   actions: {
//     increment() {
//       this.count++;
//     },
//   },
// });

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }
  return { count, increment }
});