<template>

  <div>
    <div class="header-container">
      <div class="brand-section">
        <div class="brand-icon-wrapper">
          <el-icon class="brand-icon"><Service /></el-icon>
        </div>
        <span class="brand-name">心理健康AI助手</span>
      </div>

      <div class="nav-section">
        <div class="nav-links">
          <router-link to="/" class="nav-item">首页</router-link>
          <router-link to="/knowledge" class="nav-item">知识库</router-link>
          <router-link to="/consultation" class="nav-item" v-if="islogin">AI咨询</router-link>
          <router-link to="/emotiondiary" class="nav-item" v-if="islogin">情绪日志</router-link>
        </div>

        <div class="divider" v-if="!islogin"></div>

        <div class="action-section">
          <router-link to="/auth/login" class="login-link" v-if="!islogin">登录</router-link>
          <el-button to="/auth/register" type="primary" class="register-btn" v-if="!islogin">注册</el-button>
          <el-button type="danger" plain class="logout-btn" v-if="islogin" @click="handlelogout">退出登录</el-button>
        </div>
      </div>


    </div>
    <router-view />    
    
  </div>

</template>

<script setup>
import { Service } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';
import { logoutApi } from '@/api/admin.js';

const handlelogout = async() => {
  localStorage.removeItem('token');
  try {
    await logoutApi();
    islogin.value = false;
  } catch (error) {
    console.error(error);
  } 
}
const islogin = ref(false)
onMounted(() => {
  islogin.value = !!localStorage.getItem('token')
})
</script>

<style scoped>
/* 核心容器优化：纯白背景配合精致阴影 */
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 32px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid #f0f2f5;
  user-select: none;
}

/* 左侧品牌：增加渐变图标背景，更具现代感 */
.brand-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
  border-radius: 10px;
}

.brand-icon {
  font-size: 20px;
  color: #0284c7;
}

.brand-name {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  letter-spacing: 0.5px;
}

/* 右侧导航整体布局 */
.nav-section {
  display: flex;
  align-items: center;
  gap: 32px;
  height: 100%;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
  height: 100%;
}

/* 导航项：增加底部激活交互条 */
.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 15px;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.25s ease;
}

.nav-item:hover {
  color: #0284c7;
}

/* 路由激活时的视觉样式 (Vue Router 自动添加的类名) */
.nav-item.router-link-active {
  color: #0284c7;
  font-weight: 600;
}

.nav-item.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #0284c7;
  border-radius: 3px 3px 0 0;
}

/* 视觉分割线 */
.divider {
  width: 1px;
  height: 16px;
  background-color: #e2e8f0;
}

/* 按钮区域布局 */
.action-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* 登录文字链接 */
.login-link {
  font-size: 14px;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.25s;
}

.login-link:hover {
  color: #0284c7;
}

/* 注册按钮：符合整体UI的圆角与高亮 */
.register-btn {
  border-radius: 8px;
  padding: 8px 18px;
  font-weight: 500;
  background-color: #0284c7;
  border-color: #0284c7;
  transition: all 0.25s;
}

.register-btn:hover {
  background-color: #0369a1;
  border-color: #0369a1;
  transform: translateY(-1px);
}

/* 退出按钮：采用低调的浅红外框，避免过于刺眼 */
.logout-btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.25s;
}

.logout-btn:hover {
  transform: translateY(-1px);
}
</style>