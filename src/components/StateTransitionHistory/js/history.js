import axios from 'axios'
import es6promisse from 'es6-promise'
import datePicker from 'vue-bootstrap-datetimepicker'
import VueTimepicker from 'vue2-timepicker'
import 'bootstrap/dist/css/bootstrap.css'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
es6promisse.polyfill();


export default {
    name: "StateTransitionHistory",
    data() {
        return { 
            date: new Date(),
            datef: new Date(),
            oi: new Date(),
            config: {
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
            carregando: false,  
            history: [],  
            Tools: [],
            toolName: '',
            toolId: '',
            tool: '',
            ticksIni: '',
            ticksFim: '',
            fieldFilter: '',
            fieldValue: '' ,
            group: false,
            thing: false,
            lista: false,
            url:'http://brsbap01:8004/',
         }
    },
    components: {
        datePicker,
        VueTimepicker        
    },
    computed: {},
    methods: {
           getTools(name){            
            var array=[];                          
            if(name.length<3){return;}                
            axios.get(this.url+'api/tool?fieldFilter=name&fieldValue='+name).then((response)=>{                                           
                response.data.values.forEach((pro) => {
                    array.push(pro);                    
                });
            },(error)=>{
                console.log(error);
            })            
                return array;
            },
            getHistory(){   
                var Ini = this.date.toString()+' '+this.timeIni.HH+':'+this.timeIni.mm;
                var dateIni = new Date(Ini);      
                var ticksI = ((dateIni.getTime()*1000) + 621355968000000000);
                var Fim = this.date.toString()+' '+this.timeFim.HH+':'+this.timeFim.mm;
                var dateFim = new Date(Fim);
                var ticksF = ((dateFim.getTime()*1000) + 621355968000000000);
                console.log('I: '+ticksI);
                console.log('F: '+ticksF);
                axios.get(this.url+'api/tool/StateTransitionHistory/'+this.toolId+'/&').then((response)=>{                                           
                    this.history = response.data;
                },(error)=>{
                    console.log(error);
                })
            },
    }
};

