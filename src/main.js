import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { Row, Col, Autocomplete } from 'element-ui'
Vue.use(Row)
Vue.use(Col)
Vue.use(Autocomplete)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
