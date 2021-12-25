<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="视频标题" required prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="视频标签" required prop="label">
      <el-radio-group v-model="form.label">
        <el-radio label="疾病科普"></el-radio>
        <el-radio label="生活常识"></el-radio>
        <el-radio label="养生妙招"></el-radio>
        <el-radio label="其他"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="视频文件" required prop="video">
      <el-upload
        class="upload-demo"
        ref="upload"
        action=""
        :http-request="httpRequest"
        :before-upload="beforeUpload"
        :on-exceed="handleExceed"
        :on-change="handleChange"
        :limit="1"
        drag
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
        label: "",
      },
      fileList: [],
    };
  },
  methods: {
    //文件列表改变
    handleChange(file, fileList) {
      this.fileList = fileList;
    },

    //文件列表移除文件
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },

    //文件超出可选范围
    handleExceed(files, fileList) {
      this.$message.warning(
        this.$message({ type: "error", message: "最多支持1个附件上传" })
      );
    },

    onSubmit() {
      if (!this.form.title) {
        this.$message.error("请输入视频标题");
      } else if (!this.form.label) {
        this.$message.error("请选择视频标签");
      } else if (!this.fileList) {
        this.$message.error("请选择视频文件");
      } else {
        // 使用form表单的数据格式
        const paramsData = new FormData();

        this.fileList.forEach((x) => {
          paramsData.append("video", x.file);
        });
        // 将输入表单数据添加到params表单中
        paramsData.append("id", this.$route.params.id);
        paramsData.append("title", this.form.title);
        paramsData.append("label", this.form.label);

        this.axios
          .post("/doctor-service/publishVideo", {
          paramsData
        })
          .then((response) => {
            //后端更新成功
            if (response.data === true) {
              this.$message({
                type: "success",
                message: "发布成功！",
              });
              //重置表单
              this.$refs.form.resetFields(); //清除表单信息
              this.$refs.upload.clearFiles(); //清空上传列表
              this.fileList = []; //集合清空
            }
            //后端更新失败
            else if (response.data === false) {
              this.$message({
                type: "error",
                message: "发布失败！请稍后重新尝试",
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "error",
              message: "发布失败！请稍后重新尝试",
            });
          });
      }
    },

    clear() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
