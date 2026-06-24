
/**
 * 向后端的请求
 * 根据apifox填
 */
import service from "@/utils/request";


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