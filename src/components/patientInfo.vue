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
      <el-form-item label="患者血压：">
        <span>{{ patient.bloodPre }}</span>
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
      // this.axios({
      //   url:
      //     "api/patient-service/getPatient/" +
      //    ' 123',
      //   method: "get",
      //   params: {
      //     ID: '123',
      //   },
      // })
            this.axios({
        url:
          "api/patient-service/getPatient/" +
          this.$store.state.inquiry.patientId,
        method: "get",
        params: {
          ID: this.$store.state.inquiry.patientId,
        },
      })
        .then((res) => {
          this.patient.patiId = res.result.id;
          this.patient.patiName = res.result.name;
          this.patient.sex = res.result.gender;
          this.patient.email = res.result.email;
          this.$store.commit("editInquiryPatientName", this.patient.patiName);
          this.patient.height = res.result.height + " cm";
          this.patient.weight = res.result.weight + " kg";
          this.patient.heartRate = res.result.heartRate + " bmp";
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
