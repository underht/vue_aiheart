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
      <el-form-item label="分类">
        <el-select v-model="fromdata.categoryId" placeholder="选择分类">
        <el-option v-for="item in categories"
          :label="item.lable" 
          :value="item.value" />

      </el-select>
      </el-form-item>

      
      <el-form-item label="文章内容">
        <el-input  v-model="fromdata.content" placeholder="请输入内容"
            maxlength="200"
            show-word-limit
            type="text"
            clearable
        />
      </el-form-item>
      <el-form-item label="封面图链接">
        <el-input  v-model="fromdata.coverImage" placeholder="请输入封面图链接"
            clearable
        />
      </el-form-item>
      <el-form-item label="摘要">
        <el-input  v-model="fromdata.summary" placeholder="请输入摘要" 
            maxlength="200"
            show-word-limit
            type="text"
            clearable
        />
      </el-form-item>
      <el-form-item label="标签">
        <el-input  v-model="fromdata.tags" placeholder="请输入标签"
            clearable
        />

      </el-form-item>
      <el-form-item label="ID">
        <el-input  v-model="fromdata.id" placeholder="请输入ID"
            clearable
        />
      </el-form-item>


    </el-form>

  </el-dialog>
</template>

<script setup>
import { defineProps, reactive, ref } from 'vue';

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

</script>
<style lang="scss" scoped>
.article-form{
    .form-item {

        display: flex;
        flex-wrap: wrap;

    }
}
</style>