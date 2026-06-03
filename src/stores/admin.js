import { ref } from "vue";
import { defineStore } from "pinia";
export const useAdminStore = defineStore("admin", () => {
const  isCollapsing = ref(false);
const toggleCollapse = () => {
    isCollapsing.value = !isCollapsing.value;
}
  return {
    isCollapsing,
    toggleCollapse,
  };
});
