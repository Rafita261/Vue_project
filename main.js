import AddTeacher from './components/AddTeacher.js';
import ListAndUpdate from './components/ListAndUpdate.js';
import Home from './components/Home.js';
import Chart from './components/Chart.js';

const routes = [
    { path: '/', component: Home },
    { path: '/chart', component: Chart },
    { path: '/create', component: AddTeacher },
    { path: '/list-update', component: ListAndUpdate }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

const app = Vue.createApp({});
app.use(router);
app.mount('#app');