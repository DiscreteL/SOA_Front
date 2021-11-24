<template>
  <el-card>
    <div>
      <h1>基本信息</h1>
      <div>
        <!-- 不能被更改的信息 -->
        姓名：  陆话叶{{ userInfo.name }}<br />
        性别：  男{{ userInfo.gender }}<br />
        出生日期：  2002.8.10{{ userInfo.borndate }}<br />
      </div>
    </div>
    <div>
      <h1>健康信息</h1>
      <div>
        身高:  180{{ userInfo.height }} <br />
        体重:  135{{ userInfo.weight }}<br />
        血压:  null{{ userInfo.bloodpressure }}<br />
        心率:  null{{ userInfo.heartrate }}<br />
      </div>
    </div>
    <div>
      <h1>联系方式</h1>
      <div>邮箱:  12345677908@qq.com{{ userInfo.mail }}<br /></div>
    </div>
    <div></div>
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
