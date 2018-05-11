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
            jSONReport: {},
            graphs: [],
            dataProvider: []

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
        /*
            TICKS CONVERTER
        */
        ticksToDate(dateTicks) {
            var epochTicks = 621355968000000000,
                ticksPerMillisecond = 10000,
                jsTicks = 0,
                jsDate;

            jsTicks = (dateTicks - epochTicks) / ticksPerMillisecond;

            jsDate = new Date(jsTicks);
            var timezone = jsDate.getTimezoneOffset() / 60;
            var hour = jsDate.setHours(jsDate.getHours() + timezone);
            hour = jsDate.getHours();
            var min = "";

            if (jsDate.getMinutes() < 10) {
                min = "0" + jsDate.getMinutes();
            } else {
                min = jsDate.getMinutes();
            }

            var dateFormatted = jsDate.getDate() + "/" +
                (jsDate.getMonth() + 1) + "/" +
                jsDate.getFullYear() + " " + hour + ":" + min;
            // var hours = jsDate.toString().slice(4, 21);
            return dateFormatted;
        },
        dateToTicks(dateTime) {
            var dateToTransform = dateTime.slice(3, 6) +
                dateTime.slice(0, 3) +
                dateTime.slice(6, 10) +
                dateTime.slice(10, 16);
            var date = new Date(dateToTransform);
            var ticks = ((date.getTime() * 10000) + 621355968000000000) - (date.getTimezoneOffset() * 600000000);
            return ticks;
        },
        getReport() {
            this.jSONReport = [{
                    "thingId": 1,
                    "groupTag": "Temperatura",
                    "data": [{
                            "category": "63541554554",
                            "muito alto": "32",
                            "alto": "52",
                            "baixo": "39",
                            "muito baixo": "72",
                            "offline": "38"
                        },
                        {
                            "category": "63541554554",
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
                            "category": "63541554554",
                            "muito alto": "32",
                            "alto": "52",
                            "baixo": "39",
                            "muito baixo": "72",
                            "offline": "38"
                        },
                        {
                            "category": "63541554554",
                            "muito alto": "32",
                            "alto": "52",
                            "baixo": "39",
                            "muito baixo": "72",
                            "offline": "38"
                        }
                    ]
                },
            ]

            this.makeGraph();
        },
        makeGraph() {
            var obj2 = {};

            this.jSONReport.forEach(obj => {
                for (var key in obj.data[0]) {
                    obj2["balloonColor"] = "#808080";
                    obj2["balloonText"] = "[[title]] em [[category]]:[[value]]";
                    obj2["color"] = "#000000";
                    obj2["lineThickness"] = 3;
                    obj2["type"] = "smoothedLine";
                    obj2["title"] = key;
                    obj2["valueField"] = key;
                    // obj2["bulletColor"] = R.color;
                    // obj2["fillColors"] = R.color;
                    // obj2["legendColor"] = R.color;
                    // obj2["lineColor"] = R.color;
                    this.graphs.push(obj2)
                }
                console.log('this.graphs');
                console.log(this.graphs);
            });

            this.makeDataProvider();
        },

        makeDataProvider() {
            var objProvider = {};

            this.jSONReport.forEach(obj => {
                for (var x = 0; x < obj.data.length; x++) {
                    for (var key in obj.data[x]) {
                        objProvider[key] = obj.data[x][key];
                    }
                }
                this.dataProvider.push(objProvider);
            });

            console.log("this.dataProvider")
            console.log(this.dataProvider)

            this.atualizaGraf();
        },

        atualizaGraf() {

            window.AmCharts.makeChart("charAlarm", {
                // "path": "dist/amcharts/",
                "type": "serial",
                "categoryField": "type",
                "chartCursor": {},
                "graphs": this.graphs,
                "dataProvider": this.dataProvider
            });
        }
    },
    beforeMount() {
        this.getReport();
    },
}