<!--
 * @Author: your name
 * @Date: 2021-09-28 20:35:20
 * @LastEditTime: 2021-10-02 20:11:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VSWorkSpace\paper_creator\src\components\Main.vue
-->
<template>
  <div id="mainPage">
    <!-- 头部导航 -->
    <header class="header" :class="{ 'header-fixed' : headerFixed }">
        <span>欢迎来到刷题软件</span>
        <span style="font-size: 16px; float: right; margin-right: 20px">{{username}}</span>
        <el-dropdown style="float: right;">
          <i class="el-icon-user" style="margin-right: 20px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </header>
    <div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>

    <main>
          <!-- 左侧导航 -->
        <div class="main-left">
          <!-- <el-menu default-active="/activePublic" class="el-menu-vertical-demo" :router="true">
            <el-menu-item index="/activePublic" :class="{'isActive': active}">刷题</el-menu-item>
            <el-menu-item index="/activeManage" :class="{'isActive': !active}">修改密码</el-menu-item>
          </el-menu> -->
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            :default-openeds="['1']"
            :router="true">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>刷题</span>
              </template>
              <el-menu-item-group>
                <template slot="title">阶段</template>
                <el-menu-item index="/question/1">小学</el-menu-item>
                <el-menu-item index="/question/2">初中</el-menu-item>
                <el-menu-item index="/question/3">高中</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>设置</span>
              </template>
              <el-menu-item-group>
                <template slot="title">用户</template>
                <el-menu-item index="/modify/modifyPassword">修改密码</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>

          <!-- 右侧主内容区 -->
          <div  class="main-right" >
              <router-view></router-view>
          </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'main',
  data: function (){
    return {
      active:true,
      headerFixed : true,
      username: ''
    }
  },
  mounted: function() {
      //取出用户名
      this.username = window.sessionStorage.getItem('username');
    },
  methods: {
      logout() {
        //清除sessionStorage
        //sessionStorage.removeItem("username");  //指定键删除
        //sessionStorage.removeItem("password");
        sessionStorage.clear();     //删除所有数据
        //重定向到登陆页面
        this.$router.push({path: '/login'});
      }
  },

}
</script>

<style scoped>
body{margin: 0;}
#mainPage {
  min-width: 1200px;
  margin: 0 auto;
  font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
}
/* 头部导航 */
header{z-index: 1000;display: inline; line-height: 50px; min-width: 1200px;transition: all 0.5s ease;  border-top: solid 4px #3091F2;  background-color: #fff;  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);  }
header.header-fixed{position: fixed;top: 0;left: 0;right: 0;}
header .el-menu-demo{padding-left: 300px!important;}
/* 主内容区 */
main{display: -webkit-box;display: -ms-flexbox;display: flex;  min-height: 600px;  border: solid 40px #E9ECF1;  background-color: #FCFCFC;  }
main .main-left{text-align: center;-webkit-box-flex: 0;-ms-flex: 0 0 200px;flex: 0 0 200px;}
main .main-right{-webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #fff; padding: 40px 30px; }
main .el-menu{background-color: transparent!important;}
/*  */
.router-link{display:inline-block;width:100%;height:100%;text-align:center;color:#475669;text-decoration: none; }
.is-active .router-link{color:#20a0ff; }
/* 单选框 */
  .el-form-item .el-radio+.el-radio {
    margin-left: 30px!important;
  }
  /* 路由切换动效 */
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateY(30px);
  }
/* 导航栏菜单选中效果 */
  .isActive{color: #20a0ff!important;}
   #app main .aside .is-active{color: #475669;}
  /* 卡片 */
  .el-card{overflow: visible!important;}
</style>