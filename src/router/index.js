import { createRouter, createWebHistory } from "vue-router";
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
      meta: { requireToken: true },
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
      children: [
      
       // dashboard
        {
          path: '',
          name: 'Dashboard-Index',
          component: ()=>import("../components/Main/Dashboard/Index.vue")
        },

        //alarm
        {
          path: "alarm",
          name: "Alarm",
          component: ()=>import("../components/Main/Alarm/Index.vue"),
          children: [
            {
              path: '',
              name: 'Alarm-Overview',
              component: ()=>import("../components/Main/Alarm/Overview.vue")
            },
            {
              path: 'manage',
              name: 'Alarm-Manage',
              component: ()=>import("../components/Main/Alarm/Manage.vue")
            }
          ]
        },

        //reports
        {
          path: "reports",
          name: "Reports",
          component: ()=>import("../components/Main/Reports/Index.vue"),
          children: [
            {
              path: '',
              name: 'Reports-Overview',
              component: ()=>import("../components/Main/Reports/Overview.vue")
            },
            {
              path: 'manage',
              name: 'Reports-Manage',
              component: ()=>import("../components/Main/Reports/Manage.vue")
            }
          ]
        },

         //device
         {
          path: "device",
          name: "Device",
          component: ()=>import("../components/Main/Reports/Index.vue"),
          children: [
            {
              path: '',
              name: 'Device-Overview',
              component: ()=>import("../components/Main/Device/Overview.vue")
            },
            {
              path: 'manage',
              name: 'Device-Manage',
              component: ()=>import("../components/Main/Device/Manage.vue")
            }
          ]
        },
         
         //team
         {
          path: "team",
          name: "Team",
          component: ()=>import("../components/Main/Team/Index.vue"),
          children: [
            {
              path: '',
              name: 'Team-Overview',
              component: ()=>import("../components/Main/Team/Overview.vue")
            },
            {
              path: 'manage',
              name: 'Team-Manage',
              component: ()=>import("../components/Main/Team/Manage.vue")
            }
          ]
        },
         
         //user
         {
          path: "user",
          name: "User",
          component: ()=>import("../components/Main/User/Index.vue"),
          children: [
            {
              path: '',
              name: 'User-Overview',
              component: ()=>import("../components/Main/User/Overview.vue")
            },
            {
              path: 'manage',
              name: 'User-Manage',
              component: ()=>import("../components/Main/User/Manage.vue")
            }
          ]
        }
         
         
      ]
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
  const requiresNoAdmin = to.matched.some((record) => record.meta.requireNoAdmin);
  const requiresToken = to.matched.some((record) => record.meta.requireToken);

  const isAuthenticated = JSON.parse(localStorage.getItem("auth"));
  
  try {
    if (requiresNoAdmin) {
      const result = await Api.prototype.getadmin();
      if (result?.status == 200) {
        return next();
      }
    }
    if (requiresAuth && isAuthenticated == null) {
      return next({name: "Home"})
    }
    if (requiresAuth && isAuthenticated.role == "Citizen") {
      return next({ name: "PageNotFound" });
    }
    if (requiresToken && isAuthenticated !== null) {
      const role = jwt_decode(isAuthenticated.token).role;
      if (( role == "Admin" || role == "Team")) {
        return next({name: "Dashboard"});
      }
     return  next({ name: "PageNotFound" })
    }
    next();
  } catch (error) {
    if (error.name == "AxiosError" && error.response?.status == 400) {
      next({ name: "PageNotFound" });
    } else {
      next({name: "NetworkError"})
    }
  }
});

export default router;
