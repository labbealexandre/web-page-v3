import Vue from 'vue';
import device from 'vue-device-detector';
import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(device);

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
