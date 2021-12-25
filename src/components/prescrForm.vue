<template>
  <div class="form_body">
    <el-form :model="preForm1" size="mini" label-width="90px" :disabled="preFormDisabled">
      <el-form-item label="患者姓名：">
        <span>王某某{{this.$store.state.inquiry.patientName}}</span>
      </el-form-item>
      <el-form-item label-position="top"  label="初步诊断：">{{$store.state.inquiry.diseaseDecided}}</el-form-item>
    </el-form>
    <el-form label-position="top" :model="preForm2" size="mini" label-width="90px" :disabled="preFormDisabled">
      <el-form-item  label="处理意见：">
        <el-row>

          <el-col :span="12">
<!--            <el-input-number v-model="preForm2.num" :min="1" :max="10" size="mini"></el-input-number>-->
            <el-input
                size="mini"
                class="input2"
                placeholder="如：莲花清瘟胶囊"
                v-model="preForm2.num">
            </el-input>
          </el-col>
          <el-button @click="addMedicine">添加</el-button>
        </el-row>
        <el-table
            :data="preForm2.data">
          <el-table-column
              fixed
              prop="name"
              width="180px"
              label="药品">
<!--            <template slot-scope="scope">-->
<!--              <el-input type="text" v-model="editName" v-if="editIndex === scope.$index" />-->
<!--              <span v-else>{{ scope.row.name }}</span>-->
<!--            </template>-->
          </el-table-column>

          <el-table-column
              fixed
              prop="action"
              width="153px"
              label="操作">
            <template slot-scope="scope">
              <div v-if="editIndex === scope.$index">
                <el-button @click="handleSave(scope.$index)">保存</el-button>
                <el-button @click="editIndex = -1">取消</el-button>
              </div>
              <div v-else>
                <el-button @click="handleEdit(scope.row, scope.$index)">编辑</el-button>
                <el-button type="error"  @click="remove(scope.$index)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <div class="button">
          <el-button size="medium"  type="primary" @click="onSubmit">生成</el-button>
          <el-button size="medium"  @click="clearAll">清空</el-button>
        </div>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import {postMedicineIncludedDataFun,getDrugListDataFun} from "@/service/userService";

export default {
  name: "prescription_form",
  data() {
    return {
      drugs:[{
          value: '选项1',
          label: '药品1'
        }, {
          value: '选项2',
          label: '药品2'
        }, {
          value: '选项3',
          label: '药品3'
        }, {
          value: '选项4',
          label: '药品4'
        }, {
          value: '选项5',
          label: '药品5'
        }],
      preForm1: {},//处方表
      preForm2: {//处方表
        name:'',//药品名输入绑定
        num:'',//数量输入绑定
        method:'',//用法输入绑定
        data:[],//药品表信息
      },
      editIndex:-1,//表格编辑索引
      editName:'',//编辑药名绑定
      editNum:'',//编辑数量绑定
      editMethod:'',//编辑用法绑定
      submit:{//提交药品
        name:'',
        num:'',
        method:''
      },
      preFormDisabled:false,//处方表禁用设置
    }
  },
  created() {
    this.getDrugs();
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
    postMedicineIncluded() {//上传处方表
      postMedicineIncludedDataFun({
        m_name:this.submit.name,
        p_id:this.$store.state.inquiry.preId,
        quantity:this.submit.num,
        content:this.submit.method
      }).then(res => {
        // console.log(res);
      }).catch(err => {
        // console.log(err);
      })
    },
    onSubmit() {//提交
      let temp=this.preForm2;
      if(temp.data.length==0){
        this.$message({
          message: '请完整填写处方信息再提交',
          type: 'warning'
        });
      }else{
        for(let i=0;i<this.preForm2.data.length;i++){
          this.submit.name=this.preForm2.data[i].name;
          this.submit.num=this.preForm2.data[i].num;
          this.submit.method=this.preForm2.data[i].method;
          // console.log(this.submit);
          this.postMedicineIncluded();
        }
        this.preFormDisabled=true;
        // console.log('submit!');
      }

    },
    handleSelect(item){
      console.log(item);
    },
    addMedicine(){//添加药品到药品表
      let _this=this;
      if(_this.preForm2.name!=''&&_this.preForm2.num!=''&&_this.preForm2.method!=''){
        _this.preForm2.data.push({
          name:_this.preForm2.name,
          num:_this.preForm2.num,
          method:_this.preForm2.method
        })
        _this.preForm2.name='';
        _this.preForm2.num='';
        _this.preForm2.method='';
      }
    },
    handleEdit(row,index){//编辑药品表
      // this.editName=row.name;
      this.editNum=row.num;
      this.editMethod=row.method;
      this.editIndex=index;
    },
    handleSave(index){//保存编辑
      // this.preForm2.data[index].name=this.editName;
      this.preForm2.data[index].num=this.editNum;
      this.preForm2.data[index].method=this.editMethod;
      this.editIndex=-1;
    },
    remove(index){//删除一条药品表信息
      this.preForm2.data.splice(index,1);
    },
    clearAll(){//清空处方表
      this.preForm2.data=[];
      this.preForm2.num='';
      this.preForm2.name='';
      this.preForm2.method='';
    }
  },
}
</script>

<style scoped>
.input1{
  width: 132px;
  padding-right: 5px
}
.input2{
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
.el-form--label-top .el-form-item__label{
  padding-left: 10px;
}
.button{
  position: relative;
  width: 50%;
  left: 33%;
}
</style>
