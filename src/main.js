import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
//Vue.prototype.$currencySign = '$';
Vue.prototype.$currencySign = '₹';

Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
