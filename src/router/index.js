import { createRouter ,createWebHistory} from "vue-router";
import BackendLayout from "../components/BackendLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";

const routes = [
    {
        path: "/back",
        redirect: "/back/dashboard",
        component: BackendLayout,
        name:"Back",
        children: [//子路由：
            {
                path: "dashboard",
                component: () => import("@/views/Dashboard.vue"),
                meta: { title: "数据分析",
                    icon: "PieChart"
                 }
// meta用于定义路由的元信息，可以在路由导航守卫中获取
            },{
                path: "knowledge",
                component: () => import("@/views/Knowledge.vue"),
                meta: { title: "知识文章",
                    icon: "Reading"
                 }
            },{
                path: "consultation",
                component: () => import("@/views/Consultation.vue"),
                meta: { title: "咨询记录",
                    icon: "ChatDotSquare"
                 }
            },
             {
                path: "emotional",
                component: () => import("@/views/Emotional.vue"),
                meta: { title: "情绪日志",
                    icon: "UserFilled"
                 }
            },
        ]
    },{
        path: "/auth",
        component: AuthLayout,
        children: [
            {
                path: "login",
                component: () => import("@/views/Login.vue"),
                meta: { title: "用户登录",
                    icon: "User"
                 }
            },{
                path: "register",
                component: () => import("@/views/Register.vue"),
                meta: { title: "用户注册",
                    icon: "UserAdd"
                 }
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const roleType = localStorage.getItem('roleType');
    if(token) {
        if(roleType==2) {
            if(to.path.startsWith('/back')) {
                next();
            } else {
                next();
            }
        }else{
            if(to.path.startsWith('/back')) {
                next({ path: '/' });
            } else {
                next();
            }
        }
    } else {
        if(to.path.startsWith('/back')) {
            next({ path: '/auth/login' });
        }
        next();
    }
});

export default router;
