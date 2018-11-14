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
import { StyleSheet } from 'sheetjs';
import XLSX from 'xlsx';
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
        'XLSX': XLSX,
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
                //this.genealogy.sort(function(a, b) { console.log(a["nRolo"]); return (a['nRolo'] > b["nRolo"]) ? 1 : ((b["nRolo"] > a["nRolo"]) ? -1 : 0); });
                this.carregando = false;
            }, (error) => {
                this.carregando = false; 
                this.erro = error               
                console.log("Erro");
                console.log(error);
            })
        },
        

        exportExcel () { // On Click Excel download button
            var wb = XLSX.utils.book_new();
            wb.Props = {
                Title: 'Genealogia de produção de tiras',
                Subject: '',
                Author: 'Spi Integradora',
                CreatedDate: new Date()
            };            
            this.genealogys.forEach(g => {                                
                //XLSX.utils.book_append_sheet(wb, animalWS, g.productionOrderNumber);
                wb.SheetNames.push(g.productionOrderNumber);  
                var data = [];
                var i = 1;
                g.outputRolls.forEach(saida => {   
                    data.push([]);
                    data.push([]);                                 
                    data.push(["ROLO : "+ (i++), "QUANTIDADE : "+saida.quantity, "DATA INICIO : "+this.ticksToDate(saida.startDate), "DATA FIM : "+ this.ticksToDate(saida.endDate)]);                    
                    data.push([]);                    
                    data.push(["", "AÇO UTILIZADO"]);
                    data.push(["QUANTIDADE","OF","DATA"]);                    
                    saida.inputRolls.forEach(input => {
                        data.push([input.quantity, input.batch, this.ticksToDate(input.startDate)]);    
                    });                    
                    data.push([]);                    
                    data.push(["", "MATÉRIA PRIMA"]);                    
                    
                    saida.ligas.forEach(liga => {                        
                        data.push(["NUMERO DA ORDEM : "+ liga.orderNumber,"DATA : "+this.ticksToDate(liga.startDate), "QUANTIDADE : "+ liga.quantity]);                    
                        data.push([]);
                        data.push(["<b>ELEMENTO</b>","LOTE","QUANTIDADE","DATA"]);  
                        liga.productsInput.forEach(produto => {
                            data.push([produto.product, produto.batch,produto.quantity , this.ticksToDate(produto.date)]);
                        });
                        data.push([]);
                    });
                    //saida.tools
                    data.push(["--------------------------------","--------------------------------","--------------------------------","--------------------------------"]);
                });
                
                wb.Sheets[g.productionOrderNumber] = XLSX.utils.aoa_to_sheet(
                    //["Inicio da ordem : "+g.startDate, "Fim da ordem : "+g.endDate, "Código da tira : "+g.recipeCode], 
                    data                   
                ); 
                wb.Sheets[g.productionOrderNumber]['!cols'] = [{wch:30},{wch:30},{wch:30},{wch:30},{wch:30},{wch:30},];
                console.log(wb.Sheets[g.productionOrderNumber]['!cols']);
                // XLSX.utils.
                console.log(wb.Sheets[g.productionOrderNumber]);                
                
            });  
            
            XLSX.writeFile(wb, 'book.xlsx');         
        },


        addZero(i){
            if(i<10)
                i='0'+i;
            return i;
        },

        ticksToDate(dateTicks) {
            var epochTicks = 621355968000000000,
                ticksPerMillisecond = 10000,
                jsTicks = 0,
                jsDate;
            jsTicks = (dateTicks - epochTicks) / ticksPerMillisecond;
            jsDate = new Date(jsTicks);            
            var dateFormatted = this.addZero(jsDate.getDate()) + "/" +
                (this.addZero(jsDate.getMonth() + 1)) + "/" +
                jsDate.getFullYear() + " " + this.addZero(jsDate.getHours()) + ":" + this.addZero(jsDate.getMinutes());
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
            if(this.fieldFilter=='cod')
                pdf.save("genealogia-tira-"+this.cod+".pdf");
            else if(this.fieldFilter=='date')
                pdf.save("genealogia-periodo-"+this.inicio+"-ate-"+this.fim+".pdf");
            else if(this.fieldFilter=='op')
                pdf.save("genealogia-ordem-"+this.op+".pdf");
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
    beforeMount(){
        this.showModal('myModalEdit');
    }
}