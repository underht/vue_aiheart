<template>
  <div class="table-search">
    <!-- 去掉 label-width，让标签宽度自适应 -->


      <el-form :model="formState" ref="formRef" >
      <el-row :gutter="10">

        <el-col

          v-for="item in formItems"
          :key="item.prop"
          :xs="24"
          :sm="8"
          :md="8"
          :lg="8"
        >
          <el-form-item :label="item.label" :prop="item.prop" class="form-item">
            <component
              :is="item.component"
              v-model="formState[item.prop]"
              v-bind="item.props"
              :placeholder="item.placeholder"
              class="responsive-input"
            >
              <template v-if="item.options" #default>
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </template>
            </component>
          </el-form-item>
          
        </el-col>
        <!-- 按钮列：也使用响应式列属性，避免无宽度导致溢出 -->
        <el-col :xs="24" :sm="24" :md="24" :lg="24" class="all" >
          <div class="actions">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset" type="default">重置</el-button>
          </div>
        </el-col>

      </el-row>
    </el-form>

    </div>


</template>

<script setup>
import { reactive, watch, ref } from 'vue';
const emit = defineEmits(['search', 'reset']);
const props = defineProps({
  formItems: {
    type: Array,
    default: () => []
  }
});

const formRef = ref(null);

// 对每个表单项维护一个响应式值，确保 v-model 有绑定目标
const formState = reactive({});
// 保存初始值以便重置
const initialState = { };

const init = () => {
  props.formItems.forEach(item => {
    formState[item.prop] = item.value ?? item.default ?? '';
    // 深拷贝简单值（确保引用类型也能重置为初始引用/值）
    initialState[item.prop] = Array.isArray(formState[item.prop]) || typeof formState[item.prop] === 'object'
      ? JSON.parse(JSON.stringify(formState[item.prop]))
      : formState[item.prop];
  });
};
init();

// 如果父组件传入的 formItems 变化，重新初始化
watch(() => props.formItems, init, { deep: true });

const handleSearch = () => {
  console.log('提交的搜索数据:', formState);
  emit('search', { ...formState });
};

const handleReset = () => {
  // 恢复到初始值
  Object.keys(formState).forEach(key => {
    if (initialState.hasOwnProperty(key)) {
      // 若为对象/数组，重新赋值为深拷贝，避免引用问题
      const val = initialState[key];
      formState[key] = (val && typeof val === 'object') ? JSON.parse(JSON.stringify(val)) : val;
    } else {
      formState[key] = '';
    }
  });

  // 如果 el-form 提供 resetFields，调用以清除校验等
  if (formRef.value && typeof formRef.value.resetFields === 'function') {
    formRef.value.resetFields();
  }

  emit('reset');
};
</script>

<style lang="scss" scoped>
/* 父容器：保证占满父宽度并使用 border-box，防止 el-row 负外边距导致溢出 */
.table-search {
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  overflow: hidden;
}


/* 按钮列样式（保留） */
.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  width: 100%;
}

.all{
  flex: auto;
  padding: 0 12px;
}
// .form-col {
//   padding:1px;
// }
</style>
