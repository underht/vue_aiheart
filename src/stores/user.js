import { ref } from "vue";
import { defineStore } from "pinia";
export const useUserStore = defineStore("user", () => {
    const username = ref('');
    const token = ref('');
    const role = ref('');

    function setUser(user) {
        username.value = user.username;
        token.value = user.token;
        role.value = user.role;
    }

    function clearUser() {
        username.value = '';
        token.value = '';
        role.value = '';
    }

    return {
        username,
        token,
        role,
        setUser,
        clearUser
    };
});