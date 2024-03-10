import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import DjangoLoginPage from "../pages/DjangoLoginPage.vue";

const router = createRouter({
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
            meta: {redirect: 'http://localhost:8000/login/'}
        },
        {
            path: '/login', name: 'Django Login',
            component: DjangoLoginPage,
            meta: {redirect: 'http://localhost:8000/login/'}
        },

    ]
})

export default router