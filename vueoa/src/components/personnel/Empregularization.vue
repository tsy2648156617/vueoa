<template>
	<div>
		<el-dialog title="员工转正申请" v-model="dialogFormVisible">
			<el-form :model="form" ref="form" label-width="100px">
				<el-row>
					<el-form-item label="标题:">
						<el-input v-model="form.title"></el-input>
					</el-form-item>
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
						<el-form-item label="转正人员:">
							<el-input v-model="form.regularizationEmp"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="转正人员部门:">
							<el-input v-model="form.regularizationDept"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="入职时间:">
							<el-input v-model="form.intodate"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="申请时间:">
							<el-input v-model="form.applyDate"></el-input>
						</el-form-item>
					</el-col>
					<el-form-item label="对本岗位职责的要求的理解:" style="width: 600px;">
						<el-input v-model="form.jopUnderstand"></el-input>
					</el-form-item>
					<el-form-item label="试用期在那些方面有了成长:" style="width: 600px;">
						<el-input v-model="form.growup"></el-input>
					</el-form-item>
					<el-form-item label="目前存在的不足:" style="width: 600px;">
						<el-input v-model="form.deficiency"></el-input>
					</el-form-item>
				</el-row>
				<el-form-item style="text-align: center;margin-right: 100px;">
					<el-button size="mini" type="primary" @click="inserEmpRegularization()">确认</el-button>
					<el-button @click="dialogFormVisible = false" size="mini">关 闭</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
	<div>
		<i class="el-icon-coordinate"></i>
		<span>员工转正</span>
		<span class="right_span">
			<el-button type="primary" @click="dialogFormVisible = true">员工转正申请</el-button>
		</span>
	</div>
	<div class="table">
		<el-table :data="tableData" border>
			<el-table-column prop="regularizationEmp" label="转正人员">
			</el-table-column>
			<el-table-column prop="regularizationDept" label="转正人员部门">
			</el-table-column>
			<el-table-column prop="intodate" label="入职时间">
			</el-table-column>
			<el-table-column prop="applyDate" label="申请日期">
			</el-table-column>
			<el-table-column label="流程状态">
				
				<template #default="scope">
					<el-tag :type="scope.row.regularizationState === 0? 'success': scope.row.regularizationState === 1? 'danger': ''">{{ scope.row.regularizationState == 0 ? "审批中" : "审核通过" }}</el-tag>
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
					title: '',
					applicant: '',
					applyDept: '',
					regularizationEmp: '',
					regularizationDept: '',
					intodate: '',
					applyDate: '',
					jopUnderstand: '',
					growup: '',
					deficiency: '',
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
				this.selectEmpRegularization();
			},
			handleSizeChange(pagesize) {
				this.pageInfo.pagesize = pagesize
				this.selectEmpRegularization();
			},

			//查询转正信息
			selectEmpRegularization() {
				const this_ = this
				this.axios.get("http://localhost:8089/oa/selectEmpRegularization", {
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
			//新增转正
			inserEmpRegularization() {
				const _this = this
				this.axios.post('http://localhost:8089/oa/inserEmpRegularization', this.form)
					.then(function(response) {
						_this.dialogFormVisible = false,
							console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
		},
		created() {
			this.selectEmpRegularization();
		}
	};
</script>

<style>
</style>
