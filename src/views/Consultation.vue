<template>
    <div>
        <!-- <PageHead title="咨询记录" >
            <template #actions>

            </template>
        </PageHead> -->
        <div>
            <el-table :data="tableData" style="width: 100%" class="etable">
                <el-table-column prop="id" label="会话id"  width="100" align="center">
                    <template #default="scope">
                        <el-avatar> {{scope.row.userNickname}}</el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="sessionTitle" label="情绪标签"  >
                    <template #default="scope">
                        <p>{{scope.row.sessionTitle}}</p>
                        <p>{{ scope.row.lastMessageContent}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="messageCount" label="消息数" width="100" align="center"/>
                <el-table-column prop="startedAt" label="时间"  width="100" align="center"/>
                <el-table-column label="操作"  width="100" align="center">
                    <template #default="scope">
                        <el-button size="small" @click="handleview(scope.row)">查看</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <div>
        <el-pagination layout="prev, pager, next" :total="pagetotal" 
        :page-size="Number(pagination.size)"
        @change="handlePageChange"
        class="pagination"
        />
        </div>
        <div>
            <el-dialog v-model="dialogTableVisible" title="查看对话" width="800" class="dialog">
                <div class="info"  v-loading="loading">
                    <el-card>
                        <p>用户：{{ nowview.username}}</p>
                        <p>对话数:{{ sessiondata.length}}</p>

                        <p>开始时间：{{ sessiondata[0].createdAt }}</p>

                    </el-card> 
                </div>
                <div class="session"  v-loading="loading">
                    <p>
                        对话记录
                    </p>
                    <el-card 
                        v-for="item in sessiondata" :key="item" 
                        class="card"
                        shadow="never"
                    >
                    <p v-if="item.senderTypeDesc==='用户'">
                        用户：
                    </p>
                    <p v-if="item.senderTypeDesc==='AI助手'">
                        ai助手:
                    </p>
                    {{item.content}}
                    </el-card>
                </div>
                

            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive ,ref} from 'vue';
import PageHead from '../components/PageHead.vue';
import {getConsultationPage,getConsultation}from '@/api/admin.js'
const handleAdd=()=>{}
const pagination=reactive({
    currentPage:"1",
    // string 
    // 当前页
    // 可选
    size:"10",
    // string 
    // 分页数
    // 可选
    emotionTag:"",
    // string 
    // 情绪标签
})
const pagetotal=ref(0)

const tableData=ref([])
const sessiondata=ref([])
const nowview=reactive({
    username:"",
    id:"",
})


const loading=ref(false)
const handleview=async(row)=>{
 try{
        loading.value=true
        const res=await getConsultation(row.id)
        loading.value=false
        sessiondata.value=res.data
        console.log("对话",sessiondata);
        nowview.username=row.userNickname;        
        dialogTableVisible.value=true;

    }catch(error){
        console.log(error);
        
    }

}
const dialogTableVisible=ref(false)
const handlePageChange=(page)=>{
    pagination.currentPage=page
    getlist()
}

const getlist=(async()=>{

    try{
        const res=await getConsultationPage(pagination)
        const {records,total}=res.data
        console.log("数据",records,total);
        tableData.value=records;
        pagetotal.value=total/pagination.size;
    }catch(error){
        console.log(error);
        
    }
})

onMounted(async()=>{
getlist()

})
</script>

<style lang="scss" scoped>
.pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
}

.dialog{
    .card{
        margin: 12px 0;
    }
}
</style>