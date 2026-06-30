<!-- testbox.vue -->

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
// 1. 核心变更：引入了 nextTick
import { onBeforeUnmount, ref, shallowRef, nextTick } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
const props = defineProps({
    // TestBox.vue
  content: {
    type: String,
    default: ''
  }
})
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref(props.content)  // 用父组件传入的值初始化
// 字数状态
const wordCount = ref(0)

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

/**
 * 核心算法封装：统一计算字数的复用模块
 * @param {Object} editor 编辑器实例
 */
const calculateWordCount = (editor) => {
  if (!editor) return
  // 关键逻辑：获取纯文本并去除首尾空格，防止换行符被误算进字数
  const text = editor.getText().trim()
  wordCount.value = text.length
}

// 编辑器创建完毕的回调
const handleCreated = (editor) => {
  editorRef.value = editor
  
  // 2. 核心变更：利用 nextTick 确保 DOM 稳定，防错防闪烁
  nextTick(() => {
    if (editor && valueHtml.value) {
      // 关键逻辑：如果使用的是非标准回显（如延迟加载的数据），在此处显式注入
      // editor.setHtml(valueHtml.value) 
      
      // 触发初始字数计算
      calculateWordCount(editor)
    }
  })
}
// TestBox.vue 内部
const emit = defineEmits(['update:content'])


// const test=editor.getText()
// 编辑器内容改变的回调
const handleChange = (editor) => {
  // 调用核心算法模块更新字数
  calculateWordCount(editor)
  // 编辑器onChange回调里
  emit('update:content', editor.getHtml())  
  // console.log(editor.getHtml())
}

// 组件销毁时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
// TestBox.vue 里暴露一个清空方法
defineExpose({
  clear: () => {
    editorRef.value?.setHtml('<p></p>')
    valueHtml.value = ''
  },
  setContent: (html) => editorRef.value?.setHtml(html || '')
})



</script>