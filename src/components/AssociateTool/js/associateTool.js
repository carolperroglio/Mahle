import axios from 'axios'
import es6promisse from 'es6-promise'
es6promisse.polyfill();


export default {
    name: "AssociateTool",
    data() {
        return { 
            carregando: false,    
            Tools: [],
            Things: [],
            AssocTool: [],
            tool: '',
            toolName: '',
            toolId: '',
            thingId: '',
            mensagem:'',
            mensagemSuc:'',
            fieldFilter: '',
            fieldValue: '' ,
            thing: false,
            lista: false,
            url:'http://brsbap01:8004/',
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
            openSelectThings(){
                this.thing=true;               
                axios.get(this.url+'gateway/thinggroups/'+this.toolId).then((response)=>{   
                this.Things = response.data.things;
            },(error)=>{
                    console.log(error);
                })            

            },
            assocTool(){
                this.lista = true;
                axios.get(this.url+'api/tool/AssociateTool?thingId='+this.thingId+'&toolid='+this.toolId).then((response)=>{
                    this.mensagemSuc = 'Produto apontado com sucesso.'; 
                    this.AssocTool = response.data;
                    console.log(this.AssocTool);
                    console.log(this.AssocTool.name);
                    console.log(this.AssocTool.currentThing);
                    console.log(this.AssocTool.currentThing.thingName)
                },(r)=>{                
                    this.mensagem = 'Erro no server ' + r;                
                    this.carregando = false;
                })

            }
    }
};
