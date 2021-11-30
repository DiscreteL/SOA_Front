<template>
  <el-table
    :data="
      tableData.filter(
        (data) =>
          !search || data.doctor.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 100%"
  >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="预约日期">
            <span>{{ props.row.date }}</span>
          </el-form-item>
          <el-form-item label="问诊时间">
            <span>{{ props.row.time }}</span>
          </el-form-item>
          <el-form-item label="医生">
            <span>{{ props.row.doctor }}</span>
          </el-form-item>
          <el-form-item label="预约状态">
            <span>{{ props.row.status }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="预约日期" prop="date"> </el-table-column>
    <el-table-column label="预约时间" prop="time"> </el-table-column>
    <el-table-column label="预约医生" prop="doctor"> </el-table-column>
    <el-table-column label="预约状态" prop="status"> </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          @click="handleEdit(scope.$index, scope.row)"
          size="mini"
          placeholder="输入关键字搜索"
        />
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
          date: "2021.12.26",
          time: "14：00",
          doctor: "张三医生",
          status: "待接受",
        },
        {
          date: "2021.11.29",
          time: "9：30",
          doctor: "杜九医生",
          status: "待接受",
        },
        {
          date: "2021.11.27",
          time: "13：30",
          doctor: "刘大医生",
          status: "待问诊",
        },
        {
          date: "2021.11.26",
          time: "15：00",
          doctor: "李四医生",
          status: "已拒绝",
        },
      ],
      search: "",
    };
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
