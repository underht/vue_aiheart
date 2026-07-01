<template>
    <div>
        <PageHead title="数据分析"  >
            <template #actions>
                <el-button type="primary">新增</el-button>
            </template>
        </PageHead>

    </div>
</template>

<script setup>
import PageHead from '../components/PageHead.vue';
import { getDataAnalyticsOverview } from '@/api/admin';
import { ref, onMounted } from 'vue';

const overviewData = ref(null);

const fetchOverviewData = async () => {
    try {
        const res = await getDataAnalyticsOverview();
        overviewData.value = res.data;
        console.log("数据", overviewData.value);
    } catch (error) {
        console.error("获取数据分析概览失败:", error);
    }
};

onMounted(() => {
    fetchOverviewData();

});

</script>

<style lang="scss" scoped>

</style>