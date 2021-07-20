<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 角色权限设置
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" @click="handleAddRole">新增角色</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
                <el-table-column prop="foundTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="updateTime" label="最近更新时间" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center" >
                    <template #default="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="角色名称">
                    <el-input v-model="form.roleName"></el-input>
                </el-form-item>
                <el-form-item label="菜单权限">
                   <el-tree
                    :data="treeData"
                    show-checkbox
                    default-expand-all
                    check-strictly
                    node-key="menuId"
                    ref="menuTree"
                    highlight-current
                    :default-checked-keys="checkedMenuIds"
                    :props="props"
                    @check-change="handleCheckChange">
                    </el-tree>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="reqWay=='post'?saveRole():saveEdit()">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import ToolMenu from '../utils/toolMenu'
export default {
    name: "setting",
    data() {
        return {
            reqWay:'',
            tableData: [],
            editVisible: false,
            form: {
                menus:[]
            },
            treeData: {},
            props: {
              value: 'menuId',
              label: 'menuName',
              children: 'children',
            },
            checkedMenuIds:[],
            roleCheckdMenus:[]
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取所有角色
        getData() {
            var vm =this;
            vm.axios.get("http://localhost:8089/cypsi/sys/getAllRoles")
            .then(res =>{
                this.tableData=res.data.data
            })

            vm.axios.get("http://localhost:8089/cypsi/sys/getAllMenu")
            .then(res => {
                this.treeData=ToolMenu.array2Tree(res.data.data,0)
            })
        },
        // 删除操作
        handleDelete(row) {
            // 二次确认删除
            this.$confirm("确定要删除吗？", "提示", {
                type: "warning"
            })
                .then(() => {
                    var vm =this;
                    vm.axios.delete("http://localhost:8089/cypsi/sys/delRoleAndMenu/"+row.roleId)
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
        // 编辑操作
        handleEdit(row) {
            this.reqWay='put'
            var vm =this;
            vm.checkedMenuIds=[]
            vm.axios.get("http://localhost:8089/cypsi/sys/getRoleAndMenu/"+row.roleId)
            .then(res =>{
                vm.form=res.data.data;
                vm.form.roleId=row.roleId;
                for(let i=0;i<vm.form.menus.length;i++){
                    vm.checkedMenuIds.push(vm.form.menus[i].menuId)
                }
               // console.log("menus",vm.checkedMenuIds);
                //vm.checkedMenuIds=res.data.data.menus
                //console.log("menus",vm.form.menus);
                vm.editVisible = true;
            })

            this.setCheckedKey()
        },
        setCheckedKey(){
                this.$nextTick(()=>{
                console.log("refs",this.$refs)
                console.log("refs",this.$refs.menuTree)
                this.$refs.menuTree.setCheckedKeys(this.checkedMenuIds,true)
            })
        }
        ,
        // 保存编辑
        saveEdit() {
            this.form.updateBy=localStorage.getItem("ms_username")
            var vm =this;
            vm.axios.put("http://localhost:8089/cypsi/sys/updateRoleAndMenu",vm.form)
            .then(res =>{
                if(res.data.success){
                    this.$notify({
                        title: '成功',
                        message: '操作成功',
                        type: 'success'
                    });
                    this.editVisible =false;
                    vm.getData()
                }
            })
            this.editVisible = false;
        },
        //新增角色
        handleAddRole(){
            this.reqWay='post'
            this.editVisible = true;
        },
        handleCheckChange(data) {
            this.form.menus.push(data);
            console.log("menus=>",this.form.menus)
        },
        saveRole(){
            this.form.founder=localStorage.getItem("ms_username")
            var vm =this;
            vm.axios.post("http://localhost:8089/cypsi/sys/addRoleAndMenu",vm.form)
            .then(res =>{
                if(res.data.success){
                    this.$notify({
                        title: '成功',
                        message: '操作成功',
                        type: 'success'
                    });
                    this.editVisible =false;
                    vm.form={menus:[]}
                    vm.getData()
                }
            })
        },
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
