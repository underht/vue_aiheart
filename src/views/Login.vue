<template>
    <div class="container">

        <div class="back" @click="router.back()">
            <el-icon><Back/></el-icon>
            <p>返回</p>
        </div>
        <div class="header">
            <h1>登录</h1>
        </div>
        <div class="form">
            <el-form 
              :model="formData"
              :rules="rules"
              ref="formRef"
              label-position="top"
            >
                <el-form-item prop="username">
                    <el-input placeholder="请输入用户名" v-model="formData.username" size="large" @keyup.enter="handleLogin"/>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" type="password" v-model="formData.password" size="large" @keyup.enter="handleLogin"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="large" :loading="loading" @click="handleLogin">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
            <div class="links">
                <p class="link">忘记密码？</p>
                <p class="link" @click="router.push('/auth/register')">注册</p>
            </div>
        </div>

        
    </div>
</template>

<script setup>
import { Back } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { login } from '@/api/admin';
const router = useRouter();
const formRef = ref(null);
const loading = ref(false);

const formData = reactive({
    username: "",
    password: ""
});

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
};

const handleLogin = async () => {
    try {
        const response = await login(formData);
        console.log(formData);
        
        localStorage.setItem("token", response.data.token);
        // console.log('response is:', response);

        localStorage.setItem('userinfo', response.data.userInfo);
        localStorage.setItem('roleType', response.data.roleType);

        ElMessage.success("登录成功");
        // console.log('user is:', formData.username);

        if (formData.username === "admin") {
            // localStorage.setItem("role", "admin");
            router.push("/back/dashboard");
        } else {
            // localStorage.setItem("role", "user");
            router.push("/home");
        }
    } catch (error) {
        ElMessage.error("登录失败");
    }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 16px;
  .back{
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
}

.header {
  display: flex;
  padding-left: 50px;
  justify-content: center;
  text-align: center;
  h1{
    margin: 12px 0;
  }
}

.form {
  max-width: 480px;
  margin: 0 auto;
  padding: 24px;
  background: rgba(255,255,255,0.02);
  border-radius: 8px;
}

.links {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  .link {
    color: #409EFF;
    cursor: pointer;
  }
}
</style>