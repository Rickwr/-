import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入vuex
import store from '@/store'

// 三级联动组件注册全局组件
import TypeNav from '@/components/TypeNav'
// 分页器
import Pagination from '@/components/Pagination'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

// 引入mockServer.js mock数据
import '@/mock/mockServer.js'

// 引入swiper样式
import 'swiper/css/swiper.min.css'

// 统一接收api文件夹里的全部请求函数
import * as API from '@/api'

import {
  MessageBox
} from 'element-ui';

// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
import lazy from '@/assets/images/1.gif'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading:lazy,
  attempt: 1
})

// 引入校验插件
import '@/plugins/validate'

Vue.config.productionTip = false

new Vue({
  router,
  // 注册store
  store,
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;

    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
}).$mount('#app')