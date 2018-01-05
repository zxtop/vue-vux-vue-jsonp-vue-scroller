// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueJsonp from 'vue-jsonp'
import VueScroller from 'vue-scroller'
import  { ToastPlugin } from 'vux'

Vue.config.productionTip = false
Vue.use(VueJsonp)
Vue.use(VueScroller)
Vue.use(ToastPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
