import Vue from "vue";
import Vuex from 'vuex'
import App from "./App.vue";
import store from "./store/index";
import "./scss/normalize.scss";

Vue.config.productionTip = false;
Vue.use(Vuex);

// Let's us use this.$store in our components
Vue.prototype.$store = store;

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
