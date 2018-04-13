import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import (/* webpackChunkName: 'home' */ '@/pages/Home')

const Todos = () => import (/* webpackChunkName: 'todos' */ '@/pages/Todos')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/todo',
      name: 'Todos',
      component: Todos
    }
  ]
})
