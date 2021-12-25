<template>
  <div>
    <el-dialog
      title="详细信息"
      :visible.sync="visible"
      width="45%"
      @close="handleClose"
    >
      <div class="intr">
      <ul>
        <li v-for="(value,Key) in dataList" :key=Key>
           {{Key}}：{{value}}
        </li>
      </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addFollowing" plain>关 注</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
.intr{
  padding:10px;
  font-size: 18px;
  font-family: STKaiti,KaiTi;
}
</style>

<script>
export default {
  data() {
    return {
      visible:false,
      dataList:{}
    };
  },
  props:{
    dialogVisible:{
      type:Boolean,
      default:false
    },
    dialogData:{
      type:Object,
      default:function(){
        return {}
      }
    }
  },
  methods: {
    handleClose() {
        this.$emit('dialogClick',false)
    },
    addFollowing(){
      // console.log(this.dataList.ID)
      this.axios.post("/patient-service/addFollowing",{
        doctorID:this.dataList.ID,
        patientID: sessionStorage.getItem('userID'),
      })
      .then((res) => {
              console.log(res)
              if (res.data === false) {
                this.$notify({
                  title: "提示",
                  message: "关注失败",
                  type: "warning",
                  duration: 3000,
                });
              } else {
                this.$message({
                  showClose: true,
                  message: `关注成功`,
                  type: "success",
                  duration: 0,
                });
              }
            })
            .catch((err) => {
              this.$notify({
                title: "提示",
                message: "用户访问错误",
                type: "error",
                duration: 0,
              });
              console.log(err);
            });
    }
  },
  watch:{
        dialogVisible(){
          this.visible = this.dialogVisible
            },
        dialogData(){
          this.dataList = this.dialogData
        }
  }
};
</script>

