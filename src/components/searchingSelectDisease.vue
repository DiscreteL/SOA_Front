<template>
  <div>
    <el-select v-model="type" placeholder="请选择筛选依据" style="width:30%">
      <el-option label="病名关键字" value="病名关键字"></el-option>
      <el-option label="症状关键字" value="症状关键字"></el-option>
    </el-select>
    <span v-show="type==='病名关键字'">
      <el-select
        v-model="selectedValue"
        filterable
        remote
        placeholder="请输入病名关键词"
        prefix-icon="el-icon-search"
        :remote-method="remoteMethod1"
        style="width: 65%;margin-left:20px;"
        :loading="loading"
        @change="filterData(selectedValue)"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </span>
    <span v-show="type==='症状关键字'">
      <el-select
        v-model="selectedValue"
        filterable
        remote
        placeholder="请输入症状关键词"
        prefix-icon="el-icon-search"
        :remote-method="remoteMethod2"
        style="width: 65%;margin-left:20px;"
        :loading="loading"
        @change="filterData(selectedValue)"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </span>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  data() {
    return {
      options: [], //模糊搜索的匹配项
      selectedValue: "", //被选择的标签
      loading: false,
      type: '病名关键字',
    };
  },
  props: {
    selectedOptions: {
      //所有选项
      type: Array,
      default: function () {
        return [];
      },
    },
    selectedData: {
      //所有数据
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    remoteMethod1(query) {
      //模糊搜索
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.selectedOptions.filter((item) => {
            //下拉表中返回所有匹配到的选项
            return item.value.indexOf(query) > -1;
          });
        }, 100);
      } else {
        this.options = [];
      }
    },
    remoteMethod2(query) {
      //模糊搜索
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.selectedOptions.filter((item) => {
            //下拉表中返回所有匹配到的选项
            return item.intro.indexOf(query) > -1;
          });
        }, 100);
      } else {
        this.options = [];
      }
    },

    filterData(this_label) {
      if (this_label === " " || this_label === "全部") {
        this.$emit("selectData", this.selectedData);
        this.options = [];
        this.selectedValue = "";
      } else
        this.$emit(
          "selectData",
          this.selectedData.filter((item) => {
            if (item.index1) return item.index1 === this_label;
            else return item.index === this_label;
          })
        );
      this.options = [];
      this.selectedValue = "";
    },
  },
};
</script>
