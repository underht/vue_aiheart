<template>
    <div>
        <PageHead title="数据分析"  >
            <template #actions>
                <el-button type="primary">新增</el-button>
            </template>
        </PageHead>
        <div class="smallgraph">
            <el-row 
            v-if="overviewData"
            :gutter="10"
            v-loading="loading"
            >
            <el-col 
                :span="6"
                :xl="6"
                :lg="6"
                :md="12"
                :sm="12"
                :xs="24"
                >

                        <el-card  shadow="always">
                            <div class="cards">
                            <div class="img">
                                <el-image :src="users"
                                    :preview-src-list="srcList"
                                    fit="cover"
                                    show-progress>
                                </el-image>
                            </div>
                            <div class="words">
                            <p>总用户数{{ overviewData.systemOverview.totalUsers }}</p>
                            <p>今日用户：{{ overviewData.systemOverview.todayNewUsers }}</p>
                            <p>活跃用户：{{ overviewData.systemOverview.activeUsers }}</p>
                            </div>
                            </div>


                        </el-card>
                    
                
                </el-col>
                <el-col 
                :span="6"
                :xl="6"
                :lg="6"
                :md="12"
                :sm="12"
                :xs="24"
                >

                    <el-card  shadow="always" >
                        <div class="cards">
                            <div class="img">
                                <el-image :src="comments"
                                    :preview-src-list="srcList"
                                    fit="cover"
                                    show-progress>
                                </el-image>
                            </div>
                            <div class="words">
                                <p>总对话数{{ overviewData.systemOverview.totalSessions }}</p>
                                <p>今日对话数{{ overviewData.systemOverview.todayNewSessions }}</p>
                            </div>
                        </div>
                        
                    </el-card>


                </el-col>

            <el-col 
                :span="6"
                :xl="6"
                :lg="6"
                :md="12"
                :sm="12"
                :xs="24"
                >

                        
                    <el-card  shadow="always">
                    <div class="cards">
                        <div class="img">
                                <el-image :src="like"
                                    :preview-src-list="srcList"
                                    fit="cover"
                                    show-progress>
                                </el-image>
                        </div>
                        <div class="words">
                            <p>总日记数{{ overviewData.systemOverview.totalDiaries }}</p>
                            <p>今日日记数{{ overviewData.systemOverview.todayNewDiaries }}</p>
                        </div>
                    </div>

                    </el-card> 


                </el-col>
            <el-col 
                :span="6"
                :xl="6"
                :lg="6"
                :md="12"
                :sm="12"
                :xs="24"
                >

                <el-card  shadow="always">
                    <div class="cards">                            
                            <div class="img" >
                                <el-image :src="smile"
                                    :preview-src-list="srcList"
                                    fit="cover"
                                    show-progress>
                                </el-image>
                            </div>
                            <div class="words">
                               <p>平均情绪分数{{ overviewData.systemOverview.avgMoodScore }}</p>
                            </div>
                    </div>                            
                </el-card>

                </el-col>
            </el-row>

        </div>
        
    </div>
</template>

<script setup>
import PageHead from '../components/PageHead.vue';
import { getDataAnalyticsOverview } from '@/api/admin';
import { ref, onMounted } from 'vue';
import like from '@/assets/like.png';
import users from '@/assets/users.png';
import comments from '@/assets/comments.png';
import smile from '@/assets/smile.png';
const overviewData = ref();

const fetchOverviewData = async () => {
    try {
        loading.value = true;
        const res = await getDataAnalyticsOverview();
        loading.value = false;
        overviewData.value = res.data;
        console.log("数据", overviewData.value);
    } catch (error) {
        console.error("获取数据分析概览失败:", error);
    }
};
const loading = ref(false);
onMounted(() => {
    fetchOverviewData();

});

</script>

<style lang="scss" scoped>
.smallgraph{
    padding: 12px 12px;
    .cards{     
        display: flex;
        justify-content:center;
        align-items:center;
        flex-direction: row;
        height: 80px;
        column-gap: 15px;

        .img{
            justify-content:center;
            height: 80px;
            width:  80px;
            background-color: #a3a3a3;
            border-radius: 8px;        /* 设置圆角大小，如果是 50% 则会变成正圆形 */
            overflow: hidden;          /* 关键！裁切掉内部图片超出圆角部分的直角 */
            display: flex;
                justify-content:center;
                align-items:center;
            .el-image {
                width:  80%;
                height: 80%;

            }
        }
        .words{
            color: #666;
            height: 60px;
        // 1. 开启 Flex 布局
            display: flex;             
            
            // 2. 核心：让内部的 p 标签像原本一样上下（竖着）排列
            flex-direction: column;    
            
            // 3. 核心：当主轴变成竖向(column)后，justify-content 控制的就是【竖着的方向】如何对齐
            justify-content: center;   
            
            // 4. 辅助：让文字在横向（横着的方向）左对齐（你也可以改成 center 让文字完全居中）
            align-items: flex-start;   
            
            // 5. 可选：控制两行文字之间的上下间距
            row-gap: 4px;
            p{
                align-items:center;
                margin: 0;
                padding: 0;
                line-height: 1.5;
                font-size: 12px;
            }
        }
    }
}
</style>