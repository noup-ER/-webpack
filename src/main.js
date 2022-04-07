import Vue from "vue";
import App from "@/App.vue";

console.log(process.env.NODE_ENV);

const vue = new Vue({
    render:h => h(App)
});

vue.$mount("#app");