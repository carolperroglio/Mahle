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
            Tool: [],
            Thing: [],
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
            lista2: false,
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
                this.group = true;               
                axios.get(this.url+'api/tooltype/'+this.typeId).then((response)=>{   
                    this.Groups = response.data.thingGroups;
                        },(error)=>{
                                console.log(error);
                        })
                this.lista = true;
                axios.get(this.url+'api/tool/'+this.toolId).then((response)=>{
                    this.Tool = response.data;
                    console.log(response.data);
                    switch(response.data.status){
                        case "available":
                        this.Tool.status = "Disponível";
                        break;
                        case "in_use":                    
                        this.Tool.status = "Em uso";
                        break;
                        case "in_maintenance":
                        this.Tool.status = "Em manutenção";
                        break;
                        case "not_available":
                        this.Tool.status = "Indisponível";
                        break;
                        case "inactive":
                        this.Tool.status = "Inativo";
                        break;
                        case "active":
                        this.Tool.status = "Disponível";
                        break;
                    }                                        
                },(r)=>{                
                    this.mensagem = r;                
                    this.carregando = false;
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
                this.mensagemSuc = '';
                this.mensagem = '';
                axios.put(this.url+'api/tool/AssociateTool/associate?thingId='+this.thingId+'&toolid='+this.toolId).then((response)=>{
                    this.Tool = response.data;
                    console.log(response.data);
                    switch(response.data.status){
                        case "available":
                        this.Tool.status = "Disponível";
                        break;
                        case "in_use":                    
                        this.Tool.status = "Em uso";
                        break;
                        case "in_maintenance":
                        this.Tool.status = "Em manutenção";
                        break;
                        case "not_available":
                        this.Tool.status = "Indisponível";
                        break;
                        case "inactive":
                        this.Tool.status = "Inativo";
                        break;
                        case "active":
                        this.Tool.status = "Disponível";
                        break;
                    }
                    this.Thing = response.data.currentThing;
                    this.lista2 = true;
                    this.mensagemSuc = 'Ferramenta associada com sucesso.';
                },(r)=>{                
                    this.mensagem = r;                
                    this.carregando = false;
                })

            }
    }
};
