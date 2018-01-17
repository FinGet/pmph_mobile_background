import Vue from 'vue'
import Router from 'vue-router'

import Login from 'pages/Login.vue'
import Home from 'pages/Home.vue'
import Index from 'pages/home/index/work';
/** 教材申报 */
import MaterialRouter from 'pages/home/material/router';
import ApplicationList from 'pages/home/material/applicat-list';


/** 工作 */
import BookError from 'pages/home/bookError/bookError';

/** 用户中心 */
import UserRouter from 'pages/home/user/router'
import UserInfo from 'pages/home/user/user-info'
import Messages from 'pages/home/user/messages'

/** 小组 */
import GroupRouter from 'pages/home/group/router'
import GroupList from 'pages/home/group/group-list'

/* 选题申报 */
import Topic from '../pages/home/selectTopic/topic'
import QueryProgress from '../pages/home/selectTopic/queryProgress'
import DeclareList from '../pages/home/selectTopic/declareList'
import DistributeEditor from '../pages/home/selectTopic/distributeEditor'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: '登录', component: Login },
    { path: '/', name: '首页', component: Home ,redirect: { name: '工作' },children:[
        // 工作 首页
        {path:'index',name:'工作',component:Index,meta:{showFooterBar:true,hideTopBar:true,}},

        // 教材申报
        {path: 'material', name: '教材申报', component: MaterialRouter,meta:{},children:[
          {path:'list',name:'申报列表',component:ApplicationList,meta:{title:'申报表审核'}}
        ]},
        {path:'bookerror',name:'图书纠错',component:BookError,meta:{showFooterBar:true,title:'图书纠错'}},
        // 小组
        {path: 'group', name: '小组', component: GroupRouter,meta:{},children:[
          {path:'list',name:'小组列表',component:GroupList,meta:{showFooterBar:true,title:'小组列表'}}
        ]},

        // 用户中心
        {path: 'user', name: '用户', component: UserRouter,children:[
          {path:'info',name:'用户中心',component:UserInfo,meta:{showFooterBar:true,title:'个人资料'}},
          {path:'messages',name:'系统消息',component:Messages,meta:{showFooterBar:true,title:'系统消息'}}
        ]},
      { path: 'topic', name: '选题申报', component: Topic,children:[
        { path: 'progress', name: '选题进度查询', component: QueryProgress, meta: { showFooterBar: true, title: '选题进度查询' }},
        { path: 'list', name: '申报表审核', component: DeclareList, meta: { showFooterBar: true, title: '我要出书' } },
        { path: 'editor', name: '申报表审核', component: DistributeEditor, meta: { showFooterBar: true, title: '分配编辑' } },
      ]}
      ]

    },
  ]
})
