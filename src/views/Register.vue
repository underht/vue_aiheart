<template>
  <div class="container">
    <div class="back" @click="$router.push('/')">
      <el-icon><ArrowLeft /></el-icon>
      <span>返回首页</span>
    </div>

    <div class="header">
      <h1 class="main-title">创建您的账户</h1>
      <p class="sub-title">请填写注册信息</p>
    </div>

    <div class="form">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        size="large"
      >
        <el-form-item label="用户名或邮箱" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名或邮箱" clearable />
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

        <el-form-item label="性别" prop="gender" class="hidden-field">
          <el-radio-group v-model="form.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
            <el-radio :label="2">保密</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="submit-item">
          <el-button type="primary" :loading="loading" @click="handleRegister" class="submit-btn">
            创建用户
          </el-button>
        </el-form-item>
      </el-form>

      <div class="links">
        <span class="text-muted">已有账户？</span>
        <span class="link" @click="$router.push('/auth/login')">立即登录</span>
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
  gender: 1,
  userType: 1
});

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

    console.log("数据：",form);
    try{
        const res=await register(form);
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
/* 容器背景调整为白净简约的浅色底色 */
.container {
  display: flex;
  flex-direction: column;
  // gap: 60px;
  align-items: center;
  padding: 0;
  height: 100%;
  width: 100% ;
  background-color: var(--bg-color);
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  .back {
    position: absolute;
    top: 24px;
    left: 24px;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    color: var(--text-muted-color);
    font-size: 14px;
    transition: color 0.25s;
    &:hover {
      color: var(--register-link-color);
    }
  }
}

/* 顶部文案精细化控制 */
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 32px;

  .main-title {
    font-size: 32px;
    font-weight: 700;
    color: var(--text-color);
    margin: 0 0 12px 0;
    letter-spacing: 1px;
  }

  .sub-title {
    font-size: 15px;
    color: var(--text-muted-color);
    margin: 0;
  }
}

/* 表单主体宽度与布局优化 */
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0 ;
  padding: 0 ;
  .el-form-item{
    width: 100% ;
  }
}

/* 隐藏图片中不需要展示的项，同时保证业务逻辑字段的完整 */
.hidden-field {
  display: none !important;
}


/* 提交按钮：还原精美蓝色长条 */
.submit-btn {
  width: 100%;
  height: 46px;
  background-color: var(--register-primary-color) !important; /* 还原图中的亮蓝色 */
  border-color: var(--register-primary-color) !important;
  font-size: 15px;
  font-weight: 500;
  border-radius: 6px;
  letter-spacing: 1px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
}

/* 底部跳转模块 */
.links {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;

  .text-muted {
    color: var(--text-color);
    font-weight: 500;
  }

  .link {
    color: var(--register-accent-color); /* 还原图中略偏深紫蓝的文字色 */
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
