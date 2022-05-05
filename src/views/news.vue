<template>
  <div>
    <Navigation></Navigation>
    <el-container
      style="
        width: 70%;
        position: absolute;
        left: 15%;
        top: 18%;
        border: 1px solid #eee;
      "
    >
      <el-main>
        <el-button @click="toTweet">文章列表</el-button>
        <el-button @click="toVideo">视频列表</el-button>

        <el-tooltip :content="'关闭则默认按时间排序'" placement="top">
            <el-switch
              v-model="recommendation"
              active-text="开启个性化推荐"
              style="margin-left: 20px"
              @change="changeState()"
            ></el-switch
          >
        </el-tooltip>
        <!--下面的slice很关键,实现了分页-->
        <el-table
          ref="multipleTable"
          :data="
            docList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            prop="time"
            label="日期"
            width="160px"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="label"
            label="类型"
            width="200px"
          >
          </el-table-column>
          <el-table-column
            align="left"
            prop="name"
            label="详细内容"
            width="350px"
          >
            <template slot-scope="scope">
              <!-- 点击进行响应弹出通告具体界面 -->
              <span @click="getDetail(scope.row)" style="cursor: pointer">
                <a class="link">{{ scope.row.name }}</a>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="label"
            label="关注"
            width="140px"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="addFollowing(scope.row.id)"
                plain
                >收 藏</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <Idialog
          :dialogVisible="isDialogVisible"
          @dialogClick="changeDialog"
          :dialogData="diaData"
        ></Idialog>
        <!--下面进行表格分页操作-->
        <div style="text-align: center; margin-top: 30px">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[8, 12, 16]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next,jumper"
            :total="docList.length"
          >
          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Navigation from "@/components/navigation.vue";
import Idialog from "@/components/dialog.vue";
// import {getNoticeFun} from '@/service/userService.js';

export default {
  name: "News",
  components: {
    Idialog,
    Navigation,
  },
  props: {
    dataList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      isDialogVisible: false,
      docList: [],
      diaData: {},
      docData: [],
      currentPage: 1, //当前页数 ，默认为1
      pageSize: 10, // 每页显示数量
      pageSizes: [8, 12, 16], //可以选择每页显示的数据条数
      currentPageData: {}, //当前页显示内容
      dataType: 0, //0是文章，1是视频
      // tableData: Array(20).fill(item),
      recommendation: true, //1为默认值，开启个性化推荐
      label: 0,
    };
  },
  created() {
    this.getDataList1();
  },
  methods: {
    changeState() {
      if (this.dataType == 0) {
        this.toTweet()
      }
      else {
        this.toVideo()
      }
      console.log(this.recommendation);
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    getDataList1() {
      if (this.recommendation) {
        //console.log(this.recommendation);
        this.axios({
          url: "./vtmservice/getTweetByLabel/" + this.label,
          method: "get",
          params: {
            label: this.label,
          },
        })
          .then((res) => {
            console.log(res);
            for (let i of res.data) {
              var time = new Date(i.time);
              var y = time.getFullYear();
              var m = time.getMonth() + 1;
              var d = time.getDate();
              var h = time.getHours();
              var mm = time.getMinutes();
              var s = time.getSeconds();
              this.docList.push({
                name: i.title,
                url: i.url,
                label: i.label,
                id: i.id,
                time:
                  y +
                  "-" +
                  this.add0(m) +
                  "-" +
                  this.add0(d) +
                  " " +
                  this.add0(h) +
                  ":" +
                  this.add0(mm) +
                  ":" +
                  this.add0(s),
              });
            }
            this.docData = this.docList;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        //console.log(this.recommendation);
        this.axios
          .get("./vtmservice/getAllTweet")
          // .get("http://139.224.164.68:7777/getAllTweet")
          .then((res) => {
            console.log(res);
            for (let i of res.data) {
              var time = new Date(i.time);
              var y = time.getFullYear();
              var m = time.getMonth() + 1;
              var d = time.getDate();
              var h = time.getHours();
              var mm = time.getMinutes();
              var s = time.getSeconds();
              this.docList.push({
                name: i.title,
                url: i.url,
                label: i.label,
                id: i.id,
                time:
                  y +
                  "-" +
                  this.add0(m) +
                  "-" +
                  this.add0(d) +
                  " " +
                  this.add0(h) +
                  ":" +
                  this.add0(mm) +
                  ":" +
                  this.add0(s),
              });
            }
            console.log(res);
            //console.log(typeof(res.result.pic));
            console.log("ok");
            this.docData = this.docList;
            //console.log(this.docList)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    getDataList2() {
      if (this.recommendation) {
        this.axios({
          url: "./vtmservice/getVideoByLabel/" + this.label,
          method: "get",
          params: {
            label: this.label,
          },
        })
          .then((res) => {
            console.log(res);
            for (let i of res.data) {
              var time = new Date(i.time);
              var y = time.getFullYear();
              var m = time.getMonth() + 1;
              var d = time.getDate();
              var h = time.getHours();
              var mm = time.getMinutes();
              var s = time.getSeconds();
              this.docList.push({
                name: i.title,
                url: i.url,
                label: i.label,
                id: i.id,
                time:
                  y +
                  "-" +
                  this.add0(m) +
                  "-" +
                  this.add0(d) +
                  " " +
                  this.add0(h) +
                  ":" +
                  this.add0(mm) +
                  ":" +
                  this.add0(s),
              });
            }
            this.docData = this.docList;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.axios
          .get("./vtmservice/getAllVideo")
          // .get("http://139.224.164.68:7777/getAllVideo")
          .then((res) => {
            console.log(res);
            for (let i of res.data) {
              var time = new Date(i.time);
              var y = time.getFullYear();
              var m = time.getMonth() + 1;
              var d = time.getDate();
              var h = time.getHours();
              var mm = time.getMinutes();
              var s = time.getSeconds();
              this.docList.push({
                name: i.title,
                url: i.url,
                label: i.label,
                id: i.id,
                time:
                  y +
                  "-" +
                  this.add0(m) +
                  "-" +
                  this.add0(d) +
                  " " +
                  this.add0(h) +
                  ":" +
                  this.add0(mm) +
                  ":" +
                  this.add0(s),
              });
            }
            console.log(res);
            //console.log(typeof(res.result.pic));
            console.log("ok");
            this.docData = this.docList;
            //console.log(this.docList)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1; //改变页面大小后，跳转回去第一页
      //console.log实时条数显示在控制台
      console.log("每页${val}条");
    },
    //每次切换当前页面的时候，此方法响应，改变当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log("当前页:${val}");
    },

    //展示通告，只调用了alert函数，考虑设计一个组件展示信息
    changeDialog() {
      this.isDialogVisible = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    showDialog() {
      this.isDialogVisible = true;
    },
    changeDialog() {
      this.isDialogVisible = false;
    },
    getDetail(mes) {
      let _item = {
        "内容：": mes.content,
      };
      this.diaData = _item;
      window.open(mes.url);
    },

    toTweet() {
      this.docList = [];
      this.getDataList1();
      this.dataType = 0;
    },
    toVideo() {
      this.docList = [];
      this.getDataList2();
      this.dataType = 1;
    },
    addFollowing(id) {
      if (this.dataType == 0) {
        //文章
        this.axios
          .post("./pimservice/addTweetCollection", {
            tweetID: id,
            patientID: sessionStorage.getItem("userID"),
          })
          .then((res) => {
            console.log(res);
            if (res.data === false) {
              this.$notify({
                title: "提示",
                message: "关注失败",
                type: "warning",
                duration: 3000,
              });
            } else {
              this.$message({
                showClose: true,
                message: `关注成功`,
                type: "success",
                duration: 0,
              });
            }
          })
          .catch((err) => {
            this.$notify({
              title: "提示",
              message: "用户访问错误",
              type: "error",
              duration: 0,
            });
            console.log(err);
          });
      } else {
        //视频
        this.axios
          .post("./pimservice/addVideoCollection", {
            videoID: id,
            patientID: sessionStorage.getItem("userID"),
          })
          .then((res) => {
            console.log(res);
            if (res.data === false) {
              this.$notify({
                title: "提示",
                message: "关注失败",
                type: "warning",
                duration: 3000,
              });
            } else {
              this.$message({
                showClose: true,
                message: `关注成功`,
                type: "success",
                duration: 0,
              });
            }
          })
          .catch((err) => {
            this.$notify({
              title: "提示",
              message: "用户访问错误",
              type: "error",
              duration: 0,
            });
            console.log(err);
          });
      }
    },
  },
};
</script>
<style>
.link:hover {
  color: #66b3ff;
}
</style>
