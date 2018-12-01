import Vue from 'vue'
import Router from 'vue-router'
import GuestBook from '../components/GuestBook'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GuestBook',
      component: GuestBook
    }
  ]
})
