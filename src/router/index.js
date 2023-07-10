import { createRouter, createWebHistory, useRouter } from "vue-router";
import Api from "../api/adminapi";
import jwt_decode from "jwt-decode";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/demo",
      name: "Demo",
      component: () => import("../views/Demo.vue"),
    },
    {
      path: "/team-signup",
      name: "TeamSignup",
      component: () => import("../views/TeamAuth/Signup.vue"),
    },
    {
      path: "/auth/team-login",
      name: "TeamLogin",
      component: () => import("../views/TeamAuth/Login.vue"),
      meta: { requireNoToken: true },
    },
    {
      path: "/v1/auth/admin-signup",
      name: "AdminSignup",
      component: () => import("../views/AdminAuth/Signup.vue"),
      meta: { requireNoAdmin: true },
    },
    {
      path: "/v1/auth/admin-login",
      name: "AdminLogin",
      component: () => import("../views/AdminAuth/Login.vue"),
      meta: { requireToken: true },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("../views/Dashboard.vue"),
      meta: { requireAuth: true },
    },
    {
      path: "/error",
      name: "NetworkError",
      component: () => import("../views/Error/NetworkError.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      component: () => import("../views/Error/PageNotFound.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requireAuth);
  const requiresNoAdmin = to.matched.some(
    (record) => record.meta.requireNoAdmin
  );
  const requiresToken = to.matched.some((record) => record.meta.requireToken);
  const isAuthenticed = JSON.parse(localStorage.getItem("auth"));

  try {
    if (requiresNoAdmin) {
      const result = await Api.prototype.getadmin();
      if (result.status == 200) {
        return next();
      }
      throw Error;
    } else if (
      requiresAuth &&
      (isAuthenticed.role == "Citizen" || isAuthenticed == null)
    ) {
      next({ name: "PageNotFound" });
    } else if (requiresToken && isAuthenticed !== null) {
      const role = jwt_decode(isAuthenticed.token).role;
      if ((role == "Admin" || role == "Team")) {
        return next({name: "Dashboard"});
      }
      next({ name: "PageNotFound" })
    } else {
      next();
    }   
  } catch (error) {
    if (error.name == "AxiosError" && error.response.status == 400) {
      next({ name: "PageNotFound" });
    }
  }
});

export default router;
