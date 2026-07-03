<template>
  <div class="container">
    <div class="back" @click="$router.push('/')">
      <el-icon><ArrowLeft /></el-icon>
      <span>返回首页</span>
    </div>

    <div class="header">
      <h1>用户注册</h1>
    </div>

    <div class="form">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        size="large"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" clearable />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" clearable />
        </el-form-item>

        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入昵称（可选）" clearable />
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号（可选）" clearable />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
            clearable
          />
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            show-password
            clearable
          />
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
            <el-radio :label="2">保密</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleRegister" style="width: 100%">
            注册
          </el-button>
        </el-form-item>
      </el-form>

      <div class="links">
        <span class="link" @click="$router.push('/auth/login')">已有账号？去登录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import { register } from '@/api/admin'
const router = useRouter()
const formRef = ref()
const loading = ref(false)

const form = reactive({
  username: '',
  email: '',
  nickname: '',
  phone: '',
  password: '',
  confirmPassword: '',
  gender: 0,
  userType: 1
})

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== form.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ]
}

const handleRegister = async () => {
    const data=formRef.value;
    try{
        const res=await register(data);
        console.log(res);
        
        if(res.code === '200' || res.success) {
            ElMessage.success('注册成功，请登录');
            router.push('/auth/login');
        } else {
            ElMessage.error(res.msg || res.message || '注册失败');
        }
    }catch(err){
        ElMessage.error('注册失败，请重试');
    }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 16px;
  min-height: 100vh;
  .back {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    color: #c0c4cc;
    &:hover {
      color: #409eff;
    }
  }
}

.header {
  display: flex;
  padding-left: 50px;
  justify-content: center;
  text-align: center;
  h1 {
    margin: 12px 0;
    color: #e4e7ed;
    font-weight: 500;
  }
}

.form {
  max-width: 480px;
  margin: 0 auto;
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  :deep(.el-form-item__label) {
    color: #c0c4cc;
  }
  :deep(.el-input__wrapper) {
    background: rgba(255, 255, 255, 0.05);
  }
  :deep(.el-radio) {
    color: #c0c4cc;
  }
}

.links {
  display: flex;
  justify-content: center;
  margin-top: 12px;
  .link {
    color: #409eff;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>