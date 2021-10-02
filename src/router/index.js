/*
 * @Author: your name
 * @Date: 2021-09-28 09:59:40
 * @LastEditTime: 2021-09-29 10:35:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VSWorkSpace\paper_creator\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'
import Register from '@/components/add/Register'
import Main from "@/components/Main";
import ModifyPassword from '@/components/modify/ModifyPassword';
import Question from '@/components/question/Question';

Vue.use(Router)

export default new Router({
//hash:路径带#符号，如http://localhost/#/login 
    //history:路径不带#符号，如http://localhost/login
    //通过mode修改，默认是hash
    mode: 'history',
    routes: [
      {
        path: '/main',
        name: 'main',
        component: Main,
        props: true,
        // 必须要嵌套路由，才会在router-view中渲染
        children:[
          {
            path: '/modify/modifyPassword',
            name: 'modifyPassword',
            component: ModifyPassword            
          },{
            props: true,
            path: '/question/:type',
            name: 'question',
            component: Question
          }
        ]
      },{
        path: '/add/register',
        name: 'register',
        component: Register
      },{
        path: '/',
        redirect: '/login'
      },{
        path: '/login',
        name: 'login',
        component: Login,
      },{
        path: '*',
        component: NotFound
      }

    ]
})
