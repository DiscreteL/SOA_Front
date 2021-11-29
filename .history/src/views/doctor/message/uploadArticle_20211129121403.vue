<template>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="文章标题" required prop="type">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="文章标签" required prop="type">
    <el-checkbox-group v-model="form.label">
      <el-checkbox label="疾病科普" name="label"></el-checkbox>
      <el-checkbox label="生活常识" name="label"></el-checkbox>
      <el-checkbox label="养生妙招" name="label"></el-checkbox>
      <el-checkbox label="其他" name="label"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="文章内容" required prop="type">
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
          title: '',
          label: [],
          content: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      clear() {
        this.$refs.form.resetFields();
      }
    }
  }
</script>