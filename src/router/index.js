import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import DjangoLoginPage from "../pages/DjangoLoginPage.vue";

const router = createRouter({ //TODO FYP-10: Add authentication guard
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
        },
        {
            path: '/django-login', name: 'Django Login',
            component: DjangoLoginPage,
            meta: {redirect: 'http://127.0.0.1:8000/login/'}
        },

    ]
})

export default router