<template>
  <div>
    <cardList ref="listItem" :dataList="followData"></cardList>
  </div>
</template>

<script>
import cardList from "@/components/docList.vue";

export default {
  components: {
    cardList,
  },
  data() {
    return {
      store: {
        id: "",
      },
      followData: [],
    };
  },
  created() {
    this.getfollowData();
  },
  methods: {
    showForm(mes) {
      this.$refs.listItem.recordLocation(mes); //告知卡片列表子组件 要求对本页面的点击事件mes进行定位
    },
    getfollowData() {
      this.store.id = window.sessionStorage.getItem("userID");
      console.log("sessionstorage.id:" + this.store.id);
      let _this = this;
      this.axios
        .get("api/patient-service/getAllFollowing/" + this.store.id)
        .then(function (res) {
          console.log("getfollowData.res.data:");
          console.log(res.data);
          _this.followData = res.data;
        })
        .catch(function (error) {
          console.log("Get Nothing!" + error);
        });
    },
  },
};
</script>



