<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 用户设置
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="handleAdd"
        style="float: right; margin-top: -20px"
        >新增</el-button
      >
    </div>
    <el-table
      :data="tableData"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
    >
      <el-table-column
        type="index"
        label="序号"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="uname"
        label="用户名称"
        align="center"
      ></el-table-column>
      <el-table-column label="部门" align="center">
        <template #default="scope">{{ scope.row.udept.dname }}</template>
      </el-table-column>
      <el-table-column label="是否禁用" align="center">
        <template #default="scope">
          <el-tag
            :type="
              scope.row.isdisabled === 0
                ? 'success'
                : scope.row.isdisabled === 1
                ? 'danger'
                : ''
            "
            >{{ scope.row.isdisabled == 0 ? "未禁用" : "已禁用" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            icon="el-icon-delete"
            class="red"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 编辑弹出框 -->
  <el-dialog title="编辑" v-model="editVisible" width="30%">
    <el-form ref="form" :model="form" label-width="70px">
      <el-form-item label="用户编码">
        <el-input v-model="form.ucode" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.uname"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="selectTreeName" placeholder="请选择">
          <el-option :value="selectTreeName" :label="deptTitle" class="options">
            <el-tree
              id="tree-option"
              ref="selectTree"
              :accordion="true"
              :data="depts"
              :props="props"
              :default-expand-all="true"
              :expand-on-click-node="false"
              node-key="deptId"
              :default-expanded-keys="[]"
              @node-click="handleNodeClick"
            >
            </el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.upass" show-password></el-input>
      </el-form-item>
      <el-form-item label="职务">
        <el-select v-model="form.role" placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.roleId"
            :label="item.roleName"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批列表">
        <el-select v-model="form.approvedIds" multiple placeholder="请选择">
          <el-option
            v-for="item in tableData"
            :key="item.uid"
            :label="item.uname"
            :value="item.uid"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="form.isdisabled">是否禁用</el-checkbox>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="reqWay == 'post' ? saveAddUser() : saveEdit()"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import Tool from "../utils/tool";
export default {
  name: "sysUser",
  data() {
    return {
      reqWay: "",
      roles: [],
      tableData: [],
      depts: [],
      deptTitle: "",
      editVisible: false,
      pageTotal: 0,
      selectTreeName: "",
      form: {
        isdisabled: false,
      },
      props: {
        // 配置项（必选）
        value: "deptId",
        label: "dname",
        children: "children",
        // disabled:true
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取用户列表
    getData() {
      var vm = this;
      vm.axios.get("http://localhost:8089/cypsi/sys/getAllUser").then((res) => {
        vm.tableData = res.data.data;
      });
      vm.axios.get("http://localhost:8089/cypsi/sys/getAllDept").then((res) => {
        vm.depts = Tool.array2Tree(res.data.data, 0);
      });
      vm.axios
        .get("http://localhost:8089/cypsi/sys/getAllRoles")
        .then((res) => {
          vm.roles = res.data.data;
          console.log("roles=>", vm.roles);
        });
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
      this.getData();
    },
    // 删除操作
    handleDelete(row) {
      console.log("row=>", row);
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          var vm = this;
          vm.axios
            .delete("http://localhost:8089/cypsi/sys/delUser/" + row.uid)
            .then((res) => {
              if (res.data.success) {
                this.$notify({
                  title: "成功",
                  message: "操作成功",
                  type: "success",
                });
                vm.getData();
              }
            });
        })
        .catch(() => {});
    },
    // 编辑操作
    handleEdit(row) {
      this.reqWay = "put";
      console.log("row=>", row);
      this.form = Tool.copy(row);
      this.selectTreeName = Tool.copy(row.udept.dname);
      this.form.udept = Tool.copy(row.udept.deptId);
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      var vm = this;
      if (vm.form.isdisabled) {
        vm.form.isdisabled = 1;
      } else {
        vm.form.isdisabled = 0;
      }
      vm.axios
        .put("http://localhost:8089/cypsi/sys/updateUser", vm.form)
        .then((res) => {
          if (res.data.success) {
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success",
            });
            this.editVisible = false;
            vm.form = {};
            vm.getData();
          }
        });
      this.editVisible = false;
    },
    //新增用户
    handleAdd() {
      this.reqWay = "post";
      this.editVisible = true;
      this.generateUcode();
    },
    //保存新增用户
    saveAddUser() {
      var vm = this;
      if (vm.form.isdisabled) {
        vm.form.isdisabled = 1;
      } else {
        vm.form.isdisabled = 0;
      }
      console.log("isdisabled:" + vm.form.isdisabled);
      vm.axios
        .post("http://localhost:8089/cypsi/sys/addUserInfo", vm.form)
        .then((res) => {
          if (res.data.success) {
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success",
            });
            this.editVisible = false;
            vm.form = {};
            vm.getData();
          }
        });
    },
    handleNodeClick(node) {
      this.form.udept = node.deptId;
      this.selectTreeName = node.dname;
      // console.log("udept=》",this.form.udept)
    },
    generateUcode() {
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let date = new Date().getDate();
      if (month < 10) {
        month += "0" + month;
      }
      this.form.ucode =
        year + month + date + "00" + (this.tableData.length + 1);
    },
  },
};
</script>

<style lang="scss">
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
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 5px;
  background-color: #f3f3f3;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #1aa094;
}

.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
</style>
