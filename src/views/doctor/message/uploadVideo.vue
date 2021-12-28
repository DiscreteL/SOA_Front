<template>
  <el-form ref="videoInfo" :model="videoInfo" label-width="80px">
    <el-form-item label="视频标题" required prop="title">
      <el-input v-model="videoInfo.title"></el-input>
    </el-form-item>
    <el-form-item label="视频标签" required prop="label">
      <el-radio-group v-model="videoInfo.label">
        <el-radio label="疾病科普"></el-radio>
        <el-radio label="生活常识"></el-radio>
        <el-radio label="养生妙招"></el-radio>
        <el-radio label="其他"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="上传文件" required>
      <el-upload
        class="upload-demo"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        action=""
        :file-list="fileList"
        :http-request="uploadFile"
        :before-upload="BeforeUpload"
        :limit="1"
        :on-exceed="handleExceed"
        drag
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">支持的文件格式有：mp4</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">发布</el-button>
      <el-button type="primary" @click="clear">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ID: window.sessionStorage.getItem("userID"),
      videoInfo: {
        title: "",
        label: "",
      },
      fileList: [],
      newFile: new FormData(),
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `文件数量限制: 1; 您本次选择了${files.length}个文件，共选择了${
          files.length + fileList.length
        }个文件`
      );
    },

    BeforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["mp4"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$msg("上传文件只能是mp4格式", "error");
        return false;
      }
      if (file) {
        this.newFile.append("file", file); //  2. 上传之前，拿到file对象，并将它添加到刚刚定义的FormData对象中
        console.log(this.newFile.get("file"));
      } else {
        return false;
      }
    },

    uploadFile(file) {
      this.newFile.append("file", file.file);
    },

    submit() {
      if (!this.videoInfo.title) {
        this.$message.error("请输入视频标题");
      } else if (!this.videoInfo.label) {
        this.$message.error("请选择视频标签");
      } else if (!this.fileList) {
        this.$message.error("请选择文件");
      } else {
        this.submitFile();
      }
    },
    async submitFile() {
      await this.axios({
        url: "http://100.78.182.86:9790/upload",
        method: "post",
        data: this.newFile,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          const videoUrl = response.data; //  3. 拿到刚刚的数据，并将其传给后台
          this.axios
            .post("/doctor-service/publishVideo", {
              doctorID: this.ID,
              title: this.videoInfo.title,
              label: this.videoInfo.label,
              url: videoUrl,
              time: "",
              coverUrl: "",
              audit: 0,
              id: "",
            })
            .then((response) => {
              this.$message.success("发布成功！");
              location.reload();
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    clear() {
      this.$refs.articleInfo.resetFields();
    },
  },
};
</script>
