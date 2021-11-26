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
import mysearch from "@/components/searchingSelectDisease.vue";
import disease from "@/components/disease.vue";

export default {
  name: "diseaseInfo",
  components: {
    Navigation,
    mysearch,
    disease,
  },
  data() {
    return {
      diseaseIDList: [
        //{
      //           "diseaseID":41,
      //           "index":"小儿感冒",
      //           "alias":[
      //               " 小儿急性上呼吸道感染",
      //               "小儿上感",
      //               "急性鼻咽炎",
      //               "急性扁桃体炎"
      //           ],
      //           "introduction":"慢性咽炎为咽部粘膜、粘膜下及淋巴组织的弥漫性炎症，常为上呼吸道炎症的一部分，多见于成年人，病程长，症状顽固，较难治愈。常因急性咽炎反复发作、鼻炎、鼻窦炎的脓液刺激咽部，或鼻塞而张口呼吸，导致慢性咽炎的发生。另外，与某些不明原因的疾病或症状，如内分泌紊乱、胃肠功能失调、风湿性关节炎、长期低热、头痛、头晕、口臭及嗅觉不灵等密切相关。",
      //           "medicalInsurance":"非医保疾病",
      //           "siteOfDisease":[
      //               "咽喉"
      //           ],
      //           "infectiousness":"无传染性",
      //           "typicalSymptom":"打喷嚏,流鼻涕,新生儿鼻塞,发烧,流清涕"
      //       },
      //       {
      //           "diseaseID":48,
      //           "index":"感冒",
      //           "alias":[
      //               " 急性鼻咽炎",
      //               "急性上呼吸道感染",
      //               "上感",
      //               "卡他性鼻炎",
      //               "普通感冒",
      //               "伤风"
      //           ],
      //           "introduction":"慢性咽炎为咽部粘膜、粘膜下及淋巴组织的弥漫性炎症，常为上呼吸道炎症的一部分，多见于成年人，病程长，症状顽固，较难治愈。常因急性咽炎反复发作、鼻炎、鼻窦炎的脓液刺激咽部，或鼻塞而张口呼吸，导致慢性咽炎的发生。另外，与某些不明原因的疾病或症状，如内分泌紊乱、胃肠功能失调、风湿性关节炎、长期低热、头痛、头晕、口臭及嗅觉不灵等密切相关。",
      //           "medicalInsurance":"非医保疾病",
      //           "siteOfDisease":[
      //               "鼻",
      //               "咽喉"
      //           ],
      //           "infectiousness":"有传染性",
      //           "typicalSymptom":"打喷嚏,发烧,咳嗽,怕冷,流鼻涕"
      //       },
            ],
      diseaseList: [],
      diseaseData: [
        // {
        //         "diseaseID":41,
        //         "index":"小儿感冒",
        //         "alias":[
        //             " 小儿急性上呼吸道感染",
        //             "小儿上感",
        //             "急性鼻咽炎",
        //             "急性扁桃体炎"
        //         ],
        //         "introduction":"慢性咽炎为咽部粘膜、粘膜下及淋巴组织的弥漫性炎症，常为上呼吸道炎症的一部分，多见于成年人，病程长，症状顽固，较难治愈。常因急性咽炎反复发作、鼻炎、鼻窦炎的脓液刺激咽部，或鼻塞而张口呼吸，导致慢性咽炎的发生。另外，与某些不明原因的疾病或症状，如内分泌紊乱、胃肠功能失调、风湿性关节炎、长期低热、头痛、头晕、口臭及嗅觉不灵等密切相关。",
        //         "medicalInsurance":"非医保疾病",
        //         "siteOfDisease":[
        //             "咽喉"
        //         ],
        //         "infectiousness":"无传染性",
        //         "typicalSymptom":"打喷嚏,流鼻涕,新生儿鼻塞,发烧,流清涕"
        //     },
        //     {
        //         "diseaseID":48,
        //         "index":"感冒",
        //         "alias":[
        //             " 急性鼻咽炎",
        //             "急性上呼吸道感染",
        //             "上感",
        //             "卡他性鼻炎",
        //             "普通感冒",
        //             "伤风"
        //         ],
        //         "introduction":"慢性咽炎为咽部粘膜、粘膜下及淋巴组织的弥漫性炎症，常为上呼吸道炎症的一部分，多见于成年人，病程长，症状顽固，较难治愈。常因急性咽炎反复发作、鼻炎、鼻窦炎的脓液刺激咽部，或鼻塞而张口呼吸，导致慢性咽炎的发生。另外，与某些不明原因的疾病或症状，如内分泌紊乱、胃肠功能失调、风湿性关节炎、长期低热、头痛、头晕、口臭及嗅觉不灵等密切相关。",
        //         "medicalInsurance":"非医保疾病",
        //         "siteOfDisease":[
        //             "鼻",
        //             "咽喉"
        //         ],
        //         "infectiousness":"有传染性",
        //         "typicalSymptom":"打喷嚏,发烧,咳嗽,怕冷,流鼻涕"
        //     },
      ],
      options: [
        // { value: "感冒", label: "感冒",intro:"慢性咽炎为咽部粘膜、粘膜下及淋巴组织的弥漫性炎症，常为上呼吸道炎症的一部分，多见于成年人，病程长，症状顽固，较难治愈。常因急性咽炎反复发作、鼻炎、鼻窦炎的脓液刺激咽部，或鼻塞而张口呼吸，导致慢性咽炎的发生。另外，与某些不明原因的疾病或症状，如内分泌紊乱、胃肠功能失调、风湿性关节炎、长期低热、头痛、头晕、口臭及嗅觉不灵等密切相关。" },
        // { value: "小儿感冒", label: "小儿感冒",intro:"慢性咽炎为咽部粘膜、粘膜下及淋巴组织的弥漫性炎症，常为上呼吸道炎症的一部分，多见于成年人，病程长，症状顽固，较难治愈。常因急性咽炎反复发作、鼻炎、鼻窦炎的脓液刺激咽部，或鼻塞而张口呼吸，导致慢性咽炎的发生。另外，与某些不明原因的疾病或症状，如内分泌紊乱、胃肠功能失调、风湿性关节炎、长期低热、头痛、头晕、口臭及嗅觉不灵等密切相关。" },
      ],
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
        // console.log(this.diseaseList);
      }
      // console.log(this.diseaseList);
      this.diseaseData = this.diseaseList;
      this.getOptions();
    },

    getOptions() {
      //获得所有可能的index
      let obj = {};
      this.options.push({ value: "全部", label: "全部",intro:"全部" });
      for (let i of this.diseaseList) {
        if (!obj[i.index]) {
          obj[i.index] = 1;
          this.options.push({
            value: i.index,
            label: i.index,
            intro:i.typicalSymptom,
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
  top: 150px;
  width: 100%;
}
</style>