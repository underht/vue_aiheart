import { ref } from "vue";
import { defineStore } from "pinia";
export const useUserStore = defineStore("user", () => {
    const username=ref('');
    const password=ref('');
    function setUser(user){
        username.value=user.username;
        password.value=user.password;
    }
  return {
    username,
    password,
    setUser
  };
});
