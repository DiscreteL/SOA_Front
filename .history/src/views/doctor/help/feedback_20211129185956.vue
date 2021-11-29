<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="问题描述" required>
      <el-input type="textarea" :rows="10" v-model="form.problem"></el-input>
    </el-form-item>
    <el-form-item label="相关材料">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          可以选择上传相关文件对问题进行展示
        </div>
      </el-upload>
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
    }
  },
};
</script>
