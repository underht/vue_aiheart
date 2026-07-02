<template>
    <div>
        <PageHead title="数据分析"  >
            <template #actions>
                <el-button type="primary">新增</el-button>
            </template>
        </PageHead>
        <div class="graph">
            <el-row 
            v-if="overviewData"

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
                            <div class="incards">
                            <div class="img">
                                <el-image :src="users"
                                    
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
                        <div class="incards">
                            <div class="img">
                                <el-image :src="comments"
                                    
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
                    <div class="incards">
                        <div class="img">
                                <el-image :src="like"
                                    
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
                    <div class="incards">                            
                            <div class="img" >
                                <el-image :src="smile"
                                    
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
            <el-row>
                <el-col
                :span="12"
                :xl="12"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                >
                <el-card shadow="always">
                    <div class="chartcontainer">
                        <div ref="emotionalChartRef" style="width: 100%; height: 300px;">

                        </div>
                    </div>                    
                </el-card>

                </el-col>
                 <el-col
                :span="12"
                :xl="12"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                >
                <el-card shadow="always">
                    <div class="chartheader">
                        <div class="chartheaderitem">
                            <p>平均咨询时长</p>
                            <p>{{  overviewData?.consultationStats?.avgDurationMinutes}}</p>
                        </div>
                        <div class="chartheaderitem">
                            <p>总咨询次数</p>
                            <p>{{  overviewData?.consultationStats?.totalSessions}}</p>
                        </div>
                        <div class="chartheaderitem">
                            <p>活跃用户</p>
                            <p>{{ overviewData?.systemOverview?.activeUsers }}</p>
                        </div>
                    </div>
                    <div class="chartcontainer">
                        <div ref="consultationChartRef" style="width: 100%; height: 300px;">

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
import * as echarts from 'echarts';

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

let emotionalChart=null;
const emotionalChartRef = ref();

const initEmotionalChart = () => {
    if(!emotionalChartRef.value) return;//没有就退出
    if(emotionalChart){//销毁旧的
        emotionalChart.dispose();
    }
    emotionalChart = echarts.init(emotionalChartRef.value);
    const trendData = overviewData.value?.emotionTrend;
    const option = {
    // 【新增】全局调色盘，ECharts 会按照顺序自动为系列分发颜色
    color: ['#5470c6', '#91cc75'], 
    
    title: {
        text: '情绪趋势'
    },
    tooltip: {
        trigger: 'axis' 
    },
    legend: {
        data: ['情绪得分', '记录数量'] 
    },
    xAxis: {
        type: 'category',
        data: trendData?.map(item => item.date) || []
    },
    yAxis: [
        { type: 'value', name: '情绪得分' }, 
        { type: 'value', name: '记录数量' }
    ],
    series: [
        {
            name: '情绪得分',
            type: 'line',
            data: trendData?.map(item => item.avgMoodScore) || [],
            // 【显式指定颜色】确保线条、拐点、阴影颜色正常
            itemStyle: {
                color: '#5470c6' // 经典科技蓝
            },
            lineStyle: {
                width: 3 // 把线加粗一点，看得更清楚
            }
        },
        {
            name: '记录数量',
            type: 'line',
            yAxisIndex: 1,
            data: trendData?.map(item => item.recordCount) || [],
            // 【显式指定颜色】
            itemStyle: {
                color: '#91cc75' // 舒适清新绿
            },
            lineStyle: {
                width: 3
            }
        }
    ]
};
    emotionalChart.setOption(option);
};


let consultationChart=null;
const consultationChartRef = ref();

const initConsultationChart = () => {
    if(!consultationChartRef.value) return;//没有就退出
    if(consultationChart){//销毁旧的
        consultationChart.dispose();
    }
    consultationChart = echarts.init(consultationChartRef.value);

    const trendData = overviewData.value?.consultationStats?.dailyTrend;
    const option = {
    // 【新增】全局调色盘，ECharts 会按照顺序自动为系列分发颜色
    color: ['#5470c6', '#91cc75'], 
    
    title: {
        text: '咨询活动统计'
    },
    tooltip: {
        trigger: 'axis' 
    },
    legend: {
        data: [ '记录数量', '用户数量' ]
    },
    xAxis: {
        type: 'category',
        data: trendData?.map(item => item.date) || []
    },
    yAxis: [
        { type: 'value', name: '记录数量' }, 
        { type: 'value', name: '用户数量' }
    ],
    series: [
        {
            name: '记录数量',
            type: 'bar',
            data: trendData?.map(item => item.sessionCount) || [],
            // 【显式指定颜色】确保线条、拐点、阴影颜色正常
            itemStyle: {
                color: 'rgba(84, 112, 198, 1)'
            },
            barWidth: 5// 设置柱状图宽度
        },
        {
            name: '用户数量',
            type: 'bar',
            yAxisIndex: 1,
            data: trendData?.map(item => item.userCount) || [],
            // 【显式指定颜色】
            itemStyle: {
                color: 'rgba(145, 204, 117, 1)'  
            },
            barWidth: 5
        }
    ]
};
    consultationChart.setOption(option);
};

onMounted(async() => {
    await fetchOverviewData();
    initEmotionalChart();
    initConsultationChart();
});

</script>

<style lang="scss" scoped>
.graph{
    padding: 6px 6px;
    overflow: hidden;
    .chartheader{
        display: flex;

        width: 100%;
        justify-content:center;
        align-items:center;
        .chartheaderitem{
            display: flex;
            width: 100%;
            justify-content:center;
            align-items:center;
            flex-direction: column;
            p{
                display: flex;
                justify-content:center;
                align-items:center;
                margin: 0;
                font-size: 12px;
                color: #666;
            }
        }
    }
    .el-col{
        padding: 6px 6px;
    }
    .incards{     
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