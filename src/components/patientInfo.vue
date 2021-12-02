<template>
  <div class="form_body">
    <el-form ref="form" :model="patient" size="mini" label-width="90px">
      <el-form-item label="患者姓名：">
        <span>王某某{{patient.patiName}}</span>
      </el-form-item>
      <el-form-item label="患者性别：">
        <span>男{{patient.sex}}</span>
      </el-form-item>
      <el-form-item label="患者身高：">
        <span>180cm{{patient.height}}</span>
      </el-form-item>
      <el-form-item label="患者体重：">
        <span>70kg{{patient.weight}}</span>
      </el-form-item>
      <el-form-item label="患者心率：">
        <span>80次/分{{patient.heartRate}}</span>
      </el-form-item>
      <el-form-item label="患者血压：">
        <span>120/80{{patient.bloodPre}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import {getPatientInfoDataFun,getPatientInfoFun} from "@/service/userService";

export default {
name: "patient_information",
  data(){
  return{
    patient:{
      identi:'',
      patiId:'',
      patiName:'',
      sex:'',
      tel:'',
      height:'',
      weight:'',
      BMI:'',
      heartRate:'',
      bloodPre:'',
      // smallBloodPressure:'',
      // largeBloodPressure:'',
    }
  }
  },
//   created() {
//     this.getPatientInfo();
//   },
//   methods:{
//     getPatientInfo(){
//       getPatientInfoDataFun({
//         "ID":this.$store.state.inquiry.patientId
//       }).then(res=>{
//         this.patient.identi=res.result.identification;
//         this.patient.patiId=res.result.pati_ID;
//         this.patient.patiName=res.result.pati_name;
//         this.patient.sex=res.result.sex;
//         this.patient.tel=res.result.tel;
//         this.$store.commit("editInquiryPatientName",this.patient.patiName);
//       }).catch(err=>{
//         console.log(err);
//       })
//       getPatientInfoFun({
//         "pati_id":this.$store.state.inquiry.patientId
//       }).then(res=>{
//         console.log(res);
//         this.patient.height=res.result.height+' cm';
//         this.patient.weight=res.result.weight+' kg';
//         let bmi=res.result.bmi;
//         this.patient.heartRate=res.result.heart_rate+' bmp';
//         console.log(this.patient.heartRate);
//         // this.patient.smallBloodPressure=res.result.diastolic_pressure;
//         // this.patient.largeBloodPressure=res.result.systolic_pressure;
//         this.patient.bloodPre=res.result.diastolic_pressure+'~'+res.result.systolic_pressure+' mmHg';
//         this.patient.BMI=bmi.substring(0,5)+' kg/㎡';
//       }).catch(err=>{
//         console.log(err);
//       })
//     },
//   }
}
</script>

<style scoped>

</style>
