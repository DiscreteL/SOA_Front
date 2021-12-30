import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import News from '../views/news.vue'
import Online from '../views/online.vue'
import diseaseInfo from '../views/diseaseInfo.vue'
import adminHome from '../views/admin/adminHome.vue'
import docApp from '../views/docApplication/index.vue'
import problemList from '../views/problem/index.vue'
import problemAdd from '../views/problem/problemAdd.vue'
import tweet from '../views/tweet/index.vue'
import video from '../views/video/index.vue'
import report from '../views/report/index.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/test',
        compomnent: () =>
            import ('@/views/patient/test.vue')
    },
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
        path: '/doctorchat',
        name: 'DoctorChat',
        component: () =>
            import ('@/views/chat/DoctorChat.vue'),
        meta: { title: '聊天室' }
    },
    {
        path: '/patientchat',
        name: 'PatientChat',
        component: () =>
            import ('@/views/chat/PatientChat.vue'),
        meta: { title: '聊天室' }
    },
    {
        path: '/testchat',
        name: 'PatientChat',
        component: () =>
            import ('@/views/chat/video.vue'),
        meta: { title: '聊天室' }
    },
    {
        path: '/adminHome',
        name: 'adminHome',
        component: adminHome,
        meta: { title: '管理员主页' },
        children: [{
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
                path: '/video',
                component: video,
                meta: { title: '视频列表' }
            },
            {
                path: '/tweet',
                component: tweet,
                meta: { title: '推文列表' }
            },
        ]
    },

    {
        path: '/userhome2',
        name: 'UserHome2',
        component: () =>
            import ('../views/doctor/userHome2.vue'),
        redirect: '/docInfo',
        children: [{
                path: '/docInfo',
                component: () =>
                    import ('../views/doctor/info/docInfo.vue'),
                meta: { title: '基本信息' },
            },
            {
                path: '/accManage',
                component: () =>
                    import ('../views/doctor/info/accManage.vue'),
                meta: { title: '账号管理' },
            }
        ]
    },

    {
        path: '/messagecenter',
        name: 'MessageCenter',
        component: () =>
            import ('../views/doctor/messageCenter.vue'),
        children: [{
                path: '/uploadArticle',
                component: () =>
                    import ('../views/doctor/message/uploadArticle.vue'),
                meta: { title: '发布文章' },
            },
            {
                path: '/uploadVideo',
                component: () =>
                    import ('../views/doctor/message/uploadVideo.vue'),
                meta: { title: '上传视频' },
            },
            {
                path: '/manageArticle',
                component: () =>
                    import ('../views/doctor/message/manageArticle.vue'),
                meta: { title: '文章管理' },
            },
            {
                path: '/manageVideo',
                component: () =>
                    import ('../views/doctor/message/manageVideo.vue'),
                meta: { title: '视频管理' },
            },
        ]
    },

    {
        path: '/consultcenter',
        name: 'ConsultCenter',
        component: () =>
            import ('../views/doctor/consultCenter.vue'),
        children: [{
                path: '/waitApply',
                component: () =>
                    import ('../views/doctor/consult/waitApply.vue'),
                meta: { title: '预约申请' },
            },
            {
                path: '/sucApply',
                component: () =>
                    import ('../views/doctor/consult/sucApply.vue'),
                meta: { title: '待问诊' },
            },
            {
                path: '/docRecord',
                component: () =>
                    import ('../views/doctor/consult/docRecord.vue'),
                meta: { title: '问诊记录' },
            }
        ]
    },

    {
        path: '/helpcenter',
        name: 'HelpCenter',
        component: () =>
            import ('../views/doctor/helpCenter.vue'),
        children: [{
                path: '/feedback',
                component: () =>
                    import ('../views/doctor/help/feedback.vue'),
                meta: { title: '问题反馈' },
            },
            {
                path: '/feedbackList',
                component: () =>
                    import ('../views/doctor/help/feedbackList.vue'),
                meta: { title: '反馈记录' },
            },
            {
                path: '/problems',
                component: () =>
                    import ('../views/doctor/help/problems.vue'),
                meta: { title: '常见问题解答' },
            }
        ]
    },

    {
        path: '/userhome1',
        name: 'UserHome1',
        component: () =>
            import ('../views/patient/UserHome1.vue'),
        redirect: '/userhome1/esseninfo',
        children: [{
                path: 'esseninfo',
                component: () =>
                    import ('../views/patient/info/EssenInfo.vue'),
                meta: { title: '基本信息' },
            },
            {
                path: 'accmanage',
                component: () =>
                    import ('../views/patient/info/AccManage.vue'),
                meta: { title: '账号管理' },
            },
        ]
    },
    {
        path: '/collection',
        name: 'Collection',
        component: () =>
            import ('../views/patient/Collection.vue'),
        redirect: 'collection/person',

        children: [{
                path: 'person',
                component: () =>
                    import ('../views/patient/collection/Person.vue'),
                meta: { title: '关注人' },

            },
            {
                path: 'video',
                component: () =>
                    import ('../views/patient/collection/Video.vue'),
                meta: { title: '收藏视频' },

            },
            {
                path: 'article',
                component: () =>
                    import ('../views/patient/collection/Article.vue'),
                meta: { title: '收藏推文' },
            },
        ]
    },
    {
        path: '/waitempty',
        component: () =>
            import ('../views/patient/consult/apply/waitempty.vue'),
    },
    {
        path: '/personempty',
        component: () =>
            import ('../views/patient/collection/personempty.vue'),
    },
    {
        path: '/articleempty',
        component: () =>
            import ('../views/patient/collection/articleempty.vue'),
    },
    {
        path: '/videoempty',
        component: () =>
            import ('../views/patient/collection/videoempty.vue'),
    },
    {
        path: '/consult',
        name: 'Consult',
        component: () =>
            import ('../views/patient/Consult.vue'),
        redirect: '/consult/record',
        children: [{
                path: 'total',
                component: () =>
                    import ('../views/patient/consult/apply/TotalApply.vue'),
                meta: { title: '预约' }
            },
            {
                path: 'success',
                component: () =>
                    import ('../views/patient/consult/apply/SucApply.vue'),
                meta: { title: '预约' },
            },
            {
                path: 'fail',
                component: () =>
                    import ('../views/patient/consult/apply/FailApply.vue'),
                meta: { title: '预约' },
            },
            {
                path: 'wait',
                component: () =>
                    import ('../views/patient/consult/apply/WaitApply.vue'),
                meta: { title: '预约' },
            },
            {
                path: 'record',
                name: 'Record',
                component: () =>
                    import ('../views/patient/consult/Record.vue'),
                meta: { title: '问诊记录' }
            }
        ]
    },
    {
        path: '/help',
        name: 'Help',
        component: () =>
            import ('../views/patient/Help.vue'),
        meta: { title: '帮助中心' },
        redirect: '/help/faq',
        children: [{
                path: 'faq',
                name: 'FAQ',
                component: () =>
                    import ('../views/patient/help/FAQ.vue'),
                meta: { title: '常见问题' }
            },
            {
                path: 'releaseq',
                name: 'ReleaseQ',
                component: () =>
                    import ('../views/patient/help/ReleaseQ.vue'),
                meta: { title: '反馈问题' }
            },
            {
                path: 'totalq',
                component: () =>
                    import ('../views/patient//help/myquestion/TotalQ.vue'),
                meta: { title: '我的反馈' }
            },
            {
                path: 'successq',
                component: () =>
                    import ('../views/patient/help/myquestion/SucQ.vue'),
                meta: { title: '我的反馈' },
            },
            {
                path: 'waitq',
                component: () =>
                    import ('../views/patient/help/myquestion/WaitQ.vue'),
                meta: { title: '我的反馈' },
            },
        ]
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