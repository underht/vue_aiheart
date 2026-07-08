// api/admin.js
/**
 * 后端接口封装。
 *
 * 说明：
 * - service 已在响应拦截器中返回 response.data，因此本文件返回的 Promise
 *   resolve 后通常是后端统一响应体，而不是 Axios 原始响应。
 * - 常见统一响应体格式：
 *   {
 *     code: "200",
 *     success: true,
 *     msg: "操作成功",
 *     data: {}
 *   }
 */
import service from "@/utils/request";

/**
 * 用户登录。
 *
 * @param {Object} data 登录信息。
 * @param {string} data.username 用户名。
 * @param {string} data.password 密码。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: {
 *     token: string,
 *     userInfo: Object|string,
 *     roleType: number|string
 *   }
 * }>} 登录结果。
 *
 * @example
 * const res = await login({ username: "admin", password: "123456" });
 * // res 示例：
 * // {
 * //   code: "200",
 * //   success: true,
 * //   msg: "登录成功",
 * //   data: {
 * //     token: "eyJhbGciOiJIUzI1NiJ9...",
 * //     userInfo: { id: 1, username: "admin", nickname: "管理员" },
 * //     roleType: 0
 * //   }
 * // }
 */
export const login = (data) => {
    return service.post("/user/login", data);
};

/**
 * 获取知识库分类树。
 *
 * 页面使用字段：
 * - Knowledge.vue: data[].id、data[].categoryName
 *
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: Array<{
 *     id: number,
 *     categoryName: string,
 *     parentId?: number,
 *     children?: Array<Object>
 *   }>
 * }>} 分类树列表。
 *
 * @example
 * const res = await getCategoryTree();
 * // res.data 示例：
 * // [
 * //   { id: 1, categoryName: "心理科普", parentId: 0, children: [] },
 * //   { id: 2, categoryName: "情绪管理", parentId: 0, children: [] }
 * // ]
 */
export const getCategoryTree = () => {
    return service.get("/knowledge/category/tree");
};

/**
 * 分页查询知识文章。
 *
 * 页面使用字段：
 * - Knowledge.vue: records、total
 * - 表格字段：id、title、categoryName、status、statusText、createdAt、
 *   updatedAt、readCount
 *
 * @param {Object} params 查询条件。
 * @param {number|string} params.currentPage 当前页。
 * @param {number|string} params.size 每页数量。
 * @param {string} [params.title] 文章标题。
 * @param {number|string} [params.categoryid] 分类 ID。
 * @param {number|string} [params.status] 状态：0 草稿，1 已发布，2 已下线，3 未发布。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: {
 *     records: Array<{
 *       id: number,
 *       title: string,
 *       categoryId: number,
 *       categoryName: string,
 *       status: number,
 *       statusText: string,
 *       createdAt: string,
 *       updatedAt: string,
 *       readCount: number
 *     }>,
 *     total: number,
 *     size: number,
 *     current: number
 *   }
 * }>} 文章分页数据。
 *
 * @example
 * const res = await articlePage({ currentPage: 1, size: 10, title: "睡眠" });
 * // res.data 示例：
 * // {
 * //   records: [
 * //     {
 * //       id: 12,
 * //       title: "如何改善睡眠质量",
 * //       categoryId: 2,
 * //       categoryName: "情绪管理",
 * //       status: 1,
 * //       statusText: "已发布",
 * //       createdAt: "2026-06-16 10:00:00",
 * //       updatedAt: "2026-06-16 12:00:00",
 * //       readCount: 128
 * //     }
 * //   ],
 * //   total: 1,
 * //   size: 10,
 * //   current: 1
 * // }
 */
export const articlePage = (params) => {
    return service.get("/knowledge/article/page", { params });
};

/**
 * 上传文章封面图片。
 *
 * 页面使用字段：
 * - ArticelDialog.vue: data.url
 *
 * @param {File} file 选择的图片文件。
 * @param {string} businessId 业务 ID，当前页面使用 crypto.randomUUID() 生成。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: {
 *     url: string,
 *     fileName?: string,
 *     fileId?: string
 *   }
 * }>} 上传结果。
 *
 * @example
 * const res = await uploadfile(file, "8a14a9d7-8e42-4b36-ae7d-8a4d4f0c33d1");
 * // res 示例：
 * // {
 * //   code: "200",
 * //   success: true,
 * //   msg: "上传成功",
 * //   data: {
 * //     url: "/mock/file/article/cover/demo.png",
 * //     fileName: "demo.png",
 * //     fileId: "file_001"
 * //   }
 * // }
 */
export const uploadfile = (file, businessId) => {
    let data = new FormData();
    data.append("file", "file");
    data.append("businessType", "ARTICLE");
    data.append("businessId", businessId);
    data.append("businessField", "cover");

    return service.post("/mock/file/upload", data);
};

/**
 * 新增知识文章。
 *
 * @param {Object} data 文章表单。
 * @param {string} data.title 标题。
 * @param {string} data.content 正文 HTML 内容。
 * @param {string} [data.coverImage] 封面图片地址。
 * @param {number|string} data.categoryId 分类 ID。
 * @param {string} [data.summary] 摘要。
 * @param {string} [data.tags] 标签，多个标签用英文逗号分隔。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: { id: number }|null
 * }>} 新增结果。
 *
 * @example
 * const res = await createArticle({
 *   title: "情绪记录的意义",
 *   content: "<p>每天记录一点感受。</p>",
 *   coverImage: "/uploads/cover.png",
 *   categoryId: 2,
 *   summary: "介绍情绪记录的价值",
 *   tags: "情绪,日记"
 * });
 * // res 示例：
 * // { code: "200", success: true, msg: "新增成功", data: { id: 15 } }
 */
export const createArticle = (data) => {
    return service.post("/knowledge/article", data);
};

/**
 * 获取文章详情。
 *
 * 页面使用字段：
 * - Knowledge.vue / ArticelDialog.vue: id、title、content、coverImage、
 *   categoryId、summary、tags
 *
 * @param {number|string} id 文章 ID。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: {
 *     id: number,
 *     title: string,
 *     content: string,
 *     coverImage: string,
 *     categoryId: number,
 *     categoryName?: string,
 *     summary: string,
 *     tags: string,
 *     status?: number,
 *     readCount?: number,
 *     createdAt?: string,
 *     updatedAt?: string
 *   }
 * }>} 文章详情。
 *
 * @example
 * const res = await getArticle(15);
 * // res.data 示例：
 * // {
 * //   id: 15,
 * //   title: "情绪记录的意义",
 * //   content: "<p>每天记录一点感受。</p>",
 * //   coverImage: "/uploads/cover.png",
 * //   categoryId: 2,
 * //   categoryName: "情绪管理",
 * //   summary: "介绍情绪记录的价值",
 * //   tags: "情绪,日记",
 * //   status: 0,
 * //   readCount: 0
 * // }
 */
export const getArticle = (id) => {
    return service.get("/knowledge/article/" + id);
};

/**
 * 编辑文章。
 *
 * @param {number|string} id 文章 ID。
 * @param {Object} data 文章表单，字段同 createArticle。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: null|Object
 * }>} 编辑结果。
 *
 * @example
 * const res = await exchangeArticle(15, {
 *   title: "情绪记录的意义",
 *   content: "<p>更新后的内容。</p>",
 *   categoryId: 2,
 *   tags: "情绪,日记"
 * });
 * // res 示例：
 * // { code: "200", success: true, msg: "编辑成功", data: null }
 */
export const exchangeArticle = (id, data) => {
    return service.put("/knowledge/article/" + id, data);
};

/**
 * 修改文章状态。
 *
 * @param {number|string} id 文章 ID。
 * @param {number|string} status 目标状态：1 发布，2 下线。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: null|Object
 * }>} 状态修改结果。
 *
 * @example
 * const res = await changeStatus(15, 1);
 * // res 示例：
 * // { code: "200", success: true, msg: "发布成功", data: null }
 */
export const changeStatus = (id, status) => {
    return service.put("/knowledge/article/" + id + "/" + status);
};

/**
 * 删除文章。
 *
 * @param {number|string} id 文章 ID。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: null
 * }>} 删除结果。
 *
 * @example
 * const res = await deleteAarticle(15);
 * // res 示例：
 * // { code: "200", success: true, msg: "删除成功", data: null }
 */
export const deleteAarticle = (id) => {
    return service.delete("/knowledge/article/" + id);
};

/**
 * 后台分页查询心理咨询会话。
 *
 * 页面使用字段：
 * - Consultation.vue: records、total
 * - 表格字段：id、userNickname、sessionTitle、lastMessageContent、
 *   messageCount、startedAt
 *
 * @param {Object} params 查询条件。
 * @param {number|string} params.currentPage 当前页。
 * @param {number|string} params.size 每页数量。
 * @param {string} [params.emotionTag] 情绪标签。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: {
 *     records: Array<{
 *       id: number,
 *       userId: number,
 *       userNickname: string,
 *       sessionTitle: string,
 *       lastMessageContent: string,
 *       messageCount: number,
 *       startedAt: string
 *     }>,
 *     total: number,
 *     size: number,
 *     current: number
 *   }
 * }>} 会话分页数据。
 *
 * @example
 * const res = await getConsultationPage({ currentPage: 1, size: 10 });
 * // res.data 示例：
 * // {
 * //   records: [
 * //     {
 * //       id: 8,
 * //       userId: 3,
 * //       userNickname: "小宁",
 * //       sessionTitle: "新的对话-1780000000000",
 * //       lastMessageContent: "今天有点焦虑",
 * //       messageCount: 6,
 * //       startedAt: "2026-06-16 09:30:00"
 * //     }
 * //   ],
 * //   total: 1,
 * //   size: 10,
 * //   current: 1
 * // }
 */
export const getConsultationPage = (params) => {
    return service.get("/psychological-chat/sessions", { params });
};

/**
 * 获取指定心理咨询会话的消息列表。
 *
 * 页面使用字段：
 * - Consultation.vue / FrontendConsultation.vue: senderType、senderTypeDesc、
 *   content、createdAt
 *
 * @param {number|string} sessionId 会话 ID。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: Array<{
 *     id: number|string,
 *     sessionId: number|string,
 *     senderType: number,
 *     senderTypeDesc?: string,
 *     content: string,
 *     createdAt: string
 *   }>
 * }>} 消息列表。
 *
 * @example
 * const res = await getConsultation(8);
 * // res.data 示例：
 * // [
 * //   {
 * //     id: 101,
 * //     sessionId: 8,
 * //     senderType: 1,
 * //     senderTypeDesc: "用户",
 * //     content: "今天有点焦虑",
 * //     createdAt: "2026-06-16 09:31:00"
 * //   },
 * //   {
 * //     id: 102,
 * //     sessionId: 8,
 * //     senderType: 2,
 * //     senderTypeDesc: "AI助手",
 * //     content: "我听到了你的焦虑，我们慢慢说。",
 * //     createdAt: "2026-06-16 09:31:05"
 * //   }
 * // ]
 */
export const getConsultation = (sessionId) => {
    return service.get("/psychological-chat/sessions/" + sessionId + "/messages");
};

/**
 * 后台分页查询情绪日记。
 *
 * 页面使用字段：
 * - Emotional.vue: records、total
 * - 表格和详情字段：id、username、userId、createdAt、dominantEmotion、
 *   moodScore、stressLevel、sleepQuality、emotionTriggers、diaryContent、
 *   aiEmotionAnalysis
 *
 * @param {Object} params 查询条件。
 * @param {number|string} params.current 当前页。
 * @param {number|string} params.size 每页数量。
 * @param {number|string} [params.userId] 用户 ID。
 * @param {string} [params.dominantEmotion] 主要情绪。
 * @param {number|string} [params.minMoodScore] 情绪分下限。
 * @param {number|string} [params.maxMoodScore] 情绪分上限。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: {
 *     records: Array<{
 *       id: number,
 *       userId: number,
 *       username: string,
 *       createdAt: string,
 *       dominantEmotion: string,
 *       moodScore: number,
 *       stressLevel: number,
 *       sleepQuality: number,
 *       emotionTriggers: string,
 *       diaryContent: string,
 *       aiEmotionAnalysis: string
 *     }>,
 *     total: number,
 *     size: number,
 *     current: number
 *   }
 * }>} 情绪日记分页数据。
 *
 * @example
 * const res = await getEmotionList({ current: 1, size: 10, dominantEmotion: "焦虑" });
 * // res.data 示例：
 * // {
 * //   records: [
 * //     {
 * //       id: 21,
 * //       userId: 3,
 * //       username: "xiaoning",
 * //       createdAt: "2026-06-16 20:00:00",
 * //       dominantEmotion: "焦虑",
 * //       moodScore: 6,
 * //       stressLevel: 3,
 * //       sleepQuality: 4,
 * //       emotionTriggers: "工作压力",
 * //       diaryContent: "今天任务很多，有些紧张。",
 * //       aiEmotionAnalysis: "{\"primaryEmotion\":\"焦虑\",\"isNegative\":true,\"riskLevel\":\"低\",\"emotionScore\":62,\"suggestion\":\"先做呼吸放松。\",\"riskDescription\":\"暂未发现高风险。\",\"improvementSuggestions\":[\"早点休息\"],\"timestamp\":\"2026-06-16 20:01:00\"}"
 * //     }
 * //   ],
 * //   total: 1,
 * //   size: 10,
 * //   current: 1
 * // }
 */
export const getEmotionList = (params) => {
    return service.get("/emotion-diary/admin/page", params);
};

/**
 * 后台删除情绪日记。
 *
 * @param {number|string} id 情绪日记 ID。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: null
 * }>} 删除结果。
 *
 * @example
 * const res = await deleteEmotionDiary(21);
 * // res 示例：
 * // { code: "200", success: true, msg: "删除成功", data: null }
 */
export const deleteEmotionDiary = (id) => {
    return service.delete("/emotion-diary/admin/" + id);
};

/**
 * 获取后台数据分析总览。
 *
 * 页面使用字段：
 * - Dashboard.vue: systemOverview、emotionTrend、consultationStats、
 *   userActivity
 *
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: {
 *     systemOverview: {
 *       totalUsers: number,
 *       todayNewUsers: number,
 *       activeUsers: number,
 *       totalSessions: number,
 *       todayNewSessions: number,
 *       totalDiaries: number,
 *       todayNewDiaries: number,
 *       avgMoodScore: number
 *     },
 *     emotionTrend: Array<{
 *       date: string,
 *       avgMoodScore: number,
 *       recordCount: number
 *     }>,
 *     consultationStats: {
 *       avgDurationMinutes: number,
 *       totalSessions: number,
 *       dailyTrend: Array<{
 *         date: string,
 *         sessionCount: number,
 *         userCount: number
 *       }>
 *     },
 *     userActivity: Array<{
 *       date: string,
 *       activeUsers: number,
 *       newUsers: number,
 *       diaryUsers: number,
 *       consultationUsers: number
 *     }>
 *   }
 * }>} 数据分析总览。
 *
 * @example
 * const res = await getDataAnalyticsOverview();
 * // res.data 示例：
 * // {
 * //   systemOverview: {
 * //     totalUsers: 120,
 * //     todayNewUsers: 5,
 * //     activeUsers: 32,
 * //     totalSessions: 260,
 * //     todayNewSessions: 12,
 * //     totalDiaries: 418,
 * //     todayNewDiaries: 20,
 * //     avgMoodScore: 7.2
 * //   },
 * //   emotionTrend: [
 * //     { date: "2026-06-16", avgMoodScore: 7.1, recordCount: 18 }
 * //   ],
 * //   consultationStats: {
 * //     avgDurationMinutes: 12,
 * //     totalSessions: 260,
 * //     dailyTrend: [
 * //       { date: "2026-06-16", sessionCount: 12, userCount: 8 }
 * //     ]
 * //   },
 * //   userActivity: [
 * //     {
 * //       date: "2026-06-16",
 * //       activeUsers: 32,
 * //       newUsers: 5,
 * //       diaryUsers: 14,
 * //       consultationUsers: 8
 * //     }
 * //   ]
 * // }
 */
export const getDataAnalyticsOverview = () => {
    return service.get("/data-analytics/overview");
};

/**
 * 用户退出登录。
 *
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: null
 * }>} 退出结果。
 *
 * @example
 * const res = await logoutApi();
 * // res 示例：
 * // { code: "200", success: true, msg: "退出成功", data: null }
 */
export const logoutApi = () => {
    return service.post("/user/logout");
};

/**
 * 用户注册。
 *
 * @param {Object} data 注册信息。
 * @param {string} data.username 用户名。
 * @param {string} data.email 邮箱。
 * @param {string} [data.nickname] 昵称。
 * @param {string} [data.phone] 手机号。
 * @param {string} data.password 密码。
 * @param {string} data.confirmPassword 确认密码。
 * @param {number} data.gender 性别：0 男，1 女，2 保密。
 * @param {number} data.userType 用户类型，当前前台注册传 1。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: {
 *     id: number,
 *     username: string
 *   }|null
 * }>} 注册结果。
 *
 * @example
 * const res = await register({
 *   username: "xiaoning",
 *   email: "xiaoning@example.com",
 *   nickname: "小宁",
 *   phone: "13800000000",
 *   password: "123456",
 *   confirmPassword: "123456",
 *   gender: 1,
 *   userType: 1
 * });
 * // res 示例：
 * // {
 * //   code: "200",
 * //   success: true,
 * //   msg: "注册成功",
 * //   data: { id: 3, username: "xiaoning" }
 * // }
 */
export const register = (data) => {
    return service.post("/user/register", data);
};

/**
 * 开启心理 AI 对话，并发送第一条初始化消息。
 *
 * 页面使用字段：
 * - FrontendConsultation.vue: data.sessionId、data.status、data.messageCount
 *
 * @param {Object} data 请求体。
 * @param {string} data.initialMessage 用户发送的第一条消息。
 * @param {string} data.sessionTitle 会话标题。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: {
 *     sessionId: string,
 *     status: string,
 *     sessionTitle: string,
 *     initialMessage?: string,
 *     startTime?: string,
 *     messageCount: number,
 *     expiryTime?: string,
 *     userHash?: string
 *   }
 * }>} 新会话信息。
 *
 * @example
 * const res = await sendfirstmessage({
 *   initialMessage: "今天心情还不错",
 *   sessionTitle: "新的对话-1780000000000"
 * });
 * // res.data 示例：
 * // {
 * //   sessionId: "session_8",
 * //   status: "active",
 * //   sessionTitle: "新的对话-1780000000000",
 * //   initialMessage: "今天心情还不错",
 * //   startTime: "2026-06-16 09:58:33",
 * //   messageCount: 2,
 * //   expiryTime: "2026-06-17 09:58:33",
 * //   userHash: "u_3"
 * // }
 */
export const sendfirstmessage = (data) => {
    return service.post("/psychological-chat/session/start", data);
};

/**
 * 前台分页获取当前用户的心理咨询会话列表。
 *
 * 页面使用字段：
 * - FrontendConsultation.vue: data.records
 * - 列表字段：id、sessionTitle、startedAt、lastMessageContent、messageCount
 *
 * @param {Object} data 分页参数。
 * @param {number|string} data.pageNum 当前页。
 * @param {number|string} data.pageSize 每页数量。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: {
 *     records: Array<{
 *       id: number,
 *       sessionTitle: string,
 *       startedAt: string,
 *       lastMessageContent: string,
 *       messageCount: number
 *     }>,
 *     total: number,
 *     pageNum?: number,
 *     pageSize?: number
 *   }
 * }>} 当前用户会话分页数据。
 *
 * @example
 * const res = await getsessionlist({ pageNum: 1, pageSize: 10 });
 * // res.data 示例：
 * // {
 * //   records: [
 * //     {
 * //       id: 8,
 * //       sessionTitle: "新的对话-1780000000000",
 * //       startedAt: "2026-06-16 09:58:33",
 * //       lastMessageContent: "今天心情还不错",
 * //       messageCount: 6
 * //     }
 * //   ],
 * //   total: 1,
 * //   pageNum: 1,
 * //   pageSize: 10
 * // }
 */
export const getsessionlist = (data) => {
    return service.get("/psychological-chat/sessions", data);
};

/**
 * 前台删除当前用户的心理咨询会话。
 *
 * @param {number|string} sessionId 会话 ID。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: null
 * }>} 删除结果。
 *
 * @example
 * const res = await userdeletsession(8);
 * // res 示例：
 * // { code: "200", success: true, msg: "删除成功", data: null }
 */
export const userdeletsession = (sessionId) => {
    return service.delete("/psychological-chat/sessions/" + sessionId);
};

/**
 * 前台获取当前用户指定会话的消息列表。
 *
 * 页面使用字段：
 * - FrontendConsultation.vue: senderType、content、createdAt
 *
 * @param {number|string} sessionId 会话 ID。
 * @returns {Promise<{
 *   code: string,
 *   success: boolean,
 *   msg: string,
 *   data: Array<{
 *     id: number|string,
 *     sessionId: number|string,
 *     senderType: number,
 *     senderTypeDesc?: string,
 *     content: string,
 *     createdAt: string
 *   }>
 * }>} 消息列表。
 *
 * @example
 * const res = await usergetsession(8);
 * // res.data 示例：
 * // [
 * //   {
 * //     id: 101,
 * //     sessionId: 8,
 * //     senderType: 1,
 * //     senderTypeDesc: "用户",
 * //     content: "今天心情还不错",
 * //     createdAt: "2026-06-16 09:58:33"
 * //   },
 * //   {
 * //     id: 102,
 * //     sessionId: 8,
 * //     senderType: 2,
 * //     senderTypeDesc: "AI助手",
 * //     content: "听起来今天有一些轻松的部分。",
 * //     createdAt: "2026-06-16 09:58:36"
 * //   }
 * // ]
 */
export const usergetsession = (sessionId) => {
    return service.get("/psychological-chat/sessions/" + sessionId + "/messages");
};


// diaryDate
// string 
// 记录日期
// 必需
// moodScore
// integer 
// 必需
// 情绪评分（1-10）
// dominantEmotion
// string 
// 重要情绪
// 必需
// emotionTriggers
// string 
// 情绪触发因素
// 必需
// diaryContent
// string 
// 今日感想
// 必需
// sleepQuality
// integer 
// 睡眠质量
// 必需
// stressLevel
// integer 
// 压力水平


export const postEmotionDiary = (data) => {
    return service.post("/emotion-diary", data);
    
}


// 获取会话情绪分析结果
export const getEmotionAnalysis = (sessionId) => {
    return service.post(`/psychological-chat/session/${sessionId}/emotion`);
}


export const UserGetArticleList = (data) => {
    return service.get("/knowledge/article/page", data);
}