import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

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

// export const useCounterStore = defineStore('counter',
//   () => {
//     const count = ref(0)
//     function increment() {
//       count.value++
//     }
//     return { count, increment }
//   },
//   {
//     persist: true,
//   }
// );

export const userInfoStore = defineStore('userInfo',
  () => {
    // const userList = ref<userList{}>({})
    //  interface userList {
    //   name: string
    //   paramValue: string
    // }
    // const userList = ref({})

    const userList = reactive({
      token: '',
      name: '',
      role: 1, // 1是普通，2是管理员
      aiOpen: false,
      paramValue: '' // AI界面回答者头像图片
    })
    return { userList }
  },
  {
    persist: true,
  }
);
