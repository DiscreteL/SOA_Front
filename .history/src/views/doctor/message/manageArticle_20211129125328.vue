<template>
  <div class="reportForm">
    <div class="form" style="margin-top: 15px">
      <el-table
        ref="filterTable"
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="上传日期"
          sortable
          width="150"
          column-key="date"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="审核状态"
          width="120"
          :filters="[
            { text: '等待审核', value: '等待审核' },
            { text: '通过审核', value: '通过审核' },
            { text: '未通过审核', value: '未通过审核' },
          ]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '未通过审核' ? 'danger' : 'success'"
              disable-transitions
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="文章标题"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容概览"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="操作">
          <el-button size="mini" @click="dialogTableVisible = true"
            >编辑</el-button
          >
          <el-dialog title="编辑文章内容" :visible.sync="dialogTableVisible">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="文章标题" required>
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="文章内容" required>
                <el-input
                  type="textarea"
                  :rows="10"
                  v-model="form.content"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">提交编辑</el-button>
                <el-button type="primary" @click="clear">清空</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <el-button
            size="mini"
            type="danger"
            style="margin-left: 20px"
            @click="del"
            >删除</el-button
          >
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
      tableData: [
        {
          date: "2021-05-02",
          status: "等待审核",
          title: "过敏性哮喘患者在饮食上有什么禁忌？",
          content:
            "社会的发展使人们的生活更加方便快捷，推动了人民中国质量的提高。但是另一方面也给人类带来了一些危害，社会快速发展的背后就是工业的发展，工业发展必然会带来一些环境污染，环境未来竟然又会影响到人类，所以如何实现人地协调发展是一个非常重要的问题。如果不能实现人地协调发展，就会给人类带来很大的危害。就比如说现在各种疾病的患病率越来越高，和工业污染有一定的关联。今天就给大家介绍一下，过敏性哮喘患者在饮食上有什么样的禁忌。",
        },
        {
          date: "2021-05-04",
          status: "未通过审核",
          title: "小儿支气管炎，别怕！六招教你如何护理！",
          content:
            "如果家里的宝宝得了小儿支气管炎，牵动着各位爸爸妈心，家长朋友往往比患儿还要着急，看着孩子难受，内心也是备受煎熬，那各位宝爸宝妈们，你们知道如何护理吗？知道如何给宝宝做膳食吗？我们一起来学学吧。",
        },
        {
          date: "2021-05-01",
          status: "通过审核",
          title: "新生儿黄疸要注意！你知道引起黄疸的真正原因吗？",
          content:
            "本病是一种少见的先天性畸形，黄疸乃因胚胎发育异常造成的胆道闭锁或狭窄，胆汁不能排泄或排泄不畅所致。黄疸的特点是出生不久即发生，呈进行性加重，全身皮肤深桔黄色，尿布被尿液染黄后用清水常冲洗不掉。此病预后恶劣，应早期手术",
        },
        {
          date: "2020-05-03",
          status: "通过审核",
          title: "新生儿黄疸护理方法出来啦，一起来学学吧",
          content:
            "本病病源是细胞巨病毒，由无症状的带病毒孕妇通过胎盘感染胎儿。新生儿在出生一个月内出现黄疸、精神不振、咳嗽、肝脾肿大、消化不良和生长停滞等，应考虑是本病。",
        },
        {
          date: "2020-05-03",
          status: "未通过审核",
          title: "小儿支气管炎，别怕！六招教你如何护理！",
          content: "",
        },
        {
          date: "2020-05-03",
          status: "通过审核",
          title: "小儿慢性肾衰如何治疗，需要注意什么",
          content:
            "患小儿慢性肾衰的原因与第1次检出肾衰时的患儿年龄密切相关。5岁以下的慢性肾衰常是解剖异常的结果，如肾发育不全、肾发育异常、尿路梗阻以及其他先天畸形；5岁以后的慢性肾衰则以后天性肾小球疾病如小球肾炎、溶血性尿毒综合征或遗传性病变，如Alport综合征、肾囊性病变为主。",
        },
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 20, // 每页的数据条数
      form: {
        reason: "",
        region: 0,
        delivery: false,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterStatus(value, row) {
      return row.status === value;
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
    del() {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    onSubmit() {
      console.log("submit!");
    },
    clear() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style scoped>
.reportForm {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.form {
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
