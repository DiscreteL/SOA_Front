<template>
  <div>
    <cardList ref="listItem" :dataList="followData">
      <el-button type="danger" class="button" @click="deleteFollow"
        >取消关注</el-button
      >
    </cardList>
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
      followList: [],
    };
  },
  created() {
    this.getfollowData();
  },
  methods: {
    getfollowData() {
      this.store.id = window.sessionStorage.getItem("userID");
      console.log("sessionstorage.id:" + this.store.id);
      // let _this = this;
      this.axios
        .get("./pimservice/getAllFollowing/" + this.store.id)
        .then((res) => {
          console.log("getfollowData.res.data:");
          console.log(res.data);
          let count = 1;
          for (let i of res.data) {
            this.followList.push({
              //这里不直接复制，而是将department属性改名为index 以便检索
              id: i.id,
              name: i.name,
              title: i.title,
              index: i.department,
              sex: i.gender,
              workingAge: 2021 - i.workLength,
              hos: i.hospital,
              pic: count, //图片直接放url不能请求到 需要重写 这里记录了一个编号 在docList会用到
              intro: i.docIntro,
            });
            count++;
          }
          console.log("this.followList");
          console.log(this.followList);
          this.followData = this.followList; //这里是展示的数据
          this.getOptions();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptions() {
      //获得所有可能的index
      let obj = {};
      this.options.push({ value: "全部", label: "全部" });
      for (let i of this.docList) {
        if (!obj[i.index]) {
          obj[i.index] = 1;
          this.options.push({
            value: i.index,
            label: i.index,
          });
        }
      }
    },
    deleteFollow(mes) {
      //获得了表单
      //向表单信息添加新信息
      this.$refs.listItem.recordLocation(mes); //告知卡片列表子组件 要求对本页面的点击事件mes进行定位
      this.store.id = window.sessionStorage.getItem("userID");
      // console.log("this.$refs.listItem");
      // console.log(this.$refs.listItem);
      mes.docId = this.$refs.listItem.lastCardInfo._id;
      console.log("mes.docId:");
      console.log(mes.docId);
      this.axios
        .delete(
          "./pimservice/deleteFollowing/" + this.store.id + "/" + mes.docId
        )
        .then((res) => {
          console.log("res.data:");
          console.log(res.data);
          if (res.data === true)
            this.$message({
              message: "取消成功",
              type: "success",
            });
        })
        .catch((err) => {
          console.log(err);
        });
      this.$router.push({
        path: "/personempty",
      });
    },
  },
};
</script>



