import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import {createPinia} from "pinia";
import { MotionPlugin } from "@vueuse/motion";

const pinia = createPinia()

createApp(App).use(MotionPlugin).use(pinia).use(router).mount('#app')
