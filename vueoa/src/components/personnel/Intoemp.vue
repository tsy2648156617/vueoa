<template>
	<div>
		<el-dialog title="用车申请" v-model="dialogFormVisible">
			<el-form :model="form" ref="form" label-width="100px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="标题:">
							<el-input v-model="form.title"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="申请人:">
							<el-input v-model="form.applicant"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="用车人:">
							<el-input v-model="form.usecarEmp"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="用车部门:">
							<el-input v-model="form.usecarDept"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="车辆:">
							<el-input v-model="form.vehicle"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="司机:">
							<el-input v-model="form.driver"></el-input>
						</el-form-item>
					</el-col>
					<!-- <el-col :span="12">
						<el-form-item label="开始日期:">
							<el-input v-model="form.driver"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="结束日期:">
							<el-input v-model="form.driver"></el-input>
						</el-form-item>
					</el-col> -->
					<el-col :span="12">
						<el-form-item label="事由:" style="width: 600px;">
							<el-input v-model="form.reasons"></el-input>
						</el-form-item>
					</el-col>
					<!-- <el-col :span="12">
						<el-form-item label="紧急程度:" style="width: 600px;">
							<el-input v-model="form.emerg"></el-input>
						</el-form-item>
					</el-col> -->
				</el-row>
				<el-form-item style="text-align: center;margin-right: 100px;">
					<el-button size="mini" type="primary" @click="inserUseCar()">确认</el-button>
					<el-button @click="dialogFormVisible = false" size="mini">关 闭</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
	<div>
		<i class="el-icon-truck"></i>
		<span>车辆使用情况</span>
		<span class="right_span">
			<el-button type="primary" @click="dialogFormVisible = true">新建用车申请</el-button>
		</span>
	</div>
	<div>
		<span>
			车辆：
			<el-input v-model="pageInfo.numberModel" style="width: 200px;" clearable size="mini"></el-input>
		</span>
		<span style="margin-left: 10px;">
			<el-button size="mini" type="success" @click="highSelect()">查询</el-button>
		</span>
	</div>
	<div class="table">
		<el-table :data="tableData" border>
			<el-table-column prop="car.numberModel" label="车牌">
			</el-table-column>
			<el-table-column prop="title" label="用车申请">
			</el-table-column>
			<el-table-column prop="usecarEmp" label="用车人">
			</el-table-column>
			<el-table-column label="状态">
				<template #default="scope">
					<i class="el-icon-success" v-show="scope.row.approvalState==1" style="color:#67c23A;margin-left: 20px;"></i>
					<i class="el-icon-warning" v-show="scope.row.approvalState==0" style="margin-left: 20px;"></i>
				</template>
			</el-table-column>
			<el-table-column prop="stardate" label="开始时间">
			</el-table-column>
			<el-table-column prop="enddate" label="结束时间">
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
					usecarEmp: '',
					usecarDept: '',
					vehicle: '',
					driver: '',
					reasons: '',
					emerg: '',
				},
				pageInfo: {
					numberModel:'',
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
				this.selectUseCar();
				this.highSelect();
			},
			handleSizeChange(pagesize) {
				this.pageInfo.pagesize = pagesize
				this.selectUseCar();
				this.highSelect();
			},
			
			//查询已封存车辆
			selectUseCar() {
				const this_ = this
				this.axios.get("http://localhost:8089/oa/selectUseCar", {
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
			//新增车辆
			inserUseCar() {
				const _this = this
				this.axios.post('http://localhost:8089/oa/inserUseCar', this.form)
					.then(function(response) {
						_this.dialogFormVisible = false,
							console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 高级查询
			highSelect() {
				if (this.pageInfo.numberModel == "") {
					this.selectUseCar();
				} else {
					const _this = this
					console.log(this.pageInfo)
					this.axios.get("http://localhost:8089/oa/selectBylikeUseCar", {
							params: this.pageInfo,
						})
						.then(function(response) {
							_this.tableData = response.data.list
							_this.pageInfo.total = response.data.total
							console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
				}
			},
		},
		created() {
			this.selectUseCar();
		}
	};
</script>

<style>
</style>
