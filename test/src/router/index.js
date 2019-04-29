import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hi from '@/components/Hi'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'
import Hello1 from '@/components/Hello1'
import Hello2 from '@/components/Hello2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components: {
        default: HelloWorld,
        left: Hello1,
        right: Hello2
      }
    },
    {
      path: '/Hi',
      name: 'Hi',
      component: Hi,
      children: [
        {path: '/',name: 'Hello/Hi',component: Hi},
        {path: 'hi1',name: 'Hi1',component: Hi1},
        {path: 'hi2',name: 'Hi2',component: Hi2}
      ]
    },
    {
        path: '/ycx',
        name: 'HelloWorld',
        components: {
          default: HelloWorld,
          left: Hello2,
          right: Hello1
        }
    }
  ]
})
