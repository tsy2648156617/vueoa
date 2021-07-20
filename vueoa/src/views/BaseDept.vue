<template>
    <div>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-lx-cascades"></i> 部门架构
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
            <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="deptId"
                border
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                prop="deptId"
                label="部门ID"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="parentId"
                label="ParentID"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="dname"
                label="部门名称"
                width="180">
                </el-table-column>
                <el-table-column
                prop="code"
                label="部门编码"
                width="180">
                </el-table-column>
                 <el-table-column label="操作">
                    <template #default="scope">
                       <el-button
                        size="mini"
                        type="primary"
                        @click="handleGeneDept(scope.row.parentId)">同级</el-button>
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleGeneDept(scope.row.deptId)">子级</el-button>
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="编辑部门" v-model="dialogFormVisible">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="部门ID">
                        <el-input v-model="form.deptId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="ParentID">
                        <el-input v-model="form.parentId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="部门名称">
                        <el-input v-model="form.dname" ></el-input>
                    </el-form-item>
                    <el-form-item label="部门编码">
                        <el-input v-model="form.code" ></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Tool from '../utils/tool'
export default {
    name: "baseDept",
    data() {
        return {
            query: {},
            tableData: [],
            form: {},
            dialogFormVisible: false
        };
    },
    created() {
        this.getData();
    },
    methods: {
        //获取部门数据
        getData() {
            var vm =this;
            vm.axios.get("http://localhost:8089/cypsi/sys/getAllDept")
            .then(res =>{
                console.log(Tool.array2Tree(res.data.data,0))
                this.tableData=Tool.array2Tree(res.data.data,0)
            })
        },
        // 删除操作
        handleDelete(row) {
            // 二次确认删除
            this.$confirm("确定要删除吗？", "提示", {
                type: "warning"
            })
            .then(() => {
                var vm=this;
                vm.axios.delete("http://localhost:8089/cypsi/sys/delDept/"+row.deptId)
                .then(res =>{
                    if(res.data.success){
                        this.$notify({
                        title: '成功',
                        message: '操作成功',
                        type: 'success'
                        });
                        vm.getData()
                    }
                })
            })
            .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = "";
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + " ";
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(row) {
            this.form=Tool.copy(row);
            this.dialogFormVisible=true;
        },
        //保存编辑
        saveEdit(){
            var vm=this;
            vm.axios.put("http://localhost:8089/cypsi/sys/updateDept",vm.form)
            .then(res =>{
             if(res.data.success){
                vm.dialogFormVisible=false;
                this.$notify({
                 title: '成功',
                 message: '操作成功',
                 type: 'success'
                });
                vm.getData()
              }
            })
        },
        // 生成部门
        handleGeneDept(parent) {
          console.log("父级ID："+parent)
          var vm=this;
          vm.axios.get("http://localhost:8089/cypsi/sys/addDept/"+parent)
          .then(res=>{
              if(res.data.success){
                this.$notify({
                 title: '成功',
                 message: '操作成功',
                 type: 'success'
                });
                vm.getData()
              }
          })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, "pageIndex", val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
