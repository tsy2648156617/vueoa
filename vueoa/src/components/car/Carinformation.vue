<template>
	<div>
		<el-dialog title="新增车辆" v-model="dialogFormVisible">
			<el-form :model="form" ref="form" label-width="100px">
				<el-row>
					<!-- 		<el-col :span="12">
				<el-form-item label="车牌号:">
					<el-input v-model=""></el-input>
				</el-form-item>
				</el-col> -->
					<el-col :span="12">
						<el-form-item label="车辆类型:">
							<el-input v-model="form.carType"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="费用:">
							<el-input v-model="form.cost"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="厂牌型号:">
							<el-input v-model="form.numberModel"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="购买价格:">
							<el-input v-model="form.carPrice"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="发动机号码:">
							<el-input v-model="form.engineNumber"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="司机:">
							<el-input v-model="form.driver"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="备注:" style="width: 600px;">
							<el-input v-model="form.remark"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="是否封存:">
					<el-switch v-model="form.ccsState"></el-switch>
				</el-form-item>
				<el-form-item style="text-align: center;margin-right: 100px;">
					<el-button size="mini" type="primary" @click="inserCar()">确认</el-button>
					<el-button @click="dialogFormVisible = false" size="mini">关 闭</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
	<div>
		<i class="el-icon-truck"></i>
		<span>车辆信息维护</span>
		<span class="right_span">
			<el-button type="primary" @click="dialogFormVisible = true">新增车辆</el-button>
		</span>
	</div>
	<el-tabs v-model="activeName">
		<el-tab-pane label="未封存车辆" name="first">
			<el-table :data="Yestable" border>
				<el-table-column prop="numberModel" label="厂牌型号">
				</el-table-column>
				<el-table-column prop="numberModel" label="车牌号">
				</el-table-column>
				<el-table-column prop="carType" label="类型">
				</el-table-column>
				<el-table-column prop="driver" label="司机">
				</el-table-column>
				<el-table-column prop="buyDate" label="购置日期">
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[2, 3, 6, 10]" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
				</el-pagination>
			</div>
		</el-tab-pane>
		<el-tab-pane label="已封存车辆" name="second">
			<el-table :data="Notable" border>
				<el-table-column prop="numberModel" label="厂牌型号">
				</el-table-column>
				<el-table-column prop="numberModel" label="车牌号">
				</el-table-column>
				<el-table-column prop="carType" label="类型">
				</el-table-column>
				<el-table-column prop="driver" label="司机">
				</el-table-column>
				<el-table-column prop="buyDate" label="购置日期">
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[2, 3, 6, 10]" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
				</el-pagination>
			</div>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	export default {
		data() {
			return {
				Yestable: [],
				Notable: [],
				activeName: 'first',
				dialogFormVisible: false,
				form: {
					carType: '',
					cost: '',
					numberModel: '',
					carPrice: '',
					engineNumber: '',
					driver: '',
					ccsState: false,
					remark: '',
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
				this.selectYesCar();
				this.selectNoCar();
			},
			handleSizeChange(pagesize) {
				this.pageInfo.pagesize = pagesize
				this.selectYesCar();
				this.selectNoCar();
			},
			// 分页查询未封存车辆
			selectYesCar() {
				const this_ = this
				this.axios.get("http://localhost:8089/oa/selectYesCar", {
						params: this.pageInfo
					})
					.then(function(response) {
						this_.Yestable = response.data.list
						this_.pageInfo.total = response.data.total
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			//查询已封存车辆
			selectNoCar() {
				const this_ = this
				this.axios.get("http://localhost:8089/oa/selectNoCar", {
						params: this.pageInfo
					})
					.then(function(response) {
						this_.Notable = response.data.list
						this_.pageInfo.total = response.data.total
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			//新增车辆
			inserCar() {
				const _this = this
				this.axios.post('http://localhost:8089/oa/inserCar', this.form)
					.then(function(response) {
						_this.dialogFormVisible = false,
							console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
		},
		created() {
			this.selectYesCar();
			this.selectNoCar();
		}
	};
</script>

<style>
	.right_span {
		margin-left: 75%;
	}
</style>
