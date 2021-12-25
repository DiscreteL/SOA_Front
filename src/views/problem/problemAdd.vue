<template>
  <div class="form">
    <el-form ref="problemForm" :model="problemForm">
      <el-form-item label="问题名称" required>
        <el-input
          type="textarea"
          autosize
          v-model="problemForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="解答" required>
        <el-input
          type="textarea"
          autosize
          v-model="problemForm.answer"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button type="warning" @click="resetForm('problemForm')">
          重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      problemForm: {
        name: "",
        answer: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.axios
        .post("/admin-and-problem-service/addProblem", {
          problemContent: this.problemForm.name,
          problemAnswer: this.problemForm.answer,
        })
        .then((response) => {
          //后端更新成功
          if (response.data === true) {
            this.$message({
              type: "success",
              message: "Successful！",
            });
            //重置表单
            this.$refs.problemForm.resetFields();
          }
          //后端更新失败
          else if (response.data === false) {
            this.$message({
              type: "error",
              message: "Fail to add! Please try again!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "Fail to add! Please try again!",
          });
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.form {
  width: 400px;
  height: 100%;
  margin: 0px auto;
  line-height: 500px;
  text-align: center;
  font-size: 0;
}
</style>
