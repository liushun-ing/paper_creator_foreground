<!--
 * @Author: your name
 * @Date: 2021-09-29 10:08:58
 * @LastEditTime: 2021-10-02 10:38:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VSWorkSpace\paper_creator\src\components\question\Question.vue
-->
<template>
  <el-form ref="form" :model="questionForm" size="large">
    <el-form-item label="题目数量" style="text-align: left;">
        <el-input v-model="questionForm.num" style="width: 20%;" placeholder="请输入题目数量"></el-input>
        <el-button type="primary" :span="12" @click="getPaper">生成试卷</el-button>
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
        <el-span v-model="currentNumber">NO.{{currentNumber}} {{questions[currentNumber]}}</el-span>
        <el-form-item>
          <el-radio-group v-model="questionForm.selection" size="large">
            <el-radio label="1">A: {{answer[currentNumber]}}</el-radio>
            <el-radio label="2">B: {{answer1[currentNumber]}}</el-radio>
            <el-radio label="3">C: {{answer2[currentNumber]}}</el-radio>
            <el-radio label="4">D: {{answer3[currentNumber]}}</el-radio>
          </el-radio-group>          
        </el-form-item>  
        <el-button id="prev" type="primary" @click="prev">上一题</el-button>
        <el-button id="next" type="primary" @click="next">下一题</el-button>
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
      return {
        questionForm: {
          num: '',
          selection: '',
          resultString: '',
        },
        isDisabled: [true,true,true,true,true,true,true,
                    true,true,true,true,true,true,true,
                    true,true,true,true,true,true,true,
                    true,true,true,true,true,true,true,true,true],
        currentNumber : 1,
        questions: [],
        answer: [],
        answer1 : [],
        answer2 : [],
        answer3 : [],
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
        btn.disabled = this.isDisabled[i-1]; // 开始时都不能用
        btn.onclick = function () {
          _this.currentNumber = btn.id;
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
        // 设置按钮是否可用
        for (let i = 1; i <= 30; i++) {
          if ( i <= this.questionForm.num) {
            isDisabled[i - 1] = false;
          } else {
            isDisabled[i - 1] = true;
          }
          document.getElementById("b" + i).disabled = isDisabled[i - 1];
        }
        var url = "http://localhost:8081/getPaper/" + this.questionForm.num;
        this.axios.get(url
        ).then((response)=>{
          if(response.data.code === '20000') {
            this.questions = response.data.data.questions;
            this.answer = response.data.data.answer;
          } else {
            alert(response.data.message);
          }
        })
      },
      prev() {
        if (currentNumber == 1) {
          document.getElementById("prev").disabled = true;
        } else {
          document.getElementById("prev").disabled = false;
          this.currentNumber--;
        }
      },
      next() {
        if (currentNumber == this.questionForm.num) {
          document.getElementById("next").disabled = true;
        } else {
          document.getElementById("next").disabled = false;
          this.currentNumber++;
        }
      },
      submitPaper() {
        alert('submitPaper!');
      },
      reTest() {
        this.getPaper();
      },
      showCounts() {
        alert('showCounts!');
      },
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
      color: #8d9096;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    }
</style>