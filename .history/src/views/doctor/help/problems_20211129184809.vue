<template>
  <el-table
    :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="问题名称">
            <span>{{ props.row.problem }}</span>
          </el-form-item>
          <el-form-item label="解答">
            <span>{{ props.row.answer }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="问题名称" prop="time"> </el-table-column>
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
          time: "2021-5-23",
          name: "GGG",
          disrecord: "上呼吸道感染",
          prescr: "正柴胡颗粒",
        },
        {
          time: "2020-12-5",
          name: "HHH",
          disrecord: "急性鼻窦炎",
          prescr: "处方1",
        },
        {
          time: "2019-3-22",
          name: "KKK",
          disrecord: "失眠，心律不齐",
          prescr: "稳心颗粒",
        },
        {
          time: "2019-1-6",
          name: "JJJ",
          disrecord: "过敏",
          prescr: "息斯敏（氯雷他定片）",
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
