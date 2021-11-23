import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import News from '../views/news.vue'
import Online from '../views/online.vue'
import diseaseInfo from '../views/diseaseInfo.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/', redirect:'/login'},
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{title: '欢迎来到济病通！'}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{title: '请先登录！'}
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta:{title: '请先注册！'}
  },
  {
    path: '/news',
    name: 'News',
    component: News,
    meta:{title: '科普资讯'}
  },
  {
    path: '/online',
    name: 'Online',
    component: Online,
    meta:{title: '线上问诊预约'}
  },
  {
    path: '/diseaseInfo',
    name: 'diseaseInfo',
    component: diseaseInfo,
    meta:{title: '疾病信息库'}
  },
  {
    path: '/userhome1',
    name: 'UserHome1',
    component:()=>import ('../views/UserHome1.vue'),
    meta:{title: '个人中心'}
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
