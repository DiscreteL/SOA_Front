<template>
  <div class="form_body">
    <el-form
      :model="preForm1"
      size="mini"
      label-width="90px"
      :disabled="preFormDisabled"
    >
      <el-form-item label="患者姓名：">
        <span>{{ patientName }}</span>
      </el-form-item>
      <el-form-item label-position="top" label="初步诊断：">
        {{ disease }}
      </el-form-item>
    </el-form>
    <el-form
      label-position="top"
      :model="preForm2"
      size="mini"
      label-width="90px"
      :disabled="preFormDisabled"
    >
      <el-form-item label="开具处方：">
        <el-row>
          <el-col :span="12">
            <el-input
              size="mini"
              class="input2"
              placeholder="如：莲花清瘟胶囊"
              v-model="preForm2.name"
            >
            </el-input>
          </el-col>
          <el-button @click="addMedicine">添加</el-button>
        </el-row>
        <el-table :data="preForm2.data">
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
        <div class="button">
          <el-button size="medium" type="primary" @click="onSubmit"
            >生成</el-button
          >
          <el-button size="medium" @click="clearAll">清空</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "prescription_form",
  data() {
    return {
      patientName: window.sessionStorage.getItem("patientName"),
      disease: window.sessionStorage.getItem("diseaseDecided"),
      preForm1: {}, //处方表
      preForm2: {
        //处方表
        name: "", //药品名输入绑定
        // num:'',//数量输入绑定
        // method:'',//用法输入绑定
        data: [], //药品表信息
      },
      editIndex: -1, //表格编辑索引
      editName: "", //编辑药名绑定
      editNum: "", //编辑数量绑定
      editMethod: "", //编辑用法绑定
      submit: {
        //提交药品
        name: "",
        // num:'',
        // method:''
      },
      preFormDisabled: false, //处方表禁用设置
    };
  },
  created() {
    // this.getDrugs();
  },
  methods: {
    // bh
    // getDrugs(){
    //   getDrugListDataFun(
    //   ).then(res=>{
    //     for(let i=0;i<res.result.length;i++){
    //       this.drugs.push({
    //         "label":res.result[i].medicine_Name,
    //       })
    //     }
    //     // console.log(this.drugs);
    //   }).catch(err=>{
    //     console.log(err);
    //   })
    // },
    postMedicineIncluded() {
      //上传处方表
      let date = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      this.axios
        .post("/doctor-service/newRecord", {
          recordID:
            window.sessionStorage.getItem("doctorID") +
            window.sessionStorage.getItem("patientID") +
            month +
            date +
            year,
          time: "",
          doctorID: window.sessionStorage.getItem("doctorID"),
          doctorName: "",
          patientID: window.sessionStorage.getItem("patientID"),
          patientName: "",
          diseaseName: "",
          diagContent: "",
          medicine: this.submit.name,
        })
        .then((res) => {
          this.$message.success("提交成功！");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmit() {
      //提交
      let temp = this.preForm2;
      if (temp.data.length == 0) {
        this.$message({
          message: "请完整填写处方信息再提交",
          type: "warning",
        });
      } else {
        for (let i = 0; i < this.preForm2.data.length; i++) {
          this.submit.name = this.submit.name + this.preForm2.data[i].name;
          this.postMedicineIncluded();
        }
        this.preFormDisabled = true;
      }
    },
    handleSelect(item) {
      console.log(item);
    },
    addMedicine() {
      //添加药品到药品表
      let _this = this;
      if (_this.preForm2.name != "") {
        _this.preForm2.data.push({
          name: _this.preForm2.name,
          // num:_this.preForm2.num,
          // method:_this.preForm2.method
        });
        _this.preForm2.name = "";
        // _this.preForm2.num='';
        // _this.preForm2.method='';
      }
    },
    remove(index) {
      //删除一条药品表信息
      this.preForm2.data.splice(index, 1);
    },
    clearAll() {
      //清空处方表
      this.preForm2.data = [];
      // this.preForm2.num='';
      this.preForm2.name = "";
      // this.preForm2.method='';
    },
  },
};
</script>

<style scoped>
.input1 {
  width: 132px;
  padding-right: 5px;
}
.input2 {
  width: 150px;
  padding-right: 2px;
  padding-left: 2px;
}
/*.form_body{*/
/*  width: 99%;*/
/*  height: 100%;*/
/*  border: 0;*/
/*  left:20px;*/
/*  font-family: "微软雅黑";*/
/*  overflow: auto;*/
/*}*/

/*/deep/.el-form-item{*/
/*  font-size: 10px;*/
/*  margin-bottom: 1px;*/
/*}*/
/*/deep/.el-form-item--mini.el-form-item{*/
/*  margin-bottom: 6px;*/
/*}*/
.el-form--label-top .el-form-item__label {
  padding-left: 10px;
}
.button {
  position: relative;
  width: 50%;
  left: 33%;
}
</style>
