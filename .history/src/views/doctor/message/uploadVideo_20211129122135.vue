<template>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="视频标题" required>
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="视频标签" required>
    <el-checkbox-group v-model="form.label">
      <el-checkbox label="疾病科普" name="label"></el-checkbox>
      <el-checkbox label="生活常识" name="label"></el-checkbox>
      <el-checkbox label="养生妙招" name="label"></el-checkbox>
      <el-checkbox label="其他" name="label"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="文章内容" required>
    <el-upload
  class="upload-demo"
  drag
  action="https://jsonplaceholder.typicode.com/posts/"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
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