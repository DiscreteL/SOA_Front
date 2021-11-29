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
          <el-form-item label="预约时间">
            <span>{{ props.row.time }}</span>
          </el-form-item>
          <el-form-item label="患者姓名">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="患者主诉">
            <span>{{ props.row.description }}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span>{{ props.row.gender }}</span>
          </el-form-item>
          <el-form-item label="出生日期">
            <span>{{ props.row.birthday }}</span>
          </el-form-item>
          <el-form-item label="身高">
            <span>{{ props.row.height }}</span>
          </el-form-item>
          <el-form-item label="体重">
            <span>{{ props.row.weight }}</span>
          </el-form-item>
          <el-form-item label="血压">
            <span>{{ props.row.bloodPressure }}</span>
          </el-form-item>
          <el-form-item label="心率">
            <span>{{ props.row.heartRate }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="预约日期" prop="date"> </el-table-column>
    <el-table-column label="预约时间" prop="time"> </el-table-column>
    <el-table-column label="患者姓名" prop="name"> </el-table-column>
    <el-table-column label="患者主诉" prop="description"> </el-table-column>
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
          >前往问诊界面</el-button
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
          date: "2021-11-27",
          time: "13:30",
          name: "EEE",
          description: "四肢乏力，脾胃虚寒",
          gender: "女",
          birthday: "1997-05-06",
          height: "165",
          weight: "55",
          bloodPressure: "110/80",
          heartRate: "87",
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
