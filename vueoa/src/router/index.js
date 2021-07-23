import {
	createRouter,
	createWebHistory
} from "vue-router";
import Home from "../views/Home.vue";
//车辆管理
import Carapproval from "@/components/car/Carapproval";
import Carinformation from "@/components/car/Carinformation";
import Usecar from "@/components/car/Usecar";
//人事管理
import Deptredeploy from "@/components/personnel/Deptredeploy";
import Empdimission from "@/components/personnel/Empdimission";
import Empregularization from "@/components/personnel/Empregularization";
import Intoemp from "@/components/personnel/Intoemp";
//权限管理
import Dept from "@/components/sys/Dept";
import SysLog from "@/components/sys/SysLog";
import SysMenus from "@/components/sys/SysMenus";
import SysRole from "@/components/sys/SysRole";
import SysUser from "@/components/sys/SysUser";


const routes = [{
	path: '/',
	redirect: '/dashboard'
}, {
	path: "/",
	name: "Home",
	component: Home,
	children: [{
			path: "/dashboard",
			name: "dashboard",
			meta: {
				title: '系统首页'
			},
			component: () => import(
				/* webpackChunkName: "dashboard" */
				"../views/Dashboard.vue")
		},
		
		{
			path: "/table",
			name: "basetable",
			meta: {
				title: '表格'
			},
			component: () => import(
				/* webpackChunkName: "table" */
				"../views/BaseTable.vue")
		},
		// ===========================车辆管理====================================
		{
			path: "/Carinformation",
			name: "Carinformation",
			meta: {
				title: '车辆信息维护'
			},
			component: Carinformation
		},
		{
			path: "/Usecar",
			name: "Usecar",
			meta: {
				title: '车辆使用情况'
			},
			component: Usecar
		},
		{
			path: "/Carapproval",
			name: "Carapproval",
			meta: {
				title: '车辆使用申请审批'
			},
			component: Carapproval
		},
		// ===========================人事管理====================================
		{
			path: "/Intoemp",
			name: "Intoemp",
			meta: {
				title: '员工入职'
			},
			component: Intoemp
		},
		{
			path: "/Empregularization",
			name: "Empregularization",
			meta: {
				title: '员工转正'
			},
			component: Empregularization
		},
		{
			path: "/Deptredeploy",
			name: "Deptredeploy",
			meta: {
				title: '员工调岗'
			},
			component: Deptredeploy
		},
		{
			path: "/Empdimission",
			name: "Empdimission",
			meta: {
				title: '员工离职'
			},
			component: Empdimission
		},
		// =======================================系统权限管理==================================================
		{
			path: "/SysUser",
			name: "SysUser",
			meta: {
				title: '用户管理'
			},
			component: SysUser
		},
		{
			path: "/SysRole",
			name: "SysRole",
			meta: {
				title: '角色管理'
			},
			component: SysRole
		},
		{
			path: "/SysMenus",
			name: "SysMenus",
			meta: {
				title: '菜单管理'
			},
			component: SysMenus
		},
		{
			path: "/SysLog",
			name: "SysLog",
			meta: {
				title: '日志管理'
			},
			component: SysLog
		},
		{
			path: "/Dept",
			name: "Dept",
			meta: {
				title: '部门管理'
			},
			component: Dept
		},
		{
			path: "/permission",
			name: "permission",
			meta: {
				title: '权限管理',
				permission: true
			},
			component: () => import(
				/* webpackChunkName: "permission" */
				"../components/sys/Permission.vue")
		},
		// ================================================================================================================
		{
			path: "/charts",
			name: "basecharts",
			meta: {
				title: '图表'
			},
			component: () => import(
				/* webpackChunkName: "charts" */
				"../views/BaseCharts.vue")
		},
		{
			path: "/form",
			name: "baseform",
			meta: {
				title: '表单'
			},
			component: () => import(
				/* webpackChunkName: "form" */
				"../views/BaseForm.vue")
		},
		{
			path: "/tabs",
			name: "tabs",
			meta: {
				title: 'tab标签'
			},
			component: () => import(
				/* webpackChunkName: "tabs" */
				"../views/Tabs.vue")
		}, {
			path: "/donate",
			name: "donate",
			meta: {
				title: '鼓励作者'
			},
			component: () => import(
				/* webpackChunkName: "donate" */
				"../views/Donate.vue")
		}, 
		{
			path: "/i18n",
			name: "i18n",
			meta: {
				title: '国际化语言'
			},
			component: () => import(
				/* webpackChunkName: "i18n" */
				"../views/I18n.vue")
		}, {
			path: "/upload",
			name: "upload",
			meta: {
				title: '上传插件'
			},
			component: () => import(
				/* webpackChunkName: "upload" */
				"../views/Upload.vue")
		}, {
			path: "/icon",
			name: "icon",
			meta: {
				title: '自定义图标'
			},
			component: () => import(
				/* webpackChunkName: "icon" */
				"../views/Icon.vue")
		}, {
			path: '/404',
			name: '404',
			meta: {
				title: '找不到页面'
			},
			component: () => import( /* webpackChunkName: "404" */
				'../views/404.vue')
		}, {
			path: '/403',
			name: '403',
			meta: {
				title: '没有权限'
			},
			component: () => import( /* webpackChunkName: "403" */
				'../views/403.vue')
		}
	]
},
{
	path: "/login",
	name: "Login",
	meta: {
		title: '登录'
	},
	component: () => import(
		/* webpackChunkName: "login" */
		"../views/Login.vue")
}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} | vue-manage-system`;
	const role = localStorage.getItem('ms_username');
	if (!role && to.path !== '/login') {
		next('/login');
	} else if (to.meta.permission) {
		// 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
		role === 'admin' ?
			next() :
			next('/403');
	} else {
		next();
	}
});

export default router;
