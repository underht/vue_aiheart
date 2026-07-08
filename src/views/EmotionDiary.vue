<template>
    <div class="main">
        <div class="cardscontainer">

          <el-card class="emotion-card" :body-style="{ padding: '24px' }">
            <div class="card-header">
              <h2>今日情绪评分</h2>
              <p class="subtitle">您今天的整体情绪状态如何？(1-10分)</p>
            </div>

            <div class="card-body">
              <el-rate
                v-model="score"
                :max="10"
                :colors="rateColors"
                void-color="#E4E7ED"
                @change="handleScoreChange"
              />
              
              <span class="emotion-text" :style="{ color: emotionColor }">
                {{ emotionText }}
              </span>
            </div>
          </el-card>
          <el-card class="emotion-card" :body-style="{ padding: '24px' }">
            <div class="card-header">
              <h2>主要情绪</h2>
            </div>
            
            <!-- 利用 Element Plus 栅格，一行 4 列 (span=6)，自动实现响应式和间距 -->
            <el-row :gutter="16" >
              <el-col 
                v-for="(item, index) in emotions" 
                :key="index" 
                :span="6"
              >
              <el-card style="margin: 5px;">
                <div 
                  class="emotion-item" 
                  :class="{ active: selectedEmotion === index }"
                  @click="selectedEmotion = index"
                >
                  <!-- 图标占位：颜色动态绑定，内部留出 slot 供你填入实际图标 -->
                  <div class="icon-placeholder" :style="{ borderColor: item.color }">
                    <el-image :src="images[item.key]"  with="100%"  hight="100%"/>
                  </div>
                  <span class="label">{{ item.label }}</span>
                </div>
              </el-card>

              </el-col>
            </el-row>
          </el-card>
        </div>
    </div>
    
    

  
</template>

<script setup>
import { ref, computed } from 'vue'
import sad from "@/assets/悲伤.png"
import anxious from "@/assets/焦虑.png"
import surprised from "@/assets/惊讶.png"
import happy from "@/assets/开心.png"
import confused from "@/assets/困惑.png"
import tired from "@/assets/疲惫.png"
import calm from "@/assets/平静.png"
import excited from "@/assets/兴奋.png"


// --- 独立且可复用的算法与核心逻辑模块 ---

// 1. 定义组件的输出事件，方便父组件获取评分数据
const emit = defineEmits(['update:emotionScore'])

// 2. 核心状态：初始化评分为 4 分（对应图片中的4颗星）
const score = ref(4)

// 3. 颜色配置：前3星、前7星、10星的渐变颜色（可根据 UI 调整）
const rateColors = ref(['#F7BA2A', '#F7BA2A', '#F7BA2A'])

/**
 * 核心算法：根据 1-10 的评分，动态计算对应的情绪描述文本
 * 采用 computed 确保响应式更新
 */
const emotionText = computed(() => {
  const val = score.value
  if (val <= 0) return ''
  if (val <= 3) return '极度低落'
  if (val <= 5) return '低落不悦'
  if (val <= 7) return '平静平和'
  if (val <= 9) return '愉悦开心'
  return '充满活力'
})

/**
 * 核心算法：根据评分动态改变文本颜色，提升视觉反馈
 */
const emotionColor = computed(() => {
  return score.value <= 5 ? '#F7BA2A' : '#67C23A'
})

/**
 * 事件处理：当用户点击星星改变分数时触发
 * @param {number} value - 当前选中的分数
 */
const handleScoreChange = (value) => {
  // 将最新的评分传递给父组件
  emit('update:emotionScore', value)
}




// 选中情緒的状态
const selectedEmotion = ref(null)

// 情绪配置列表：提取自图片中各板块的文字和对应的主题色
const emotions = ref([
  { key: 'happy', label: '开心', color: '#FADE2A' },
  { key: 'calm', label: '平静', color: '#409EFF' },
  { key: 'anxious', label: '焦虑', color: '#F56C6C' },
  { key: 'sad', label: '悲伤', color: '#909399' },
  { key: 'excited', label: '兴奋', color: '#67C23A' },
  { key: 'tired', label: '疲惫', color: '#2F338F' },
  { key: 'surprised', label: '惊讶', color: '#E6A23C' },
  { key: 'confused', label: '困惑', color: '#303133' }
])

// 图片映射，模板中通过 emotions 的 key 来取对应图片
const images = {
  happy,
  calm,
  anxious,
  sad,
  excited,
  tired,
  surprised,
  confused
}
</script>

<style scoped>
/* 卡片整体样式 */
.cardscontainer{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.emotion-card {
  max-width: 800px;
  border-radius: 8px;
  border: 1px solid #EBEEF5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.01);
  .emotion-item{

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex:1;

.icon-placeholder{
width:  70px;
height: 70px;
}

  }
}

/* 标题与副标题样式 */
.card-header h2 {
  margin: 0 0 12px 0;
  font-size: 20px;
  color: #303133;
  font-weight: 600;
}

.subtitle {
  margin: 0 0 20px 0;
  font-size: 14px;
  color: #909399;
}

/* 评分区域布局 */
.card-body {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 覆盖 Element Plus 默认的星星大小，使其更契合原型图 */
:deep(.el-rate__item) {
  --el-rate-icon-size: 22px;
  margin-right: 4px;
}

/* 情绪右侧描述文本样式 */
.emotion-text {
  font-size: 14px;
  margin-left: 4px;
  user-select: none;
}
</style>