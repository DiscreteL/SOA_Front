import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import News from '../views/news.vue'
import Online from '../views/online.vue'
import diseaseInfo from '../views/diseaseInfo.vue'
import adminHome from '../views/admin/adminHome.vue'
import docApp from '../views/docApplication/index.vue'
import problemList from '../views/problem/index.vue'
import problemAdd from '../views/problem/problemAdd.vue'
import message from '../views/message/index.vue'
import report from '../views/report/index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { title: '欢迎来到济病通！' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '请先登录！' }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: '请先注册！' }
  },
  {
    path: '/news',
    name: 'News',
    component: News,
    meta: { title: '科普资讯' }
  },
  {
    path: '/online',
    name: 'Online',
    component: Online,
    meta: { title: '线上问诊预约' }
  },
  {
    path: '/diseaseInfo',
    name: 'diseaseInfo',
    component: diseaseInfo,
    meta: { title: '疾病信息库' }
  },
  {
    path: '/adminHome',
    name: 'adminHome',
    component: adminHome,
    meta: { title: '管理员主页' },
    children: [
      {
        path: '/docApp',
        component: docApp,
        meta: { title: '医生资格认证申请' }
      },
      {
        path: '/problemList',
        component: problemList,
        meta: { title: '问题列表' }
      },
      {
        path: '/problemAdd',
        component: problemAdd,
        meta: { title: '添加常见问题' }
      },
      {
        path: '/report',
        component: report,
        meta: { title: '反馈列表' }
      },
      {
        path: '/message',
        component: message,
        meta: { title: '资讯列表' }
      },
    ]
  },
  // {
  //   path: '/doc',
  //   name: 'DoctorHome',
  //   component: doc,
  //   meta:{title: '医生个人中心'}
  // }
  {
    path: '/userhome1',
    name: 'UserHome1',
    component: () => import('../views/patient/UserHome1.vue'),
    meta: { title: '个人中心' },
    redirect: '/esseninfo',
    children: [{
      path: '/esseninfo',
      component: () => import('../views/patient/info/EssenInfo.vue')
    },
    {
      path: '/accmanage',
      component: () => import('../views/patient/info/AccManage.vue')
    },
    ]
  },

  {
    path: '/collection',
    name: 'Collection',
    component: () => import('../views/patient/Collection.vue'),
    meta: { title: '收藏' },
    redirect: '/person',
    children: [{
      path: '/person',
      component: () => import('../views/patient/collection/Person.vue')
    },
    {
      path: '/video',
      component: () => import('../views/patient/collection/Video.vue')
    },
    {
      path: '/article',
      component: () => import('../views/patient/collection/Article.vue')
    },
    ]
  },
  {
    path: '/consult',
    name: 'Consult',
    component: () => import('../views/patient/Consult.vue'),
    meta: { title: '问诊' },
    redirect: '/apply',
    children: [{
      path: '/apply',
      component: () => import('../views/patient/consult/Apply.vue')
    },
    {
      path: '/record',
      component: () => import('../views/patient/consult/Record.vue')
    },
    ]
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/patient/Help.vue'),
    meta: { title: '帮助中心' }
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
