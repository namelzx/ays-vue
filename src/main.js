import Vue from 'vue'
import router from './router'
import Vant from 'vant'

import App from './App.vue'

import 'vant/lib/index.css';
import '@/assets/styles/reset.css'
import '@/assets/styles/border.css'
import '@/assets/styles/iconfont.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './stoer'


import {getCookie, setCookie, delCookie} from '@/utils/cookie'

Vue.prototype.$store=store;

Vue.config.productionTip = false
Vue.use(Vant)

Vue.use(ElementUI);

Vue.prototype.$cookieStore = {
  getCookie,
  setCookie,
  delCookie
}
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
