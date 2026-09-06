import { ref } from "vue";
import { defineStore } from "pinia";
export const useDisplayStore = defineStore("display", () => {
    const theme = ref("light");
    
    function toggleTheme() {
        theme.value = theme.value === "light" ? "dark" : "light";
    }
    
    return { theme, toggleTheme };
});