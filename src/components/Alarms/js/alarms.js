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


Array.prototype.groupByProperties = function(properties) {
    var arr = this;
    var groups = [];
    for (var i = 0, len = arr.length; i < len; i += 1) {
        var obj = arr[i];
        if (groups.length == 0) {
            groups.push([obj]);
        } else {
            var equalGroup = false;
            for (var a = 0, glen = groups.length; a < glen; a += 1) {
                var group = groups[a];
                var equal = true;
                var firstElement = group[0];
                if (firstElement[properties] !== obj[properties]) {
                    equal = false;
                }
                if (equal) {
                    equalGroup = group;
                }
            }
            if (equalGroup) {
                equalGroup.push(obj);
            } else {
                groups.push([obj]);
            }
        }
    }
    return groups;
};

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
            erro: '',
            produtos: '',
            produto: '',
            jSONReport: {}

        }
    },
    components: {
        'b-dropdown': bDropdown,
        'b-dropdown-item': bDropdownItem,
        'b-modal': bModal,
        Stretch
    },
    methods: {
        showModal() {

        },
        desorganizar(produtos, product, num) {

        },
        organizar(produtos, product, num) {

        },
        getReport() {
            this.jSONReport = [{
                    "thingId": 1,
                    "groupTag": "Temperatura",
                    "data": [{
                            "date": "63541554554",
                            "muito alto": "32",
                            "alto": "52",
                            "baixo": "39",
                            "muito baixo": "72",
                            "offline": "38"
                        },
                        {
                            "date": "63541554554",
                            "muito alto": "32",
                            "alto": "52",
                            "baixo": "39",
                            "muito baixo": "72",
                            "offline": "38"
                        }
                    ]
                },
                {
                    "thingId": 1,
                    "groupTag": "Agitação",
                    "data": [{
                            "date": "63541554554",
                            "muito alto": "32",
                            "alto": "52",
                            "baixo": "39",
                            "muito baixo": "72",
                            "offline": "38"
                        },
                        {
                            "date": "63541554554",
                            "muito alto": "32",
                            "alto": "52",
                            "baixo": "39",
                            "muito baixo": "72",
                            "offline": "38"
                        }
                    ]
                },
            ]
        },
        makeGraph() {
            this.jSONReport.forEach(obj => {
                obj2["balloonColor"] = "#808080";
                obj2["balloonText"] = "[[title]] em [[category]]:[[value]]";
                obj2["color"] = "#000000";
                obj2["lineThickness"] = 3;
                obj2["type"] = "smoothedLine";
                obj2["title"] = R.name;
                obj2["valueField"] = R.name;
                obj2["bulletColor"] = R.color;
                obj2["fillColors"] = R.color;
                obj2["legendColor"] = R.color;
                obj2["lineColor"] = R.color;
            });

        },

        atualizaGraf() {

            window.AmCharts.makeChart("chartdiv", {
                "path": "dist/amcharts/",
                "type": "serial",
                "categoryField": "type",
                "chartCursor": {},
                "graphs": [{
                    "type": "column",
                    "title": "Pizza types",
                    "valueField": "sold",
                    "fillAlphas": 0.8
                }],
                "dataProvider": [
                    { "type": "Margherita", "sold": 120 },
                    { "type": "Funghi", "sold": 82 },
                    { "type": "Capricciosa", "sold": 78 },
                    { "type": "Quattro Stagioni", "sold": 71 }
                ]
            });
        }
    },
    beforeMount() {
        this.atualizaGraf();
    },

    created() {

    },

}