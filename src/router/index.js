'use strict'

import Vue from 'vue'
import Router from 'vue-router'
import ThingCreate from '@/components/things/ThingCreate'
import GenerateProducts from '@/components/Products/GenerateProducts'
import Phases from '@/components/Phases/Phases'
import ProductionOrder from '@/components/ProductionOrder/ProductionOrder'
import ToolCreate from '@/components/Tools/ToolCreate'
import HistorianProduction from '@/components/HistorianProduction/HistorianProduction'
import StateManagement from '@/components/OPStateManagement/StateManagement'
import ListRecipes from '@/components/Phases/ListRecipes'
import AssociateTool from '@/components/AssociateTool/AssociateTool'
import AssociateTool2 from '@/components/AssociateTool/AssociateTool2'
import ToolType from '@/components/ToolType/ToolType'
import StatusManagement from '@/components/ToolsManagement/ToolsManagement'
import OPManagement from '@/components/OPManagement/OPManagement'
import AssociateOP from '@/components/AssociateOP/AssociateOP'
import OPType from '@/components/OPType/OPType'
import InUseTools from '@/components/InUseTools/InUseTools'
import HomePage from '@/components/HomePage/home'
import ToolsManagement from '@/components/ToolsManagement/ToolsManagement'
import StatusMES from '@/components/StatusMES/StatusMES'
import Historian from '@/components/Historian/Historian'
import HistorianAlarm from '@/components/HistorianAlarm/HistorianAlarm'
// import Alarms from '@/components/Alarms/Alarms'


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
            path: '/phases/:id',
            name: 'Phases',
            component: Phases,
            props: true
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
        {
            path: '/stateManagement',
            name: 'StateManagement',
            component: StateManagement
        },
        {
            path: '/listRecipes',
            name: 'ListRecipes',
            component: ListRecipes
        },
        {
            path: '/associateTool',
            name: 'AssociateTool',
            component: AssociateTool2
        },
        {
            path: '/toolType',
            name: 'ToolType',
            component: ToolType
        },
        {
            path: '/statusManagement',
            name: 'StatusManagement',
            component: StatusManagement
        },
        {
            path: '/OPManagement',
            name: 'OPManagement',
            component: OPManagement
        },
        {
            path: '/ToolsManagement',
            name: 'ToolsManagement',
            component: ToolsManagement
        },
        {
            path: '/associateOP',
            name: 'AssociateOP',
            component: AssociateOP
        },
        {
            path: '/opType',
            name: 'OPType',
            component: OPType
        },
        {
            path: '/inUseTools',
            name: 'InUseTools',
            component: InUseTools
        },
        {
            path: '/home',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/statusMES',
            name: 'StatusMES',
            component: StatusMES
        },
        {
            path: '/historian',
            name: 'Historian',
            component: Historian
        },
        {

            path: '/historianalarms',
            name: 'Historianalarms',
            component: HistorianAlarm
        },
        // {
        //     path: '/alarms',
        //     name: 'Alarms',
        //     component: Alarms
        // }
    ]
})