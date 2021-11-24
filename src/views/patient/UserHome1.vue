<template>
  <div class="container">
    <UserHomeNav></UserHomeNav>
              <!-- 个人信息部分 -->
          <div class="Info" style="color:#909399">
            <strong> 姓名：</strong>{{ userInfo.name }} <br />
            <strong>身份证号：</strong>{{ userInfo.number }} <br />
            <strong>出生日期：</strong>{{ userInfo.borndate }} <br />
            <strong>性别：</strong>{{ userInfo.gender }} <br />
            <strong>邮箱：</strong>{{ userInfo.mail }} <br />
            <strong>身高：</strong>{{ userInfo.height }} <br />
            <strong>体重：</strong>{{ userInfo.weight }} <br />
            <strong>血压：</strong>{{ userInfo.bloodpressure }} <br />
            <strong>心率：</strong>{{ userInfo.heartrate }} 
          </div>
</div>
</template>

<script>
import UserHomeNav from "@/components/userhomenav.vue";

export default {
  name: "UserHome1",
  components: {
    UserHomeNav,
  },
  data(){
    return{
      // 返回个人信息
      userID: window.sessionStorage.getItem("id"),
      userInfo: {}, //用户个人信息
      item: {
        id: "",
      },

    }
  }
};
</script>

<style scoped>
.Info {
  text-align: left;
  font: 15px "Microsoft YaHei";
  margin: 30px;
  position: relative;
}
</style>