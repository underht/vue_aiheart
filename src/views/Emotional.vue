<template>
    <div>
        <PageHead title="情绪日志"  >
            <template #actions>
                <el-button type="primary">新增</el-button>
            </template>
        </PageHead>
        
        <TableSearch :formItems="searchConfig"
            @search="handleSearch" 
            @reset="onResetData"
        />

    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import PageHead from '../components/PageHead.vue';
import TableSearch from '../components/TableSearch.vue';
import {getEmotionList} from '@/api/admin';

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
      { label: '悲伤', value: 'sad' },
      { label: '愤怒', value: 'angry' },
      { label: '焦虑', value: 'anxious' }
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

// current
// string 
// 当前页
// 可选
// size
// string 
// 分页数
// 可选
// userId
// string 
// 用户id
// 可选
// minMoodScore
// string 
// 情绪分下限
// 可选
// maxMoodScore
// string 
// 情绪分上限
// 可选
// dominantEmotion
// string 
// 主要情绪

const pagination=reactive({
    currentPage:1,
    size:10,
    total:0
});
const handleSearch =async (data) => {
    try {
    // 核心修改：1. 加上 const 声明；2. 修复对象内部的键值对语法
    const params = {
      ...data, // 展开运算：把输入框里的条件（如 userId, dominantEmotion）解构进来
      
      // 核心修复：必须指定键名，对应后端需要的参数名
      current: pagination.currentPage, 
      size: pagination.size,
    };

    const response = await getEmotionList(params);
    const { records, total } = response.data;
    console.log('情绪日志数据:', response.data);
    tableData.value = records;
    pagination.total = total;
    console.log('表格数据:', tableData.value);

    }catch(error){
        console.log(error);
        
    }
};
const onResetData = () => {
  console.log('重置');
};



</script>

<style lang="scss" scoped>

</style>