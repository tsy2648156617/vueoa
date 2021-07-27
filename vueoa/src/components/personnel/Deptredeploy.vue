<template>
	<div>
		<el-dialog title="岗位调动申请" v-model="dialogFormVisible">
			<el-form :model="form" ref="form" label-width="100px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="申请人:">
							<el-input v-model="form.applicant"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="原部门:">
							<el-input v-model="form.oldDept"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="原岗位:">
							<el-input v-model="form.oldJop"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="新部门:">
							<el-input v-model="form.newDept"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="新岗位:">
							<el-input v-model="form.newJop"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item style="text-align: center;margin-right: 100px;">
					<el-button size="mini" type="primary" @click="inserDeptRedeploy()">确认</el-button>
					<el-button @click="dialogFormVisible = false" size="mini">关 闭</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
	<div>
		<i class="el-icon-truck"></i>
		<span>员工调岗</span>
		<span class="right_span">
			<el-button type="primary" @click="dialogFormVisible = true">员工调岗申请</el-button>
		</span>
	</div>
	<div class="table">
		<el-table :data="tableData" border>
			<el-table-column prop="applicant" label="申请人">
			</el-table-column>
			<el-table-column prop="oldDept" label="原部门">
			</el-table-column>
			<el-table-column prop="oldJop" label="原岗位">
			</el-table-column>
			<el-table-column prop="newDept" label="新部门">
			</el-table-column>
			<el-table-column prop="newJop" label="新岗位">
			</el-table-column>
			<el-table-column prop="redeployFlowid" label="调岗流程ID">
			</el-table-column>
			<el-table-column label="流程状态" align="center">
				<template #default="scope">
					<el-tag :type="scope.row.flowState === 0? 'success': scope.row.flowState === 1? 'danger': ''">{{ scope.row.flowState == 0 ? "审批中" : "审核通过" }}</el-tag>
				</template>
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[2, 3, 6, 10]" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				activeName: 'first',
				dialogFormVisible: false,
				form: {
					applicant: '',
					oldDept: '',
					oldJop: '',
					newDept: '',
					newJop: '',
				},
				pageInfo: {
					currentPage: 1,
					pagesize: 3,
					total: 0,
				},
			};
		},
		methods: {
			//获取当前页码
			handleCurrentChange(currentPage) {
				this.pageInfo.currentPage = currentPage
				this.selectDeptRedeploy();
			},
			handleSizeChange(pagesize) {
				this.pageInfo.pagesize = pagesize
				this.selectDeptRedeploy();
			},

			//查询调岗信息
			selectDeptRedeploy() {
				const this_ = this
				this.axios.get("http://localhost:8089/oa/selectDeptRedeploy", {
						params: this.pageInfo
					})
					.then(function(response) {
						this_.tableData = response.data.list
						this_.pageInfo.total = response.data.total
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			//新增调岗
			inserDeptRedeploy() {
				const _this = this
				this.axios.post('http://localhost:8089/oa/inserDeptRedeploy', this.form)
					.then(function(response) {
						_this.dialogFormVisible = false,
							console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
		},
		created() {
			this.selectDeptRedeploy();
		}
	};
</script>

<style>
</style>
