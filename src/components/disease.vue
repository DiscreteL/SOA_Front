<template>
  <div>
    <el-row>
      <div class="regu">
        <el-col
          :span="7"
          v-for="item in dataList.slice(
            (currentPage - 1) * pagesize,
            currentPage * pagesize
          )"
          :key="item.id"
          :offset="0"
          gutter="20"
        >
          <div class="main">
            <div class="ill">
              <span class="text">{{ item.index }}</span>
              <div class="image">
                <img src="../assets/ji.png" alt="" />
              </div>
            </div>
            <div class="content">
              <span class="content-text">
                {{ item.introduction }}
              </span>
            </div>

            <div class="button">
              <el-popover
                class="button2"
                placement="bottom"
                title="别名"
                width="200"
                trigger="hover"
                :content="item.alias"
              >
                <el-button slot="reference">别名</el-button>
              </el-popover>

              <el-popover
                class="button2"
                placement="bottom"
                title="医保"
                width="200"
                trigger="hover"
                :content="item.medicalInsurance"
              >
                <el-button slot="reference">医保</el-button>
              </el-popover>

              <el-popover
                class="button2"
                placement="bottom"
                title="门诊科室"
                width="200"
                trigger="hover"
                :content="item.register"
              >
                <el-button slot="reference">门诊科室</el-button>
              </el-popover>

              <el-popover
                class="button2"
                placement="bottom"
                title="传染性"
                width="200"
                trigger="hover"
                :content="item.infectiousness"
              >
                <el-button slot="reference">传染性</el-button>
              </el-popover>

              <el-popover
                class="button2"
                placement="bottom"
                title="治疗方案"
                width="200"
                trigger="hover"
                :content="item.treatment"
              >
                <el-button slot="reference">治疗方案</el-button>
              </el-popover>

              <el-popover
                class="button2"
                placement="bottom"
                title="治疗周期"
                width="200"
                trigger="hover"
                :content="item.treatmentCycle"
              >
                <el-button slot="reference" style="text-align: center"
                  >治疗周期</el-button
                >
              </el-popover>

              <el-popover
                class="button2"
                placement="bottom"
                title="治疗费用"
                width="200"
                trigger="hover"
                :content="item.charge"
              >
                <el-button slot="reference">治疗费用</el-button>
              </el-popover>

              <el-popover
                placement="bottom"
                title="典型症状"
                width="200"
                trigger="hover"
                :content="item.typicalSymptom"
              >
                <el-button slot="reference">典型症状</el-button>
              </el-popover>

              <el-popover
                placement="bottom"
                title="常用药品"
                width="200"
                trigger="hover"
                :content="item.medicine"
              >
                <el-button slot="reference">常用药品</el-button>
              </el-popover>

              <!-- <el-popover
              placement="bottom"
              title="并发症"
              width="200"
              trigger="hover"
              :content=item.complication
            >
              <el-button slot="reference" style="text-align: center">并发症</el-button>
            </el-popover> -->
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
    <div style="margin-left: 35%">
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[6]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next,jumper"
          :total="dataList.length"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 6,
      diaData: {},
    };
  },
  props: {
    dataList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    handleSizeChange(page_size) {
      this.pagesize = page_size;
    },
    handleCurrentChange(current_page) {
      this.currentPage = current_page;
    },
  },
  watch: {
    dataList: function () {
      this.$nextTick(function () {
        this.currentPage = 1;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.regu {
  width: 100%;
  position: absolute;
  // padding-top: 40px;
  padding-left: 0px;
}

.block {
  position: relative;
  top: 800px;
  width: 100px;
  right: -10%;
  margin-bottom: 20px;
}
.main {
  width: 306px;
  height: 334px;
  // height: 265px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: left;
  //   float: left;
  margin-right: 60px;
  padding: 0px;
  background-color: rgb(255, 255, 255);
  position: relative;
  left: 20%;
  top: 20%;
  //   margin-top: 50px;
  //   transform: translate(-50%, -50%);
}
.el-row {
  width: 100%;
}
.ill {
  height: 50px;
  padding-left: 10px;
  padding-top: 10px;
  border-color: #000000;
  border-bottom: thin solid #eceaea;
  background: -webkit-linear-gradient(left, #7fbfff, #c6e2ff);

  .image {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    padding: 10px;
    position: relative;
    top: -15px;
    left: 85%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .text {
    position: relative;
    font-size: 26px;
    text-align: center;
    margin-top: 100px;
    vertical-align: center;
  }
}

.content {
  height: 150px;
  text-align: left;
  vertical-align: middle;
  overflow-y: auto;
  padding-top: 2px;
  padding-left: 5px;
  border-radius: 0px;
  border-bottom: thin solid #eceaea;

  .content-text {
    vertical-align: 5px;
    text-align: left;
    font-size: 14px;
    font-family: "微软雅黑";
  }
}
.button {
  height: 50px;
  border-radius: 4px;
  width: 305px;
}
.el-button {
  position: relative;
  left: 1px;
  margin-left: 1px;
  margin-top: 1px;
  font-size: 13px;
  width: 100px;
}
.el-col {
  left: 10px;
  padding-left:30px;
  padding-top: 40px;
}
</style>