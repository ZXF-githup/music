import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from '@/utils/axios.js'
import 'weui';
import weui from 'weui.js';

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$weui = weui;
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
