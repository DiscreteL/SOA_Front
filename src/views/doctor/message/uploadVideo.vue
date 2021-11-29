<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="视频标题" required>
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="视频标签" required>
      <el-form-item label="文章标签" required>
        <el-radio-group v-model="form.label">
          <el-radio label="疾病科普" name="label"></el-radio>
          <el-radio label="生活常识" name="label"></el-radio>
          <el-radio label="养生妙招" name="label"></el-radio>
          <el-radio label="其他" name="label"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form-item>
    <el-form-item label="视频文件" required>
      <el-upload
        class="upload-demo"
        v-model="form.video"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          支持的视频格式有：mp4/mkv/avi
        </div>
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
        title: "",
        label: [],
        video: "",
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
