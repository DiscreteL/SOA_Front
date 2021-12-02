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
        <el-form label-position="left" inline class="demo-table-expand" label-width="200px">
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
          <el-form-item label="身高(cm)">
            <span>{{ props.row.height }}</span>
          </el-form-item>
          <el-form-item label="体重(kg)">
            <span>{{ props.row.weight }}</span>
          </el-form-item>
          <el-form-item label="血压(收缩压/舒张压)">
            <span>{{ props.row.bloodPressure }}</span>
          </el-form-item>
          <el-form-item label="心率(次/分钟)">
            <span>{{ props.row.heartRate }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="预约日期" prop="date"> </el-table-column>
    <el-table-column label="预约时间" prop="time"> </el-table-column>
    <el-table-column label="患者姓名" prop="name"> </el-table-column>
    <el-table-column label="患者主诉" prop="description" :show-overflow-tooltip="true"> </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          @click="handleEdit(scope.$index, scope.row)"
          size="mini"
          placeholder="输入关键字搜索"
        />
      </template>
        <el-button size="mini" type="primary" @click="goConsult()"
          >前往问诊界面</el-button
        >
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
        {
          date: "2021-11-28",
          time: "17:30",
          name: "FFFF",
          description: "起病较急，初期有咽干、咽痒或烧灼感，发病同时或数小时后有喷嚏、鼻塞。伴咽痛。无发热及全身症状，仅有低热、不适、轻度畏寒和头痛。鼻腔粘膜充血、水肿、有分泌物，咽部轻度充血。",
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
    goConsult() {
        this.$router.push("/doctorchat");
    }
  },
};
</script>
