<template>

    <div class="main-container">
        <div class="left-container">
            <div class="dashboard-container">
                <!-- 第一个卡片：AI助手状态 -->
                <el-card class="card-item" shadow="hover">
                <div class="card-content">
                    <div class="ai-status">
                            <div>
                            <el-avatar>
                                <el-icon><ChatDotRound /></el-icon>
                            </el-avatar>
                            </div>
                        <span class="ai-title">宁波AI助手</span>
                        <el-tag type="success" size="small" effect="plain">在线服务中</el-tag>
                    </div>
                </div>
                </el-card>

                <!-- 第二个卡片：情绪花园 -->
                <el-card class="card-item" shadow="hover">
                <div class="card-content">
                    <div class="emotion-section">
                    <span class="emotion-title">情绪花园</span>
                    
                    <div class="emotion-display">
                        <p>中性</p>
                        <p>50</p>
                    </div>
                    <div class="emotion-today">
                        <span class="today-label">今天感觉</span>
                        <div class="today-options">
                        <el-tag type="info" size="small" effect="plain">很不错</el-tag>
                        <el-tag type="primary" size="small" effect="plain" class="active-tag">一般</el-tag>
                        </div>
                    </div>
                    </div>
                </div>
                </el-card>

                <!-- 第三个卡片：建议和会话历史 -->
                <el-card class="card-item" shadow="hover">
                <div class="card-content">
                    <div class="info-section">
                    <div class="suggestion">
                        <span class="suggestion-label">给你的小建议</span>
                        <span class="suggestion-text">情绪状态平稳</span>
                    </div>
                    <div class="history">
                        <span class="history-label">会话历史</span>
                        <span class="history-empty">暂无会话记录</span>
                    </div>
                    </div>
                </div>
                </el-card>
            </div>
        </div>
            
        <div class="right-container">
            <div class="chat-container">
                <!-- 修改后的 Chat Header 模块 -->
                <div class="chat-header">
                    <div class="chat-title">
                        <div class="img-wrapper">
                            <el-image :src="like" fit="cover" show-progress></el-image>
                        </div>
                        <div class="chat-info">
                            <h3 class="title-main">宁波AI助手</h3>
                            <p class="title-sub">您的贴心 AI 心理健康助手</p>
                        </div>
                    </div>
                    <!-- 优化原有的纯 button，改用 Element Plus 风格按钮 -->
                    <el-button class="action-btn" circle>
                        <el-icon><Plus /></el-icon>
                    </el-button>
                </div>
                <div class="chat-body">

                </div>
            </div>

        </div>
    </div>

</template>

<script setup>
import like from '@/assets/like.png'
import { Plus, UserFilled, ChatDotRound } from '@element-plus/icons-vue'
import {ref} from'vue'

const message=ref([]);

</script>

<style scoped>
.main-container{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    .left-container {
        width: 40%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        background-color: #f5f7fa;
    }
    .right-container {
        width: 60%;
        height: 100%;
        display: flex;
        align-items: center;
        .chat-container {
          width: 80%;
          height: 80%;
          display: flex;
          margin: 30px;
          flex-direction: column;
          /* 撑托起整体聊天面板的质感 */
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
    }
}
.dashboard-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 200px;
  flex-wrap: wrap;
  flex-direction: column;
}

.card-item {
  flex: 1;
  min-width: 200px;
  border-radius: 12px;
  background: #ffffff;
  transition: all 0.3s ease;
}

.card-item:hover {
  transform: translateY(-4px);
}

.card-content {
  padding: 10px 0;
}

/* 第一个卡片样式 */
.ai-status {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ai-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

/* 第二个卡片样式 */
.emotion-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.emotion-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.emotion-display {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.emotion-today {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.today-label {
  font-size: 14px;
  color: #606266;
}

.today-options {
  display: flex;
  gap: 8px;
}

.active-tag {
  background-color: #409EFF !important;
  color: #ffffff !important;
  border-color: #409EFF !important;
}

/* 第三个卡片样式 */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.suggestion {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.suggestion-label {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.suggestion-text {
  font-size: 14px;
  color: #303133;
  padding: 4px 0;
}

.history {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.history-label {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.history-empty {
  font-size: 14px;
  color: #909399;
  padding: 4px 0;
}

/* ==========================================================================
   全新美化后的 Chat Header 样式区域
   ========================================================================== */
.chat-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    width: 100%;
    box-sizing: border-box;
    background-color: #ffffff;
    /* 采用精致的底部柔和分割线代替原大块深色背景 */
    border-bottom: 1px solid #f0f2f5; 

    .chat-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 14px;
    }
}

/* 头像外包裹器：重构为更加小巧精致的圆形规格 */
.img-wrapper {
    height: 60px;
    width: 60px;
    background-color: #f0f2f5;
    border-radius: 50%; 
    overflow: hidden; 
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e4e7ed;

    .el-image {
        width: 80%;
        height: 80%;
    }
}

/* 文本信息排列：拉开主次层级，更加易读 */
.chat-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;

    .title-main {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #1f2f3d;
        line-height: 1.4;
    }

    .title-sub {
        margin: 0;
        font-size: 13px;
        color: #909399;
        line-height: 1.4;
    }
}

/* 功能按钮美化：融入整体色调，带细腻过渡动效 */
.action-btn {
    border: 1px solid #dcdfe6 !important;
    color: #606266 !important;
    background: #ffffff !important;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: #409eff !important;
        border-color: #c6e2ff !important;
        background-color: #ecf5ff !important;
        transform: scale(1.05);
    }
}
</style>