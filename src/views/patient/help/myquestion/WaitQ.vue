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
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >详细信息</el-button
        >
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
          subdate: "2021.11.24",
          subtime: "17:20:13",
          questype: "服务",
          status:"待处理",
          content:"医生回答不满意怎么办？",
        },
        {
          subdate: "2021.11.20",
          subtime: "17:20:13",
          questype: "问诊",
          status:"待处理",
          content:"如何向医生发起问询",
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
  },
};
</script>
