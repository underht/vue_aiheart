<template>
  <div class="hero-container">
    <div class="hero-content">
      
      <div class="text-placement">
        <h1 class="main-title">
          一次温暖的对话<br />
          <span class="highlight-text">化孤独为慰藉</span>
        </h1>
        <p class="subtitle-text">
          每个深夜，每个焦虑的时刻，我们都在这里。不必独自承受，让心与心的连接温暖您的每一天
        </p>
        <div class="cta-buttons">
          <button class="btn-primary" @click="goToConsultation">开始倾诉，获得陪伴</button>
          <button class="btn-secondary" @click="goToLogs">记录心情，释放情感</button>
        </div>
      </div>

      <div class="illustration-placement">
        <div class="circle-bg">
          <el-icon class="robot-icon"><Service /></el-icon>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { Service } from '@element-plus/icons-vue'

// 核心跳转逻辑（可根据你的路由自行修改路径）
const goToConsultation = () => {
  console.log('跳转至 AI 咨询页面')
}

const goToLogs = () => {
  console.log('跳转至 情绪日志页面')
}
</script>

<style scoped>
/* 核心容器：提取了图片中的莫兰迪绿背景，并用 calc 撑满视图 */
.hero-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 64px); /* 减去顶部导航栏高度，防止出现滚动条 */
  background-color: var(--brand-teal-color); /* 还原图片中的绿色底色 */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
  overflow-x: auto;
  box-sizing: border-box;
}

/* 内部左右分栏常规划布 */
.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  max-width: 1200px;
  padding: 0 40px;
  gap: 80px;
}

/* ================= 左侧文案样式 ================= */
.text-placement {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.main-title {
  font-size: 48px;
  font-weight: 700;
  color: var(--text-on-primary-color);
  line-height: 1.4;
  margin: 0 0 24px 0;
  letter-spacing: 1px;
}

/* 亮黄色高亮文本 */
.highlight-text {
  color: var(--brand-accent-color); /* 还原图片中的琥珀黄 */
}

.subtitle-text {
  font-size: 16px;
  color: var(--text-on-primary-color);
  line-height: 1.8;
  margin: 0 0 40px 0;
  max-width: 480px;
}

/* 按钮组合 */
.cta-buttons {
  display: flex;
  gap: 16px;
}

/* 白色实心主按钮 */
.btn-primary {
  background-color: var(--bg-color);
  color: var(--brand-teal-color);
  border: none;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-primary:hover {
  background-color: var(--bg-white-translucent-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 透明镂空次按钮 */
.btn-secondary {
  background-color: transparent;
  color: var(--text-on-primary-color);
  border: 1px solid rgba(255, 255, 255, 0.6);
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-secondary:hover {
  background-color: var(--bg-white-subtle-overlay-color);
  border-color: var(--text-on-primary-color);
  transform: translateY(-2px);
}

/* ================= 右侧机器人图形样式 ================= */
.illustration-placement {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 圆形半透明外圈背景 */
.circle-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 280px;
  background-color: var(--bg-white-overlay-color);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); /* 微弱的高级阴影 */
  animation: floatAnimation 4s ease-in-out infinite; /* 给右侧加个呼吸浮动动效，更灵动 */
}

/* 机器人图标样式 */
.robot-icon {
  font-size: 110px;
  color: var(--text-on-primary-color);
}

/* 简单的上下漂浮呼吸动画，让AI助手看起来是“活的” */
@keyframes floatAnimation {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 响应式适配：屏幕太小时自动变成上下堆叠，防止挤压变形 */
/* @media (max-width: 992px) {
  .hero-container {
    height: auto;
    padding: 60px 0;
  }
  .hero-content {
    flex-direction: column-reverse;
    text-align: center;
    gap: 40px;
  }
  .subtitle-text {
    margin: 0 auto 32px auto;
  }
  .cta-buttons {
    justify-content: center;
  }
} */
</style>
