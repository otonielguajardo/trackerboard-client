import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Board from './views/Board.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Board',
        component: Board,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
