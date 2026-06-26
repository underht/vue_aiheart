
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
    data.append('file', '');
    data.append('businessType', 'ARTICLE');
    data.append('businessId', businessId);
    data.append('businessField', 'cover');

    return service.post("/file/upload",data);

}
