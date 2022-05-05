<template>
  <div class="form_body">
    <el-form
      :model="diseaseDecidedForm"
      size="mini"
      label-width="120px"
      :disabled="writeDisabled"
    >
      <el-form-item label="患者姓名：">
        <span>{{ patientName }}</span>
      </el-form-item>
      <el-form-item label="科室：">
        <el-input
          placeholder="请输入内容"
          class="input"
          v-model="diseaseDecidedForm.department"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="患者主诉：">
        <el-input
          placeholder="请输入内容"
          type="textarea"
          :rows="2"
          class="input"
          v-model="diseaseDecidedForm.desc"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="诊断疾病：">
        <el-input
          placeholder="请输入内容"
          class="input"
          v-model="diseaseDecidedForm.disease"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="相应症状：">
        <el-input
          placeholder="请输入内容"
          type="textarea"
          :rows="4"
          class="input"
          v-model="diseaseDecidedForm.type"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="开具处方：">
        <el-row>
          <el-col :span="12">
            <el-input
              size="mini"
              class="input2"
              placeholder="如：莲花清瘟胶囊"
              v-model="diseaseDecidedForm.medicine"
            >
            </el-input>
          </el-col>
          <el-button @click="addMedicine">添加</el-button>
        </el-row>
        <el-table :data="diseaseDecidedForm.table">
          <el-table-column fixed prop="name" width="180px" label="药品">
          </el-table-column>

          <el-table-column fixed prop="action" width="153px" label="操作">
            <template slot-scope="scope">
              <div v-if="editIndex === scope.$index">
                <el-button @click="handleSave(scope.$index)">保存</el-button>
                <el-button @click="editIndex = -1">取消</el-button>
              </div>
              <div v-else>
                <el-button type="danger" @click="remove(scope.$index)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="onSubmit"
          >生成</el-button
        >
        <el-button size="medium" @click="clearAllContent">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "inquiry_record",
  data() {
    return {
      diseases: [], //所有疾病
      diseaseDecidedForm: {
        desc: "", //患者主诉
        disease: "", //疾病
        department: "", //科室
        type: "", //症状
        content: "",
        time: "",
        medicine: "", //药品名输入绑定
        table: [], //药品表信息
      },
      patientName: window.sessionStorage.getItem("patientName"),
      writeDisabled: false, //病历表单禁用设置
      editIndex: -1, //表格编辑索引
      editName: "", //编辑药名绑定
      editNum: "", //编辑数量绑定
      editMethod: "", //编辑用法绑定
    };
  },
  created() {},
  methods: {
    onSubmit() {
      //提交病历表单

      let time1 = new Date().getTime();
      let date = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();

      let content = this.diseaseDecidedForm.type;
      this.diseaseDecidedForm.content = content;
      window.sessionStorage.setItem(
        "diseaseDecided",
        this.diseaseDecidedForm.disease
      );

      let temp = this.diseaseDecidedForm;
      if (temp.table.length == 0) {
        this.$message({
          message: "请完整填写信息再提交",
          type: "warning",
        });
      } else {
        for (let i = 0; i < this.diseaseDecidedForm.table.length; i++) {
            this.diseaseDecidedForm.medicine =
            this.diseaseDecidedForm.medicine +' '+
            this.diseaseDecidedForm.table[i].name;
        }
      }
      this.axios
        .post("./oiservice/createRecord", {
          recordID:
            window.sessionStorage.getItem("doctorID") +
            window.sessionStorage.getItem("patientID") +
            month +
            date +
            year,
          time: time1,
          doctorID: window.sessionStorage.getItem("doctorID"),
          doctorName: window.sessionStorage.getItem("doctorName"),
          patientID: window.sessionStorage.getItem("patientID"),
          patientName: window.sessionStorage.getItem("patientName"),
          diseaseName: this.diseaseDecidedForm.disease,
          diagContent: this.diseaseDecidedForm.content,
          medicine: this.diseaseDecidedForm.medicine,
          department:this.diseaseDecidedForm.department,
          symptom:this.diseaseDecidedForm.type,
        })
        .then((res) => {
          let preId =
            window.sessionStorage.getItem("doctorID") +
            window.sessionStorage.getItem("patientID") +
            month +
            date +
            year;
          // this.$store.commit("editInquiryPreId", preId);
          window.sessionStorage.setItem("preId", preId);
          console.log("preId:" + preId);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      this.writeDisabled = true;
      // this.$store.commit("editInquiryIncludeDisabled", false);
      console.log("submit!");
    },
    clearAllContent() {
      //清空病历表单内容
      this.diseaseDecidedForm.desc = "";
      this.diseaseDecidedForm.disease = "";
      // this.diseaseDecidedForm.department = "";
      this.diseaseDecidedForm.type = "";
    },
    handleSelect(item) {
      console.log(item);
    },
    addMedicine() {
      //添加药品到药品表
      let _this = this;
      if (_this.diseaseDecidedForm.medicine != "") {
        _this.diseaseDecidedForm.table.push({
          name: _this.diseaseDecidedForm.medicine,
          // num:_this.preForm2.num,
          // method:_this.preForm2.method
        });
        _this.diseaseDecidedForm.medicine = "";
      }
    },
    remove(index) {
      //删除一条药品表信息
      this.diseaseDecidedForm.table.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.el-textarea__inner {
  font-family: "Microsoft";
  font-size: 20px;
}
.input {
  width: 199px;
}
</style>
