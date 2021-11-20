<template>
  <div class="docList">
    <Navigation></Navigation>
    <div class="search">
      <mysearch
        :selectedOptions="options"
        :selectedData="diseaseList"
        @selectData="changeData"
      ></mysearch>
    </div>
    <div class="dis">
      <disease :dataList="diseaseData"></disease>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/navigation.vue";
import mysearch from "@/components/searchingSelect.vue";
import disease from "@/components/disease.vue";
// axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

export default {
  name: "diseaseInfo",
  components: {
    Navigation,
    mysearch,
    disease,
  },
  data() {
    return {
      diseaseIDList: [],
      diseaseList: [],
      diseaseData: [],
      options: [],
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    async getDataList() {
      const { data: res1 } = await this.instance.diseaseList();
      console.log(res1);
      if (res1.statusCode === "000000") {
        for (let i of res1.result.diseaseList) {
          this.diseaseIDList.push({
            diseaseID: i.diseaseID, //疾病ID
          });
        }
        this.getOptions();
      } else {
        this.$notify({
          title: "提示",
          message: "接口请求错误",
          type: "error",
          duration: 0,
        });
      }
      for (let i of this.diseaseIDList) {
        console.log(i.diseaseID);
        const { data: res2 } = await this.instance.diseaseInfo(i.diseaseID);
        console.log(res2);
        this.diseaseList.push({
          diseaseID: res2.result.diseaseID, //疾病ID
          index: res2.result.name, //疾病名称
          introduction: res2.result.intro, //疾病简介
          alias: res2.result.alias, //别名
          medicalInsurance: res2.result.medicalInsurance, //是否属于医保
          register: res2.result.register, //挂号门诊科室
          infectiousness: res2.result.infectiousness, //传染性
          treatment: res2.result.treatment, //治疗方案
          treatmentCycle: res2.result.treatmentCycle, //治疗周期
          charge: res2.result.charge, //治疗费用
          typicalSymptom: res2.result.typicalSymptom, //典型症状
          medicine: res2.result.medicine, //常用药品
        });
        console.log(this.diseaseList);
      }
      console.log(this.diseaseList);
      this.diseaseData = this.diseaseList;
    },

    getOptions() {
      //获得所有可能的index
      let obj = {};
      this.options.push({ value: "全部", label: "全部" });
      for (let i of this.diseaseList) {
        if (!obj[i.index]) {
          obj[i.index] = 1;
          this.options.push({
            value: i.index,
            label: i.index,
          });
        }
      }
    },
    changeData(newdata) {
      this.diseaseData = newdata;
    },
  },
};
</script>

<style scoped>
body {
  overflow-y: scroll;
}
.select {
  position: absolute;
  left: 17%;
  top: 18%;
}
.card {
  position: absolute;
  left: 14%;
  top: 23%;
}
.search {
  position: absolute;
  left: 45%;
  top: 18%;
}
.page {
  position: absolute;
  left: 70%;
  top: 100%;
}
.dis {
  position: absolute;
  top: 180px;
  width: 100%;
}
</style>