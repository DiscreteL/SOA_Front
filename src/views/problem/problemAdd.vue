<template>
  <div class="form">
    <el-form ref="problemForm" :model="problemForm" label-width="80px">
      <el-form-item label="问题名称" required>
        <el-input type="textarea" autosize v-model="problemForm.name"></el-input>
      </el-form-item>
      <el-form-item label="解答" required>
        <el-input type="textarea" autosize v-model="problemForm.answer"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button type="warning" @click="clear"> 重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
      console.log("submit!");
    },
  },
};
</script>

<style scoped>
.form {
  width: 400px;
  height: 400px;
  margin: 100px auto;
  line-height: 500px;
  text-align: center;
  font-size: 0;
}
</style>
