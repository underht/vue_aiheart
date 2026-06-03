<template>


    <router-view  class="router-view"/>

</template>

<script setup>
</script>

<style lang="scss" >
.router-view {
  height: 100vh;
}
/* 1. 彻底清除浏览器自带的边距 */
html, body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
  height: 100%;
}

/* 2. 确保 Vue 的根容器也撑满，不留缝隙 */
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

/* 3. 建议加上这个，防止以后写 padding 把页面撑出滚动条 */
* {
  box-sizing: border-box;
}
</style>