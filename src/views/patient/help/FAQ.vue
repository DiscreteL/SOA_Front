<template>
  <el-card>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="问诊是否有保证？" name="1">
        <div class="reply">
          答：平台通过认证的医生，需要提供身份证、医师资格证、医师执业证、医师专业技术资格证、职称证明，通过人工审核的对比，进行严格的认证对比。
        </div>
      </el-collapse-item>
      <el-collapse-item title="隐私保护" name="2">
        <div class="reply">
          答：在未获得授权的情况下，个人信息不会输出、共享给第三方。
        </div>
      </el-collapse-item>
            <el-collapse-item title="如何提高问诊效率" name="3">
        <div class="reply">
          答：详细描述您的目前健康情况，如果有相关的检查报告单或者患处照片一并发给医生。以便医生对您的问题进行综合判断问诊。
        </div>
      </el-collapse-item>
            <el-collapse-item title="怎么向医生表示感谢" name="4">
        <div class="reply">
          答：问诊结束后，可以给医生五星评价，对医生进行肯定和鼓励。
        </div>
      </el-collapse-item>
            <el-collapse-item title="预约的医生拒绝了我的问诊请求怎么办？" name="5">
        <div class="reply">
          答：如果医生评估了您的问题之后，发现于自己的擅长不符，或者医生当前时间紧张，暂时无法提供咨询。您可以重新选择医生咨询，或者重新提交预约给当前医生。
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ["1"],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>
<style scoped>
.reply{
    color: green;
}
</style>