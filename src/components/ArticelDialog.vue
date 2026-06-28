<template>
  <el-dialog :model-value="props.dialogTableVisible" title="新增文章" width="800" >
    <el-form :model="fromdata" class="article-form">
      <el-form-item class="form-item" label="文章标题">

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

            <el-form-item label="所属分类">
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
        <el-input  v-model="fromdata.tags" placeholder="请输入标签"
            clearable
        />

      </el-form-item>

      <el-form-item label="文本">
        <TestBox 
        ></TestBox>

      </el-form-item>


    </el-form>

  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { defineProps, reactive, ref } from 'vue';
import{uploadfile} from '../api/admin'
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
  }
});

const fromdata = reactive(
 {
    "title": "",
    "content": "",
    "coverImage": "",
    "categoryId": 0,
    "summary": "",
    "tags": "",
    "id": ""

}
);


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
    if (!upres.success) {//反的因为api了

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
</script>
<style lang="scss" scoped>
.article-form{
    .form-item {

        display: flex;
        flex-wrap: wrap;

    }
}
.hide :deep(.el-upload--picture-card) {
  display: none;
}
</style>