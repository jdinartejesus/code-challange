import { createPinia, defineStore } from "pinia";

export const useStore = defineStore('main', {
  state: () => {
    return {
      projects: [],
      getaways: [],
    }
  }
})

export default createPinia();
