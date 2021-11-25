<template>
  <el-table
    :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="问诊时间">
            <span>{{ props.row.time }}</span>
          </el-form-item>
          <el-form-item label="医生">
            <span>{{ props.row.doctor }}</span>
          </el-form-item>
          <el-form-item label="病历">
            <span>{{ props.row.disrecord }}</span>
          </el-form-item>
          <el-form-item label="处方">
            <span>{{ props.row.prescr }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="问诊时间" prop="time"> </el-table-column>
    <el-table-column label="医生" prop="doctor"> </el-table-column>
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
          time: "2021.5.23",
          doctor: "张三医生",
          disrecord: "上呼吸道感染",
          prescr: "正柴胡颗粒",
        },
        {
          time: "2020.12.5",
          doctor: "李四医生",
          disrecord: "急性鼻窦炎",
          prescr: "处方1",
        },
        {
          time: "2019.3.22",
          doctor: "王五医生",
          disrecord: "失眠，心律不齐",
          prescr: "稳心颗粒",
        },
        {
          time: "2019.1.6",
          doctor: "李六医生",
          disrecord: "过敏",
          prescr: "息斯敏（氯雷他定片）",
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
