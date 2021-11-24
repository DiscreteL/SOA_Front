<template>
  <el-card>
    <div class="container">
      <div>
        <h1>修改密码</h1>
        <div>设置复杂密码更能保护您的账号安全</div>
      </div>
      <div>
        <el-button>修改</el-button>
      </div>
    </div>
    <div class="container">
      <div >
        <h1>账号注销</h1>
        <div>为保证您的账号安全，需要满足相应的条件，才能提交注销申请</div>
      </div>
      <div>
        <el-button>注销</el-button>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-card div{
    margin-bottom: 5%;
}
</style>