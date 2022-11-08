import Vue from "vue";
import Vuex from 'vuex'
import App from "./App.vue";
import setup from "./store/setup";
import router from "./router/setup";
import "./scss/normalize.scss";

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(router);

// Let's us use this.$store in our components
Vue.prototype.$store = setup;

new Vue({
  render: h => h(App),
  store: setup
}).$mount('#app');
