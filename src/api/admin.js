import service from "@/utils/request";

export const login = (data) => {
    return service.post("/user/login", data);
};

export const getCategoryTree = () => {
    return service.get("/knowledge/category/tree");
};

export const articlePage = (params) => {
    return service.get("/knowledge/article/page", { params });
}