import Vue from 'vue'
import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import { setTimeout } from 'timers'
import bButton from 'bootstrap-vue/es/components/button/button'
import vBToggle from 'bootstrap-vue/es/directives/toggle/toggle'
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import datePicker from 'vue-bootstrap-datetimepicker'
import VueTimepicker from 'vue2-timepicker'
import VueTiles from 'vue-tiles'
import AmCharts from 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import JsonExcel from 'vue-json-excel'
import PrintJs from 'print-js'
import 'vue-tiles/dist/vue-tiles.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
import { LinkTile, ContentSm, ContentMd, ContentLg } from 'vue-tiles'
import { array } from 'bootstrap-vue/es/utils'
import { Stretch } from 'vue-loading-spinner'


es6promisse.polyfill();

function paginacao(response, este) {
    este.pageAtual = este.startat / 20;
    este.total = response.data.total;
    let fim = Math.ceil(este.total / 20);
    var num = este.pageAtual + 5 > fim ? fim : este.pageAtual + 5
    if (este.pageAtual > 11) {
        for (var i = este.pageAtual - 5; i < num; i++)
            este.pages[i] = i;
    } else {
        for (var i = 0; i < num; i++)
            este.pages[i] = i;
    }
}

Array.prototype.groupByProperties = function(properties){
    var arr = this;
    var groups = [];
    for(var i = 0, len = arr.length; i<len; i+=1){
        var obj = arr[i];
        if(groups.length == 0){
            groups.push([obj]);
        }
        else{
            var equalGroup = false;
            for(var a = 0, glen = groups.length; a<glen;a+=1){
                var group = groups[a];
                var equal = true;
                var firstElement = group[0];
                    if(firstElement[properties] !== obj[properties]){
                        equal = false;
                    }
                if(equal){
                    equalGroup = group;
                }
            }
            if(equalGroup){
                equalGroup.push(obj);
            }
            else {
                groups.push([obj]);
            }
        }
    }
    return groups;
};
export default {
    name: "Historian",
    data() {
        return {
            url: process.env.THINGS_API,
            urlHist: process.env.HIST_BIGTABLE_API,
            carregando: false,
            date:'',
            datef: '',
            config: {
            format: 'MM DD YYYY',
            useCurrent: false,
            },
            config2: {
                format: 'MM DD YYYY',
                useCurrent: false,
            },
            timeIni: {
                HH: "00",
                mm: "00"
            },
            timeFim: {
                HH: "23",
                mm: "59"
            },
            quantityPage: 20,
            startat: 0,
            total: 0,
            history: [],
            pages: [],
            pageAtual: 0,
            newGroup: '',
            orderField: '',
            order: '',
            ticksIni: '',
            ticksFim: '',
            fieldFilter: '',
            fieldValue: '',
            thingId: '',
            thingName: '',
            filename: '',
            things: [],
            tags: [],
            bottom: 'bottom',
            idstat: '',
            idstatcollpse: '',
            selectedTheme: [],
            group: '',
            groups: [],
            graphProvider: [],
            providerAux: [],
            provider: [],
            data: [],
            headers: [],
            jsonfields: {}
    }
    },
    components: {
        'b-button': bButton,
        'link-tile': LinkTile,
        'content-sm': ContentSm,
        'content-md': ContentMd,
        'content-lg': ContentLg,
        'b-collapse': bCollapse,
        'b-modal': bModal,
        'date-picker': datePicker,
        'vue-timepicker': VueTimepicker,
        'downloadExcel': JsonExcel,
        Stretch
    },
    directives: {
        'b-toggle': vBToggle,
        'v-b-toggle': vBToggle,
        'b-modal': bModalDirective
    },
    methods: {
        addData () {
            this.dataset.push(this.dataentry)
            this.labels.push(this.datalabel)
            this.datalabel = ''
            this.dataentry = ''
          },
        getThings(){                                  
            axios.get(this.url+'/api/things').then((response)=>{                                           
                this.things = response.data;
            },(error)=>{
                console.log(error);
            }) 
            },

        getHistory(){
            this.carregando = true;
            setTimeout(() => {

                var Ini = this.date.toString()+' '+this.timeIni.HH+':'+this.timeIni.mm;  
                var ticksI = this.dateToTicks(Ini);
                var Fim = this.datef.toString()+' '+this.timeFim.HH+':'+this.timeFim.mm;
                var ticksF = this.dateToTicks(Fim);

                console.log('I: '+ticksI);
                console.log('F: '+ticksF);
                console.log(this.urlHist+'/api/HistorianBigTable?'+'thingId='+this.thingId+'&startDate='+ticksI+'&endDate='+ticksF);
                
                axios.get(this.urlHist+'/api/HistorianBigTable?'+'thingId='+this.thingId+'&startDate='+ticksI+'&endDate='+ticksF).then((response)=>{
                    this.data = response.data;
                    this.tags = response.data.tags;                    
                        this.tags.forEach((T) => {
                            if (!this.groups.includes(T.group)){
                            this.groups.push(T.group);
                            }
                        })
                    console.log(this.data);
                    
                },(error)=>{
                    console.log(error);
                }) 

               console.log(this.groups);
            }, 200);
                this.carregando = false;
                this.created();
                this.hideModal();
        },

        ticksToDate(dateTicks){
            var epochTicks = 621355968000000000,
            ticksPerMillisecond = 10000,  
            jsTicks = 0,          
            jsDate;
            jsTicks = (dateTicks - epochTicks) / ticksPerMillisecond;
            jsDate = new Date(jsTicks);
            var hours = jsDate.toString().slice(4,21);
            return hours;
        },

        dateToTicks(dateTime){
            var date = new Date(dateTime); 
            var ticks = ((date.getTime() * 10000) + 621355968000000000) - (date.getTimezoneOffset() * 600000000);
            return ticks;
        },

        refreshGraph(){
            this.created();
        },

        editGroup(grupo){
            this.group = grupo;   
            console.log(this.data);
            this.formatGraphData(this.data, this.group);
            var t = 0;
            var aux = [];
            this.filename = "RastreamentoThing_"+this.thingId+"_"+this.group+".xls";
        Object.keys(this.provider[0]).forEach((n) => {
            if(n=="category"){
                aux.push("Data");
                this.jsonfields["Data"]="category";
            }else{
                aux.push(n);
                this.jsonfields[n]=n;
            }
            console.log(aux[t]);
            t++;
        });
        this.headers = aux
        console.log(this.headers);
        console.log(this.jsonfields);
        },
        formatGraphData(obj, group){
            obj.tags.forEach((R) => { 
                if(R.group == group){
                    this.thingName = R.group;
                    this.thingId = obj.thingId;
                    var dataObj2 = new Array();
                    var obj2 = new Object();

                    obj2["balloonColor"] = "#808080";
                    obj2["balloonText"] = "[[title]] em [[category]]:[[value]]";
                    obj2["bullet"] = "round";
                    obj2["bulletSize"] = 10;
                    obj2["color"] = "#000000";
                    obj2["lineThickness"] = 3;
                    obj2["type"] = "smoothedLine";
                    obj2["title"] = R.name;
                    obj2["valueField"] = R.name; 
                    
                    var i = 0;

                    console.log("R");
                    console.log(R);
                    
                    R.timestamp.map( e => {
                        
                        var dataObj = new Array();

                        var category = "category";
                        var tagname = R.name;

                        var obj = new Object();
                        
                        obj[category] = this.ticksToDate(e);
                        obj[tagname] = R.value[i];

                        dataObj = Object.assign(obj);
                        console.log(dataObj);
                        this.providerAux.push(dataObj);

                        i++;
                    })

                    dataObj2 = Object.assign(obj2);
                    console.log(dataObj2);
                    this.graphProvider.push(dataObj2);

                    console.log("this.graphProvider");
                    console.log(this.graphProvider);   

                    console.log("this.providerAux");
                    console.log(this.providerAux);    
                    }
                }); 
                console.log("this.providerAux.groupBy('category')");
                console.log(this.providerAux.groupByProperties("category"));

                var groupArray = this.providerAux.groupByProperties("category");

                
                var newproviderAux = new Array();
                var dataObj3 = new Object();

                groupArray.forEach((Group) => {
                    var category = "category";
                    var obj3 = new Object();
                    obj3[category] = Group[0].category;
                    Group.forEach((Tag) => {
                        var keys = Object.keys(Tag);
                        var val = Object.values(Tag);
                        obj3[keys[1]] = val[1];
                        dataObj3 = Object.assign(obj3);
                    });
                    
                    newproviderAux.push(dataObj3);
                    console.log(newproviderAux);
                    this.provider = newproviderAux;
                });
                   
        },

        showModal() {
            setTimeout(() => {
                this.$refs.myModalEdit.show()
            }, 200);
        },

        hideModal() {
            this.$refs.myModalEdit.hide();
        },

        created() {
            window.AmCharts.makeChart("chartdiv",
            {
                "type": "serial",
                "categoryField": "category",
                "autoMarginOffset": 40,
                "marginRight": 60,
                "marginTop": 60,
                "startDuration": 1,
                "borderColor": "#C67373",
                "fontSize": 13,
                "theme": "light",
                "categoryAxis": {
                    "gridPosition": "start"
                },
                "trendLines": [],
                "graphs": this.graphProvider,
                "guides": [],
                "legend": {
                    "enabled": true
                },
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "title": ""
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "titles": [],
                "dataProvider": this.provider
            }
            );
          },
          
        },
    beforeMount: function() {
        this.showModal();
        this.getThings();
    },

}