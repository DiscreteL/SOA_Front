<template>
  <div class="docInfoForm">
    <el-descriptions class="margin-top" :column="4" :size="size" border>
      <template slot="extra">
        <el-button type="primary" size="small">编辑</el-button>
      </template>
      <el-descriptions-item label="姓名">AAA</el-descriptions-item>
      <el-descriptions-item label="性别">男</el-descriptions-item>
      <el-descriptions-item label="评分">4.5</el-descriptions-item>
      <el-descriptions-item>
      <template slot="label">认证状态</template>
      <el-tag size="small">已通过</el-tag>
    </el-descriptions-item>
      <el-descriptions-item label="邮箱" :span="2">123456789@qq.com</el-descriptions-item>
      <el-descriptions-item label="身份证号" :span="2"
        >9876543210000</el-descriptions-item
      >
      <el-descriptions-item label="执业医师资格证编号" :span="4"
        >123456789</el-descriptions-item
      >
      <el-descriptions-item label="从业开始时间" :span="2">2011-12-25</el-descriptions-item>
      <el-descriptions-item label="工作单位" :span="4"
        >上海市第一医院</el-descriptions-item
      >
      <el-descriptions-item label="科室" :span="2">皮肤科</el-descriptions-item>
      <el-descriptions-item label="职称" :span="1">主任医师</el-descriptions-item>
      <el-descriptions-item label="资格证书证明">
        <el-link type="primary">查看文件</el-link>
      </el-descriptions-item>
      <el-descriptions-item label="个人简介" :span="4"
        >我有十年工作经验</el-descriptions-item
      >
    </el-descriptions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: "",
    };
  },
};
</script>

<style scoped>
.docInfoForm {
  width: 70%;
  margin: 0 auto;
  bottom:10%;
}
</style>
