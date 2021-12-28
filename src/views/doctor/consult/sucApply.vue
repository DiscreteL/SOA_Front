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
        <el-form
          label-position="left"
          inline
          class="demo-table-expand"
          label-width="200px"
        >
          <el-form-item label="预约单号">
            <span>{{ props.row.reserveNum }}</span>
          </el-form-item>
          <el-form-item label="预约时间">
            <span>{{ props.row.time }}</span>
          </el-form-item>
          <el-form-item label="患者姓名">
            <span>{{ props.row.patientName }}</span>
          </el-form-item>
          <el-form-item label="患者主诉">
            <span>{{ props.row.initDescription }}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span>{{ props.row.gender }}</span>
          </el-form-item>
          <el-form-item label="出生日期">
            <span>{{ props.row.bornDate }}</span>
          </el-form-item>
          <el-form-item label="身高(cm)">
            <span>{{ props.row.height }}</span>
          </el-form-item>
          <el-form-item label="体重(kg)">
            <span>{{ props.row.weight }}</span>
          </el-form-item>
          <el-form-item label="心率(次/分钟)">
            <span>{{ props.row.heartRate }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="预约时间" prop="time"> </el-table-column>
    <el-table-column label="患者姓名" prop="patientName"> </el-table-column>
    <el-table-column
      label="患者主诉"
      prop="description"
      :show-overflow-tooltip="true"
    >
    </el-table-column>
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
      <el-button size="mini" type="primary" @click="goConsult(scope.row)"
        >前往问诊界面</el-button
      ></template>
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
      ID: window.sessionStorage.getItem("userID"),
      tableData: [],
      search: "",
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 20, // 每页的数据条数
    };
  },
  methods: {
    loadData() {
      this.axios({
        url: "/doctor-service/doctorGetAcceptedRequest/" + this.ID,
        method: "get",
        params: {
          id: this.ID,
        },
      })
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.tableData.push({
              reserveNum: response.data[i].reserveNum,
              patientName: response.data[i].name,
              patientID: response.data[i].patientID,
              time: response.data[i].time,
              gender: response.data[i].gender,
              bornDate: response.data[i].bornDate,
              height: response.data[i].height,
              weight: response.data[i].weight,
              heartRate: response.data[i].heartRate,
              initDescription: response.data[i].initDescription,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleChange() {
      this.$forceUpdate();
    },
    goConsult(row) {
      clearInterval(this.$store.commit.inquiry('doctorId',this.ID));
      clearInterval(this.$store.commit.inquiry('patientId',row.patientID));
      this.$router.push("/doctorchat");
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
