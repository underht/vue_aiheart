<template>

    <div class="main-container">
        <div class="left-container">
            <div class="dashboard-container">
                <el-card class="card-item" shadow="hover">
                <div class="card-content">
                    <div class="ai-status">
                            <div>
                            <el-avatar>
                                <i-local-robot></i-local-robot>                        

                            </el-avatar>
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
                            <i-local-heart class="my-heart" />

                            <i-mdi-alarm />
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
                                <i-local-robot></i-local-robot>                        
                            </el-avatar>
                            
                            <div class="message-block">
                                <div class="name">宁波AI助手</div>
                                <div class="message-content">
                                    <p>您好，我是宁波AI助手，有什么可以帮助您的吗？您的心理健康由我来倾听守护。</p>
                                </div>
                                <div class="message-time">
                                <p>刚刚</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div class="chat-input">
                        <el-row :gutter="12" align="bottom" style="width: 100%; max-width: 800px; margin: 0 auto;">
                            
                            <el-col :span="21">
                            <el-input
                                v-model="inputText"
                                type="textarea"
                                :rows="3"
                                maxlength="500"
                                resize="none"
                                @keydown="handleKeyDown"
                                :disable="aiissending"
                            />
                            
                            <el-row justify="space-between" style="margin-top: 6px; color: #a8abb2; font-size: 12px;">
                                <span>按Enter发送，Shift+Enter换行</span>
                                <span>{{ inputText.length }}/500</span>
                            </el-row>
                            </el-col>

                            <el-col :span="3" style="display: flex; justify-content: flex-end;">
                            <el-button
                                color="#f3a73f"
                                :icon="Position"
                                style="width: 54px; height: 54px; border-radius: 16px; font-size: 20px;"
                                @click="handleSend"
                            />
                            </el-col>

                        </el-row>

                </div>
            </div>

        </div>
    </div>

</template>

<script setup>
import like from '@/assets/like.png'
import { Plus, UserFilled, ChatDotRound, Service } from '@element-plus/icons-vue'
import { ref } from 'vue'
// 引入 Element Plus 官方的纸飞机/发送图标
import { Position } from '@element-plus/icons-vue'

// 声明组件对外触发的自定义事件
const emit = defineEmits(['send'])

// 输入框绑定的响应式变量
const inputText = ref('')

/**
 * 核心逻辑模块：键盘事件监听算法
 * 目的：拦截标准的 Enter 换行，改成交给发送逻辑处理；同时保留 Shift+Enter 的原生换行能力
 */
const handleKeyDown = (event) => {
  // 识别到按下 Enter 键，且此时并没有按下 Shift 键
  if (event.key === 'Enter' && !event.shiftKey) {
    // 必须阻止默认的换行行为，否则输入框会多出一个回车
    event.preventDefault()
    // 调用核心发送模块
    handleSend()
  }
}

/**
 * 核心逻辑模块：执行发送操作
 * 目的：校验数据、触发向外传递事件并清空当前状态
 */
const handleSend = () => {
  // 过滤掉纯空格，防止发空消息
  const trimmedText = inputText.value.trim()
  if (!trimmedText) return

  // 将封装好的核心数据通过事件派发给父组件
  emit('send', trimmedText)

  // 成功发送后，重置复用模块的输入状态
  inputText.value = ''
}



const aiissending=ref(false)
const messages = ref([]);
</script>

<style scoped>
.main-container{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background-color: #f5f7fa;   
    .left-container {
        width: 30%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;

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
    border-bottom: 1px solid #898989; 
    background-color: #c77b29;
    
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
        color: #ffffff;
        line-height: 1.4;
    }

    .title-sub {
        margin: 0;
        font-size: 13px;
        color: #ffffff;
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
    .message-time{
        font-size: 12px;
        color: #909399;
        text-align: left;
    }
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
.my-heart{
    width: 40px;

}
.chat-input{
    padding: 10px;
}
</style>