<template>
	<div class="sidebar">
		<el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
			text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-submenu :index="item.index" :key="item.index">
						<template #title>
							<i :class="item.icon"></i>
							<span>{{ item.title }}</span>
						</template>
						<template v-for="subItem in item.subs">
							<el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
								<template #title>{{ subItem.title }}</template>
								<el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
									{{ threeItem.title }}
								</el-menu-item>
							</el-submenu>
							<el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
							</el-menu-item>
						</template>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index" :key="item.index">
						<i :class="item.icon"></i>
						<template #title>{{ item.title }}</template>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
	// import bus from "../common/bus";
	export default {
		data() {
			return {
				items: [{
						icon: "el-icon-lx-home",
						index: "dashboard",
						title: "系统首页"
					},
				// =========================车辆管理================================
					{
						icon: "el-icon-truck",
						index: "1",
						title: "车辆管理",
						subs: [{
								index: "Carinformation",
								title: "车辆信息维护"
							},
							{
								index: "Usecar",
								title: "车辆使用情况"
							},
							{
								index: "Carapproval",
								title: "车辆使用申请审批"
							}
						]
					},
					// ========================人事管理=================================
					{
						icon: "el-icon-lx-calendar",
						index: "2",
						title: "人事管理",
						subs: [{
								index: "Intoemp",
								title: "员工入职"
							},
							{
								index: "Empregularization",
								title: "员工转正"
							},
							{
								index: "Deptredeploy",
								title: "员工调岗"
							},
							{
								index: "Empdimission",
								title: "员工离职"
							}
						]
					},
					// ========================权限管理=================================
					{
						icon: "el-icon-lx-global",
						index: "3",
						title: "系统管理",
						subs: [{
								index: "SysUser",
								title: "用户管理"
							},
							{
								index: "SysRole",
								title: "角色管理"
							},
							{
								index: "SysMenus",
								title: "菜单管理"
							},
							{
								index: "SysLog",
								title: "日志管理"
							},
							{
								index: "Dept",
								title: "部门管理"
							},
							{
								index: "permission",
								title: "权限测试"
							}
						]
					},

				]
			};
		},
		computed: {
			onRoutes() {
				return this.$route.path.replace("/", "");
			},
			collapse() {
				return this.$store.state.collapse
			}
		}
	};
</script>

<style scoped>
	.sidebar {
		display: block;
		position: absolute;
		left: 0;
		top: 70px;
		bottom: 0;
		overflow-y: scroll;
	}

	.sidebar::-webkit-scrollbar {
		width: 0;
	}

	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 250px;
	}

	.sidebar>ul {
		height: 100%;
	}
</style>
