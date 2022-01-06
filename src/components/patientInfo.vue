<template>
  <div class="form_body">
    <el-form ref="form" :model="patient" size="mini" label-width="90px">
      <el-form-item label="患者姓名：">
        <span>{{ patient.patiName }}</span>
      </el-form-item>
      <el-form-item label="患者性别：">
        <span>{{ patient.sex }}</span>
      </el-form-item>
      <el-form-item label="患者身高：">
        <span>{{ patient.height }}</span>
      </el-form-item>
      <el-form-item label="患者体重：">
        <span>{{ patient.weight }}</span>
      </el-form-item>
      <el-form-item label="患者心率：">
        <span>{{ patient.heartRate }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import {getPatientInfoDataFun,getPatientInfoFun} from "@/service/userService";

export default {
  name: "patient_information",
  data() {
    return {
      patient: {
        patiId: "",
        patiName: "",
        sex: "",
        email: "",
        height: "",
        weight: "",
        heartRate: "",
        bloodPre: "",
      },
    };
  },
  created() {
    this.getPatientInfo();
  },
  methods: {
    getPatientInfo() {
      console.log('this pages'+this.$store.state.inquiry.patientId)
        this.axios({
        url:
          "patient-service/getPatient/" +
         window.sessionStorage.getItem("patientID"),
        method: "get",
        params: {
          // ID: this.$store.state.inquiry.patientId,
          ID:window.sessionStorage.getItem("patientID")
        },
      })
        .then((res) => {
          this.patient.patiId = res.data.id;
          this.patient.patiName = res.data.name;
          this.patient.sex = res.data.gender;
          this.patient.email = res.data.email;
          this.$store.commit("editInquiryPatientName", this.patient.patiName);
          this.patient.height = res.data.height + " cm";
          this.patient.weight = res.data.weight + " kg";
          this.patient.heartRate = res.data.heartRate + " bmp";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
</style>
