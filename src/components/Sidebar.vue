<template>
    <div class="sidebar-container">

        <el-aside height="100%" :width="isCollapsing ? '64px' : '200px'">

            <el-menu
            :collapse="isCollapsing"
            :collapse-transition="false"
            default-active="2"
            class="el-menu-vertical-demo"
            >
            <div class="brand">
                <el-image :src="robotImage" alt="Logo" class="ui"/>
                <div v-show="!isCollapsing">
                    <h4 class="title">心理健康助手</h4>
                    <p class="subtitle">管理后台</p>
                </div>
            </div>
            <el-menu-item @click="selectMenu(key)" index="1" v-for="(item, key) in router.options.routes[0].children" :key="item.path">
            <el-icon>
                <component :is="item.meta.icon" />

            </el-icon>
            <span>{{ item.meta.title }}</span>
            </el-menu-item>
        
        </el-menu>
        </el-aside>

        
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAdminStore } from '@/stores/admin';
import { computed } from 'vue';
const router = useRouter();

console.log(router, 'router');


const robotImage = new URL('../assets/rbt.png', import.meta.url).href;

function selectMenu(key) {
    console.log(key, 'select menu');
    router.push("/back/"+router.options.routes[0].children[key].path);
}
const isCollapsing = computed(() => useAdminStore().isCollapsing);

</script>

<style lang="scss" scoped>
.sidebar-container {
  height: 100vh;
  background-color: #f5f5f5;
}

.brand {
  display: flex;
  align-items: center; /* 垂直居中 */
  gap: 10px; /* 图片和文字之间的间距 */
  height: 60px;
  .ui {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    }
    .title {
    font-size: 16px;
    font-weight: bold;
    margin: 0; /* 去除默认的外边距 */
    }
    .subtitle {
    font-size: 12px;
    // color: darken(#d9d9d9, 10%);
    margin: 0; /* 去除默认的外边距 */
    }
}



</style>