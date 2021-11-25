<template>
  <el-table
    :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="标题">
            <span>{{ props.row.title }}</span>
          </el-form-item>
          <el-form-item label="作者">
            <span>{{ props.row.author }}</span>
          </el-form-item>
          <el-form-item label="发布时间">
            <span>{{ props.row.launchtime }}</span>
          </el-form-item>
          <el-form-item label="分类标签">
            <span>{{ props.row.tag }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="收藏时间" prop="colltime"> </el-table-column>
    <el-table-column label="标题" prop="title"> </el-table-column>
    <el-table-column label="作者" prop="author"> </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" @click="handleEdit(scope.$index, scope.row)" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >查看全文</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >取消收藏</el-button
        >
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
          title: "金银草有如此功效？！！",
          author: "张三医生",
          colltime: "2021.11.24",
          launchtime: "2021.9.4",
          tag: "止咳",
        },
        {
          title: "生姜生发？！！",
          author: "李四医生",
          colltime: "2021.11.24",
          launchtime: "2021.8.20",
          tag: "生发",
        },
        {
          title: "缓解脊椎酸痛小妙招",
          author: "王五医生",
          colltime: "2021.11.23",
          launchtime: "2021.9.30",
          tag: "脊椎",
        },
        {
          title: "熬夜对身体的影响你知道吗？",
          author: "李六医生",
          colltime: "2021.9.4",
          launchtime: "2021.5.13",
          tag: "熬夜",
        },
      ],
      search: "",
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleChange() {
    this.$forceUpdate();
},
  },
};
</script>