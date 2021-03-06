// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引用vue-resource
import VueResource from 'vue-resource'
import './common/stylus/index.styl'
// 使用vue-resource
Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 这是简写{} {App:App}
  components: { App },
  template: '<App/>'
})
