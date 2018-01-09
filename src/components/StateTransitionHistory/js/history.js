import axios from 'axios'
import es6promisse from 'es6-promise'
es6promisse.polyfill();


export default {
    name: "StateTransitionHistory",
    components: {
        "vue-datetime-picker": require("vue-datetime-picker")
      },
    data() {
        return { 
            carregando: false,  
            history: [],  
            dataIni: '',
            dataFim: '',
            toolName: '',
            toolId: '',
            mensagem:'',
            mensagemSuc:'',
            fieldFilter: '',
            fieldValue: '' ,
            group: false,
            thing: false,
            lista: false,
            url:'http://brsbap01:8004/'
         }
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
                axios.get(this.url+'api/tool/StateTransitionHistory?'+this.toolId+'&from='+this.dataIni+'&to='+this.dataFim).then((response)=>{                                           
                    this.history = response.data;
                    console.log(this.history);
                },(error)=>{
                    console.log(error);
                })
            }
    }
};
