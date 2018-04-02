'use strict'

import Vue from 'vue'
import Router from 'vue-router'
import ThingCreate from '@/components/things/ThingCreate'
import GenerateProducts from '@/components/Products/GenerateProducts'
import Tira from '@/components/Tira/Tira'
import ListTira from '@/components/Tira/ListTira'
import Liga from '@/components/Liga/Liga'
import ListLiga from '@/components/Liga/ListLiga'
import LineParameters from '@/components/LineParameters/LineParameters'
import ListLineParameters from '@/components/LineParameters/ListLineParameters'
import ProductionOrder from '@/components/ProductionOrder/ProductionOrder'
import ToolCreate from '@/components/Tools/ToolCreate'
import HistorianProductionLiga from '@/components/HistorianProduction/HistorianProductionLiga'
import HistorianProductionTira from '@/components/HistorianProduction/HistorianProductionTira'
import StateManagement from '@/components/OPStateManagement/StateManagement'
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
import GenealogyReport from '@/components/GenealogyReport/GenealogyReport'
import HistorianMain from '@/components/HistorianProduction/HistorianMain'
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
            path: '/tira/:id',
            name: 'Tira',
            component: Tira,
            props: true
        },
        {
            path: '/listtira',
            name: 'ListTira',
            component: ListTira
        },
        {
            path: '/lineparamters/:id',
            name: 'LineParamters',
            component: LineParameters,
            props: true
        },
        {
            path: '/listlineparameters',
            name: 'ListLineParameters',
            component: ListLineParameters
        },
        {
            path: '/liga/:id',
            name: 'Liga',
            component: Liga,
            props: true
        },
        {
            path: '/listliga',
            name: 'ListLiga',
            component: ListLiga
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
            path: '/historianProductionLiga/:id',
            name: 'HistorianProductionLiga',
            component: HistorianProductionLiga,
            props: true
        },
        {
            path: '/historianProductionTira/:id',
            name: 'HistorianProductionTira',
            component: HistorianProductionTira,
            props: true
        },
        {
            path: '/stateManagement',
            name: 'StateManagement',
            component: StateManagement
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
        {

            path: '/genealogyReport',
            name: 'GenealogyReport',
            component: GenealogyReport
        },
        {

            path: '/historianMain',
            name: 'HistorianMain',
            component: HistorianMain
        },
        // {
        //     path: '/alarms',
        //     name: 'Alarms',
        //     component: Alarms
        // }
    ]
})