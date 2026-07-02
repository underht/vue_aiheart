<template>
    <div>
        <!-- <PageHead title="情绪日志">
            <template #actions>
                <el-button type="primary">新增</el-button>
            </template>
        </PageHead> -->
        
        <TableSearch :formItems="searchConfig"
            @search="handleSearch" 
            @reset="onResetData"
        />
        <el-table :data="tableData">
            <el-table-column label="会话id" width="80px">
                <template #default="{ row }">
                    {{ row.id }}
                </template>
            </el-table-column>
            <el-table-column label="用户"width="80px">
                <template #default="{ row }">
                    {{ row.username }}
                </template>
            </el-table-column>
            <el-table-column label="记录日期" width="80px">
                <template #default="{ row }">
                    {{ row.createdAt }}
                </template>
            </el-table-column>
            <el-table-column label="情绪评分" width="200px">
                <template #default="{ row }">
                    <el-rate
                    :model-value="Number(row.moodScore) / 2"
                    disabled
                    allow-half
                />
                <span style="color: #ff9900; font-size: 14px;">
                    {{ row.moodScore }} 分
                </span>
                </template>
            </el-table-column>
            <el-table-column label="生活指标" width="160px">
                <template #default="{ row }">
                    <div>
                        <p>
                            压力等级：{{ row.stressLevel }}/5
                        </p>
                        <p>
                            睡眠质量：{{ row.sleepQuality }}/5
                        </p>
                    </div>

                    
                </template>
            </el-table-column>
            <el-table-column label="原因">
                <template #default="{ row }">
                    {{ row.emotionTriggers }}
                </template>
            </el-table-column>
            <el-table-column label="日记内容">
                <template #default="{ row }">
                    {{ row.diaryContent }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160px">
                <template #default="{ row }">
                    <el-button @click="showDetails(row)">详情</el-button>
                    <el-button @click="handleDelete(row.id)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
            layout="prev, pager, next"
            :total="pagination.total"
            :page-size="pagination.size"
            @current-change="handlePageChange"
        />
        

        <div class="dialog-container" >
            <el-dialog v-model="dialogTableVisible" title="详情信息" width="800"
            v-bind="currentDetail"
            >
            <div>
                <el-descriptions title="用户信息" :column="2" border>

                    <el-descriptions-item label="用户名" label-align="right" align="center">
                    {{ currentDetail.username }}
                    </el-descriptions-item>
                    <el-descriptions-item label="用户ID" label-align="right" align="center">
                    {{ currentDetail.userId }}
                    </el-descriptions-item>
                    <el-descriptions-item label="创建时间" label-align="right" align="center">
                    {{ currentDetail.createdAt }}
                    </el-descriptions-item>
                </el-descriptions>
                <el-descriptions title="情绪信息" :column="2" border>
                    <el-descriptions-item label="情绪类型" label-align="right" align="center">
                    {{ currentDetail.dominantEmotion }}
                    </el-descriptions-item>
                    <el-descriptions-item label="情绪分数" label-align="right" align="center">

                        <el-rate
                            :model-value="currentDetail.moodScore"
                            disabled
                            allow-half
                            :max="10"
                        />
                    {{ currentDetail.moodScore }} 分
                    </el-descriptions-item>
                    <el-descriptions-item label="压力等级" label-align="right" align="center">
                    {{ currentDetail.stressLevel }}
                    </el-descriptions-item>
                    <el-descriptions-item label="睡眠质量" label-align="right" align="center">
                    {{ currentDetail.sleepQuality }}
                    </el-descriptions-item>
                </el-descriptions>
                <el-descriptions title="日记信息" :column="2" border>
                    <el-descriptions-item label="情绪触发因素" label-align="right" align="center">
                        {{ currentDetail.emotionTriggers }}
                    </el-descriptions-item>

                    <el-descriptions-item label="日记内容" label-align="right" align="center">
                        {{ currentDetail.diaryContent }}
                    </el-descriptions-item>
                </el-descriptions>
                <el-descriptions title="AI 情绪分析" :column="2" border>
                    <el-descriptions-item label="主要情绪" label-align="right" align="center">
                        {{ aidata?.primaryEmotion }}
                    </el-descriptions-item>
                    <el-descriptions-item label="情绪性质" label-align="right" align="center">
                        <p>
                            {{ aidata?.isNegative ? '消极' : '积极' }}
                        </p>
                    </el-descriptions-item>
                    <el-descriptions-item label="风险等级" label-align="right" align="center">
                        {{ aidata?.riskLevel }}
                    </el-descriptions-item>
                    <el-descriptions-item label="情绪分数" label-align="right" align="center">
                            <el-progress :text-inside="true" :stroke-width="26" :percentage="aidata?.emotionScore" />
                    </el-descriptions-item>

                </el-descriptions>
                <div>
                    <p>专业建议</p>
                    <el-card >
                        <p >{{ aidata?.suggestion}}</p>
                    </el-card>
                </div>
                <div>
                    <p>风险描述</p>
                    <el-card >
                        <p >{{ aidata?.riskDescription}}</p>
                    </el-card>
                </div>

                <div>
                    <p>改善建议</p>
                    <el-card >
                        <p v-for="(item, index) in aidata?.improvementSuggestions" :key="index">{{ item }}</p>
                    </el-card>
                </div>
                <div>
                    <p>分析时间:{{ aidata?.timestamp }}</p>
                </div>
            </div>
            </el-dialog>
        </div>
    </div>


</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import PageHead from '../components/PageHead.vue';
import TableSearch from '../components/TableSearch.vue';
import { getEmotionList,deleteEmotionDiary } from '@/api/admin';

const searchConfig = ref([
  {
    prop: 'userId',
    label: '用户 id',
    component: 'el-input',
    placeholder: '请输入用户ID'
  },
  {
    prop: 'dominantEmotion',
    label: '主要情绪',
    component: 'el-select',
    placeholder: '请选择主要情绪',
    options: [
      { label: '快乐', value: '快乐' },
      { label: '平静', value: '平静' },
      { label: '焦虑', value: '焦虑' }
    ]
  },
  {
    prop: 'minMoodScore',
    label: '情绪分下限',
    component: 'el-input',
    placeholder: '请输入情绪分下限'
  },
  {
    prop: 'maxMoodScore',
    label: '情绪分上限',
    component: 'el-input',
    placeholder: '请输入情绪分上限'
  }
]);

// 存储当前选中的搜索条件
const extraSearchParams = ref({});

const pagination = reactive({
    currentPage: 1,
    size: 10,
    total: 0
});
const dialogTableVisible=ref(false)
const currentDetail=ref();
const aidata=ref(); 
const showDetails=(row)=>{
    currentDetail.value=row;
    if(row.aiEmotionAnalysis){
        aidata.value=JSON.parse(row.aiEmotionAnalysis);
        console.log("ai分析",aidata.value);
    }
    dialogTableVisible.value=true;

}

// 获取列表数据的复用函数
const fetchListData = async () => {
    try {
        // 核心逻辑：合并分页数据与最新的条件数据发送给后端
        const params = {
            ...extraSearchParams.value,
            current: pagination.currentPage, 
            size: pagination.size,
        };
        // 核心逻辑：遍历条件对象，只有当值不为空字符串、不为 null/undefined 时才带上
        Object.keys(extraSearchParams.value).forEach(key => {
            const value = extraSearchParams.value[key];
            if (value !== '' && value !== null && value !== undefined) {
                params[key] = value;
            }
        });
        console.log('请求参数:', params);
        const response = await getEmotionList(params);
        const { records, total } = response.data;
        console.log('情绪日志数据:', response.data);
        tableData.value = records;
        pagination.total = total;
    } catch (error) {
        console.log(error);
    }
};

// 触发搜索
const handleSearch = async (data) => {
    // 如果有传入新的搜索表单数据，更新响应式变量，并将页码重置为第一页
    if (data) {
        console.log('父组件接收到的搜索数据:', data);

        extraSearchParams.value = { ...data };
        pagination.currentPage = 1;
    }
    await fetchListData();
};

const tableData = ref([]);

// 重置时清空条件并重新查询
const onResetData = () => {
  console.log('重置');
  extraSearchParams.value = {};
  pagination.currentPage = 1;
  fetchListData();
};
const handleDelete = async (id) => {
    try {
        const res=await deleteEmotionDiary(id);
        console.log(res);
        fetchListData();
    } catch (error) {
        console.log(error);
    }
};
onMounted(async () => {
    await fetchListData();
});

const handlePageChange = (page) => {
    pagination.currentPage = page;
    handleSearch({});
};
</script>

<style lang="scss" scoped>
</style>