<template>
  <el-table
    :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
        <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="反馈时间">
            <div>{{ props.row.subdate }}</div>
            <div>{{ props.row.subtime }}</div>
          </el-form-item>
          <el-form-item label="问题分类">
            <span>{{ props.row.questype }}</span>
          </el-form-item>
          <el-form-item label="反馈状态">
            <span>{{ props.row.status }}</span>
          </el-form-item>
          <el-form-item label="反馈内容">
            <span>{{ props.row.content }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="反馈时间" prop="subdate"> </el-table-column>
    <el-table-column label="问题分类" prop="questype"> </el-table-column>
    <el-table-column label="反馈状态" prop="status"> </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" @click="handleEdit(scope.$index, scope.row)" size="mini" placeholder="输入关键字搜索" />
      </template>

            <template>
        <el-button size="mini" @click="open()">查看反馈</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-left: 2%;
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          subdate: "2021.11.20",
          subtime: "17:20:13",
          questype: "问诊",
          status:"已处理",
          content:"回复问题的医生是不是真正的医生？",
        },
        {
          subdate: "2021.11.19",
          subtime: "17:20:13",
          questype: "问诊",
          status:"已处理",
          content:"回复问题的医生是不是真正的医生？",
        },
      ],
      search: "",
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleChange() {
    this.$forceUpdate();
},
    open() {
      this.$alert("是", "问题反馈", {
        confirmButtonText: "确定",
      });
    },
  },
};
</script>
