<template>
  <div style="border: 1px solid #ccc;">
    <!-- 工具栏 -->
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="default"
      style="border-bottom: 1px solid #ccc;"
    />
    <!-- 编辑器 -->
    <Editor
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      mode="default"
      style="height: 300px; overflow-y: hidden;"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
    <!-- 字数统计区域 -->
    <div style="padding: 5px 10px; text-align: right; color: #999; font-size: 14px;">
      当前字数：{{ wordCount }} 字
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')
// 字数状态
const wordCount = ref(0)

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 编辑器创建完毕的回调
const handleCreated = (editor) => {
  editorRef.value = editor
  // 核心逻辑：获取初始化时的纯文本字数
  // getText() 方法可以获取不带 HTML 标签的纯文本
  wordCount.value = editor.getText().trim().length
}

// 编辑器内容改变的回调
const handleChange = (editor) => {
  // 核心逻辑：核心算法封装，每次内容变化时更新字数
  // .trim() 可以过滤掉前后的空格和空行，让计数更准确
  const text = editor.getText().trim()
  wordCount.value = text.length
}

// 组件销毁时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>