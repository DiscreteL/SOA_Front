<template>
  <div>
    <div class="navigation">
      <el-button @click="dialogAssessVisible = true" type="text" class="btn">
        <i class="el-icon-star-off"></i>
        <span>评价</span>
      </el-button>
      <el-dialog
        title="问诊评价"
        center
        :visible.sync="dialogAssessVisible"
        width="30%"
      >
        <el-form :model="formAssess" :disabled="formAssessDisabled">
          <el-form-item label="医生态度" :label-width="formLabelWidth">
            <el-rate
              :texts="docAttitude"
              v-model="formAssess.value1"
              :colors="colors"
              show-text
            >
            </el-rate>
          </el-form-item>
          <el-form-item label="病情分析" :label-width="formLabelWidth">
            <el-rate
              :texts="diseaseAnalyses"
              v-model="formAssess.value2"
              :colors="colors"
              show-text
            >
            </el-rate>
          </el-form-item>
          <el-form-item label="诊疗方案" :label-width="formLabelWidth">
            <el-rate
              :texts="treatment"
              v-model="formAssess.value3"
              :colors="colors"
              show-text
            >
            </el-rate>
          </el-form-item>
          <el-form-item label="更多评价" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              class="input"
              v-model="formAssess.more"
              :autosize="{ minRows: 2, maxRows: 4 }"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="button">
              <el-button type="primary" @click="submit">生成</el-button>
              <el-button @click="clearAllContent">清空</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-button @click="quit" type="text" class="btn">
        <i class="el-icon-back"></i>
        <span>退出</span>
      </el-button>
    </div>
    <el-card class="chatroom">
      <!-- <div class="ope">
         <i class="el-icon-turn-off-microphone"></i> 
         <i class="el-icon-video-camera"></i> 
      </div> -->
      <testvideo />
      <!-- <i class="el-microphone"></i> -->
    </el-card>
    <el-card class="tab_pos">
      <tabs></tabs>
    </el-card>
  </div>
</template>
<script>
import tabs from "@/components/patChatSide.vue";
import testvideo from "./video.vue";
export default {
  name: "InquiryPatient",
  components: {
    // inquiry_title,
    // text_box,
    // inquiry_record,
    tabs,
    testvideo,
    // inquiry_navigation_patient,
  },
  data() {
    return {
      patientName: this.$store.state.inquiry.patientName,
      isCollapse: true,
      dialogAssessVisible: false, //对话框可见属性
      formAssessDisabled: false, //评价表单禁用设置
      formLabelWidth: "120px", //表单标签宽度
      formAssess: {
        time: "", //提交时间
        more: "", //更多评价
        content: "",
        value1: null, //医生态度rate
        value2: null, //病情分析rate
        value3: null, //诊疗方案rate
      },
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      docAttitude: ["极差", "失望", "一般", "很好", "满意"],
      diseaseAnalyses: ["极差", "失望", "一般", "标准", "精准"],
      treatment: ["不满", "失望", "一般", "很好", "满意"],
    };
  },
  methods: {
    postRate() {
      //上传评价表
      this.axios.post("./oiservice/addEvaluation",{
        patientID: this.$store.state.inquiry.patientId,
        doctorID: this.$store.state.inquiry.doctorId,
        score: (this.formAssess.value1+this.formAssess.value2+this.formAssess.value3)/3,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submit() {
      //提交评价表单
      if (
        this.formAssess.value1 == 0 ||
        this.formAssess.value2 == 0 ||
        this.formAssess.value3 == 0
      ) {
        this.$message({
          message: "请评价好问诊各项信息再提交",
          type: "warning",
        });
      } else {
        console.log(this.formAssess.value3 + "_" + this.formAssess.value2);
        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        this.formAssess.time = month + "-" + date + "-" + year; //获取当前上传日前
        this.formAssess.content =
          "医生态度：" +
          this.docAttitude[this.formAssess.value1] +
          "-" +
          "病情分析：" +
          this.diseaseAnalyses[this.formAssess.value2] +
          "-" +
          "诊疗方案：" +
          this.treatment[this.formAssess.value3] +
          "——" +
          "更多评价：" +
          this.formAssess.more; //拼接评价内容
        this.postRate(); //post评价表
        this.formAssessDisabled = true;
        this.dialogAssessVisible = false;
      }
    },
    clearAllContent() {
      //清空评价表单
      this.formAssess.value1 = null;
      this.formAssess.value2 = null;
      this.formAssess.value3 = null;
      this.formAssess.more = "";
    },
    quit() {
      clearInterval(this.$store.state.inquiry.chatroomId);
      this.$router.push("/userhome1");
    },
  },
};
</script>

<style scoped>
.el-rate__icon {
  font-size: 35px;
}
.button {
  position: relative;
  width: 50%;
  left: 33%;
}
.input {
  width: 210px;
}

.navigation {
  padding-top: 10px;
  top: 10px;
  width: 100%;
  background: RGB(70, 80, 105);
  text-align: right;
  /* background: RGB(236,245,255); */
}
.btn {
  margin-right: 1%;
}
.chatroom {
  position: absolute;
  padding: 0;
  margin: 0;
  left: 0;
  width: 70%;
  height: 100%;
  border: 0;
  overflow: hidden;
}
.ope {
  display: flex;
  justify-content: space-between;
}
.tab_pos {
  position: absolute;
  padding: 0;
  margin: 0;
  right: 0;
  width: 30%;
  height: 100%;
  border: 0;
  overflow: hidden;
}
/* .tab_pos {
  position: relative;
  margin: auto;
  top: 15px;
  left: 20px;
  overflow: hidden;
} */
</style>

