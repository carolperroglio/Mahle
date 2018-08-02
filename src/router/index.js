'use strict'

import Vue from 'vue'
import Router from 'vue-router'
import ThingCreate from '@/components/things/ThingCreate'
import GenerateProducts from '@/components/Products/GenerateProducts'
import Alarms from '@/components/Alarms/Alarms'
import Resampling from '@/components/Resampling/Resampling'
import GenealogyReport from '@/components/GenealogyReport/GenealogyReport'
import Tira from '@/components/Tira/Tira'
import ListTira from '@/components/Tira/ListTira'
import Liga from '@/components/Liga/Liga'
import ListLiga from '@/components/Liga/ListLiga'
import ListLineParameters from '@/components/LineParameters/ListLineParameters'
import ProductionOrderTira from '@/components/ProductionOrder/ProductionOrderTira'
import ProductionOrderLiga from '@/components/ProductionOrder/ProductionOrderLiga'
import OPInAnalysis from '@/components/ProductionOrder/OPInAnalysis'
import OPInicio from '@/components/ProductionOrder/OPInicio'
import ToolCreate from '@/components/Tools/ToolCreate'
import HistorianProductionLiga from '@/components/HistorianProduction/HistorianProductionLiga'
import HistorianProductionTira from '@/components/HistorianProduction/HistorianProductionTira'
import StateManagement from '@/components/OPStateManagement/StateManagement'
import ToolTypeAssoc from '@/components/AssociateTool/ToolTypeAssoc'
import AssociateTool from '@/components/AssociateTool/AssociateTool'
// import AssociateTool2 from '@/components/AssociateTool/AssociateTool2'
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
import HistorianMain from '@/components/HistorianProduction/HistorianMain'
import ReportAlarm from '@/components/ReportAlarm/ReportAlarm'
import User from '@/components/User/User'
import UserGroup from '@/components/User/UserGroup'
import Login from '@/components/Login/Login'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/createThings',
            name: 'ThingCreate',
            component: ThingCreate
        },
        {
            path: '/generateproducts',
            name: 'GenerateProducts',
            component: GenerateProducts
        },
        {
            path: '/alarms',
            name: 'Alarms',
            component: Alarms
        },
        {
            path: '/resampling',
            name: 'Resampling',
            component: Resampling
        },
        {
            path: '/genealogyreport',
            name: 'GenealogyReport',
            component: GenealogyReport
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

            path: '/prodOrderTira',
            name: 'ProductionOrderTira',
            component: ProductionOrderTira
        },
        {
            path: '/prodOrderLiga',
            name: 'ProductionOrderLiga',
            component: ProductionOrderLiga
        },
        {
            path: '/opInAnalysis',
            name: 'OPInAnalysis',
            component: OPInAnalysis
        },

        {
            path: '/opInicio',
            name: 'OPInicio',
            component: OPInicio
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
            path: '/toolTypeAssoc',
            name: 'ToolTypeAssoc',
            component: ToolTypeAssoc
        },
        {
            path: '/toolAssoc/:id',
            name: 'AssociateTool',
            component: AssociateTool,
            props: true
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
            path: '/',
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
            path: '/historianMain',
            name: 'HistorianMain',
            component: HistorianMain
        },
        {
            path: '/alarmReport',
            name: 'AlarmReport',
            component: ReportAlarm
        },
        {
            path: '/user',
            name: 'User',
            component: User
        },
        {
            path: '/usergroup',
            name: 'UserGroup',
            component: UserGroup
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})