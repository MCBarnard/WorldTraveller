import * as Vue from "vue";
import App from "./App.vue";
import setup from "./store/setup";
import router from "./router/setup";
import axios from 'axios';
import "./scss/normalize.scss";

const app = Vue.createApp(App);

app.use(router);
app.use(setup);

// Let's us use this.$store in our components
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$store = setup;

app.mount('#app');
