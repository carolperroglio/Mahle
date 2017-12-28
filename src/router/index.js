import Vue from 'vue'
import Router from 'vue-router'
import ThingCreate from '@/components/things/ThingCreate'
import GenerateProducts from '@/components/Products/GenerateProducts'
import Phases from '@/components/Phases/Phases'
import ToolCreate from '@/components/Tools/ToolCreate'
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
        {
            path: '/phases',
            name: 'Phases',
            component: Phases
        },
        {
            path: '/toolCreate',
            name: 'ToolCreate',
            component: ToolCreate
        },
    ]
})