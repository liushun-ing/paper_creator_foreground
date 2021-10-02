<!--
 * @Author: your name
 * @Date: 2021-09-29 10:08:58
 * @LastEditTime: 2021-10-02 20:05:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VSWorkSpace\paper_creator\src\components\question\Question.vue
-->
<template>
  <el-form ref="questionForm" :model="questionForm" :rules="rules" size="large">
    <el-form-item label="题目数量" style="text-align: left;" prop="number">
        <el-input v-model="questionForm.number" style="width: 20%;" placeholder="请输入题目数量10-30" autocomplete="off"></el-input>
        <el-button type="primary" :span="12" @click="getPaper('questionForm')">生成试卷</el-button>
    </el-form-item>
    <el-container id="quesContainer">
      <el-aside style="font-size: 16px; text-align: center;">
        <span>题目序号</span>
        <el-button-group id="manyButts">
          <!-- <el-button border class="butt">2</el-button>
          <el-button border class="butt">3</el-button>-->
        </el-button-group>
      </el-aside>
      <el-main>
        <span model="currentNumber">NO.{{currentNumber}} {{questions[currentNumber-1]}}</span>
        <el-form-item>
          <el-radio-group v-model="questionForm.selection" size="large" @change="saveResult">
            <el-radio label="A">{{answerA[currentNumber-1]}}</el-radio>
            <el-radio label="B">{{answerB[currentNumber-1]}}</el-radio>
            <el-radio label="C">{{answerC[currentNumber-1]}}</el-radio>
            <el-radio label="D">{{answerD[currentNumber-1]}}</el-radio>
          </el-radio-group>          
        </el-form-item>  
        <el-button id="prev" type="primary" @click="prev" :disabled="currentNumber===1? true:false">上一题</el-button>
        <el-button id="next" type="primary" @click="next" :disabled="currentNumber==questionForm.number? true:false">下一题</el-button>
        <el-button type="primary" @click="submitPaper">提交试卷</el-button>
      </el-main>    
    </el-container>

    <br>
    <el-form-item size="large" style="text-align: left;">
        <el-button type="primary" @click="reTest">重新测试</el-button>
        <el-button type="info" @click="showCounts">查看分数</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'question',
  props: ['type'],
  data() {
      var validateNumber = (rule, value, callback) => {
        let reg= /^\d{2}$/
        if(!reg.test(value)) {
          callback(new Error('输入格式错误'))
        } else if (value < 10 || value > 30) {
          callback(new Error('范围不匹配'));
        } else {
          callback();
        }
      };
      return {
        questionForm: {
          number: '',
          selection: '',
          resultString: [],
        },
        isDisabled: [true,true,true,true,true,true,true,
                    true,true,true,true,true,true,true,
                    true,true,true,true,true,true,true,
                    true,true,true,true,true,true,true,true,true],
        currentNumber : 1,
        questions: ['111','222','333','444','555'],
        answerA: ['11','21','31','41','51'],
        answerB : ['12','22','32','42','52'],
        answerC : ['13','23','33','43','53'],
        answerD : ['14','24','34','44','54'],
        score: '',
        rules: {
          number: [
            { validator: validateNumber, trigger: 'blur' }
          ]
        }
      };
    },
    mounted: function() {
      var _this = this;
      var many = document.getElementById("manyButts");
      for (let i = 1; i <= 30; i++) {
        var btn = document.createElement("input");
        btn.type = "button";
        btn.className = "butt";    
        btn.id = "b" + i;
        btn.value = i;
        btn.disabled = _this.isDisabled[i-1]; // 开始时都不能用
        btn.onclick = function () {
          _this.currentNumber = i;
          if (_this.questionForm.resultString[_this.currentNumber - 1] != null) {
            _this.questionForm.selection = _this.questionForm.resultString[_this.currentNumber - 1];
          } else {
            _this.questionForm.selection = '';
          }
        }
        many.appendChild(btn);
      };
      // for (let index = 1; index <= 30; index++) {
      //   var MyButton = Vue.extend({
      //     template: '<el-button border class="butt">' + index + '</el-button>'
      //   });
      //   new MyButton().$mount().$appendTo('#manyButts');        
      // } 
    },
    methods: {
      getPaper() {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.currentNumber = 1;
            this.questionForm.selection = '';
            this.questionForm.resultString = [];
            // 设置按钮是否可用
            for (let i = 1; i <= 30; i++) {
              if ( i <= this.questionForm.number) {
                this.isDisabled[i - 1] = false;
              } else {
                this.isDisabled[i - 1] = true;
                document.getElementById("b" + i).style.color = "#909399";  //不能点击的题目序号颜色变淡
              }
              document.getElementById("b" + i).disabled = this.isDisabled[i - 1];
            }
            var url = "http://localhost:8081/question/" + this.type + "/" + this.questionForm.number;
            this.axios.get(url
            ).then((response)=>{
              if(response.data.code === 20000) {
                this.questions = response.data.data.questions;
                this.answerA = response.data.data.answerA;
                this.answerB = response.data.data.answerB;
                this.answerC = response.data.data.answerC;
                this.answerD = response.data.data.answerD;
              } else {
                  this.$message({
                    message: response.data.message,
                    type: 'error'
                  });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      prev() {
        this.currentNumber--;
        if (this.questionForm.resultString[this.currentNumber - 1] != null) {
          this.questionForm.selection = this.questionForm.resultString[this.currentNumber - 1];
        } else {
          this.questionForm.selection = '';
        }
      },
      next() {
        this.currentNumber++;
        if (this.questionForm.resultString[this.currentNumber - 1] != null) {
          this.questionForm.selection = this.questionForm.resultString[this.currentNumber - 1];
        } else {
          this.questionForm.selection = '';
        }
      },
      submitPaper() {
        var userResult = '';
        // 拼接成字符串
        for (let i = 0; i < this.questionForm.resultString.length; i++) {
          userResult += this.questionForm.resultString[i];
        }
        var url = 'http://localhost:8081/countAnswer/' + userResult;
        this.axios.get(url,
        ).then(function(response) {
        if(response.data.code === 20000){
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.score = response.data.data.score;
        }else{
            this.$message({
              message: response.data.message,
              type: 'error'
          });
        }
        }).catch(error => {
            console.error(error);
            this.$message.error('出现异常，请联系管理员');
        })
      },
      reTest() {
        this.currentNumber = 1;
        this.questionForm.selection = '';
        this.questionForm.resultString = [];
        this.getPaper();
      },
      showCounts() {
        this.$alert('你最终的分数为' + this.score + '，错题已经整理到错题集，请自行查看', '得分情况', {
          confirmButtonText: '确定',
          // callback: action => {
          //   this.$message({
          //     type: 'info',
          //     message: `action: ${ action }`
          //   });
          // }
        });
      },
      saveResult(value) {
        document.getElementById('b' + this.currentNumber).style.color = "#ABCDEF";  // 完成的题目序号颜色变成浅蓝色
        this.questionForm.resultString[this.currentNumber-1] = value;
      }
    }
}
</script>

<style>
    #quesContainer {
        width: 100%;
        height: 300px;
        border-radius: 5px;
        font-size: 25px;
        border: rgb(236, 236, 236) solid 3px;
        background-color: rgb(255, 255, 255);
    }
    .el-main {
        background-color: #f8f8f8;
        color: rgb(85, 85, 85);
        text-align: left;
        line-height: 50px;
        margin-left: 1px;
    }
    .el-aside {
        /* width: auto!important;
        width: 250px; */
        background-color: #f8f8f8;
        color: rgb(85, 85, 85);
        text-align: left;
        line-height: 50px;
    }
    .el-radio{
        display: block;
        line-height: 30px;
        white-space: normal;
        margin-left: 0px;
        margin-right: 0px;
    }
    .butt {
      width: 20%;
      background: #FFF;
      border: 1px solid #DCDFE6;
      color: #000000;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    }
</style>