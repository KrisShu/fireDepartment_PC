import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import( '../views/login.vue')
    }
  },
  {
    path: '/index',
    name: 'index',
    component: function () {
      return import( '../views/functionPages/index.vue')
    },
    redirect: { name: "Firealarmnetwork" },
    children: [
      {
        path: "Firealarmnetwork",
        name: "Firealarmnetwork",
        component: () => import("../views/functionPages/Hiddendanger_Alarm/Firealarmnetwork.vue")
      },
      {
        path: "Independentfirealarm",
        name: "Independentfirealarm",
        component: () => import("../views/functionPages/Hiddendanger_Alarm/Independentfirealarm.vue")
      },
      {
        path: "Safeelectric",
        name: "Safeelectric",
        component: () => import("../views/functionPages/Hiddendanger_Alarm/Safeelectric.vue")
      },
      {
        path: "Firepiep",
        name: "Firepiep",
        component: () => import("../views/functionPages/Hiddendanger_Alarm/Firepiep.vue")
      },
      {
        path: "Firealarmnetwork_d",
        name: "Firealarmnetwork_d",
        component: () => import("../views/functionPages/fireFightingFacilities/Firealarmnetwork_d.vue")
      },
      {
        path: "Independentfirealarm_d",
        name: "Independentfirealarm_d",
        component: () => import("../views/functionPages/fireFightingFacilities/Independentfirealarm_d.vue")
      },
      {
        path: "Safeelectric_d",
        name: "Safeelectric_d",
        component: () => import("../views/functionPages/fireFightingFacilities/Safeelectric_d.vue")
      },

      {
        path: "Firepiep_d",
        name: "Firepiep_d",
        component: () => import("../views/functionPages/fireFightingFacilities/Firepiep_d.vue")
      },
      {
        path: "Fireunit",
        name: "Fireunit",
        component: () => import("../views/functionPages/fireunit/index.vue")
      },
      {
        path: "Firehydrant",
        name: "Firehydrant",
        component: () => import("../views/functionPages/fireHydrtant/Firehydrant.vue")
      },
      {
        path: "FirehydrantPiep",
        name: "FirehydrantPiep",
        component: () => import("../views/functionPages/fireHydrtant/FirehydrantPiep.vue")
      },
      {
        path: "Policeincident",
        name: "Policeincident",
        component: () => import("../views/functionPages/fireHydrtant/Policeincident.vue")
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

// todo 登录判定
router.beforeEach(function(to, from, next) {
  if(to.matched.some( m => m.meta.auth)){  // 对路由进行验证       
    if(localStorage.getItem('firedepartment_rs')==1) { // 已经登陆      
      next()   // 正常跳转到你设置好的页面     
    }
    else{       
      // 未登录则跳转到登陆界面
      next({path:'/login'})
    } 
  }else{ 
    next() 
  } 
});

export default router
