import Vue from 'vue'
import Router from 'vue-router'
import Manage from '@/components/page/Manage'
import test from '@/components/page/test'

Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/',
      name: 'Manage',
      component: Manage
    }
  ]
})
