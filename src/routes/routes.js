import { createRouter, createWebHashHistory} from "vue-router";
import Home from '../pages/Home.vue'
import Details from '../pages/Details.vue'

const routes = [
    {
        path: '/',
        component: Home,
        children:[
            {
                path: '/details/:id',
                component: Details
            }
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router