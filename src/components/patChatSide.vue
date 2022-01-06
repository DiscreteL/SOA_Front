<template>
  <div class="tabs">
    <el-tabs v-model="activeName">
      <el-tab-pane label="查看诊断" name="first">
        <el-form :model="diseaseDecidedForm" size="mini" label-width="90px">
          <el-form-item label="患者姓名：">
            <span>{{ diseaseDecidedForm.patientName }}</span>
          </el-form-item>
          <el-form-item label="医生诊断：">
            <span>{{ diseaseDecidedForm.content }}</span>
          </el-form-item>
          <el-form-item label="开具处方：">
            <span>{{ diseaseDecidedForm.medicine }}</span>
          </el-form-item>
        </el-form>
        <el-form
          :model="buttonForm"
          size="mini"
          label-width="90px"
          :disabled="preButtonDiabled"
        >
          <div class="button">
            <el-button size="medium" type="primary" @click="getPre"
              >生成</el-button
            >
          </div>
        </el-form>
      </el-tab-pane>
      <!-- :disabled="includeTabDisabled"↓ -->

      <el-tab-pane label="医生信息" name="third">
        <doc_info></doc_info>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import doc_info from "./doctorInfo";
// import {getDrugsIncludedListDataFun,getPreDataFun,getPatientInfoDataFun,postAutoAddDataFun} from "@/service/userService";
export default {
  name: "tabs_patient",
  components: {
    doc_info,
  },
  data() {
    return {
      activeName: "third", //tab的初始位置
      preButtonDiabled: false, //病历表button禁用设置
      includeButtonDiabled: false, //处方表button禁用设置
      includeTabDisabled: true, //处方tab单元的禁用设置
      addDrugsDisabled: true,
      buttonForm: {}, //单独的按钮表单
      includeForm: {
        //处方表单
        data: [], //存储药品表格数据
      },
      diseaseDecidedForm: {
        //病历表单
        patientName: window.sessionStorage.getItem("patientName"),
        disease: "等待医生填写", //疾病
        content: "等待生成", //症状多选框数组
        medicine:"等待生成",
      },
    };
  },
  created() {},
  methods: {
    getPre() {
      //获取病历
      let date = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      let preId =
        window.sessionStorage.getItem("doctorID") +
        window.sessionStorage.getItem("patientID") +
        month +
        date +
        year;
      console.log("preId:" + preId);
      this.axios
        .get("/patient-service/getDiagContent/" + preId)
        .then((res) => {
          if (res.length != 0) {
            //当成功获取到病历信息时
            (this.diseaseDecidedForm.disease =
              window.sessionStorage.getItem("diseaseDecided")),
              (this.diseaseDecidedForm.content = res.data);
          }

          this.preButtonDiabled = true; //设置病历刷新按钮禁用
          this.includeTabDisabled = false; //设置处方tab单元可用
        })
        .catch((err) => {
          console.log(err);
        });
      //获取处方信息
      this.axios
        .get(
          "/patient-service/getMedicine/" +preId
        )
        .then((res) => {
          if (res.length != 0) {
            //当成功获取到处方信息时
            this.diseaseDecidedForm.medicine=res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    //
  },
};
</script>

<style scoped>
.tabs {
  position: relative;
  width: 90%;
  height: 100%;
}
.tab_pos {
  left: 0px;
  right: 0px;
}
.el-tabs__item {
  font-weight: bolder;
  padding: 0 15px;
}

.el-checkbox {
  margin-right: 6px;
}
.el-form--label-top .el-form-item__label {
  padding-left: 10px;
}
.button {
  position: relative;
  width: 50%;
  left: 43%;
}
.twoButton {
  position: relative;
  width: 50%;
  left: 24%;
}
</style>
