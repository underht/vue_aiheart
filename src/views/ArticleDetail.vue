<template>
  <div class="article-detail-container">
    <!-- 加载状态骨架屏（当数据还没获取到时展示） -->
    <div v-if="!detail.title" class="loading-state">
      加载中...
    </div>

    <!-- 主体内容区 -->
    <article v-else class="article-card">
      <!-- 文章封面图 -->
      <div v-if="detail.coverImage" class="article-cover">
        <img :src="detail.coverImage" :alt="detail.title" />
      </div>

      <!-- 文章头部信息 -->
      <header class="article-header">
        <!-- 分类与状态标签 -->
        <div class="meta-tags">
          <span class="category-badge">{{ detail.categoryName }}</span>
          <span v-if="detail.status === 2" class="status-badge offline">{{ detail.statusText }}</span>
        </div>

        <!-- 文章标题 -->
        <h1 class="article-title">{{ detail.title }}</h1>

        <!-- 作者与发布时间等元数据 -->
        <div class="article-meta">
          <div class="author-info">
            <span class="author-name">✍️ {{ detail.authorName }}</span>
          </div>
          <div class="time-info">
            <span>发布于：{{ detail.publishedAt || detail.createdAt }}</span>
            <span class="divider">|</span>
            <span>浏览量：{{ detail.readCount }}</span>
          </div>
        </div>

        <!-- 文章摘要 -->
        <div v-if="detail.summary" class="article-summary">
          <strong>摘要：</strong>{{ detail.summary }}
        </div>
      </header>

      <!-- 文章正文（解析HTML） -->
      <section class="article-content" v-html="detail.content"></section>

      <!-- 文章底部标签 -->
      <footer class="article-footer">
        <div class="tags-container">
          <span v-for="tag in detail.tagArray" :key="tag" class="tag-item">
            # {{ tag }}
          </span>
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { UserGetArticle } from '../api/admin.js';

const route = useRoute();
const id = ref(route.params.id);
const detail = ref({});

// 核心算法/逻辑：封装独立的异步获取文章详情模块
const getdetail = async () => {
  try {
    const res = await UserGetArticle(id.value);
    // 关键逻辑：将接口返回的数据绑定到响应式变量中
    detail.value = res.data;
    console.log(res);
  } catch (error) {
    console.error('获取文章详情失败：', error);
  }
};

onMounted(() => {
  console.log(id.value);
  getdetail();
});
</script>

<style lang="scss" scoped>
// 容器样式：居中且限定最大宽度，保持视觉聚焦
.article-detail-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

// 骨架加载状态
.loading-state {
  text-align: center;
  padding: 100px 0;
  color: #999;
  font-size: 16px;
}

// 主体卡片样式
.article-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 32px;
}

// 封面图美化
.article-cover {
  margin: -32px -32px 32px -32px;
  max-height: 380px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.02);
    }
  }
}

// 头部区域
.article-header {
  margin-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 24px;

  .meta-tags {
    display: flex;
    gap: 10px;
    margin-bottom: 12px;

    .category-badge {
      background-color: #e8ffea;
      color: #00b42a;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 500;
    }

    .status-badge {
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 4px;
      &.offline {
        background-color: #ffeceb;
        color: #f53f3f;
      }
    }
  }

  .article-title {
    font-size: 30px;
    font-weight: 700;
    line-height: 1.4;
    color: #1d2129;
    margin: 0 0 16px 0;
  }

  .article-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 14px;
    color: #86909c;

    .author-name {
      color: #4e5969;
      font-weight: 600;
    }

    .time-info {
      display: flex;
      align-items: center;
      gap: 8px;
      .divider {
        color: #e5e6eb;
      }
    }
  }

  // 摘要美化
  .article-summary {
    margin-top: 16px;
    padding: 12px 16px;
    background-color: #f7f8fa;
    border-left: 4px solid #165dff;
    border-radius: 0 4px 4px 0;
    font-size: 14px;
    color: #4e5969;
    line-height: 1.6;
  }
}

// 正文区域：清洗并规范化富文本里的HTML标签排版
.article-content {
  font-size: 16px;
  line-height: 1.8;
  color: #27282d;
  word-break: break-word;

  :deep(p) {
    margin-bottom: 1.5em;
    text-align: justify;
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 16px 0;
  }
}

// 底部标签
.article-footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .tag-item {
      background: #f2f3f5;
      color: #4e5969;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 13px;
      transition: all 0.2s;
      &:hover {
        background: #e5e6eb;
        color: #1d2129;
      }
    }
  }
}
</style>