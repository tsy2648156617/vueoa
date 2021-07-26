<template>
	<div>
		<el-dialog title="员工离职申请" v-model="dialogFormVisible">
			<el-form :model="form" ref="form" label-width="100px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="申请人:">
							<el-input v-model="form.applicant"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="申请人部门:">
							<el-input v-model="form.applyDept"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="现任岗位">
							<el-input v-model="form.nowJop"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="离职原因">
							<el-input v-model="form.dimissionReason"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item style="text-align: center;margin-right: 100px;">
					<el-button size="mini" type="primary" @click="inserEmpDimission()">确认</el-button>
					<el-button @click="dialogFormVisible = false" size="mini">关 闭</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
	<div>
		<i class="el-icon-truck"></i>
		<span>员工离职</span>
		<span class="right_span">
			<el-button type="primary" @click="dialogFormVisible = true">员工离职申请</el-button>
		</span>
	</div>
	<div class="table">
		<el-table :data="tableData" border>
			<el-table-column prop="applicant" label="申请人">
			</el-table-column>
			<el-table-column prop="applyDept" label="申请人部门">
			</el-table-column>
			<el-table-column prop="nowJop" label="现任岗位">
			</el-table-column>
			<el-table-column prop="submitDate" label="提交日期">
			</el-table-column>
			<el-table-column prop="dimissionFlowid" label="离职流程ID">
			</el-table-column>
			<el-table-column label="流程状态">
				<template #default="scope">
					<i class="el-icon-success" v-show="scope.row.flowState==1" style="color:#67c23A;margin-left: 20px;"></i>
					<i class="el-icon-warning" v-show="scope.row.flowState==0" style="margin-left: 20px;"></i>
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
					applyDept: '',
					nowJop: '',
					dimissionReason: '',
					
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
				this.selectEmpDimission();
			},
			handleSizeChange(pagesize) {
				this.pageInfo.pagesize = pagesize
				this.selectEmpDimission();
			},
			
			//查询调岗信息
			selectEmpDimission() {
				const this_ = this
				this.axios.get("http://localhost:8089/oa/selectEmpDimission", {
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
			inserEmpDimission() {
				const _this = this
				this.axios.post('http://localhost:8089/oa/inserEmpDimission', this.form)
					.then(function(response) {
						_this.dialogFormVisible = false,
							console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
		},
		created() {
			this.selectEmpDimission();
		}
	};
</script>

<style>
</style>
