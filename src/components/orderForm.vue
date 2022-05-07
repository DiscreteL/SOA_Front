<template>
  <el-dialog :visible.sync="visible" @close="onClose">
    <el-form ref="form" :model="form" label-width="80px" >
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="问诊时间">
        <el-col :span="11">
          <el-date-picker
            type="datetime"
            placeholder="选择日期和时间"
            v-model="form.date1"
            value-format="timestamp"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="是否复诊">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="症状描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item >
        <div class="sub">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="visible = false">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",  //患者名字
        date1: '', //日期
        delivery: false,
        desc: "",
      },
      visible: false,
    };
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {

  onSubmit() {
      this.visible = false
      console.log(this.form.date1)
      this.$emit('formSubmit',this.form)
    },
  onClose(){//加一个beforeclose以及防止误触 
      this.$emit('formClose',false)
    },
  },
  watch: {
    isVisible() {
      this.visible = this.isVisible;
    },
  },
};
</script>

<style scoped>
</style>
