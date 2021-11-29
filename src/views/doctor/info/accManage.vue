<template>
  <el-card>
    <el-descriptions
      class="margin-top"
      title="修改密码"
      :column="3"
      :size="size"
    >
      <template slot="extra">
        <el-button type="primary" size="small">修改</el-button>
      </template>
      <el-descriptions-item label="温馨提示"
        >设置复杂密码更能保护您的账号安全</el-descriptions-item
      >
      >
    </el-descriptions>
    <hr />
    <el-descriptions
      class="margin-top"
      title="账号注销"
      :column="3"
      :size="size"
    >
      <template slot="extra">
        <el-button type="primary" size="small">注销</el-button>
      </template>
      <el-descriptions-item label="温馨提示"
        >为保证您的账号安全，需要满足相应的条件，才能提交注销申请</el-descriptions-item
      >
      >
    </el-descriptions>
    <hr />
    <el-button type="primary" size="small" @click="logout"
      >退出当前帐号</el-button
    >
  </el-card>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-card div {
  margin-bottom: 5%;
}
</style>

<script>
export default {
  methods: {
    logout() {
      // 清空token
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
