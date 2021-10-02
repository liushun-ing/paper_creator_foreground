<!--
 * @Author: your name
 * @Date: 2021-09-29 10:09:22
 * @LastEditTime: 2021-10-02 23:14:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VSWorkSpace\paper_creator\src\components\modify\modifyPassword.vue
-->
<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原密码" prop="oldPass" style="width: 51%;">
                <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass" style="width: 51%;">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass" style="width: 51%;">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="width: 51%;">
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'modifyPassword',
    data() {
      var checkOldPass = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请输入原密码'));
          } else if (value != window.sessionStorage.getItem('password')){
              callback(new Error('原密码不正确'));
          } else {
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
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          oldPass: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldPass: [
            { validator: checkOldPass, trigger: ['blur', 'change'] }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
                phone: window.sessionStorage.getItem('phone'),
                password: this.ruleForm.pass,
                }
                this.axios.post('http://localhost:8081/changePassword',params
                ).then(function(response) {
                if(response.data.code === 20000){
                  _this.$message({
                    message: '修改密码成功',
                    type: 'success'
                  });
                }else{
                  _this.$message({
                    message: "修改密码失败",
                    type: 'warning'
                  });
                }
                }).catch(error => {
                  console.error(error);
                  _this.$message({
                    message: '出现错误',
                    type: 'error'
                  });
                })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style>

</style>