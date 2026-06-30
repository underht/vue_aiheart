<template>
    <div>
        <PageHead title="知识库" >
            <template #actions>
                <el-button type="primary" @click="handleAdd" >新增</el-button>
            </template>
        </PageHead>
        <TableSearch :formItems="formItems" @search="handleSearch" id="table-search" />

        <el-table :data="tableData" stripe class="table">
            <el-table-column prop="title" label="标题" width="180" fixed="left">
                <template #default="{ row }">
                    {{ row.title }}
                </template>
            </el-table-column>
            <el-table-column prop="categoryName" label="分类" width="180">
                <template #default="{ row }">
                    {{ row.categoryName }}
                </template>
            </el-table-column>
            <el-table-column prop="statusText" label="状态">
                <template #default="{ row }">
                    {{row.statusText}}
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间" width="180">
                <template #default="{ row }">
                    {{ row.createdAt }}
                </template>
            </el-table-column>
            <el-table-column prop="updatedAt" label="更新时间" width="180">
                <template #default="{ row }">
                    {{ row.updatedAt }}
                </template>
            </el-table-column>
            <el-table-column prop="readCount" label="阅读数" width="100">
                <template #default="{ row }">
                    {{ row.readCount }}
                </template>
            </el-table-column>
            <el-table-column prop="column" label="操作" width="300" fixed="right">
            <template #default="{ row }" >
                <div class="action">
                    <el-button @click="handleEdit(row)">编辑</el-button>
                    <el-button v-if="row.status === 0" @click="handlePublish(row.id)">发布</el-button>
                    <el-button v-else disabled>发布</el-button>
                    <el-button v-if="row.status === 1" @click="handleOffline(row.id)">下线</el-button>
                    <el-button v-else disabled>下线</el-button>
                    <el-button @click="handleDelete(row.id)">删除</el-button>
                </div>
            </template>
            </el-table-column>
        </el-table>
    <div>
       <el-pagination layout="prev, pager, next" :total="pagination.total" 
       :page-size="pagination.size" 
       @change="handlePageChange"
       :pager-count="pagerCount"
       class="pagination"
       />
    </div>

        <ArticelDialog v-model="dialogTableVisible" :categories="categories" 
        @uploadSussess="handleUploadSussess" 
        v-model:dialogTableVisible="dialogTableVisible"
        :article="articleData"
        
        />

    </div>

</template>

<script setup>
import { onMounted, reactive, ref, onBeforeUnmount } from 'vue';
import PageHead from '../components/PageHead.vue';
import TableSearch from '../components/TableSearch.vue';
import { getCategoryTree, articlePage ,getArticle,changeStatus,deleteAarticle} from '@/api/admin';
import ArticelDialog from '../components/ArticelDialog.vue';
import { ElMessageBox,ElMessage} from 'element-plus'

const formItems = [
    { component: 'el-Input', prop:"title",label: '标题', placeholder: '请输入标题' },
    { component: 'el-Select',  prop: 'categoryid', label: '分类', placeholder: '请选择分类', options: [
    ]},
    { component: 'el-select', prop: 'status', label: '状态', placeholder: '请选择状态', options: [
        { label: '草稿', value: 0 },
        { label: '已发布', value: 1 },
        { label: '已下线', value: 2 },
        { label: '未发布', value: 3 }
    ]}
]

const tableData =ref([])

const pagination=reactive({
    currentPage:1,
    size:10,
    total:0
});
const fetchData=()=>{}
const handleSearch = async (data) => {
    // 在这里可以根据需要处理搜索数据，例如发起 API 请求等

    console.log('父组件接收到的搜索数据:', data);

    const params = {
        ...data,
        currentPage: pagination.currentPage,
        size: pagination.size
    };
    const response = await articlePage(params);

    console.log('文章分页数据:', response.data);
    const { records, total } = response.data;

    tableData.value = records;
    pagination.total = total;
    console.log('表格数据:', tableData.value);
};

const categoryOptions = reactive({
    options: {}  // 改为对象
});

const handlePageChange = (page) => {
    pagination.currentPage = page;
    handleSearch({});
};

const dialogTableVisible = ref(false);
const handleAdd = () => {
    // 处理新增逻辑，例如打开一个对话框或跳转到新增页面
    articleData.value={};
    console.log('点击了新增按钮', dialogTableVisible.value,articleData.value);
    dialogTableVisible.value = true;

};
const pagerCount = ref(7)

const updatePagerCount = () => {
  const width = window.innerWidth
  if (width > 1600) pagerCount.value = 11
  else if (width > 1200) pagerCount.value = 9
  else if (width > 768) pagerCount.value = 7
  else pagerCount.value = 5
}
const handleUploadSussess=()=>{
    console.log("上传成功");
}
const articleData=ref()
const articleRes=ref()

const handleEdit=async(row)=>{
    console.log("编辑",row);
    articleRes.value=await getArticle(row.id);
    console.log("信息",articleRes);
    articleData.value=articleRes.value.data
    dialogTableVisible.value=true
    
}
const handlePublish = (id) => {
//   console.log("发布", id);
  
  ElMessageBox.confirm(
    '确认发布此内容吗?',
    '提示',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '发布',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
  .then(async () => {
    // 核心逻辑：用户确认后，调用接口修改状态
    try {
      const res = await changeStatus(id, 1);
      console.log(res);
      
      // 成功提示通常用 'success' 类型
      ElMessage({
        type: 'success',
        message: '发布成功',
      });
      fetchData()
      // 这里通常需要刷新列表数据，例如：fetchData();
      
    } catch (error) {
      // 核心逻辑：真正捕获接口请求失败的情况
      console.error("发布接口请求失败:", error);
      ElMessage({
        type: 'error',
        message: '发布失败，请稍后再试',
      });
    }
  })
  .catch((action) => {
    // 核心逻辑：处理用户未确认的情况（取消或关闭弹窗）
    if (action === 'cancel') {
      ElMessage({
        type: 'info',
        message: '已取消发布',
      });
    } else {
      console.log('用户关闭了弹窗');
    }
  });
};
const handleOffline = (id) => {
//   console.log("发布", id);
  
  ElMessageBox.confirm(
    '确认下线此内容吗?',
    '提示',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '下线',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
  .then(async () => {
    // 核心逻辑：用户确认后，调用接口修改状态
    try {
      const res = await changeStatus(id, 2);
      console.log(res);
      
      // 成功提示通常用 'success' 类型
      ElMessage({
        type: 'success',
        message: '下线成功',
      });
      fetchData()
      // 这里通常需要刷新列表数据，例如：fetchData();
      
    } catch (error) {
      // 核心逻辑：真正捕获接口请求失败的情况
      console.error("发布接口请求失败:", error);
      ElMessage({
        type: 'error',
        message: '发布失败，请稍后再试',
      });
    }
  })
  .catch((action) => {
    // 核心逻辑：处理用户未确认的情况（取消或关闭弹窗）
    if (action === 'cancel') {
      ElMessage({
        type: 'info',
        message: '已取消',
      });
    } else {
      console.log('用户关闭了弹窗');
    }
  });
};

const handleDelete=(id)=>{

//   console.log("发布", id);
  
  ElMessageBox.confirm(
    '确认删除此内容吗?',
    '提示',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
  .then(async () => {
    // 核心逻辑：用户确认后，调用接口修改状态
    try {
      const res = await deleteAarticle(id);
      console.log(res);
      
      // 成功提示通常用 'success' 类型
      ElMessage({
        type: 'success',
        message: '删除成功',
      });
      fetchData()
      // 这里通常需要刷新列表数据，例如：fetchData();
      
    } catch (error) {
      // 核心逻辑：真正捕获接口请求失败的情况
      console.error("删除接口请求失败:", error);
      ElMessage({
        type: 'error',
        message: '删除失败，请稍后再试',
      });
    }
  })
  .catch((action) => {
    // 核心逻辑：处理用户未确认的情况（取消或关闭弹窗）
    if (action === 'cancel') {
      ElMessage({
        type: 'info',
        message: '已取消',
      });
    } else {
      console.log('用户关闭了弹窗');
    }
  });
};

onMounted(() => {
  updatePagerCount()
  window.addEventListener("resize", updatePagerCount)

})

onBeforeUnmount(() => {
  window.removeEventListener("resize", updatePagerCount)
})
const categories = ref([]);  // 或者 reactive([])

onMounted(async () => {
    const data = await getCategoryTree();
    console.log('知识分类树:', data.data);
    
    // 改为生成对象映射
    categoryOptions.options = data.data.reduce((acc, item) => {
        acc[item.id] = item.categoryName;
        return acc;
    }, {});
    
    // formItems中还需要数组格式
    formItems[1].options = data.data.map(item => ({
        label: item.categoryName,
        value: item.id
    }));

    categories.value=formItems[1].options;
    console.log('表单项:', categories);
    await handleSearch({});
});

</script>

<style lang="scss" scoped>
.pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
}
.table{
    padding: min;
}
.action{
    display: flex;
    flex-direction:row-reverse;

}
</style>