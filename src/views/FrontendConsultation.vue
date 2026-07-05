<template>

    <div class="main-container">
        <div class="left-container">
            <div class="dashboard-container">
                <el-card class="card-item" shadow="hover">
                <div class="card-content">
                    <div class="ai-status">
                            <div>
                            <el-avatar>
                                <!-- <el-icon><ChatDotRound /></el-icon> -->
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Cyborg-2--Streamline-Plump" height="48" width="48">
                                <desc>
                                    Cyborg 2 Streamline Icon: https://streamlinehq.com
                                </desc>
                                <g id="cyborg-2--artificial-robotics-intelligence-machine-technology-android">
                                    <path id="Vector 857 (Stroke)" fill="#2859c5" fill-rule="evenodd" d="M24 8a2 2 0 0 1 2 2l0 8a2 2 0 1 1 -4 0l0 -8a2 2 0 0 1 2 -2Z" clip-rule="evenodd" stroke-width="1"></path>
                                    <path id="Union" fill="#2859c5" d="M24 2a5 5 0 1 0 0 10 5 5 0 0 0 0 -10Z" stroke-width="1"></path>
                                    <path id="Union_2" fill="#8fbffa" d="M24 46.5c5.919 0 10.187 -0.161 13.007 -0.327 3.248 -0.19 5.878 -2.608 6.154 -5.92 0.182 -2.187 0.339 -5.237 0.339 -9.253s-0.157 -7.066 -0.34 -9.253c-0.275 -3.312 -2.905 -5.73 -6.153 -5.92 -2.82 -0.166 -7.088 -0.327 -13.007 -0.327s-10.187 0.161 -13.007 0.327c-3.248 0.19 -5.878 2.608 -6.154 5.92C4.657 23.934 4.5 26.983 4.5 31s0.157 7.066 0.34 9.254c0.275 3.311 2.905 5.729 6.153 5.92 2.82 0.165 7.088 0.326 13.007 0.326Z" stroke-width="1"></path>
                                    <path id="Subtract" fill="#2859c5" fill-rule="evenodd" d="M19 26a2 2 0 1 0 -4 0v1a2 2 0 1 0 4 0v-1Zm12 -2a2 2 0 0 0 -2 2v1a2 2 0 1 0 4 0v-1a2 2 0 0 0 -2 -2ZM16.628 34.545c0.966 -0.91 2.065 -0.507 2.959 0.189 0.15 0.117 0.407 0.296 0.775 0.482 0.727 0.369 1.918 0.784 3.638 0.784s2.911 -0.415 3.638 -0.784a4.76 4.76 0 0 0 0.775 -0.482c0.894 -0.696 1.993 -1.1 2.959 -0.19 0.831 0.785 0.805 2.116 0.012 2.9l-0.12 0.116c-0.098 0.089 -0.23 0.202 -0.395 0.331a8.816 8.816 0 0 1 -1.421 0.893C28.203 39.415 26.395 40 24 40c-2.395 0 -4.203 -0.585 -5.448 -1.216a8.816 8.816 0 0 1 -1.421 -0.893 6.368 6.368 0 0 1 -0.394 -0.331c-0.852 -0.782 -1.019 -2.157 -0.109 -3.015Z" clip-rule="evenodd" stroke-width="1"></path>
                                </g>
                                </svg>                            </el-avatar>
                            </div>
                        <span class="ai-title">宁波AI助手</span>
                        <el-tag type="success" size="small" effect="plain">在线服务中</el-tag>
                    </div>
                </div>
                </el-card>

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
                <div class="chat-header">
                    <div class="chat-title">
                        <div class="img-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Heart--Streamline-Flex" height="24" width="24">
                            <desc>
                                Heart Streamline Icon: https://streamlinehq.com
                            </desc>
                            <g id="heart--reward-social-rating-media-heart-it-like-favorite-love">
                                <path id="Union" fill="#c13153" fill-rule="evenodd" d="M13.75 4.941c-0.023 -1.582 -0.92 -3.14 -2.297 -3.782a3.199 3.199 0 0 0 -2.36 -0.139c-0.705 0.224 -1.412 0.683 -2.093 1.405 -0.681 -0.722 -1.388 -1.18 -2.093 -1.405a3.199 3.199 0 0 0 -2.36 0.139C1.17 1.801 0.273 3.359 0.25 4.941v0.008c0 2.307 1.372 4.351 2.826 5.786a12.326 12.326 0 0 0 2.183 1.726c0.338 0.205 0.657 0.37 0.94 0.486 0.271 0.11 0.553 0.194 0.801 0.194s0.53 -0.084 0.8 -0.194c0.284 -0.115 0.603 -0.28 0.94 -0.486a12.328 12.328 0 0 0 2.184 -1.726C12.378 9.3 13.75 7.256 13.75 4.95l0 -0.008Z" clip-rule="evenodd" stroke-width="1"></path>
                            </g>
                            </svg>
                        </div>
                        <div class="chat-info">
                            <h3 class="title-main">宁波AI助手</h3>
                            <p class="title-sub">您的贴心 AI 心理健康助手</p>
                        </div>
                    </div>
                    <el-button class="action-btn" circle>
                        <el-icon><Plus /></el-icon>
                    </el-button>
                </div>
                
                <div class="chat-body">
                    <div class="chat-messages">
                        <div v-if="messages.length === 0" class="message ai-message">
                            <el-avatar class="chat-avatar" :size="36">
                                <!-- <el-icon><Service /></el-icon> -->
                                
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Cyborg-2--Streamline-Plump" height="48" width="48">
                                <desc>
                                    Cyborg 2 Streamline Icon: https://streamlinehq.com
                                </desc>
                                <g id="cyborg-2--artificial-robotics-intelligence-machine-technology-android">
                                    <path id="Vector 857 (Stroke)" fill="#2859c5" fill-rule="evenodd" d="M24 8a2 2 0 0 1 2 2l0 8a2 2 0 1 1 -4 0l0 -8a2 2 0 0 1 2 -2Z" clip-rule="evenodd" stroke-width="1"></path>
                                    <path id="Union" fill="#2859c5" d="M24 2a5 5 0 1 0 0 10 5 5 0 0 0 0 -10Z" stroke-width="1"></path>
                                    <path id="Union_2" fill="#8fbffa" d="M24 46.5c5.919 0 10.187 -0.161 13.007 -0.327 3.248 -0.19 5.878 -2.608 6.154 -5.92 0.182 -2.187 0.339 -5.237 0.339 -9.253s-0.157 -7.066 -0.34 -9.253c-0.275 -3.312 -2.905 -5.73 -6.153 -5.92 -2.82 -0.166 -7.088 -0.327 -13.007 -0.327s-10.187 0.161 -13.007 0.327c-3.248 0.19 -5.878 2.608 -6.154 5.92C4.657 23.934 4.5 26.983 4.5 31s0.157 7.066 0.34 9.254c0.275 3.311 2.905 5.729 6.153 5.92 2.82 0.165 7.088 0.326 13.007 0.326Z" stroke-width="1"></path>
                                    <path id="Subtract" fill="#2859c5" fill-rule="evenodd" d="M19 26a2 2 0 1 0 -4 0v1a2 2 0 1 0 4 0v-1Zm12 -2a2 2 0 0 0 -2 2v1a2 2 0 1 0 4 0v-1a2 2 0 0 0 -2 -2ZM16.628 34.545c0.966 -0.91 2.065 -0.507 2.959 0.189 0.15 0.117 0.407 0.296 0.775 0.482 0.727 0.369 1.918 0.784 3.638 0.784s2.911 -0.415 3.638 -0.784a4.76 4.76 0 0 0 0.775 -0.482c0.894 -0.696 1.993 -1.1 2.959 -0.19 0.831 0.785 0.805 2.116 0.012 2.9l-0.12 0.116c-0.098 0.089 -0.23 0.202 -0.395 0.331a8.816 8.816 0 0 1 -1.421 0.893C28.203 39.415 26.395 40 24 40c-2.395 0 -4.203 -0.585 -5.448 -1.216a8.816 8.816 0 0 1 -1.421 -0.893 6.368 6.368 0 0 1 -0.394 -0.331c-0.852 -0.782 -1.019 -2.157 -0.109 -3.015Z" clip-rule="evenodd" stroke-width="1"></path>
                                </g>
                                </svg>                                
                            </el-avatar>
                            
                            <div class="message-block">
                                <div class="name">宁波AI助手</div>
                                <div class="message-content">
                                    <p>您好，我是宁波AI助手，有什么可以帮助您的吗？您的心理健康由我来倾听守护。</p>
                                </div>
                            </div>
                        </div>

                        <div class="message" v-for="message in messages" :key="message.id">
                             </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script setup>
import like from '@/assets/like.png'
import { Plus, UserFilled, ChatDotRound, Service } from '@element-plus/icons-vue'
import { ref } from 'vue'

const messages = ref([]);
</script>

<style scoped>
.main-container{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    .left-container {
        width: 30%;
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

/* Chat Header 样式区域 */
.chat-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    width: 100%;
    box-sizing: border-box;
    background-color: #ffffff;
    border-bottom: 1px solid #f0f2f5; 

    .chat-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 14px;
    }
}

.img-wrapper {
    height: 48px;
    width: 48px;
    background-color: #f0f2f5;
    border-radius: 50%; 
    overflow: hidden; 
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e4e7ed;
}

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

/* ==========================================================================
   全新重构后的聊天消息框/对话气泡样式区域
   ========================================================================== */
.chat-body {
    flex: 1;
    padding: 24px;
    overflow-y: auto; /* 保证当内容过多时可以顺畅滚动 */
    background-color: #fcfcfd; /* 聊天背景使用极为微弱的灰白区分工作区 */
}

.chat-messages {
    display: flex;
    flex-direction: column;
    gap: 20px; /* 每一条消息之间的上下间距 */
}

/* 基础单条消息容器 */
.message {
    display: flex;
    gap: 12px;
    width: 100%;
    align-items: flex-start;
}

/* AI助手消息视图 */
.ai-message {
    justify-content: flex-start;
    
    .chat-avatar {
        background-color: #eff5ff;
        color: #409eff;
        border: 1px solid #d9e8ff;
    }
}

/* 包含名字和气泡的块级组合 */
.message-block {
    display: flex;
    flex-direction: column;
    gap: 4px; /* 名字和气泡中间细微留白 */
    max-width: 70%; /* 限制气泡最大宽度，防止单行文字撑满屏幕过长 */
}

/* 用户名字样式：轻量、优雅的排版 */
.name {
    font-size: 12px;
    color: #909399;
    font-weight: 500;
    text-align: left;
    padding-left: 4px;
}

/* 对话气泡主体样式（自适应高度与宽度） */
.message-content {
    background-color: #f0f5ff; /* AI 专属温和浅蓝色气泡 */
    border: 1px solid #e0ebff;
    padding: 12px 16px;
    border-radius: 2px 16px 16px 16px; /* 细节：左上角小圆角，其余大圆角，天然形成对话尾巴视觉 */
    box-shadow: 0 2px 8px rgba(64, 158, 255, 0.04);
    
    p {
        margin: 0;
        font-size: 14px;
        color: #303133;
        line-height: 1.5;
        white-space: pre-wrap; /* 允许文本自动换行并保留换行符 */
        word-break: break-all; /* 防止英文大单词超出边界 */
        text-align: left;
    }
}

/* 💡 附加扩展样式：如果你未来加入了用户发送的消息，只需在容器上加一个 user-message 的 class，就能无缝切换回以下右对齐气泡结构 */
.user-message {
    flex-direction: row-reverse; /* 头像置于右侧 */
    
    .message-block {
        align-items: flex-end; /* 名字和气泡靠右对齐 */
    }
    
    .name {
        padding-right: 4px;
        padding-left: 0;
    }
    
    .message-content {
        background-color: #409eff; /* 用户专属高亮蓝气泡 */
        border: none;
        border-radius: 16px 2px 16px 16px; /* 尾巴朝右 */
        box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
        
        p {
            color: #ffffff; /* 白字提升易读性 */
        }
    }
}
</style>