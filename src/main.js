/*
 * @Author: your name
 * @Date: 2021-09-28 09:59:40
 * @LastEditTime: 2021-10-02 20:16:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VSWorkSpace\paper_creator\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Message } from 'element-ui';


Vue.config.productionTip = false
//显式的声明使用VueRouter
Vue.use(Router);
Vue.use(ElementUI);
Vue.use(VueAxios, axios);

//拦截器,路由拦截
router.beforeEach((to, from, next)=>{
	if(to.path === '/login' || to.path === '/add/register' ){
		next();
	}else{
		if(sessionStorage.getItem('username') != null){
			next();
		}else{
      Message.warning("请先登录或注册");
		  next('/login');
		}
	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
