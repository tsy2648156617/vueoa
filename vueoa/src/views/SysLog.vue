<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 系统日志
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column label="操作人" align="center">
                    <template #default="scope">{{ scope.row.user.uname}}</template>
                </el-table-column>
                <el-table-column prop="operation" label="操作" align="center"></el-table-column>
                <el-table-column prop="changeInfo" label="操作信息" align="center"></el-table-column>
                 <el-table-column prop="ipaddress" label="ip地址" align="center"></el-table-column>
                <el-table-column prop="createTime" label="操作时间" align="center"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.page"
                    :page-size="query.size"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "sysLog",
    data() {
        return {
            pageTotal: 0,
            query:{
                page: 1,
                size: 5
            },
            tableData: [],
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            var vm =this;
            vm.axios.get("http://localhost:8089/cypsi/sys/getAllLog", {
                params: {page:vm.query.page,size:vm.query.size}
            })
            .then(res => {
                vm.tableData =res.data.data.list
                vm.pageTotal =res.data.data.total
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.query.page=val
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
