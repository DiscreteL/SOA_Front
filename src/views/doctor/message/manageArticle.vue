<template>
  <div class="messageForm">
    <div class="form1" style="margin-top: 15px">
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
      >
        <el-table-column
          prop="time"
          label="上传时间"
          sortable
          width="300"
          column-key="date"
        >
        </el-table-column>
        <el-table-column
          prop="audit"
          label="审核状态"
          width="150"
          :filters="[
            { text: '等待审核', value: 0 },
            { text: '已审核', value: 1 },
          ]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.audit === 0 ? 'primary' : 'success'"
              disable-transitions
            >
              {{ scope.row.audit === 0 ? "等待审核" : "已审核" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="300"
        ></el-table-column>

        <el-table-column label="查看">
          <template slot-scope="scope">
            <el-button size="mini" @click="loadTweetInfo(scope.row)"
              >查看详情</el-button
            >
            <el-dialog title="文章详情" :visible.sync="dialogTableVisible">
              <el-table :data="tweetInfo">
                <el-table-column
                  label="文章标题"
                  prop="title"
                ></el-table-column>
                <el-table-column label="文章编号" prop="id"></el-table-column>
                <el-table-column label="上传时间" prop="time"></el-table-column>
                <el-table-column label="审核状态" prop="audit"
                  ><template slot-scope="scope">
                    <el-tag
                      :type="scope.row.audit === 0 ? 'primary' : 'success'"
                      disable-transitions
                    >
                      {{ scope.row.audit === 0 ? "等待审核" : "已审核" }}
                    </el-tag>
                  </template></el-table-column
                >
                <el-table-column label="标签" prop="label"></el-table-column>
                <el-table-column label="链接地址" prop="url">
                  <template slot-scope="scope">
                    <!-- 点击进行响应弹出通告具体界面-->
                    <span @click="getDetail(scope.row)" styLe="cursor: pointer">
                      <a class="link">{{ scope.row.url }}</a>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="margin-left: 20px"
              @click="del(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ID: window.sessionStorage.getItem("userID"),
      tableData: [],
      dialogTableVisible: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 20, // 每页的数据条数
      tweetInfo: [],
    };
  },

  methods: {
    loadData() {
      this.axios({
        url: "./vtmservice/getDoctorAllTweet/" + this.ID,
        method: "get",
        params: {
          id: this.ID,
        },
      })
        .then((response) => {
          this.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterStatus(value, row) {
      return row.status === value;
    },
    filterType(value, row) {
      return row.type === value;
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },

    loadTweetInfo(row) {
      this.dialogTableVisible = true;
      this.tweetInfo = undefined;
      this.tweetInfo = new Array();
      this.axios({
        url: "./vtmservice/getTweet/" + row.id,
        method: "get",
        params: {
          id: row.id,
        },
      })
        .then((response) => {
          this.tweetInfo.push({
            id: response.data.id,
            url: response.data.url,
            label: response.data.label,
            time: response.data.time,
            coverUrl: response.data.coverUrl,
            audit: response.data.audit,
            title: response.data.title,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getDetail(mes) {
      window.open(mes.url)
    },

    del(row) {
      this.$confirm("确定要删除此推文吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteTweet(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作取消",
          });
        });
    },

    deleteTweet(data) {
      this.axios({
        url: "./vtmservice/deleteTweet/" + data.id,
        method: "delete",
      })
        .then(() => {
          this.tableData.splice(data, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "删除失败! 请稍后再试",
          });
        });
    },
  },

  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
.messageForm {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.form1 {
  float: left;
  width: 100%;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.block {
  float: left;
  width: 100%;
  position: fixed;
  bottom: 75px;
}
</style>
