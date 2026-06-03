import axios from "axios";

const request = axios.create({
  baseURL: '/api/',
  timeout: 10000,
});

request.interceptors.request.use(
  (config) => {
    // Add any custom headers or configurations here
    // 发送请求前的处理   
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }//把你的“身份通行证”（Token）塞进数据包的头部
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//响应拦截器
request.interceptors.response.use(

  (response) => {
    const {data ,config}=response;
    if (response.status === 200) {
      // 处理成功的响应
      console.log('请求成功:', data);
      return data;
    }
    return response;

  },
  (error) => {
    console.error('请求失败:', error);
    if(error.config.url.includes('/login')) {
      // 如果是登录请求失败，清除 token
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default request;
