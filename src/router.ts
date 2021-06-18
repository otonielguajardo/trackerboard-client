import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Trackboard from './views/Trackboard.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Trackboard',
        component: Trackboard,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
