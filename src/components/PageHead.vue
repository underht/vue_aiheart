<template>
    <div>
        <div class="page-head">
            <p class="page-title">
                {{props.title}}
            </p>
            <div class="page-actions">
                <slot name="actions"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,   
        default: '页面标题'
    }
});
</script>

<style lang="scss" scoped>
.page-head {
    display: flex;
    justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #eee;

  p {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>