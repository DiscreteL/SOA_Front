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
        <el-button @click="toTweet">切换到文章</el-button>
        <el-button @click="toVideo">切换到视频</el-button>
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
            width="180px"
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
            label="新闻公告"
            width="400px"
          >
            <template slot-scope="scope">
              <!-- 点击进行响应弹出通告具体界面 -->
              <span @click="getDetail(scope.row)" style="cursor: pointer">
                <a class="link">{{ scope.row.name }}</a>
              </span>
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
      docList: [
        {
          name: "拒绝这些进口器械！北京协和发布重要公告",
          time: "2021-1-1",
          content:
            "国产医疗器械目前处于高速发展期，在部分领域已具备了和国际巨头“拼刺刀”的能力。但基于技术积累以及观念习惯上的原因，医院和相关机构在采购时整体依然偏向进口器械。针对这些问题，国家政策明确提出医院国产医疗器械占比提升要求。《国务院办公厅关于促进医药产业健康发展的指导意见》中曾指出，国产药品和医疗器械能够满足要求的，政府采购项目原则上须采购国产产品，逐步提高公立医疗机构国产设备配置水平。十四五规划出台后，大批医院和科研机构出现设备缺口，在国家政策要求下，采购国产势必是趋势所在。",
        },
      ],
      diaData: {},
      docData: [],
      currentPage: 1, //当前页数 ，默认为1
      pageSize: 10, // 每页显示数量
      pageSizes: [8, 12, 16], //可以选择每页显示的数据条数
      currentPageData: {}, //当前页显示内容
      // tableData: Array(20).fill(item),
    };
  },
  created() {
    this.getDataList1();
  },
  methods: {
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    getDataList1() {
      this.axios
        .get("admin-and-problem-service/getAllTweet")
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
    },

     getDataList2() {
      this.axios
        .get("admin-and-problem-service/getAllVideo")
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
      this.docList=[];
      this.getDataList1();
    },
    toVideo() {
      this.docList=[];
      this.getDataList2();
    },
  },
};
</script>
<style>
.link:hover {
  color: #66b3ff;
}
</style>
