import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)



export default new Router({
  // mode: 'history',
  base: '#/',
  routes: [
    {
      path: '/',
      name: '/index',
      component: () => import('@/views/index/index')
    },
  
    {
      path: '/order',
      name: '/order',
      component: () => import('@/views/order/index')
    },
   
    /**
     * 数据模块
     */

    {
      path: '/data',
      name: 'data',
      component: () => import('@/views/data/index')
    }

    
    
   
  ]
  
})
