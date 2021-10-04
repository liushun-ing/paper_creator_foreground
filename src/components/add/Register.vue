<!--
 * @Author: your name
 * @Date: 2021-09-11 15:40:16
 * @LastEditTime: 2021-10-04 23:36:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VSWorkSpace\myblock\src\components\add\AddUser.vue
-->
<template>
    <div id="back">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="add-box">
            <h3 class="add-title">注册</h3>
            <el-form-item label="用户名" prop="username">
                <el-input type="text" placeholder="请输入用户名" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone"> <!--prop 用于表单校验-->
              <el-col :span="14">
                <el-input type="text" placeholder="请输入手机号" v-model="ruleForm.phone" autocomplete="off"></el-input>
              </el-col>
              <el-button type="primary" @click="verify('phone')" :disabled="isDisabled">发送验证码</el-button>
            </el-form-item>
            <el-form-item label="验证码" prop="verifyCode">
                <el-input type="verifyCode" placeholder="请输入4位验证码" v-model="ruleForm.verifyCode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" placeholder="请输入密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" placeholder="确认密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
      var validatePhone = (rule, value, callback) => {
        let reg= /^1[3|4|5|7|8][0-9]\d{8}$/
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else if(!reg.test(value)) {
          callback(new Error('手机号不正确'))
        } else {
          this.isDisabled = false;
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        let reg= /^.*(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])\w{6,10}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(!reg.test(value)) {
          callback(new Error('密码必须是由6-10位大小写字母+数字组合'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('验证码不能为空'));
        } else if (value !== this.ruleForm.trueCode) {
          callback(new Error('验证码错误'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          username: '',
          phone: '',
          verifyCode: '',
          trueCode: ''
        },
        isDisabled: true,
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          verifyCode: [
            { validator: validateCode, trigger: 'blur' }
          ],
          username: [
            {required: true, message:'用户名不能为空', trigger: 'blur'}
          ],
          phone: [
            { validator: validatePhone, trigger: ['blur', 'change'] }
          ]
        },
      };
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
                username: this.ruleForm.username,
                password: this.ruleForm.pass,
                phone: this.ruleForm.phone
                }
                this.axios.post('http://localhost:8081/register',params
                ).then(function(response) {
                if(response.data.code === 20000){
                  _this.$message({
                    message: '注册成功，请登录',
                    type: 'success'
                  });
                  _this.$router.push({path: '/login'});
                }else{
                    _this.$message({
                      message: response.data.message,
                      type: 'error'
                    });
                }
                }).catch(error => {
                    console.error(error);
                    _this.$message.error('出现异常，请联系管理员');
                })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      verify() {
        let _this = this;
        var url = "http://localhost:8081/verify/" + this.ruleForm.phone;
        this.axios.get(url
        ).then((response)=>{
          if(response.data.code === 20000) {
            _this.ruleForm.trueCode = response.data.data.verify;
          } else {
            _this.$message({
              message: response.data.message,
              type: 'error'
            });
          }
        })
      }
    }
}
</script>

<style lang="css" scoped>
  .add-box {
    border: 1px solid #DCDFE6;
    background-color: rgb(252, 252, 252);
    width: 350px;
    margin: 50px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .add-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
  #back {
    background: url("../../assets/images/backimg.jpeg");
    width: 100%;	
    height: 100%;
    position: fixed;
    background-size: 100% 100%
  }
</style>
