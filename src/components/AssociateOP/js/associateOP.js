import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { concat } from 'bootstrap-vue/es/utils/array'
import { Stretch } from 'vue-loading-spinner'

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
            selectedOP: '',
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
            assoc: false,
            disassoc: false,
            url: process.env.OP_API,
            }
    },
    computed: {},
    components: {
        'b-dropdown': bDropdown,
        'b-dropdown-item': bDropdownItem,
        'b-modal': bModal,
        Stretch
    },
    directives: {
        'b-modal': bModalDirective
    },
    methods: {

           getOPs(numOP){            
            var array=[];                          
            if(numOP.length<3){return;}                
            axios.get(this.url+'/api/productionorders?fieldFilter=productionOrderNumber&fieldValue='+numOP).then((response)=>{                                           
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
                    axios.get(this.url+'/api/productionorders').then((response)=>{                                           
                        response.data.values.forEach((op)=>{
                            if (op.currentStatus == "active"){
                                this.ProductionOrders.push(op);
                            }
                            })
                            this.ProductionOrders.map(op =>{
                                op.currentStatus ="Ativa";
                        })
                        console.log('ProductionOrders');
                        console.log(this.ProductionOrders);                        
                        this.listaOPs = true;
                        this.carregando = false;
                    },(error)=>{
                        console.log(error);
                        this.carregando = false;
                    })
                }, 2000);                
                          
            },
            openSelectGroup(op){
                this.group = true;  
                this.carregando = true;  
                this.OP = op;
                this.OPId = op.productionOrderId;
                this.numOP = op.productionOrderNumber;
                this.typeId = op.productionOrderTypeId;           
                axios.get(this.url+'/api/productionordertypes/'+this.typeId).then((response)=>{ 
                    console.log(response.data); 
                    this.Groups = response.data.thingGroups;
                    console.log(this.Groups);
                        },(error)=>{
                                console.log(error);
                        })
                        this.listaOPs = false;
                        this.lista = true;
                axios.get(this.url+'/api/productionorders/'+this.OPId).then((response)=>{
                    this.OP = response.data;
                    console.log(response.data);
                    this.carregando = false;                                        
                },(r)=>{                
                    this.mensagem = r;                
                    this.carregando = false;
                })           

            },
            openSelectThings(){
                this.thing=true;             
                axios.get(this.url+'/gateway/thinggroups/attachedthings/'+this.groupId).then((response)=>{   
                this.Things = response.data;
                console.log(this.Things);
            },(error)=>{
                    console.log(error);
                })  
            },
            getAssoc(){
                this.mensagemSuc = '';
                this.mensagem = '';     
                confirm("Confirma associação?");
                axios.put(this.url+'/api/productionorders/AssociateProductionOrder/associate?thingId='+this.thingId+'&productionOrderId='+this.OPId).then((response)=>{
                    console.log(this.url+'/api/productionorders/AssociateProductionOrder/associate?thingId='+this.thingId+'&productionOrderId='+this.OPId);
                    console.log(response.data);
                    this.Thing = response.data.currentThing;
                    this.lista2 = true;
                    this.mensagemSuc = 'Ordem associada com sucesso.';
                },(r)=>{                
                    this.mensagem = r.response.data;      
                    this.carregando = false;
                }) 
            },
            getDisAssoc(){
                this.mensagemSuc = '';
                this.mensagem = ''; 
                axios.put(this.url+'/api/productionorders/AssociateProductionOrder/disassociate?thingId='+this.thingId+'&productionOrderId='+this.OPId, this.OP).then((response)=>{
                    console.log(response.data);
                    this.mensagemSuc = 'Ordem desassociada com sucesso.';
                },(r)=>{                
                    this.mensagem = r.response.data;      
                    this.carregando = false;
                }) 
            },
            main(){
                location.reload();
            }
    },
    beforeMount: function(){
        this.getOPList();
    }

};
