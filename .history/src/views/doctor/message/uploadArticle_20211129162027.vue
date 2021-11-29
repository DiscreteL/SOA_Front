<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="文章标题" required>
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="文章标签" required>
      <el-radio-group v-model="formArticle.label">
        <el-radio label="疾病科普" name="label"></el-radio>
        <el-radio label="生活常识" name="label"></el-radio>
        <el-radio label="养生妙招" name="label"></el-radio>
        <el-radio label="其他" name="label"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="文章内容" required>
      <el-input type="textarea" :rows="10" v-model="form.content"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">发布</el-button>
      <el-button type="primary" @click="clear">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        label: [],
        content: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    clear() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
