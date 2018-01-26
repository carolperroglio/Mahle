import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
es6promisse.polyfill();

export default {
    name: "AssociateOP",
    data() {
        return { 
            carregando: false,    
            OPs: [],
            OP: [],
            Groups: [],
            Things: [],
            Thing: [],
            numOP: '',
            OPId: '',
            ProductionOrders: [],
            thingId: '',
            typeId: '',
            groupId: '',
            mensagem:'',
            mensagemSuc:'',
            fieldFilter: '',
            fieldValue: '' ,
            notSelected: true,
            group: false,
            thing: false,
            lista: false,
            lista2: false,
            listaOPs: false,
            carregando: false,
            url:'http://brsbap01:8005/',
            }
    },
    computed: {},
    components: {
        'b-dropdown': bDropdown,
        'b-dropdown-item': bDropdownItem,
        'b-modal': bModal
    },
    directives: {
        'b-modal': bModalDirective
    },
    methods: {

           getOPs(numOP){            
            var array=[];                          
            if(numOP.length<3){return;}                
            axios.get(this.url+'api/productionorders?fieldFilter=productionOrderNumber&fieldValue='+numOP).then((response)=>{                                           
                response.data.values.forEach((pro) => {
                    array.push(pro);                    
                });
            },(error)=>{
                console.log(error);
            })            
                return array;
            },
            getOPList(){  
                this.carregando = true;        
                setTimeout(() => {
                    axios.get(this.url+'api/productionorders').then((response)=>{                                           
                        this.ProductionOrders = response.data.values;
                        console.log(this.ProductionOrders);
                        this.listaOPs = true;
                        this.carregando = false;
                    },(error)=>{
                        console.log(error);
                        this.carregando = false;
                    })
                }, 200);                
                          
            },
            openSelectGroup(){
                this.group = true;  
                this.carregando = true;             
                axios.get(this.url+'gateway/thinggroups/').then((response)=>{ 
                    console.log(response.data); 
                    this.Groups = response.data;
                        },(error)=>{
                                console.log(error);
                        })
                this.listaOPs = false;
                this.lista = true;
                axios.get(this.url+'api/productionorders/'+this.OPId).then((response)=>{
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
                    this.carregando = false;                                        
                },(r)=>{                
                    this.mensagem = r;                
                    this.carregando = false;
                })           

            },
            openSelectThings(){
                this.thing=true;             
                axios.get(this.url+'gateway/thinggroups/attachedthings/'+this.groupId).then((response)=>{   
                this.Things = response.data;
                console.log(this.Things);
            },(error)=>{
                    console.log(error);
                })  
            },
            getAssoc(){
                this.mensagemSuc = '';
                this.mensagem = ''; 
                console.log(this.url+'api/productionorders/AssociateProductionOrder/associate?thingId='+this.thingId+'&productionOrderId='+this.OPId);
                    
                axios.put(this.url+'api/productionorders/AssociateProductionOrder/associate?thingId='+this.thingId+'&productionOrderId='+this.OPId).then((response)=>{
                    this.Tool = response.data;
                    console.log(this.url+'api/productionorders/AssociateProductionOrder/associate?thingId='+this.thingId+'&productionOrderId='+this.OPId);
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
            getDisAssoc(){
                this.mensagemSuc = '';
                this.mensagem = ''; 
                axios.put(this.url+'api/productionorders/AssociateProductionOrder/disassociate?thingId='+this.thingId+'&productionOrderId='+this.OPId).then((response)=>{
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
            }
    },
    beforeMount: function(){
        this.getOPList();
    }

};
