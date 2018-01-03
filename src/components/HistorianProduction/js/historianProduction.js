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
            POs: [],
            op: '',
            mensagem:'',
            mensagemSuc:'',  
            orderField: '',
            order: '',
            fieldFilter: '',
            fieldValue: '' ,
            phaseIndex: '',
            pReceita: false,
            pFase: false,
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
            axios.post(this.url,ordem).then((response)=>{
                this.mensagemSuc = 'Apontamento efeituado com sucesso.';    
                this.carregando = false;        
            },(r)=>{                
                this.mensagem = 'Erro no server ' + r;                
                this.carregando = false;
            }) 
                      
        },

        getOrderProducts(){
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
                }   
        }
};