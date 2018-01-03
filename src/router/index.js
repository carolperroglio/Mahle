import Vue from 'vue'
import Router from 'vue-router'
import ThingCreate from '@/components/things/ThingCreate'
import GenerateProducts from '@/components/Products/GenerateProducts'
import Phases from '@/components/Phases/Phases'
import ProductionOrder from '@/components/ProductionOrder/ProductionOrder'
import ToolCreate from '@/components/Tools/ToolCreate'
import HistorianProduction from '@/components/HistorianProduction/HistorianProduction'
import historianProduction from '../components/HistorianProduction/js/historianProduction';
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
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

            path: '/prodOrder',
            name: 'ProductionOrder',
            component: ProductionOrder
        },
        {
            path: '/toolCreate',
            name: 'ToolCreate',
            component: ToolCreate

        },
        {
            path: '/historianProduction',
            name: 'HistorianProduction',
            component: HistorianProduction

        },
    ]
})