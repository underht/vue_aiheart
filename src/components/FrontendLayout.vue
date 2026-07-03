<template>
  <div class="header-container">
    <!-- 左侧品牌区域 -->
    <div class="brand-section">
      <el-icon class="brand-icon"><Service /></el-icon>
      <span class="brand-name">心理健康AI助手</span>
    </div>

    <!-- 右侧导航区域 -->
    <div class="nav-section">
      <el-link :underline="false" class="nav-item" @click="$router.push('/')">首页</el-link>
      <el-link :underline="false" class="nav-item" @click="$router.push('/knowledge')">知识库</el-link>
      <el-link :underline="false" class="nav-item" @click="$router.push('/auth/login')">登录</el-link>
      <el-button type="primary" class="register-btn" @click="$router.push('/auth/register')">注册</el-button>
    </div>
  </div>
</template>

<script setup>
import { Service } from '@element-plus/icons-vue'
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 40px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}

/* 左侧品牌 */
.brand-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-icon {
  font-size: 28px;
  color: #409eff;
}

.brand-name {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  letter-spacing: 1px;
}

/* 右侧导航 */
.nav-section {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-item {
  font-size: 14px;
  color: #606266;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #409eff;
}

.register-btn {
  padding: 8px 20px;
  border-radius: 4px;
}
</style>