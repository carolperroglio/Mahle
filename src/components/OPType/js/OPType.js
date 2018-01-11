import axios from 'axios'
import es6promisse from 'es6-promise'
es6promisse.polyfill();

export default {
    name: "OPType",
    data() {
        return { 
            carregando: false,    
            OPs: [],
            OP: [],
            Groups: [],
            Things: [],
            Thing: [],
            Types: [],
            numOP: '',
            OPId: '',
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
            url:'http://brsbap01:8005/api/',
            urlThing: 'http://brsbap01:8001/api/',
            urlTool: 'http://brsbap01:8004/api/'
         }
    },
    computed: {},
    methods: {

           getOPs(numOP){            
            var array=[];                          
            if(numOP.length<3){return;}                
            axios.get(this.url+'?fieldFilter=productionOrderNumber&fieldValue='+numOP).then((response)=>{                                           
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
                             
                axios.get(this.urlTool+'tooltype/'+this.typeId).then((response)=>{   
                    this.Groups = response.data.thingGroups;
                        },(error)=>{
                                console.log(error);
                        })
                this.lista = true;
                axios.get(this.url+'/'+this.OPId).then((response)=>{
                    this.OP = response.data;
                    console.log(response.data);
                    switch(response.data.currentStatus){
                        case "created":
                        this.OP.currentStatus = "Criada";
                        break;
                        case "active":                    
                        this.OP.currentStatuss = "Ativa";
                        break;
                        case "inactive":
                        this.OP.currentStatus = "Inativa";
                        break;
                        case "paused":
                        this.OP.currentStatus = "Pausada";
                        break;
                        case "ended":
                        this.OP.currentStatus = "Encerrada";
                        break;
                        case "waiting_approval":
                        this.OP.currentStatus = "Aguardando Aprovação";
                        break;
                        case "approved":
                        this.OP.currentStatus = "Aprovada";
                        break;
                        case "reproved":
                        this.OP.currentStatus = "Reprovada";
                        break;                    
                    }                                        
                },(r)=>{                
                    this.mensagem = r;                
                    this.carregando = false;
                })           

            },
            openSelectThings(){
                this.thing=true;             
                axios.get(this.urlThing+'thinggroups/'+this.groupId).then((response)=>{   
                this.Things = response.data.things;
                console.log(this.Things);
            },(error)=>{
                    console.log(error);
                })  
            },
            getAssoc(){
                this.mensagemSuc = '';
                this.mensagem = ''; 
                axios.put(this.url+'AssociateProductionOrder/associate?thingId='+this.thingId+'&productionOrderId='+this.OPId).then((response)=>{
                    this.Tool = response.data;
                    console.log(response.data);
                    switch(response.data.currentStatus){
                        case "created":
                        this.OP.currentStatus = "Criada";
                        break;
                        case "active":                    
                        this.OP.currentStatuss = "Ativa";
                        break;
                        case "inactive":
                        this.OP.currentStatus = "Inativa";
                        break;
                        case "paused":
                        this.OP.currentStatus = "Pausada";
                        break;
                        case "ended":
                        this.OP.currentStatus = "Encerrada";
                        break;
                        case "waiting_approval":
                        this.OP.currentStatus = "Aguardando Aprovação";
                        break;
                        case "approved":
                        this.OP.currentStatus = "Aprovada";
                        break;
                        case "reproved":
                        this.OP.currentStatus = "Reprovada";
                        break;  
                    }
                    this.Thing = response.data.currentThing;
                    this.lista2 = true;
                    this.mensagemSuc = 'Ferramenta associada com sucesso.';
                },(r)=>{                
                    this.mensagem = r.response.data;      
                    this.carregando = false;
                }) 
            },
            getTipos(){               
            axios.get(this.url+'productionordertypes/').then((response)=>{                                           
                this.Types = response.data;
                console.log(response.data);
            },(error)=>{
                console.log(error);
            })
            }
        },
    beforeMount() {
        this.getTipos();
    }
};
