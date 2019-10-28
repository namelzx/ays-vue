import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './modules/mutations'

import state from './state'
Vue.use(Vuex) //引用

//  创建存储仓库
export default new Vuex.Store({
  state:state,
  mutations
})


