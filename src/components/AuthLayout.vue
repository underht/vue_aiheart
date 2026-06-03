<template>
    <div class="auth-layout">
        <div class="left">
            <div class="content-card">
                <el-image class="logo" :src="imglink" fit="cover" alt="Logo" />
                <h1 class="title">心理健康助手</h1>
                <p class="subtitle">关怀每一份情绪，陪伴每一步成长</p>
                <div class="features">
                  <div class="feature">
                    <strong>数据可视化</strong>
                    <span>直观展示用户状态</span>
                  </div>
                  <div class="feature">
                    <strong>知识库</strong>
                    <span>智能推荐文章</span>
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
.auth-layout {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #2b5876 0%, #4e4376 100%);
  color: #fff;

  /* 当屏幕过窄时上下排列 */
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }

  .left {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;

    @media (max-width: 900px) {
      width: 100%;
      padding: 32px 20px;
    }

    .content-card {
      width: 100%;
      max-width: 420px;
      background: rgba(255,255,255,0.06);
      border-radius: 14px;
      padding: 28px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.25);
      text-align: center;
      backdrop-filter: blur(6px);

      .logo {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin: 0 auto 16px;
        box-shadow: 0 6px 18px rgba(0,0,0,0.35);
        border: 2px solid rgba(255,255,255,0.08);
      }

      .title {
        font-size: 22px;
        margin: 6px 0;
        font-weight: 700;
        color: #fff;
      }

      .subtitle {
        font-size: 14px;
        margin: 0 0 16px;
        color: rgba(255,255,255,0.85);
      }

      .features {
        display: flex;
        gap: 12px;
        justify-content: center;
        margin-top: 8px;

        @media (max-width: 480px) {
          flex-direction: column;
          gap: 8px;
        }

        .feature {
          background: rgba(255,255,255,0.03);
          padding: 10px 12px;
          border-radius: 8px;
          min-width: 120px;
          text-align: left;
          strong {
            display: block;
            font-size: 13px;
            color: #fff;
          }
          span {
            display: block;
            font-size: 12px;
            color: rgba(255,255,255,0.75);
            margin-top: 4px;
          }
        }
      }
    }
  }

  .right {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;

    @media (max-width: 900px) {
      width: 100%;
      padding: 24px;
    }

    /* 保证右侧内容居中且有合适的容器宽度 */
    & > * {
      width: 100%;
      max-width: 520px;
    }
  }
}
</style>