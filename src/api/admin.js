//api/admin.js
/**
 * 向后端的请求
 * 根据apifox填
 */
import service from "@/utils/request";
import { Header } from "element-plus/es/components/table-v2/src/components/index.mjs";


/**
 * 用户登录
 * @param {Object} data - 登录信息
 * @returns {Promise} - 登录结果
 */
export const login = (data) => {
    return service.post("/user/login", data);
};

export const getCategoryTree = () => {
    return service.get("/knowledge/category/tree");
};

export const articlePage = (params) => {
    return service.get("/knowledge/article/page", { params });
}
export const uploadfile=(file,businessId)=>{
    let data = new FormData();
    data.append('file', 'file');
    data.append('businessType', 'ARTICLE');
    data.append('businessId', businessId);
    data.append('businessField', 'cover');

    return service.post("/mock/file/upload",data);

}
export const createArticle=(data)=>{

    return service.post("/knowledge/article",data);
}
export const getArticle=(id)=>{
    return service.get("/knowledge/article/"+id);
}
export const exchangeArticle=(id,data)=>{
    return service.put("/knowledge/article/"+id,data);

}
export const changeStatus=(id,status)=>{
//状态（1 发布 2下线）
    return service.put("/knowledge/article/"+id+"/"+status);
}
export const deleteAarticle=(id)=>{
    return service.delete("/knowledge/article/"+id);
}
export const getConsultationPage=(params)=>{
    return service.get("/psychological-chat/sessions",{params});
}
export const getConsultation=(sessionId)=>{
    return service.get("/psychological-chat/sessions/"+sessionId+"/messages");
}
export const getEmotionList=(params)=>{
    return service.get("/emotion-diary/admin/page",params);
}
export const deleteEmotionDiary=(id)=>{
    return service.delete("/emotion-diary/admin/"+id);
}

export const getDataAnalyticsOverview=()=>{
    return service.get("/data-analytics/overview");
}

export const logoutApi = () => {
    return service.post("/user/logout");
}