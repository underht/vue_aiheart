<template>
    <div class="navbar">
        <div class="flex-box">
            <el-button @click="handleCollapse"><Expand style="width: 20px; height: 20px; color: var(--text-color);"/></el-button>
            <!-- //button自带的插槽里面有slot -->

            <div class="pagetitle">
                {{ route.meta.title }}
            </div>
        </div>
        <div>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <div class="user-info">
                        <el-avatar src="/src/assets/user.jpg"></el-avatar>
                        <p>admin</p>
                    </div>

                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handlelogout">登出</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { Expand } from '@element-plus/icons-vue'
import { useAdminStore } from '@/stores/admin'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { logoutApi } from '@/api/admin'
import { lo } from 'element-plus/es/locale/index.mjs'
import {useDisplayStore} from '@/stores/display.js'
const handleCollapse=()=>{
    useAdminStore().toggleCollapse()
    console.log('Navbar collapsed:', useAdminStore().isCollapsing)
}

const router = useRouter();
const route = useRoute();

const handlelogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    // 用户点了"确定"，执行登出
    await logoutApi()
    router.push('/auth/login')
    ElMessage.success('退出成功')
    localStorage.removeItem('token')
    localStorage.removeItem('userinfo') ;
    localStorage.removeItem('roleType') ;

  } catch (error) {
    // 点"取消"或关闭弹框会进这里，不用处理
    console.log('取消登出')
  }
}


</script>


<style lang="scss" scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    background-color: var(--bg-color);
    height: 60px;
    .flex-box {
        display: flex;
        align-items: center;
        color: var(--text-color);
        .pagetitle {
            font-size: 18px;
            font-weight: bold;
            margin-left: 10px;
        }
    }
}
.el-dropdown-link{
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--text-color);
    .user-info {
        display: flex;
        align-items: center;
        gap: 10px;
        p {
            margin: 0;
        }
    }
}
</style>
