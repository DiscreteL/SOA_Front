<template>
  <!-- 医生聊天室的侧边栏 -->
  <div class="tabs">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="病历填写" name="first">
        <record_form></record_form>
      </el-tab-pane>
      <!-- <el-tab-pane label="处方填写" name="second" :disabled="this.$store.state.inquiry.includeDisabled">
        <prescription_form></prescription_form>
      </el-tab-pane> -->
      <el-tab-pane label="处方填写" name="second">
        <prescription_form></prescription_form>
      </el-tab-pane>
      <el-tab-pane label="患者信息" name="third">
        <patient_information></patient_information>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import record_form from "./recordForm";
import prescription_form from "./prescrForm";
import patient_information from "./patientInfo";
export default {
  name: "tabs",
  data() {
    return {
      activeName: "third",
    };
  },
  components: {
    record_form,
    prescription_form,
    patient_information,
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
</style>
