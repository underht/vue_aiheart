<template>
    <div class="main">
        <div class="container">
            <div class="left">
                <el-card shadow="always"
                width="200px"
                >
                    <p>推荐阅读</p>
                </el-card>
            </div>
            <div class="right">

                    <el-row
                    v-for="item in 2"
                    :key="item"
                    > 
                        <el-card class="articlecard">
                            <p>最新文章</p>
                        </el-card>
                    </el-row>
            </div>
        </div>

    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
/* 核心修复：1. 修正拼写 main ；2. 给左右两侧合理的宽度分配 */
.main {
    width: 100%;
    height: 100%;
    display: flex;
    
    .container {
        display: flex;
        width: 100%;
        flex-direction: row; /* 保持左右排列 */
        gap: 20px; /* 给左右两边留点空隙 */

        .left {
            width: 250px; /* 固定左边推荐区域的宽度 */
        }
        
        .right {
            flex: 1; /* 核心算法：让右边自动占满剩下的所有宽度 */
            .articlecard{
                width: 100%;
                height: 100px;
                margin-bottom: 10px;
            }
        }
    }
}
</style>