<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="文章标题" required>
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="文章标签" required>
      <el-radio-group v-model="form.label">
        <el-radio label="疾病科普"></el-radio>
        <el-radio label="生活常识"></el-radio>
        <el-radio label="养生妙招"></el-radio>
        <el-radio label="其他"></el-radio>
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
        label: "",
        content: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (!this.form.title) {
        this.$message.error("请输入文章标题");
      } else if (!this.form.label) {
        this.$message.error("请选择文章标签");
      } else if (!this.form.content) {
        this.$message.error("请输入文章内容");
      } else{
        this.axios
          .post("/", {
            id: this.$route.params.id,
            title: this.form.title,
            label: this.form.label,
            content: this.form.content,
          })
          .then((response) => {
            //后端更新成功
            if (response.data === true) {
              this.$message({
                type: "success",
                message: "发布成功！",
              });
              //重置表单
              this.clear();
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
