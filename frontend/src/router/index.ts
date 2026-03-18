import { createRouter, createWebHistory} from "vue-router";


import RegisterPage from '../views/RegisterPage.vue';
import LoginPage from '../views/LoginPage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import Dashboard from "../pages/Dashboard.vue";
import ChatPage from "../views/ChatPage.vue";

const routes = [
     {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfilePage
    },
    {
        path: '/chat',
        name: 'Chat',
        component: ChatPage
    },


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router