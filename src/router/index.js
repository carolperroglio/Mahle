import Vue from 'vue'
import Router from 'vue-router'
import ThingCreate from '@/components/things/ThingCreate'
import GenerateProducts from '@/components/Products/GenerateProducts'
Vue.use(Router)

export default new Router({
    routes: [     
        {
            path: '/createThings',
            name: 'ThingCreate',
            component: ThingCreate
        },
        {
            path: '/generateProducts',
            name: 'GenerateProducts',
            component: GenerateProducts
        },
        
    ]
})