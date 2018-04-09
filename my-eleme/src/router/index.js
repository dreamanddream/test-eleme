import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import goods from '@/components/goods/goods'
import seller from '@/components/seller/seller'
import ratings from '@/components/ratings/ratings'
// 使用vue.use方法，
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: goods
    }, {
      path: '/goods',
      name: 'goods',
      component: goods
    }, {
      path: '/seller',
      name: 'seller',
      component: seller
    }, {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    }
  ]
})
