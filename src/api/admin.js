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
export const register = (data) => {
    return service.post("/user/register", data);
}
/**
 * 关键逻辑：开启心理AI对话并发送第一条初始化消息
 * * @param {Object} data - 请求体参数
 * @param {string} data.initialMessage - 第一条问候语或用户输入的初始文本（例如："今天天气很好..."）
 * @param {string} data.sessionTitle - 会话的标题，通常由名称和当前时间戳拼接而成
 * @returns {Promise} 返回一个 Promise 对象，包含后台响应的会话详情数据
 * * @example
 * // 调用示例：
 * sendfirstmessage({
 * initialMessage: "今天天气很好，心情还不错",
 * sessionTitle: "宁渡AI助手 - 2026/6/16 09:58:33"
 * })
 */
export const sendfirstmessage = (data) => {
    // 核心算法：通过 POST 请求将初始消息和会话标题提交给后端，启动新的聊天会话
    return service.post("/psychological-chat/session/start", data);
}


// pageNum
// string 
// 当前页
// 必需
// pageSize
// string 
// 分页数
export const getsessionlist=(data)=>{
    return service.get("/psychological-chat/sessions",data);
}
export const userdeletsession=(sessionId)=>{
    return service.delete("/psychological-chat/sessions/"+sessionId);
}