<template>
  <el-card>
    <el-descriptions title="用户信息">
      <el-descriptions-item label="姓名" style="font-weight: bold"
        >王某某{{ userInfo.name }}</el-descriptions-item
      >
      <el-descriptions-item label="性别">
        男{{ userInfo.gender }}</el-descriptions-item
      >
      <el-descriptions-item label="身份证号">505050505050505050</el-descriptions-item>
      <el-descriptions-item label="资格认证状态" >
      <el-tag size="small">已通过</el-tag>
      </el-descriptions-item>

    </el-descriptions>
    <hr />
    <el-descriptions
      class="margin-top"
      title="职业信息"
      :column="3"
      :size="size"
    >
      <template slot="extra">
        <el-button type="primary" size="small">编辑</el-button>
      </template>
      <el-descriptions-item label="执业医师资格证编号"
        >321654987000{{ userInfo.certiNum }}</el-descriptions-item
      >
      <el-descriptions-item label="资格证书证明">
        <el-link type="primary">查看文件</el-link>
      </el-descriptions-item>
      <el-descriptions-item label="从业开始年份"
        >2010{{ userInfo.workLength }}</el-descriptions-item
      >
      <el-descriptions-item label="工作单位"
        >黄渡理工附属医院{{ userInfo.hospital }}</el-descriptions-item
      >
      <el-descriptions-item label="科室"
        >儿科{{ userInfo.department }}</el-descriptions-item
      >
      <el-descriptions-item label="职称"
        >副主任医师{{ userInfo.title }}</el-descriptions-item
      >
      <el-descriptions-item label="个人简介"
        >就职于黄渡理工附属医院（三甲），现任儿科副主任医师，欢迎咨询！{{ userInfo.intro }}</el-descriptions-item
      >
    </el-descriptions>

    <hr />
    <el-descriptions
      class="margin-top"
      title="联系方式"
      :column="3"
      :size="size"
    >
      <template slot="extra">
        <el-button type="primary" size="small">编辑</el-button>
      </template>
      <el-descriptions-item label="邮箱"
        >12345677908@qq.com{{ userInfo.mail }}</el-descriptions-item
      >
      <el-descriptions-item label="电话号码"
        >13528749665{{ userInfo.tel }}</el-descriptions-item
      >
      >
    </el-descriptions>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      // 返回个人信息
      // userID: window.sessionStorage.getItem("id"),
      userInfo: {}, //用户个人信息
      item: {
        id: "",
      },
    };
  },
};
</script>

<style scoped>

</style>
