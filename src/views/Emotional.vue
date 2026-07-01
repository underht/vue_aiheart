<template>
    <div>
        <PageHead title="情绪日志">
            <template #actions>
                <el-button type="primary">新增</el-button>
            </template>
        </PageHead>
        
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
                    <el-button>删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
            layout="prev, pager, next"
            :total="pagination.total"
            :page-size="pagination.size"
            @current-change="handlePageChange"
        />
        

        <div class="dialog-container">
            <el-dialog v-model="dialogTableVisible" title="Shipping address" width="800">
            
            </el-dialog>
        </div>
    </div>


</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import PageHead from '../components/PageHead.vue';
import TableSearch from '../components/TableSearch.vue';
import { getEmotionList } from '@/api/admin';

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

const showDetails=(row)=>{
    dialogTableVisible.value=true

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