import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";

const router =createRouter({ //TODO FYP-10: Add authentication guard
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/calendar',
            component: () => import("../views/Calendar.vue")
        },
        {
            path: '/tasks',
            component: () => import("../views/Tasks.vue")
        }
    ]
})

export default router