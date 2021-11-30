<template>
  <el-card>
    <el-descriptions title="用户信息">
      <el-descriptions-item label="姓名"
        >王某某{{ userInfo.name }}</el-descriptions-item
      >
      <el-descriptions-item label="性别">
        男{{ userInfo.gender }}</el-descriptions-item
      >
      <el-descriptions-item label="出生日期">2000.9.13</el-descriptions-item>
    </el-descriptions>
    <hr />
    <el-descriptions
      class="margin-top"
      title="健康信息"
      :column="3"
      :size="size"
    >
      <template slot="extra">
        <el-button type="primary" size="small">编辑</el-button>
      </template>
      <el-descriptions-item label="身高"
        >180{{ userInfo.height }}</el-descriptions-item
      >
      <el-descriptions-item label="体重"
        >135{{ userInfo.weight }}</el-descriptions-item
      >
      <el-descriptions-item label="血压"
        >120/80{{ userInfo.bloodpressure }}</el-descriptions-item
      >
      <el-descriptions-item label="心率"
        >80次/分{{ userInfo.heartrate }}</el-descriptions-item
      >
      <el-descriptions-item label="左眼视力"
        >5.0{{ userInfo.lefteye }}</el-descriptions-item
      >
      <el-descriptions-item label="右眼视力"
        >4.8{{ userInfo.righteye }}</el-descriptions-item
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
