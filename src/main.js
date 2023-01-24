import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { createRouter, createWebHistory } from
        'vue-router';
import routes from './router/routes'

let router = createRouter({
    history: createWebHistory(),
    routes: routes
});
const app = createApp(App)
app.use(router);
app.mount('#app');
