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
					// {
					// 	icon: "el-icon-lx-cascades",
					// 	index: "table",
					// 	title: "采购管理"
					// },
					// {
					// 	icon: "el-icon-lx-copy",
					// 	index: "tabs",
					// 	title: "销售管理"
					// },
				// =========================车辆管理================================
					{
						icon: "el-icon-lx-calendar",
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
					// {
					// 	icon: "el-icon-lx-emoji",
					// 	index: "icon",
					// 	title: "统计分析",
					// 	subs: [{
					// 		index: "purchasing",
					// 		title: "采购分析"
					// 	}, {
					// 		index: "sales",
					// 		title: "销售分析"
					// 	}, {
					// 		index: "warehouse",
					// 		title: "仓库分析"
					// 	}, {
					// 		index: "financial",
					// 		title: "财务分析"
					// 	}]
					// },
					// {
					// 	icon: "el-icon-pie-chart",
					// 	index: "charts",
					// 	title: "基础资料",
					// 	subs: [{
					// 		index: "vendor",
					// 		title: "供应商管理"
					// 	}, {
					// 		index: "customer",
					// 		title: "客户管理"
					// 	}, {
					// 		index: "depot",
					// 		title: "仓库管理"
					// 	}, {
					// 		index: "prosuct",
					// 		title: "产品管理"
					// 	}]
					// },
					// {
					//     icon: "el-icon-rank",
					//     index: "6",
					//     title: "拖拽组件",
					//     subs: [
					//         {
					//             index: "drag",
					//             title: "拖拽列表"
					//         },
					//         {
					//             index: "dialog",
					//             title: "拖拽弹框"
					//         }
					//     ]
					// },
					{
						icon: "el-icon-lx-global",
						index: "i18n",
						title: "系统设置"
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
