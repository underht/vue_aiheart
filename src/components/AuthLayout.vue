<template>
    <div class="auth-layout">
        <div class="centered-hero-container">
          <div class="content-card">
            
            <h1 class="main-title">心理AI助手</h1>

            <p class="description-text">
              每个深夜，每个焦虑的时刻，我们都在这里。不必独自承受，让心与心的连接温暖您的每一天
            </p>

            <div class="avatar-wrapper">
              <div class="circle-avatar">
                <el-icon class="robot-icon"><Service /></el-icon>
              </div>
            </div>

          </div>
        </div>
        <div class="right">
            <router-view />
        </div>
    </div>
</template>

<script setup>
const imglink = new URL('../assets/rbt.png', import.meta.url).href
</script>

<style lang="scss" scoped>
.auth-layout{
  display: flex;
  height: 100%;
  width: 100% ;


}

.centered-hero-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100vh;
  background-color: #588e7e;  /* 保持与图片一致的绿色背景 */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-sizing: border-box;
  padding: 0;
}

/* ================= 内部居中卡片 ================= */
.content-card {
  display: flex;
  flex-direction: column;
  align-items: center;      /* 确保内部所有元素水平居中 */
  text-align: center;       /* 确保多行文本居中对齐 */
  max-width: 600px;         /* 限制最大宽度，防止大屏上文字拉得太长 */
  width: 100%;
}

/* ================= 1. 主标题样式 ================= */
.main-title {
  font-size: 40px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 24px 0;
  letter-spacing: 2px;     /* 字间距微调，更显大气 */
}

/* ================= 2. 副文本样式 ================= */
.description-text {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9); /* 半透明白，降低视觉刺眼度 */
  line-height: 1.8;        /* 舒适的行高 */
  margin: 0 0 40px 0;
  white-space: pre-wrap;   /* 允许文本根据容器自动换行 */
  max-width: 500px;        /* 限制文本行宽，完美还原图片视觉比例 */
}

/* ================= 3. 机器人图标样式 ================= */
.avatar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  background-color: rgba(255, 255, 255, 0.12); /* 淡淡的半透明白圈 */
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* 柔和阴影带来立体感 */
  transition: transform 0.3s ease;
}

/* 鼠标悬浮微动效 */
.circle-avatar:hover {
  transform: scale(1.03);
}

.robot-icon {
  font-size: 64px;
  color: #ffffff;
}
.right{
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>