import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import bBadge from 'bootstrap-vue/es/components/badge/badge'
import { Stretch } from 'vue-loading-spinner'

es6promisse.polyfill();
const IP = 'http://34.239.125.82:';

export default {    
    name: "HistorianProduction", 
    data(){
        return {  
            config: {
                headers: {'Content-Type':'application/x-www-form-urlencoded'}
            },                      
            id:"",
            carregando: false,    
            ordens:[],
            ordem: {},
            productionOrder: {},
            ProductionOrders:[],
            productionOrdersRecipe: {},
            orderPhaseProducts: [],
            phaseProducts: [],
            orderHistorian: [],
            productionOrderId: '',
            consumo: false,
            rolo: 0,
            OPs: [],
            op: '',
            mensagem:'',
            mensagemSuc:'',
            fieldFilter: '',
            fieldValue: '' ,
            phaseIndex: '',
            btndisable: false,
            pReceita: false,
            sel: true,
            order: false,
            pFase: false,
            lista: false,
            url: IP + '8006/',
            urlOP: IP + '8006/gateway/productionorders'
        }
    },  
    computed:{  
       
    },  
    components: {
        'b-dropdown': bDropdown,
        'b-dropdown-item': bDropdownItem,
        'b-modal': bModal,
        'b-badge': bBadge,
        Stretch
    },
    directives: {
        'b-modal': bModalDirective
    }, 
    methods:{
            showModal () {
                this.mensagem='';   
                this.mensagemSuc= '';
            setTimeout(() => {
                if(this.ordem.type==="output"){
                    this.pReceita = true;
                    this.consumo = false;
                    this.pFase = false;
                    console.log(this.productionOrdersRecipe);
                    console.log(this.productionOrder);
                    this.ordem.productId = this.productionOrdersRecipe.recipeProduct.product.productId;  
                    this.ordem.productionOrderId = this.productionOrder.productionOrderId;
                    this.ordem.productName = this.productionOrdersRecipe.recipeProduct.product.productName;
                }else{
                    this.consumo = true;
                    this.pReceita = false;
                    this.pFase = true;
                    this.ordem.productionOrderId = this.productionOrder.productionOrderId;
                    this.orderPhaseProducts = this.productionOrdersRecipe.phases;
                }
            }, 100);
            
            setTimeout(() => {
                this.$refs.myModalRef.show();
            }, 150);
            
          },
            hideModal () {
            this.$refs.myModalRef.hide();
            this.pReceita = false;
            this.consumo = false;
          },

        cadastrarApont(ordem){    

            this.mensagem='';   
            this.mensagemSuc= '';
            ordem.batch = this.rolo;
            console.log(ordem);    
            console.log(this.url+'api/producthistorian');      
            confirm("Confirma apontamento?");     
            axios.post(this.url+'api/producthistorian',ordem).then((response)=>{
                this.mensagemSuc = 'Produto apontado com sucesso.'; 
                this.productionOrderId = this.ordem.productionOrderId;
                this.carregando = false;     
                this.pReceita = false;
                this.pFase = false;
                this.rolo = ordem.batch + 1;
                this.ordem={};   
                console.log(response);
                
            },(r)=>{                
                this.mensagem = r.response.data;                
                this.carregando = false;
            })
            this.pReceita = false;
            this.consumo = false;       
        },

        listar(){            
            this.lista = true;  
            axios.get(this.url+'api/OrderHistorian/'+this.productionOrder.productionOrderId).then((response)=>{   
                     
                console.log(response.data);
                this.orderHistorian = response.data;
                for (var i = 0; i < this.orderHistorian.productsInput.length; i++){
                    this.orderHistorian.productsInput[i].date = this.dataConvert(this.orderHistorian.productsInput[i].date);
                }
                for (var i = 0; i < this.orderHistorian.productsOutput.length; i++){
                    this.orderHistorian.productsOutput[i].date = this.dataConvert(this.orderHistorian.productsOutput[i].date);
                }  

                this.carregando = false;   
            },(r)=>{                
                this.mensagem = 'Erro no server ' + r;                
                this.carregando = false;
            })            
                  
        },

        listaOp(p){
            console.log(p);              
            this.productionOrdersRecipe = p.recipe;  
            this.order = true;
            this.carregando = true;  
            setTimeout(() => {
                this.listar();
            }, 1000);
        },

        getResults(){    
            console.log(this.urlOP);         
                axios.get(this.urlOP).then((response)=>{          
                    console.log(response.data);                                 
                    response.data.forEach((pro) => {
                        if (pro.currentStatus == "active"){
                        this.OPs.push(pro);      
                        }              
                    });
                    console.log(this.OPs);
                },(error)=>{
                    console.log(error);
                })
                },
        dataConvert(dataTicks){
            var epochTicks = 621355968000000000,
            ticksPerMillisecond = 10000,  
            jsTicks = 0,          
            jsDate;
               
            jsTicks = (dataTicks - epochTicks) / ticksPerMillisecond;
            jsDate = new Date(jsTicks);
            console.log(jsDate);
            return jsDate;
            }   
        },
        beforeMount: function(){
            this.getResults();
        }
};