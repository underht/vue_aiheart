<template>
    <div class="navbar">
        <div class="flex-box">
            <el-button @click="handleCollapse"><Expand style="width: 20px; height: 20px; color: black;"/></el-button>
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
const handleCollapse=()=>{
    useAdminStore().toggleCollapse()
    console.log('Navbar collapsed:', useAdminStore().isCollapsing)
}
const handlelogout = () => {
    console.log('Logout clicked')
}
const router = useRouter();
const route = useRoute();
</script>


<style lang="scss" scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    background-color: #ffffff;
    height: 60px;
    .flex-box {
        display: flex;
        align-items: center;
        color: rgb(0, 0, 0);
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
    color: rgb(0, 0, 0);
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