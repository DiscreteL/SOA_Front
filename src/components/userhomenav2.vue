<template>
  <div class="container">
    <div class="head">
      <div class="background">
        <img src="@/assets/back.jpg" alt="" width="100%" height="100%" />
      </div>
      <div class="headmain">
        <div class="left">
          <!-- 头像部分 -->
          <div class="port_box">
            <img src="../assets/docPort.png" />
          </div>

          <!-- 个人信息部分 -->
          <div
            class="Info"
            style="color: white; font-size: 30px; font-family: 宋体"
          >
            {{ userInfo.name }}<br />
          </div>
        </div>
        <div>
          <el-button type="primary" @click="dialogFormVisible = true"
            >资格认证</el-button
          >
          <el-dialog
            title="提交医生资格认证申请"
            :visible.sync="dialogFormVisible"
          >
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="文件" required>
                <el-upload
                  class="upload-demo"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  action=""
                  :file-list="fileList"
                  :http-request="Upload"
                  :before-upload="BeforeUpload"
                  drag
                  multiple
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    将文件拖到此处，或<em>点击上传</em>
                  </div>
                  <div class="el-upload__tip" slot="tip">
                    支持的文件格式有：pdf
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">发布</el-button>
                <el-button type="primary" @click="clear">清空</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <el-button type="info" @click="returnhome" style="margin-left: 20px"
            >返回首页</el-button
          >
        </div>
      </div>
    </div>
    <div class="navBar">
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-demo"
        router
        mode="horizontal"
        active-text-color="#409EFF"
      >
        <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
          {{ item.navItem }}
        </el-menu-item>
      </el-menu>
    </div>
    <div></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "UserHomeNav2",
  data() {
    return {
      ID: window.sessionStorage.getItem("userID"),
      userInfo: {},
      navList: [
        { name: "/userHome2", navItem: "个人信息" },
        { name: "/messageCenter", navItem: "创作中心" },
        { name: "/consultCenter", navItem: "问诊中心" },
        { name: "/helpCenter", navItem: "帮助中心" },
      ],
      dialogFormVisible: false,
      form: {
      },
      newFile: new FormData()
    };
  },
  methods: {
    returnhome() {
      this.$router.push("/home");
    },
    loadData() {
      this.axios({
        url: "api/doctor-service/getInfo/" + this.ID,
        method: "get",
        params: {
          ID: this.ID,
        },
      })
        .then((response) => {
          this.userInfo = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    BeforeUpload (file) {
      if (file) {
        this.newFile.append('file', file) //  2. 上传之前，拿到file对象，并将它添加到刚刚定义的FormData对象中。
        console.log(this.newFile.get('file'))
      } else {
        return false
      }
    },
    Upload () {
      const newData = this.newFile //  3. 拿到刚刚的数据，并将其传给后台
      axios({
        url: 'http://114.55.35.220:8081/api/uploadFileUser',
        method: 'post',
        data: newData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          console.log('res:', res)
        })
        .catch((err) => {
          console.log(err)
        })
    },

  },

  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
.head {
  height: 180px;
  width: 100%;
}
.background {
  width: 100%;
  height: 180px;
  z-index: -1;
  position: absolute;
}
.headmain {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.left {
  display: flex;
  align-items: center;
}
.port_box {
  height: 90px;
  width: 90px;
  border: 1px solid #eee;
  border-radius: 50%; /* 圆角 */
  padding: 3px; /*图片和边框之间的间距 */
  box-shadow: 0 0 10px #ddd; /*阴影 */
  position: relative;
  margin: 30px;
}
.port_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%; /* 圆角 */
  background-color: #eee;
}

.Info {
  text-align: left;
  font: 15px "Microsoft YaHei";
  margin: 30px;
  position: relative;
}
</style>
