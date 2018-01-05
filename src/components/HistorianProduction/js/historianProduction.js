import axios from 'axios'
import es6promisse from 'es6-promise'
es6promisse.polyfill();

export default {    
    name: "HistorianProduction", 
    data(){
        return {  
            config: {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            },                      
            id:"",
            carregando: false,    
            ordens:[],
            ordem: {},
            productionOrder: {},
            productionOrdersRecipe: {},
            orderPhaseProducts: [],
            phaseProducts: [],
            orderHistorian: [],
            productionOrderId: '',
            POs: [],
            op: '',
            mensagem:'',
            mensagemSuc:'',
            fieldFilter: '',
            fieldValue: '' ,
            phaseIndex: '',
            pReceita: false,
            pFase: false,
            lista: false,
            url:'http://brsbap01:8007/',

        }
    },  
    computed:{  
       
    },      
    methods:{
        cadastrarApont(ordem){    
            this.mensagem='';   
            this.mensagemSuc= '';
           
            console.log(ordem);               
            axios.post(this.url+'api/producthistorian',ordem).then((response)=>{
                this.mensagemSuc = 'Produto apontado com sucesso.'; 
                this.productionOrderId = this.ordem.productionOrderId;
                this.carregando = false;     
                this.pReceita = false;
                this.pFase = false;
                this.ordem={};   
                console.log(response);
                
            },(r)=>{                
                this.mensagem = 'Erro no server ' + r;                
                this.carregando = false;
            })
                      
        },

        listar(){            
            this.lista = true;  
            axios.get(this.url+'api/OrderHistorian/'+this.productionOrderId).then((response)=>{   
                this.carregando = false;        
                console.log(response.data);
                this.orderHistorian = response.data;
                for (var i = 0; i < this.orderHistorian.productsInput.length; i++){
                    this.orderHistorian.productsInput[i].date = this.dataConvert(this.orderHistorian.productsInput[i].date);
                }
                for (var i = 0; i < this.orderHistorian.productsOutput.length; i++){
                    this.orderHistorian.productsOutput[i].date = this.dataConvert(this.orderHistorian.productsOutput[i].date);
                }  
            },(r)=>{                
                this.mensagem = 'Erro no server ' + r;                
                this.carregando = false;
            })            
                  
        },

        getOrderProducts(){
            this.mensagem='';   
            this.mensagemSuc= '';
            $("#OPApont").modal('show'); 

            if(this.ordem.type==="output"){
                this.pReceita = true;
                this.ordem.productId = this.productionOrdersRecipe.recipeProduct.product.productId;  
                this.ordem.productionOrderId = this.productionOrder.productionOrderId;
                this.ordem.productName = this.productionOrdersRecipe.recipeProduct.product.productName;
            }else{
                this.pFase = true;
                this.ordem.productionOrderId = this.productionOrder.productionOrderId;
                this.orderPhaseProducts = this.productionOrdersRecipe.phases;
            }   
            
        },

        buscarOrdens(){
            axios.get(this.urlOp).then((response)=>{  
                console.log(response.data.values); 
                console.log(response.data.total);
                this.productionOrders = response.data;
                console.log(this.productionOrders);
                },(error)=>{                  
                    this.mensagem = 'Erro no server ' + error;            
                })  
        },

        listaOp(){
            console.log(this.POs);              
            this.productionOrdersRecipe = this.POs[0].recipe;            
            document.getElementById("order").style.display="block";
        },

        getResults(name){            
                var array=[];                          
                if(name.length<3){return;}                
                axios.get(this.url+'gateway/productionorders?fieldFilter=productionOrderNumber&fieldValue='+name).then((response)=>{                                           
                    response.data.forEach((pro) => {
                        array.push(pro);                    
                    });
                },(error)=>{
                    console.log(error);
                })            
                    return array;
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
        }
};