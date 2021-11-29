<template>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="文章标题" required>
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="文章标签">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="疾病科普" name="type"></el-checkbox>
      <el-checkbox label="生活常识" name="type"></el-checkbox>
      <el-checkbox label="养生妙招" name="type"></el-checkbox>
      <el-checkbox label="其他" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="文章内容">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>  
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>