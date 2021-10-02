<template>

    <div id="back">
      <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="80px" class="login-box">
        <h3 class="login-title">欢迎登录</h3>
        <el-form-item label="手机号" prop="phone">
          <el-input type="text" placeholder="请输入手机号" v-model="loginForm.phone"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"/>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button type="primary" round v-on:click="onSubmit('loginForm')">登录</el-button>
          <el-button type="primary" round v-on:click="addUser()">注册</el-button>
        </el-form-item>
      </el-form>

      <el-dialog
        title="温馨提示"
        :visible.sync="dialogVisible"
        width="30%"
        append-to-body> <!--解决弹出框变暗问题-->
        <span>请输入账号和密码</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" round @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>    
  
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          phone: '',
          password: ''
        },

        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          phone: [
            {required: true, message: '手机号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        },

        // 对话框显示和隐藏
        dialogVisible: false
      }
    },
    methods: {
      onSubmit(formName) {
        // 为表单绑定验证功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
                phone: this.loginForm.phone,
                password: this.loginForm.password,
              };
            let _this = this;
              this.axios.post('http://localhost:8081/login',params
              ).then(function(response) {
                if(response.data.code === 20000){
                  this.$message({
                    message: '登陆成功',
                    type: 'success'
                  });
                  //将用户名和密码存储到session当中
                  sessionStorage.setItem('phone', _this.loginForm.phone);
                  sessionStorage.setItem('password', _this.loginForm.password);
                  sessionStorage.setItem('username', response.data.data.username);
                  // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
                  _this.$router.push("/main");   
                } else {
                    this.$message({
                      message: response.data.message,
                      type: 'error'
                    });
                }
              }).catch(error => {
                  console.error(error);
                  this.$message.error('出现异常，请联系管理员');
              })
          } else {
            this.dialogVisible = true;
            return false;
          }
        });
      },
      addUser() {
        this.$router.push({path: '/add/register'});
      }
    }
  }
</script>

<style lang="css" scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    background-color: rgb(252, 252, 252);
    width: 350px;
    margin: 130px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }

  #back {
    background: url("../assets/images/backimg.jpeg");
    width: 100%;	
    height: 100%;
    position: fixed;
    background-size: 100% 100%
  }

</style>
