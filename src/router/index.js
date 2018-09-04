/**
 * Created by yqr on 2018/3/26.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import TopNav from '@/components/tableContents/topNav'
import CourseCenter from '@/components/tableContents/courseCenter'
import SchoolManagementCenter from '@/components/tableContents/schoolManagementCenter'
import SystemManagement from '@/components/tableContents/systemManagement'
import CurriculumCenters from '@/components/tableContents/curriculumCenter'

import CurriculumCenter from '@/components/curriculumCenter'
import Container from '@/components/container'
import Chapter from '@/components/chapter'

import ShiftsManagement from '@/components/curriculum/shiftManagement/shiftsManagement'
import CourseEvaluation from '@/components/curriculum/shiftManagement/courseEvaluation'
import ShiftCourseSorts from '@/components/curriculum/shiftManagement/courseSorts'
import CreateaCategoryList from '@/components/curriculum/shiftManagement/createaCategoryList'
import GradeManagement from '@/components/curriculum/gradeManagement/index'
import CourseSorts from '@/components/curriculum/courseSorts/index'

import CertifiedStudents from '@/components/certifiedStudents'
import TeacherManagement from '@/components/user/teacherManagement'
import DoManagement from '@/components/user/doManagement'
import LabelManagement from '@/components/user/labelManagement'
import ShiftManagement from '@/components/user/shiftManagement'
import MenuManagement from '@/components/authority/menuManagement'
import RoleManagement from '@/components/authority/roleManagement'
import Announcement from '@/components/portalPage/announcement'
import News from '@/components/portalPage/news'
import SchoolConfiguration from '@/components/portalPage/schoolConfiguration'
import Helps from '@/components/helps/index'
import SchoolcertifiedStudents from '@/components/system/user/certifiedStudents'
import Schoolteacher from '@/components/system/user/teacherManagement'
import Schoolshift from '@/components/system/user/shiftManagement'
import Schooldomanage from '@/components/system/user/doManagement'
import Schoollabel from '@/components/system/user/labelManagement'
import Schoolmenu from '@/components/system/authority/menuManagement'
import Schoolrole from '@/components/system/authority/roleManagement'
import SchoolConfig from '@/components/system/portalPage/schoolConfiguration'
import Schoolannoun from '@/components/system/portalPage/announcement'
import Schoolnews from '@/components/system/portalPage/news'
import SchoolcourseSorts from '@/components/system/portalPage/courseSorts'
import SchoolManager from '@/components/system/schoolManager/schoolManager'
import SystemSettings from '@/components/system/systemSettings/index'
import ChapterContent from '@/components/curriculum/teachingContent/chapterContent'
import CourseResources from '@/components/curriculum/teachingContent/courseResources'
import Video from '@/components/curriculum/teachingContent/video'
import VideoDetalis from '@/components/curriculum/teachingContent/videoDetalis'

import Test from '@/components/curriculum/teachingContent/test'
import TestDetalis from '@/components/curriculum/teachingContent/testDetalis'

import Operation from '@/components/curriculum/teachingContent/operation'
import OperationDetalis from '@/components/curriculum/teachingContent/operationDetalis'

import Discuss from '@/components/curriculum/teachingContent/discuss'
import ClassMembers from '@/components/curriculum/classMembers/index'
import TeachingFootprint from '@/components/curriculum/teachingManagement/teachingFootprint'
import Teachannouncement from '@/components/curriculum/teachingManagement/announcement'
import Vote from '@/components/curriculum/teachingManagement/vote'
import Questionnaire from '@/components/curriculum/teachingManagement/questionnaire'

import OpenShift from '@/components/openShift'
import ShiftEditing from '@/components/user/shiftEditing'
import EditAgain from '@/components/user/editAgain'

import Materials from '@/components/user/materials'
import CourseInformationEditing from '@/components/user/courseInformationEditing'
import CreateACategoryList from '@/components/curriculum/courseSorts/createACategoryList'
import Examination from '@/components/curriculum/teachingContent/examination'
import CreateExamFirst from '@/components/curriculum/teachingContent/createExamFirst'
import CreateExamSecond from '@/components/curriculum/teachingContent/createExamSecond'


import editSInformation from '@/components/user/editSInformation'
import teachEditing from '@/components/user/teachEditing'
import Single from '@/components/single'

import electiveManagement from '@/components/user/electiveManagement'


import authority from '@/components/authority/authority'


import editingSchool from '@/components/system/schoolManager/editingSchool'

import schooledit from '@/components/system/user/editSInformation'
import schoolelective from '@/components/system/user/electiveManagement'

//import index from '@/components/index'



import teachingSupervision from '@/components/curriculum/teachingContent/teachingSupervision'









// 懒加载方式，当路由被访问的时候才加载对应组件
//const Login = resolve => require(['@/views/login'], resolve)

Vue.use(Router)

let router = new Router({
  routes: [
  	{
      path: '/shiftEditing',
      type: 'shiftEditing',
      component: ShiftEditing,
      name:'shiftEditing'
    },
    {
      path: '/editAgain',
      type: 'editAgain',
      component: EditAgain,
      name:'editAgain'
    },
    {
      path: '/single',
      type: 'single',
      component: Single
    },
    {
      path: '/createACategoryList',
      type: 'createACategoryList',
      component: CreateACategoryList
    },
    {
      path: '/createaCategoryList',
      type: 'createaCategoryList',
      component: CreateaCategoryList
    },
    {
      path: '/materials',
      type: 'materials',
      component: Materials,
      name:'materials'
    },
    {
      path: '/openShift',
      type: 'openShift',
      component: OpenShift,
      name:'openShift'
    },
    {
      path: '/courseInformationEditing',
      type: 'courseInformationEditing',
      component: CourseInformationEditing
    },
    {
      path: '/',
      type: 'home',
      name: 'home',
      redirect: '/curriculumCenter',
      component: Home,
      children: [
        {
          path: '/curriculumCenter',
          name: '课程列表',
          components: {
            default: CurriculumCenter,
            top: TopNav,
            aside: CourseCenter
          },
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true
        },
        {
        	path: '/shiftManagement',
          components: {
            default: Container,
            top: TopNav,
            aside: CourseCenter
          },
          name: '班课管理',
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/shiftManagement/shiftsManagement', component: ShiftsManagement, name: 'shiftManagement', menuShow: true },
            { path: '/shiftManagement/courseEvaluation', component: CourseEvaluation, name: '班课评价', menuShow: true },
            { path: '/shiftManagement/shiftCourseSorts', component: ShiftCourseSorts, name: '班课分类', menuShow: true },

          ]
        },
        {
          path: '/courseSorts',
          name: '课程分类',
          components: {
            default: CourseSorts,
            top: TopNav,
            aside: CourseCenter
          },
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true
        },
      ]
    },
    {
      path: '/certified',
      type: 'certifiedStudents',
      name: 'certifiedStudents',
      redirect: '/certifiedStudents',
      component: Home,
      children: [
        {
        	path: '/certifiedStudents',
          components: {
            default: Container,
            top: TopNav,
            aside: SchoolManagementCenter
          },
          name: '用户管理',
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/certifiedStudents', component: CertifiedStudents, name: '用户管理', menuShow: true },
            { path: '/certifiedStudents/teacherManagement', component: TeacherManagement, name: '教师管理', menuShow: true },
            { path: '/certifiedStudents/shiftManagement', component: ShiftManagement, name: '班次管理', menuShow: true },
            { path: '/certifiedStudents/doManagement', component: DoManagement, name: '文档管理', menuShow: true },
            { path: '/certifiedStudents/labelManagement', component: LabelManagement, name: '标签管理', menuShow: true },

          ]
        },
        {
        	path: '/menuManagement',
          components: {
            default: Container,
            top: TopNav,
            aside: SchoolManagementCenter
          },
          name: '权限管理',
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/menuManagement', component: MenuManagement, name: '菜单管理', menuShow: true },
            { path: '/menuManagement/roleManagement', component: RoleManagement, name: '角色管理', menuShow: true },

          ]
        },
        {
        	path: '/schoolConfiguration',
          components: {
            default: Container,
            top: TopNav,
            aside: SchoolManagementCenter
          },
          name: '门户页面管理',
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/schoolConfiguration', component: SchoolConfiguration, name: '学校配置', menuShow: true },
            { path: '/schoolConfiguration/announcement', component: Announcement, name: '系统公告', menuShow: true },
            { path: '/schoolConfiguration/news', component: News, name: '新闻', menuShow: true },
            { path: '/schoolConfiguration', component: SchoolConfiguration, name: '课程分类', menuShow: true },
          ]
        },
        {
          path: '/helps',
          name: '帮助中心',
          components: {
            default: Helps,
            top: TopNav,
            aside: SchoolManagementCenter
          },
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true
        }
      ]
    },

    {
      path: '/school',
      type: 'schoolcertifiedStudents',
      name: 'schoolcertifiedStudents',
      redirect: '/schoolcertifiedStudents',
      component: Home,
      children: [
        {
        	path: '/schoolcertifiedStudents',
          components: {
            default: Container,
            top: TopNav,
            aside: SystemManagement
          },
          name: '用户管理',
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/schoolcertifiedStudents', component: SchoolcertifiedStudents, name: '用户管理', menuShow: true },
            { path: '/schoolcertifiedStudents/schoolteacher', component: Schoolteacher, name: '教师管理', menuShow: true },
            { path: '/schoolcertifiedStudents/schoolshift', component: Schoolshift, name: '班次管理', menuShow: true },
            { path: '/schoolcertifiedStudents/schooldomanage', component: Schooldomanage, name: '文档管理', menuShow: true },
            { path: '/schoolcertifiedStudents/schoollabel', component: Schoollabel, name: '标签管理', menuShow: true },

          ]
        },
        {
        	path: '/schoolmenu',
          components: {
            default: Container,
            top: TopNav,
            aside: SystemManagement
          },
          name: '权限管理',
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/schoolmenu', component: Schoolmenu, name: '菜单管理', menuShow: true },
            { path: '/schoolmenu/schoolrole', component: Schoolrole, name: '角色管理', menuShow: true },

          ]
        },
        {
        	path: '/schoolConfig',
          components: {
            default: Container,
            top: TopNav,
            aside: SystemManagement
          },
          name: '门户页面管理',
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/schoolConfig', component: SchoolConfig, name: '系统配置', menuShow: true },
            { path: '/schoolConfig/schoolannoun', component: Schoolannoun, name: '系统公告', menuShow: true },
            { path: '/schoolConfig/schoolnews', component: Schoolnews, name: '新闻', menuShow: true },
            { path: '/schoolConfig/schoolcourseSorts', component: SchoolcourseSorts, name: '课程分类', menuShow: true },
          ]
        },
        {
          path: '/schoolManager',
          name: '学校管理',
          components: {
            default: SchoolManager,
            top: TopNav,
            aside: SystemManagement
          },
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true
        },
        {
          path: '/systemSettings',
          name: '系统设置',
          components: {
            default: SystemSettings,
            top: TopNav,
            aside: SystemManagement
          },
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true
        }
      ]
    },
    
    {
      path: '/chapter',
      type: 'chapterContent',
      name: 'chapterContent',
      redirect: '/chapterContent',
      component: Home,
      children: [
        {
        	path: '/chapterContent',
          components: {
            default: Chapter,
            top: TopNav,
//          aside: CurriculumCenters
          },
          name: '教学内容',
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/chapterContent', component: ChapterContent, name: '章节内容', menuShow: true },
            { path: '/chapterContent/courseResources', component: CourseResources, name: '课程资源', menuShow: true },
            { path: '/chapterContent/video', component: Video, name: '视频', menuShow: true },
            { path: '/chapterContent/videoDetalis', component: VideoDetalis, name: 'videoDetalis', menuShow: true },
            { path: '/chapterContent/test', component: Test, name: '测验', menuShow: true },
            { path: '/chapterContent/testDetalis', component: TestDetalis, name: 'testDetalis', menuShow: true },
            { path: '/chapterContent/operation', component: Operation, name: '作业', menuShow: true },
            { path: '/chapterContent/operationDetalis', component: OperationDetalis, name: 'operationDetalis', menuShow: true },
            { path: '/chapterContent/discuss', component: Discuss, name: '讨论', menuShow: true },
            { path: '/chapterContent/examination', component: Examination, name: '考试', menuShow: true },
            { path: '/chapterContent/createExamFirst', component: CreateExamFirst, name: '创建考试', menuShow: true },
            { path: '/chapterContent/createExamSecond', component: CreateExamSecond, name: '创建考试', menuShow: true },
            
          ]
        },
        {
          path: '/classMembers',
          name: '班级成员',
          components: {
            default: Chapter,
            top: TopNav,
//          aside: CurriculumCenters
          },
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children:[
          	{path:'/classMembers',component:ClassMembers,name:'班级成员',menuShow: true}
          ]
        },
        {
        	path: '/teachingFootprint',
          components: {
            default: Chapter,
            top: TopNav,
//          aside: CurriculumCenters
			
          },
          name: '教学管理',
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/teachingFootprint', component: TeachingFootprint, name: '教学足迹', menuShow: true },
            { path: '/teachingFootprint/teachannouncement', component: Teachannouncement, name: '公告', menuShow: true },
            { path: '/teachingFootprint/vote', component: Vote, name: '投票', menuShow: true },
            { path: '/teachingFootprint/questionnaire', component: Questionnaire, name: '问卷', menuShow: true }
            
          ]
        },
        {
          path: '/gradeManagement',
          name: '成绩管理',
          components: {
            default: Chapter,
            top: TopNav,
//          aside: CurriculumCenters
          },
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children:[
          	{path:'/gradeManagement',component:GradeManagement,name:'班级成员',menuShow: true}
          ]
        }
        
      ]
    },
  ]
});

//router.beforeEach((to, from, next) => {
//// console.log('to:' + to.path)
//if (to.path.startsWith('/login')) {
//  window.localStorage.removeItem('access-user')
//  next()
//} else if(to.path.startsWith('/register')){
//  window.localStorage.removeItem('access-user')
//  next()
//} else {
//  let user = JSON.parse(window.localStorage.getItem('access-user'))
//  if (!user) {
//    next({path: '/login'})
//  } else {
//    next()
//  }
//}


export default router
