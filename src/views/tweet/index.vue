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
          label="处理状态"
          width="80"
          :filters="[
            { text: '未处理', value: 0 },
            { text: '已处理', value: 1 },
          ]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.audit === 0 ? 'primary' : 'success'"
              disable-transitions
            >
              {{ scope.row.audit === 0 ? '未处理' : '已处理' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="doctorID" label="用户ID" width="120"></el-table-column>
        <el-table-column prop="title" label="标题" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button size="mini" @click="loadTweetData(scope.row)"
            >查看详情</el-button
          >
          <el-button
            size="mini"
            type="danger"
            style="margin-left: 20px"
            @click="dialogFormVisible = true"
            >处理</el-button
          >
          <el-dialog title="资讯信息" :visible.sync="dialogTableVisible" >
            <el-table :data=tweetData>
              <el-table-column label="上传用户ID" prop="doctorID"></el-table-column>
              <el-table-column label="推文ID" prop="id"></el-table-column>
              <el-table-column label="上传时间" prop="time"></el-table-column>
              <el-table-column label="推文标题" prop="title"></el-table-column>
              <el-table-column label="推文标签" prop="label"></el-table-column>
              <el-table-column label="上传内容" prop="url">
                <template slot-scope="scope">
                  <el-tooltip content="点击下载" placement="top">
                    <a style="text-decoration: underline;cursor: pointer;" @click="downloadContent(scope.row)">查看上传文件</a>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>

          
          <el-dialog title="申请处理" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" style="width: 100%">
              <el-form-item label="处理结果" :label-width="formLabelWidth">
                <el-select v-model="form.result" placeholder="请选择处理结果">
                  <el-option label="通过" value=1></el-option>
                  <el-option label="拒绝" value=0></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="处理意见" :label-width="formLabelWidth">
                <el-input v-model="form.reply" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handle(scope.row)">确 定</el-button>
            </div>
          </el-dialog>
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
      tableData: [],
      tweetData:[],
      dialogTableVisible: false,
      dialogFormVisible: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 20, // 每页的数据条数
      formData: new FormData(), //表单提交的数据
      form: {
          result: '',
          reply: ''
        },
        formLabelWidth: '120px'
    };
  },

  methods: {
    loadData() {
      this.axios({
        url: "api/admin-and-problem-service/getAllTweet",
        method: "get",
        params: {
        },
      })
        .then((response) => {
          this.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    loadTweetData(row) {
      this.dialogTableVisible = true
      this.tweetData = undefined
      this.tweetData = new Array();
      this.axios({
        url: "api/admin-and-problem-service/getTweet/"+row.id,
        method: "get",
      })
        .then((response) => {
          this.tweetData.push({
            "doctorID":response.data.doctorID,
            "id":response.data.id,
            "time":response.data.time,
            "title":response.data.title,
            "label":response.data.label,
            "url":response.data.url,
            "coverUrl":response.data.coverUrl,
            "audit":response.data.audit===0?"未审核":"已审核"
          })
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
    handle(row) {
      this.formData.append("id", row.id);
      data.append("result", this.form.result);
      data.append("reply", this.form.reply);
      this.axios({
        url: "/admin-and-problem-service/auditTweet/"+row.id,
        method: "post",
        data: this.formData,
      })
        .then((response) => {
          if (response.data === true) {
            this.$refs.form.resetFields();
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "处理成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "处理失败！",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "处理失败！",
          });
        });
        this.formData = new FormData();
    },

    downloadProof(row){
      let data = new FormData()
      data.append("id",row.id)
      this.axios({
        url:"/",
        method:"post",
        data:data
      }).then((response)=>{
        let blob = new Blob([response.data]);
        const disposition = response.headers["content-disposition"];
        //获得文件名
        let fileName = disposition.substring(
            disposition.indexOf("filename=") + 9,
            disposition.length
        );
        //解码
        fileName = decodeURI(fileName);
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName);
        } else {
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        }
      }).catch(()=>{
        this.$message({
          type: "error",
          message: "下载失败！请重新尝试！",
        });
      })
    }
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
