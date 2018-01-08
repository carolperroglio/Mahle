import axios from 'axios'
import es6promisse from 'es6-promise'
es6promisse.polyfill();


export default {
    name: "AssociateTool",
    data() {
        return { 
            carregando: false,    
            Tools: [],
            Groups: [],
            Things: [],
            AssocTool: [],
            AssocThing: [],
            tool: '',
            toolName: '',
            toolId: '',
            thingId: '',
            typeId: '',
            groupId: '',
            mensagem:'',
            mensagemSuc:'',
            fieldFilter: '',
            fieldValue: '' ,
            group: false,
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
            openSelectGroup(){
                this.group=true;               
                axios.get(this.url+'api/tooltype/'+this.typeId).then((response)=>{   
                this.Groups = response.data.thingGroups;
                console.log(this.Groups);
            },(error)=>{
                    console.log(error);
                })            

            },
            openSelectThings(){
                this.thing=true;               
                axios.get(this.url+'gateway/thinggroups/'+this.groupId).then((response)=>{   
                this.Things = response.data.things;
                console.log(this.Things);
            },(error)=>{
                    console.log(error);
                })            

            },
            getAssoc(){
                axios.get(this.url+'api/tool/AssociateTool?thingId='+this.thingId+'&toolid='+this.toolId).then((response)=>{
                    this.mensagemSuc = 'Produto apontado com sucesso.'; 
                    this.AssocTool = response.data;
                    console.log(this.AssocTool);
                    switch(response.data.status){
                        case "available":
                        this.AssocTool.status = "Disponível";
                        break;
                        case "in_use":                    
                        this.AssocTool.status = "Em uso";
                        break;
                        case "in_maintenance":
                        this.AssocTool.status = "Em manutenção";
                        break;
                        case "not_available":
                        this.AssocTool.status = "Indisponível";
                        break;
                        case "inactive":
                        this.AssocTool.status = "Inativo";
                        break;
                        case "active":
                        this.AssocTool.status = "Disponível";
                        break;
                    }
                    this.AssocThing = response.data.currentThing;
                    console.log(this.AssocTool);
                },(r)=>{                
                    this.mensagem = 'Erro no server ' + r;                
                    this.carregando = false;
                })

            },
            assocTool(){
                this.lista = true;
            }
    }
};
