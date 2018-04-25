import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'
import { setTimeout } from 'timers'
import AmCharts from 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'

es6promisse.polyfill();
var ipServerRecipe = process.env.RECIPE_API;
var ipServerOP = process.env.OP_API;
var ipServerThing = process.env.THINGS_API;


export default {
    name: "Alarms",
    data() {
        return {
            json: JSON,
            config: {
                headers: { 'Cache-Control': 'no-cache' }
            },
            
            cabecalhoSetas: [false, false, false, false, false],
            carregando: false,            
            erro:'',
            produtos: '',
            produto:''
        }
    },
    components: {
        'b-dropdown': bDropdown,
        'b-dropdown-item': bDropdownItem,
        'b-modal': bModal,
        Stretch
    },
    methods: {
        
        

        desorganizar(produtos, product, num){

        },
        organizar(produtos, product, num){

        },

        atualizaGraf(){

            window.AmCharts.makeChart("chartdiv",
            {
                "path": "dist/amcharts/",    
                "type": "serial",
                "categoryField": "type",
                "chartCursor": {},
                "graphs": [
                {
                    "type": "column",
                    "title": "Pizza types",
                    "valueField": "sold",
                    "fillAlphas": 0.8
                }
                ],
                "dataProvider": [
                    { "type": "Margherita", "sold": 120 },
                    { "type": "Funghi", "sold": 82 },
                    { "type": "Capricciosa", "sold": 78 },
                    { "type": "Quattro Stagioni", "sold": 71 }
                ]
            }
            ); 
        }
    },  
    beforeMount(){
        this.atualizaGraf();
    },

    created() {  
     
    },

}