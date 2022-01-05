<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="反馈内容" required>
      <el-input type="textarea" :rows="10" v-model="form.content"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ID: window.sessionStorage.getItem("userID"),
      form: {
        content: ""
      },
    };
  },
  methods: {
    onSubmit() {
      this.axios
        .post("/admin-and-problem-service/postPatientFeedback", {
          patientID:this.ID,
          time:'',
          reply:'',
          content:this.form.content
        })
        .then((response) => {
          //后端更新成功
          if (response.data === true) {
            this.$message({
              type: "success",
              message: "提交成功！",
            });
            //重置表单
            location.reload();
          }
        })
        .catch(() => {
        });
    }
  },
};
</script>
