<template>
  <div class="docList">
    <Navigation></Navigation>
    <div class="select">
      <myselect
        :selectedOptions="options"
        :selectedData="docList"
        @selectData="changeData"
      >
      </myselect>
    </div>
    <div class="search">
      <mysearch
        :selectedOptions="options"
        :selectedData="docList"
        @selectData="changeData"
      ></mysearch>
    </div>
    <div class="card">
      <cardList ref="listItem" :dataList="docData">
        <el-button type="primary" class="button" @click="showForm"
          >预约</el-button
        >
      </cardList>
      <myform
        :isVisible="isFormVisible"
        @formSubmit="submitForm"
        @formClose="closeForm"
      ></myform>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/navigation.vue";
import cardList from "@/components/docList.vue";
import myselect from "@/components/singleSelect.vue";
import mysearch from "@/components/searchingSelectDoctor.vue";
import myform from "@/components/orderForm.vue";
// import {getDocDataFun} from "@/service/userService.js";
// import {postReservationFun} from '@/service/userService.js';

export default {
  name: "online",
  components: {
    cardList, //卡片列表
    myselect, //筛选框
    myform, //弹出表单
    Navigation,
    mysearch, //搜索框
  },
  data() {
    return {
      docList: [],
      docData: [],
      options: [],
      isFormVisible: false,
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.axios
        .get("./pimservice/getDoctorList")
        .then((res) => {
          console.log(res.data);
          //从后端请求到医生信息 也是筛选/搜索时直接处理的数据
          let count = 1;
          for (let i of res.data) {
            if (i.isCertified != "0000") {
              this.docList.push({
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
          }
          this.docData = this.docList; //这里是展示的数据
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
    changeData(newdata) {
      //当筛选完毕后 更新展示数据
      this.docData = newdata;
    },
    showForm(mes) {
      this.isFormVisible = true; //弹出表单
      this.$refs.listItem.recordLocation(mes); //告知卡片列表子组件 要求对本页面的点击事件mes进行定位
    },
    closeForm() {
      //表单子组件关闭后 父组件处同步更新 否则不能重复点击
      this.isFormVisible = false;
    },
    submitForm(mes) {
      mes.docId = this.$refs.listItem.lastCardInfo._id;
      this.axios
        .post("./oiservice/patientSubmitRequest", {
          patientID: sessionStorage.getItem("userID"),
          reserveNum: mes.date1 + mes.docId, //预约单号为预约时间+医生ID
          doctorID: mes.docId,
          time: mes.date1,
          status: 0, //待确认的意思
          initDescription: mes.desc,
        })
        .then((res) => {
          if (res.data === true)
            this.$message({
              message: "提交成功",
              type: "success",
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.docList {
  overflow-y: scroll;
}
.select {
  position: absolute;
  left: 17%;
  top: 18%;
}
.card {
  position: absolute;
  left: 10%;
  top: 23%;
}
.search {
  position: absolute;
  left: 45%;
  top: 18%;
}
.page {
  position: absolute;
  left: 70%;
  top: 100%;
}
</style>