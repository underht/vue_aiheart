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
          <router-link to="/home" class="nav-item"> <p>首页</p></router-link>
          <router-link to="/knowledge" class="nav-item"> <p>知识库</p></router-link>
          <router-link to="/consultation" class="nav-item" v-if="islogin"> <p>AI咨询</p></router-link>
          <router-link to="/emotiondiary" class="nav-item" v-if="islogin"> <p>情绪日志</p></router-link>
        </div>

        <div class="divider" v-if="!islogin"></div>

        <div class="action-section">
          <router-link to="/auth/login" class="login-link" v-if="!islogin">登录</router-link>
          <router-link 
            v-if="!islogin" 
            to="/auth/register" 
            class="register-btn"
          >
            <p style="color: var(--text-on-primary-color); margin: 0;">注册</p>
          </router-link>
          <el-button type="danger" plain class="logout-btn" v-if="islogin" @click="handlelogout">退出登录</el-button>
        </div>
      </div>


    </div>
    <div class="main-view">
      <router-view />    
    </div>

    <footer class="footer-container">
      <div class="footer-content">
        <p class="copyright-text">
          &copy; 2026 心理健康AI助手. 保留所有权利.
        </p>
      </div>
    </footer>
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
  background-color: var(--bg-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
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
  background: var(--bg-gradient-color);
  border-radius: 10px;
}

.brand-icon {
  font-size: 20px;
  color: var(--primary-color);
}

.brand-name {
  font-size: 18px;
  font-weight: 600;
  width: 160px;
  color: var(--text-slate-color);
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
    justify-content: center; 
  gap: 28px;
  height: 100%;
}

/* 导航项：增加底部激活交互条 */
.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  width: 60px;
  font-size: 15px;
  color: var(--text-secondary-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.25s ease;
  display: flex;
  justify-content: center;
}

.nav-item:hover {
  color: var(--primary-color);
}

/* 路由激活时的视觉样式 (Vue Router 自动添加的类名) */
.nav-item.router-link-active {
  color: var(--primary-color);
  font-weight: 600;
}

.nav-item.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 3px 3px 0 0;
}

/* 视觉分割线 */
.divider {
  width: 1px;
  height: 16px;
  background-color: var(--bg-color);
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
  color: var(--text-secondary-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.25s;
}

.login-link:hover {
  color: var(--primary-color);
}

/* 注册按钮：符合整体UI的圆角与高亮 */
.register-btn {
  border-radius: 8px;
  padding: 8px 18px;
  font-weight: 500;
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  transition: all 0.25s;
}

.register-btn:hover {
  background-color: var(--primary-dark-color);
  border-color: var(--primary-dark-color);
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

/* 页脚主容器：采用与图片一致的深色高级调性（深蓝灰） */
.footer-container {
  background-color: var(--bg-footer-color); /* 深色背景 */

  padding: 10px 0;
  width: 100%;
  height: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center; /* 居中对齐版权信息 */
  align-items: center;
}

/* 内容布局调整 */
.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  justify-content: center; /* 居中对齐版权信息 */
  align-items: center;
}

/* 版权文字样式优化：提升文字细腻度 */
.copyright-text {
  font-size: 14px;
  color: var(--text-footer-muted-color); /* 柔和的浅灰字色，降低刺眼度 */
  letter-spacing: 0.5px;
  margin: 0;
  font-weight: 400;
  text-align: center;
  transition: color 0.3s ease;
}

/* 鼠标悬浮时微亮交互 */
.copyright-text:hover {
  color: var(--text-footer-color);
}
.main-view{
  height: calc(100vh - 84px);
}
</style>
