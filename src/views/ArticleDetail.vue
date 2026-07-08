<template>
    <div>

    </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
import { UserGetArticle } from '../api/admin.js';
const route = useRoute();
const id=ref(route.params.id);
const detail=ref({})
const getdetail=async ()=>{
    const res=await UserGetArticle(id.value)
    detail.value=res.data
    console.log(res);
}
onMounted(()=>{
    console.log(id.value);
    getdetail();

}

)

</script>

<style lang="scss" scoped>

</style>