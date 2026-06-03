<template>
  
    <el-container  class="backend-layout">
      <!--<el-aside width="200px">Aside</el-aside>-->
      <Sidebar class="main-sidebar"/>
      <el-container direction="vertical">
        <el-header>
            <Navbar class="navbar-header"/>
        </el-header>

        <el-main style="background-color: #f5f5f5;">
            <router-view  class="router-view"/>
        </el-main>
      </el-container>
    </el-container>

</template>


<script setup>
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';

</script>

<style lang="scss" scoped>

  .navbar-header {
    background-color: #ffffff;
    // height: 60px;
  }
  .main-sidebar {
    background-color: #ffffff;
    height: 100%;
  }


.backend-layout {
  height: 100vh;
  display: flex;
}

.router-view {
  flex: 1;
  overflow: auto;
    background-color: #ffffff;
    height: 100%;

}

</style>