<!-- articleDialog.vue -->

<template>
<el-dialog 
:model-value="props.dialogTableVisible" 
:title="isEdit ? '编辑文章' : '新增文章'" 
width="800" 
class="article-dialog" 
>
    <el-form ref="formRef" :model="fromdata" :rules="rules" class="article-form" label-width="auto">
    <el-form-item prop="title" class="form-item" label="文章标题">

        <el-input  v-model="fromdata.title" placeholder="请输入标题"
            maxlength="200"
            show-word-limit
            type="text" 
            clearable
        />
    </el-form-item>
    <el-form-item label="封面图片">
        <el-upload 
        action="#" 
        list-type="picture-card" 
        :before-upload="beforeupload"
        :auto-upload=false
        :limit="1"
        :class="{ hide: fileList.length >= 1 }"
        :on-change="handleChange"
        v-model:file-list="fileList"
        >
        <el-icon><Plus /></el-icon>

        <template #file="{ file }">
            <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            <span class="el-upload-list__item-actions">
                <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
                >
                <el-icon><zoom-in /></el-icon>
                </span>
                <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
                >
                <el-icon><Download /></el-icon>
                </span>
                <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
                >
                <el-icon><Delete /></el-icon>
                </span>
            </span>
            </div>
        </template>
        </el-upload>
    </el-form-item>

    <el-form-item prop="categoryId" label="所属分类">
        <el-select v-model="fromdata.categoryId" placeholder="选择分类">
        <el-option v-for="item in categories"
        :label="item.label" 
        :value="item.value" />

    </el-select>
    </el-form-item>
    <el-form-item label="摘要">
        <el-input  v-model="fromdata.summary" placeholder="请输入摘要" 
            maxlength="1000"
            show-word-limit
            type="textarea"

            :rows="4"
        />
    </el-form-item>
    <el-form-item label="标签">
		<el-input-tag
			v-model="fromdata.tagsArray"
			placeholder="请输入标签"
			aria-label="Please click the Enter key after input"
			clearable
		/>
    </el-form-item>

    <el-form-item prop="content" label="正文内容">
        <TestBox 
        v-model:content="fromdata.content"
		ref="testBoxRef"
        ></TestBox>

    </el-form-item>
    <el-form-item label="内容预览" v-show="Preview">
    <div  >
        <div v-html="fromdata.content" class="preview">
        </div>
    </div>
    </el-form-item>

    </el-form>


    <template #footer>
    <div>
        <el-button @click="handlePreview">预览</el-button>
        <el-button @click="handleClose">取消</el-button>
        <el-button @click="handlesubmit">{{isEdit ? '确定编辑' : '确定新增'}}</el-button>

    </div>
    </template>
</el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { computed, defineProps, reactive, ref ,watch,nextTick} from 'vue';
import{uploadfile,createArticle,exchangeArticle} from '../api/admin'
import {filebaseurl}from '../config/index'
import TestBox from '@/components/TestBox.vue'
const props = defineProps({
dialogTableVisible: {
    type: Boolean,
    default: false
},
categories:{
    type:Array,
    default:[]
},
article:{
	type:Object,
	default:{}
}


});
const emit=defineEmits(['update:dialogTableVisible','uploadSussess'])
const fromdata = reactive(
{
    "title": "",
    "content": "",
    "coverImage": "",
    "categoryId": 0,
    "summary": "",
    "tagsArray": [],
	"tags": "",
    "id": ""

}
);
const rules=reactive({
	title: [
		{ required: true, message: '请输入标题', trigger: 'blur' }
	],
	content: [
		{ required: true, message: '请输入内容', trigger: 'blur' }
	],
	categoryId: [
		{ required: true, message: '请选择分类', trigger: 'blur' }
	],

})
const isEdit=computed(()=>{  return !!props.article?.id
}
)
watch(() => props.article, (newVal) => {
  console.log("是不是edit:", isEdit.value, newVal)
  console.log("article",props.article)
  
  if(isEdit.value){
        nextTick(()=>{
            fromdata.title=newVal.title
            fromdata.content=newVal.content
            fromdata.coverImage=newVal.coverImage
            fromdata.categoryId=newVal.categoryId
            fromdata.summary=newVal.summary
            fromdata.tags=newVal.tags
            fromdata.tagsArray=newVal.tags?.split(",")
            fromdata.id=newVal.id
            testBoxRef.value?.setContent(newVal.content)

        })
        
    }else{
        handleRemove()
        formRef.value?.resetFields()
        fromdata.tagsArray=[]
        fromdata.summary=""
        testBoxRef.value?.clear()  // 调用子组件暴露的方法
    }

}, { deep: true })

const Preview = ref(false);
const handlePreview=()=>{
Preview.value=!Preview.value
}

const fileList = ref([])
const handleChange=(file)=>{
console.log("图片："+file.raw.type);
console.log("大小："+file.raw.size/1024/1024);
const isimg=file.raw.type.startsWith('image/');
const islit5m=file.size/1024/1024<5

    if (!isimg) {
        ElMessage.error('请上传图片')
        return false
    }
    if (!islit5m) {
        ElMessage.error('图片大小不得大于5M')
        return false
    }
    return isimg&&islit5m
}
const beforeupload=async(file)=>{

const businessId=crypto.randomUUID();

try {
    const upres = await uploadfile(file, businessId)
    console.log(upres)
    if (!upres.success) {//反的因为api寄了

    ElMessage.success('上传成功');
    realurl=filebaseurl+upres.data.url
    console.log(realurl)
    fromdata.coverImage=realurl
    } else {
    ElMessage.error(upres.msg)
    }
} catch (err) {
    console.log(err)
    ElMessage.error('上传失败')
}

return false;
}

const handleRemove=()=>{
fileList.value=[]
fromdata.coverImage=""

}
const testBoxRef = ref(null)

const handleClose = () => {
    handleRemove()
    formRef.value.resetFields()
    fromdata.tagsArray=[]
    fromdata.summary=""
    testBoxRef.value?.clear()  // 调用子组件暴露的方法
    emit('update:dialogTableVisible', false)
}



const loading = ref(false)
const formRef=ref(null)
const handlesubmit=async()=>{
	console.log("表单：",fromdata);
	const submitData = {
	...fromdata,                        // 把 formData 所有字段复制过来
	tags: fromdata.tagsArray.join(','),   // tags 用数组join成逗号分隔的字符串
	
	}
	delete submitData.tagsArray;
	formRef.value.validate(async (valid, fields) => {
        if (valid) {
            loading.value = true
            // 校验通过，执行提交逻辑
            if(isEdit.value){
                const res=await exchangeArticle(fromdata.id,submitData)
                console.log(res)
                if (res.success) {
                    ElMessage.success(res.msg)

                    emit('uploadSussess')
                }else {
                    ElMessage.error(res.msg);
                }
            }else{
                const res=await createArticle(submitData)
                console.log(res)
                if (res.success) {
                    ElMessage.success(res.msg)

                    emit('uploadSussess')
                } else {
                    ElMessage.error(res.msg)
                }
            }
        }


    })

    handleClose()
}
</script>
<style lang="scss" scoped>
.article-dialog{
	
	display: flex;
	flex-direction: column;
	.article-form{
		.form-item {
			flex-wrap: wrap;
		}
	}	
}

.hide :deep(.el-upload--picture-card) {
	display: none;
} 


</style> 