<template>
<el-row>
  <el-col :span="3" v-for="(o, index) in 6" :key="o" :offset="index > 0 ? 1 : 0">
    <el-card :body-style="{ padding: '0px' }" shadow="always">
      <img src="@/assets/doctor.png" class="image">
      <div style="padding: 14px;">
        <span>医生</span>
        <div class="bottom clearfix">
          <el-button type="text" class="button">查看信息</el-button>
          <el-button type="text" class="button">取消关注</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
</template>

<style>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
