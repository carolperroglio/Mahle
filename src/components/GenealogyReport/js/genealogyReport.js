'use strict'
import axios from 'axios'
import es6promisse from 'es6-promise'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import Datetime from 'vue-datetime'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import datePicker from 'vue-bootstrap-datetimepicker'
import VueTimepicker from 'vue2-timepicker'
import { Stretch } from 'vue-loading-spinner'
import Vue from 'vue';
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import VeeValidate from 'vee-validate';
import { setTimeout } from 'timers';
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse';
import vBToggle from 'bootstrap-vue/es/directives/toggle/toggle';
import vBtn from 'bootstrap-vue/es/components/button/button';
import { bCardHeader } from 'bootstrap-vue/es/components/card/card-header';
import { bCard } from 'bootstrap-vue/es/components/card/card';
import { bCardFooter } from 'bootstrap-vue/es/components/card/card-footer';
import { bCardGroup } from 'bootstrap-vue/es/components/card/card-group';
import { bCardBody } from 'bootstrap-vue/es/components/card/card-body';
//import { Collapse } from 'bootstrap-vue/es/components';
import { Card } from 'bootstrap-vue/es/components';
import { Collapse } from 'bootstrap-vue/es/components';
import jsPDF from 'jspdf';
import logo from './logoMahle.jpeg';
import html2canvas from 'html2canvas';
import JsonExcel from 'vue-json-excel';
//import logo from ''

Vue.use(Card);
Vue.use(Collapse);
Vue.use(html2canvas);
es6promisse.polyfill();
  
function paginacao(response, este) {
    este.pageAtual = este.startat / 20;
    este.total = response.data.total;
    let fim = Math.ceil(este.total / 20);
    if (este.pageAtual > 11) {
        for (var i = this.pageAtual - 5; i < este.pageAtual + 5 > fim ? este.pageAtual + 5 : fim; i++)
            este.pages[i] = i;
    } else {
        for (var i = 0; i < fim; i++)
            este.pages[i] = i;
    }
}


export default {
    name: "GenealogyReport",
    data() {
        return {
            id: "",
            carregando: false,
            date: '',
            datef: '',
            config: {
                format: 'DD MM YYYY',
                useCurrent: false,
            },
            config2: {
                format: 'DD MM YYYY',
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
            configCache : {
                headers: { 'Cache-Control': 'no-cache' }
            },
            PROD_HIST_API: process.env.PROD_HIST_API,           
            REPORT_API: process.env.REPORT_API + '',
            RECIPE_API: process.env.RECIPE_API + '/api/recipes/v2?filters=recipeTypeId,1&filters=recipeCode,',
            URL_OP: process.env.OP_API+'/api/productionorders/v2?filters=productionOrderTypeId,1&filters=productionOrderNumber,',
            mensagem: '',
            mensagemSuc: '',
            orderField: '',
            fieldValue: '',
            fieldFilter: '',
            order: '',
            erro: '',
            genealogys: null,            
            inicio: '',
            fim:'',
            op:'',
            cod:'',
            prosFim: [],
            recipeCode:'',
            t:'',      
            //jsonfields: { Data: 'category', Alto: 'alto', Baixo: 'baixo', Muitoalto: 'muito alto', Muitobaixo: 'muito alto', Offline: 'offline' },     
            fileName: 'excel.xls',


            json_fields: {
                'Complete name': 'name',
                'City': 'city',
                'aniversario' : 'birthdate',
                'Bairro':'country',
                //'Telephone': 'phone.mobile',
                'Telephone 2' : 'phone'
            },
            json_data: [
                {
                    'name': 'Tony Peña',
                    'city': 'New York',
                    'country': 'United States',
                    'birthdate': '1978-03-15',
                    'phone': [
                        {'nome':'1-541-754-3010', 'numero':'(541) 754-3010'}
                    ]
                },
                {
                    'name': 'Thessaloniki',
                    'city': 'Athens',
                    'country': 'Greece',
                    'birthdate': '1987-11-23',
                    'phone': [
                        {'nome':'1-541-754-3010', 'numero':'(541) 754-3010'}
                    ]
                }
            ],                

            json_meta: [
                [
                    {
                        'key': 'charset',
                        'value': 'utf-8'
                    }
                ]
            ],
        
        }
    },
    computed: {},
    components: {        
        Stretch,
        'b-modal': bModal,
        'date-picker': datePicker,
        'vue-timepicker': VueTimepicker,
        'downloadExcel': JsonExcel,
        'b-btn': vBtn,
        'date': Datetime,
        'b-dropdown-item': bDropdownItem,
    },
    directives: {
        'b-modal': bModalDirective,
        VeeValidate,        
    },
    methods: {
        collapse(id) {
            this.$refs[id].collapse('show')
        },
        showModal() {            
            setTimeout(() => {
                this.$refs.myModalEdit.show()
            }, 200);
        },
        hideModal() {
            this.$refs.myModalRef.hide()
        },
        
        organizar(genealogy, campo, pos) {
            genealogy.sort(function(a, b) { console.log(a[campo]); return (a[campo] > b[campo]) ? 1 : ((b[campo] > a[campo]) ? -1 : 0); });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = false;

        },        
        desorganizar(genealogy, campo, pos) {
            genealogy.sort(function(a, b) { return (a[campo] > b[campo]) ? -1 : ((b[campo] > a[campo]) ? 1 : 0); });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = true;
                else
                    this.cabecalhoSetas[i] = false;
        },       

        verificaColapse(comp,id,mais, menos){                        
            if($(id).hasClass('show')){                   
                $(comp).removeClass(menos); 
                $(comp).addClass(mais);                                                
            }else{                
                $(comp).removeClass(mais); 
                $(comp).addClass(menos);
            }
        },

        getGenealogy(fieldFilter, op, cod, dateIni, dateFim){
            this.carregando =true;
            var dIni, dFim;            
            if(fieldFilter != 'op'){
                dIni = ((new Date(dateIni).getTime() * 10000) + 621355968000000000) - (new Date(dateIni).getTimezoneOffset() * 600000000);
                dFim = ((new Date(dateFim).getTime() * 10000) + 621355968000000000) - (new Date(dateFim).getTimezoneOffset() * 600000000);
            }
            axios.get(this.PROD_HIST_API+"/api/producthistorian?startdate="+dIni+"&endDate="+dFim+"&cod="+cod+"&op="+op, this.configCache).then((response) => {                
                this.genealogys = response.data;  
                console.log(response);                                 
                //this.genealogy.sort(function(a, b) { console.log(a["nRolo"]); return (a['nRolo'] > b["nRolo"]) ? 1 : ((b["nRolo"] > a["nRolo"]) ? -1 : 0); });
                this.carregando = false;
            }, (error) => {
                this.carregando = false; 
                this.erro = error               
                console.log("Erro");
                console.log(error);
            })
        },

        toPdfAutoTable(){
            var pdfsize = 'a0';
            var pdf = new jsPDF('p', 'pt', 'A4');    
            var tabelas = document.getElementsByTagName("table");  
            var img = new Image();
            img.src = logo;  
            pdf.addImage(img, 'JPEG', 0, 0,800,30);
            pdf.autoTable([],[]);
            var res; var r = 1;
            var ligaColumns = [
                {title: "Elemento", dataKey: "product"},
                {title: "Lote", dataKey: "batch"},
                {title: "Quantidade", dataKey: "quantity"},                
                {title: "Data", dataKey: "date"},
            ];
            var acoColumns = [                
                {title: "Quantidade", dataKey: "quantity"},
                {title: "Lote", dataKey: "batch"},
                {title: "Data", dataKey: "startDate"},
            ];
            var toolColumns = [
                {title: "Tipo", dataKey: "typeName"},
                {title: "Rastreamento", dataKey: "serialNumber"},
                {title: "Uso", dataKey: "vidaUtil"},
                {title: "Data", dataKey: "date"},
            ];
            this.genealogys.forEach(element => {  
                r=1;              
                pdf.autoTable([{title: "Ordem Tira : "+element.productionOrderNumber, dataKey: "opl"}],[], {
                    startY : pdf.autoTableEndPosY()+5,pageBreak: 'auto',                                                
                    styles: {overflow: 'linebreak',fontSize: 20,tableWidth: 280,columnWidth: 'auto',valign: 'middle'},
                    //drawHeaderRow: function(row, data) {row.height = 20;},
                    margin: {horizontal: 10, top: 10, bottom: 10}   
                }); 
                pdf.autoTable([{title: "Data de início : " +this.ticksToDate(element.startDate), dataKey: "opl"}],[], {
                    startY : pdf.autoTableEndPosY(),pageBreak: 'auto',                                               
                    styles: {overflow: 'linebreak',fontSize: 20,tableWidth: 280,columnWidth: 'auto',valign: 'middle'},
                    //drawHeaderRow: function(row, data) {row.height = 20;},
                    margin: {horizontal: 10, top: 10, bottom: 10}   
                }); 
                pdf.autoTable([{title: "Data de fim : " + this.ticksToDate(element.endDate), dataKey: "opl"}],[], {
                    startY : pdf.autoTableEndPosY(),pageBreak: 'auto',                                              
                    styles: {overflow: 'linebreak',fontSize: 20,tableWidth: 280,columnWidth: 'auto',valign: 'middle'},
                    //drawHeaderRow: function(row, data) {row.height = 20;},
                    margin: {horizontal: 10, top: 10, bottom: 10}   
                });
                pdf.autoTable([{title: "Código tira : " + element.recipeCode, dataKey: "opl"}],[], {
                    startY : pdf.autoTableEndPosY(),pageBreak: 'auto',                                               
                    styles: {overflow: 'linebreak',fontSize: 20,tableWidth: 280,columnWidth: 'auto',valign: 'middle'},
                    //drawHeaderRow: function(row, data) {row.height = 20;},
                    margin: {horizontal: 10, top: 10, bottom: 10}   
                });               

                element.outputRolls.forEach(output => {
                    pdf.autoTable([{title: "Rolo : ", dataKey: "opl"}, {title: r++, dataKey:''}],[], {
                        startY : pdf.autoTableEndPosY()+20,pageBreak: 'auto',
                        theme: 'grid',                                                
                        headerStyles: {textColor: 0},
                        styles: {overflow: 'linebreak',fontColor: 0,fontSize: 20,tableWidth: 280,columnWidth: 'auto',valign: 'middle'},
                        //drawHeaderRow: function(row, data) {row.height = 20;},
                        
                        margin: {horizontal: 10, top: 10, bottom: 10}   
                    });


                    //Cabecalho
                    pdf.autoTable([{title: "                                     Ligas utilizadas", dataKey: "opl"}],[], {
                        startY : pdf.autoTableEndPosY()+5,
                        pageBreak: 'auto',
                        theme: 'grid',
                        headerStyles: {fillColor: [100, 110, 250],textColor: 300},
                        //beforePageContent: header,                            
                        styles: {
                            overflow: 'linebreak',
                            fontSize: 15,
                            tableWidth: 280,
                            columnWidth: 'auto',
                            valign: 'middle',                                
                        },
                        //drawHeaderRow: function(row, data) {row.height = 20;},
                        margin: {horizontal: 10, top: 10, bottom: 10}   
                    });     
                    output.ligas.forEach(liga => {                        
                        pdf.autoTable([{title: "OPL : "+liga.orderNumber, dataKey: "opl"}],[], {
                            startY : pdf.autoTableEndPosY()+5,
                            pageBreak: 'auto',
                            theme: 'grid',
                            headerStyles: {fillColor: [104, 104, 104],textColor: 300},
                            //beforePageContent: header,                            
                            styles: {
                                overflow: 'linebreak',
                                fontSize: 12,
                                tableWidth: 280,
                                columnWidth: 'auto',
                                valign: 'middle',                                
                            },
                            //drawHeaderRow: function(row, data) {row.height = 20;},
                            margin: {horizontal: 10, top: 10, bottom: 10}   
                        });
                        var temp = [];
                        for(var f=0; f<liga.productsInput.length; f++){
                            temp.push(Object.assign({}, liga.productsInput[f]));
                            temp[f].date = this.ticksToDate(temp[f].date);                            
                        }    
                        pdf.autoTable(ligaColumns, temp, {
                            startY : pdf.autoTableEndPosY()+3,
                            pageBreak: 'auto',
                            theme: 'grid',
                            //beforePageContent: header,
                            headerStyles: {fillColor: [0, 0, 0],textColor: 300},
                            styles: {
                                overflow: 'linebreak',
                                fontSize: 10,
                                tableWidth: 280,
                                columnWidth: 'auto',
                                valign: 'middle',                                
                            },
                            //drawHeaderRow: function(row, data) {row.height = 10;},
                            margin: {horizontal: 10, top: 10, bottom: 10}                    
                        });
                    });                    
                    
                    pdf.autoTable([{title: "                                     Aço utilizado", dataKey: "opl"}],[], {
                        startY : pdf.autoTableEndPosY()+15,
                        pageBreak: 'auto',
                        theme: 'grid',
                        headerStyles: {fillColor: [100, 110, 250],textColor: 300},
                        //beforePageContent: header,                            
                        styles: {
                            overflow: 'linebreak',
                            fontSize: 15,
                            tableWidth: 280,
                            columnWidth: 'auto',
                            valign: 'middle',                                
                        },
                        //drawHeaderRow: function(row, data) {row.height = 20;},
                        margin: {horizontal: 10, top: 10, bottom: 10}   
                    });
                    var acos = [];
                    
                    for(var f=0; f<output.inputRolls.length; f++){                                                
                        acos.push(Object.assign({}, output.inputRolls[f]));                                                
                        acos[f].startDate = this.ticksToDate(acos[f].startDate);                            
                    }

                    pdf.autoTable(acoColumns,acos, {
                        startY : pdf.autoTableEndPosY() + 5,
                        pageBreak: 'auto',
                        theme: 'grid',
                        //beforePageContent: header,
                        headerStyles: {fillColor: [0, 0, 0],textColor: 300},
                        styles: {
                            overflow: 'linebreak',
                            fontSize: 10,
                            tableWidth: 280,
                            columnWidth: 'auto',
                            valign: 'middle',                            
                        },
                        //drawHeaderRow: function(row, data) {row.height = 10; },
                        margin: {horizontal: 10, top: 10, bottom: 10}                    
                    });
                    pdf.autoTable([{title: "                                     Ferramentas utilizadas", dataKey: "opl"}],[], {
                        startY : pdf.autoTableEndPosY()+15,
                        pageBreak: 'auto',
                        theme: 'grid',
                        headerStyles: {fillColor: [100, 110, 250],textColor: 300},
                        //beforePageContent: header,                            
                        styles: {
                            overflow: 'linebreak',
                            fontSize: 15,
                            tableWidth: 280,
                            columnWidth: 'auto',
                            valign: 'middle',                                
                        },
                        //drawHeaderRow: function(row, data) {row.height = 20;},
                        margin: {horizontal: 10, top: 10, bottom: 10}   
                    });
                    pdf.autoTable(toolColumns, output.tools, {
                        startY : pdf.autoTableEndPosY() + 5,
                        pageBreak: 'auto',
                        theme: 'grid',
                        //beforePageContent: header,
                        headerStyles: {fillColor: [0, 0, 0],textColor: 300},
                        styles: {
                            overflow: 'linebreak',
                            fontSize: 10,
                            tableWidth: 280,
                            columnWidth: 'auto',
                            valign: 'middle',
                            
                        },
                        //drawHeaderRow: function(row, data) {row.height = 10; },
                        margin: {horizontal: 10, top: 10, bottom: 10}                    
                    });                                    
                });                                                                                                
            });
            
            pdf.save("todos.pdf");


        },
        


        toExcel(csv, filename){
            console.log(csv);
            var csvFile;
            var downloadLink;
                 
            csvFile = new Blob([csv], {type: "text/csv"});
            downloadLink = document.createElement("a");  
            downloadLink.download = filename;
            downloadLink.href = window.URL.createObjectURL(csvFile);
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.click();

        },

        exportTableToCSV(filename){
            var csv = [];
            var i;
            this.genealogys.forEach(g => {
                i=1;
                csv.push("\n\nNumero da ordem : "+ g.productionOrderNumber +",Data inicio : "+this.ticksToDate(g.startDate)+",Data inicio : "+this.ticksToDate(g.endDate)+",Codigo da receita : "+g.recipeCode);                
                g.outputRolls.forEach(output => {                    
                    csv.push("\nRolo : " + (i++)+",Quantidade : " + output.quantity);
                    csv.push(",,Aco");
                    csv.push(",Quantidade,Lote,Data");                    
                    output.inputRolls.forEach(input => {
                        csv.push(","+input.quantity+","+input.batch+","+this.ticksToDate(input.startDate));
                    });
                });                
            });
            
            // var rows = document.querySelectorAll("table tr");            
            // for (var i = 0; i < rows.length; i++) {
            //     var row = [];
            //     var cols = rows[i].querySelectorAll("td, th");
                
            //     for (var j = 0; j < cols.length; j++) 
            //         row.push(cols[j].innerText);
                
            //     csv.push(row.join(",")); 
                       
            // }        
            // Download CSV file            
            this.toExcel(csv.join("\n"), filename);
        },



        ticksToDate(dateTicks) {
            var epochTicks = 621355968000000000,
                ticksPerMillisecond = 10000,
                jsTicks = 0,
                jsDate;
            jsTicks = (dateTicks - epochTicks) / ticksPerMillisecond;
            jsDate = new Date(jsTicks);
            console.log(dateTicks);
            var dateFormatted = jsDate.getDate() + "/" +
                (jsDate.getMonth() + 1) + "/" +
                jsDate.getFullYear() + " " + jsDate.getHours() + ":" + jsDate.getMinutes();
            // var hours = jsDate.toString().slice(4, 21);
            console.log(dateFormatted);
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
        
        getResults(url, name, pros) {
            pros = [];
            if (name.length >= 3) {
                axios.get(url + name, this.config).then((response) => {
                    if(response.data.values)
                        response.data.values.forEach((pro) => {
                            pros.push(pro);
                        });
                    else
                        response.data.forEach((pro) => {
                            pros.push(pro);
                        });
                }, (error) => {
                    console.log(error);
                })
            }
            return pros;
        },
    }, 
     
}