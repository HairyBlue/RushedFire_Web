import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: ()=>import("../views/Home.vue")
        },
        {
            path: "/demo",
            name: "Demo",
            component: ()=>import("../views/Demo.vue")
        },
        {
            path: "/team-signup",
            name: "TeamSignup",
            component: ()=>import("../views/TeamAuth/Signup.vue")
        },
        {
            path: "/auth/team-login",
            name: "TeamLogin",
            component: ()=>import("../views/TeamAuth/Login.vue")
        },
        {
            path: "/v1/auth/admin-signup",
            name: "AdminSignup",
            component: ()=>import("../views/AdminAuth/Signup.vue")
        },
        {
            path: "/v1/auth/admin-login",
            name: "AdminLogin",
            component: ()=>import("../views/AdminAuth/Login.vue")
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: ()=>import("../views/Dashboard.vue")
        },
        {
            path: "/:pathMatch(.*)*",
            name: "PageNotFound",
            component: ()=>import("../views/PageNotFound.vue")
        }
    ]
})

export default router