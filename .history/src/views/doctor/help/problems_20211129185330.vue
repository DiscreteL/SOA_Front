<template>
  <el-table
    :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="解答">
            <span>{{ props.row.answer }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="问题名称" prop="problem"> </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" @click="handleEdit(scope.$index, scope.row)" size="mini" placeholder="输入关键字搜索" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-left: 2%;
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          problem:"主页加载不出来怎么办？",
          answer:"建议多刷新几次页面，或关闭页面重新进入。"
        },
        {
          problem:"为什么修改密码失败？",
          answer:"请根据操作提示检查密码长度于安全性符合规范。"
        },
        {
          problem:"如何更新个人信息？",
          answer:"在个人信息中点击“编辑”按钮。"
        },
        {
          problem:"医生的评分是如何得出的？",
          answer:"我们通过计算医生历次问诊结束后患者的有效评分平均数得到医生的评分。"
        },        
      ],
      search: "",
    }
  }
};
</script>
