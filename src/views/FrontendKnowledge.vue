<template>
    <div class="main">
        
            <el-scrollbar >
                
                <div class="container">
            <div class="left">
                <el-card shadow="always"
                >
                    <p>推荐阅读</p>
                </el-card>
            </div>
            <div class="right">

                <el-row v-for="item in articleList" :key="item.id"> 
                    <el-card class="article_card"
                    @click="router.push(`/knowledge/article/${item.id}`)"
                    >
                        <div class="card_content">
                            <div class="cover_box">
                                <el-image :src="getImg(item.coverImage)" alt="文章封面" class="cover_img" />
                            </div>

                            <div class="info_box">
                                <div class="title_row">
                                    <span class="article_title">{{ item.title }}</span>
                                    <el-tag size="small" type="info" class="article_tag">
                                        {{ item.tags || item.categoryName }}
                                    </el-tag>
                                </div>

                                <div class="meta_row">
                                    <p><i class="el-icon-user"></i> {{ item.authorName }}</p>
                                    <p><i class="el-icon-date"></i> {{ item.publishedAt ? item.publishedAt.split(' ')[0] : '' }}</p>
                                    <p><i class="el-icon-monitor"></i> 观看人数：{{ item.readCount }}</p>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-row>
            </div>         
        </div>
            </el-scrollbar>



    </div>
</template>

<script setup>
import { onMounted,ref ,reactive } from 'vue'
import {UserGetArticleList} from '../api/admin.js'
import { useRouter } from 'vue-router'

const router=useRouter()
const pageNation=reactive({
    currentPage:1,
    size:10,
    total:0
})

const commandPageNation=reactive({
    currentPage:1,
    size:5,
    total:0
})
const commandArticleList=ref([])

const articleList=ref([])
const getArticleList=async()=>{
    const params={
        currentPage:pageNation.currentPage,
        size:pageNation.size,
        sortField:'publishedAt',
        sortDirection:'desc',
    }

    try{
        const res=await UserGetArticleList(params)
        console.log( "文章列表",res);
        articleList.value=res.data.records
        pageNation.total=res.data.total

    }catch(error){
        console.log(error);
        
    }
}

const getCommandArticleList=async()=>{
    const params={
        currentPage:commandPageNation.currentPage,
        size:commandPageNation.size,
        sortField:'readCount',
        sortDirection:'desc',
    }

    try{
        const res=await UserGetArticleList(params)
        console.log("推荐文章","res");
        commandArticleList.value=res.data.records;
        commandPageNation.total=res.data.total;

    }catch(error){
        console.log(error);
        
    }
}
const getImg=(url)=>{

    return url? "http://159.75.169.224:1235"+url :"https://file.itndedu.com/psychology_ai.png"

}
onMounted(async()=>{
    getArticleList()
    getCommandArticleList()
})

</script>

<style lang="scss" scoped>
/* 核心修复：1. 修正拼写 main ；2. 给左右两侧合理的宽度分配 */
.main {
    width: 100%;
    height: 100%;
    .el-scrollbar {
        width: 100%; 
    }
    .container {
        display: flex;
        width: 100%;
        flex-direction: row; /* 保持左右排列 */
        gap: 20px; /* 给左右两边留点空隙 */

        .left {
            width: 30%;
            display: flex;
            flex-direction: row-reverse;
            .el-card{
                width: 300px;
                height: 300px;
            }
        }
        
        .right {
            // flex: 1; /* 核心算法：让右边自动占满剩下的所有宽度 */
            width: 70%;
            .article_card{
                width: 700px;
            
                margin-bottom: 10px;
            }
        }
    }
}
.article_card {
    width: 100%;
    margin-bottom: 15px;

    :deep(.el-card__body) {
        padding: 15px; // 调整卡片内边距
    }

    .card_content {
        display: flex;
        flex-direction: row;
        gap: 20px; // 核心算法：图片与右侧文字的间距

        .cover_box {
            width: 160px;
            height: 100px;
            flex-shrink: 0; // 防止图片被压缩
            overflow: hidden;
            border-radius: 4px;

            .cover_img {
                width: 100%;
                height: 100%;
                object-fit: cover; // 核心逻辑：保证图片不变形
            }
        }

        .info_box {
            flex: 1; // 占满右侧剩余空间
            display: flex;
            flex-direction: column;
            justify-content: space-between; // 核心算法：让标题在顶部，元信息在底部上下撑开

            .title_row {
                display: flex;
                align-items: center;
                gap: 10px;

                .article_title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #333;
                }
                .article_tag {
                    background-color: #eef5fe;
                    color: #409eff;
                    border: none;
                }
            }

            .meta_row {
                font-size: 14px;
                color: #666;
                display: flex;
                flex-direction: column;
                gap: 6px; // 纵向各行小图标的间距
                
                p {
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
            }
        }
    }
}
</style>