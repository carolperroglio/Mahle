import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
es6promisse.polyfill();
/*
    Example json recipe!
    {
        "recipeId": 3,
        "recipeName": "teste de receita",
        "recipeCode": "5050505050",
        "recipeProduct": {
            "phaseProductId": 13,
            "productId": 1,
            "value": "50",
            "measurementUnit": "kg",
            "product": {
            "productId": 1,
            "producName": "Nome Teste 2",
            "producCode": "TesteCode",
            "productGTIN": "+9999999",
            "childrenProductsIds": []
        }
        "phasesId": []
    }
*/
export default {    
    name: "Phases",
    data(){
        return {
            json:JSON, 
            config : {
                headers: {'Cache-Control':'no-cache'}
            },                                              
            url:'http://brsbap01:8003/api/',                                 
            ok:false,
            recipeProduct:{},
            recipeProductEnd:{},
            recipeProducts: [],
            carregando:false,
            recipe:{},            
            phase:{},             
            phases:[],
            mensagem:'',
            mensagemSuc:'',
            productName:'',
            name:'',            
            displayCadPhase:false,
            phaseProduct:{},            
            phaseProducts: [],                                 
        }
    },  
    computed:{       

    },      
    methods:{ 
        createRecipe(){             
            this.mensagemSuc='';
            this.carregando=true;                       
            axios.post(this.url+"recipes/",this.recipe).then((response)=>{
                console.log(response.data);
                this.recipe=response.data;
                this.ok=true;
                this.carregando=false;
            },(error)=>{
                console.log(error);
                this.carregando=false;
            });
        },  

        createRecipeProduct(){                        
            this.carregando=true;            
            this.recipeProductEnd.productId=this.recipeProduct.productId;            
            axios.post(this.url+"recipes/product/"+this.recipe.recipeId,this.recipeProductEnd).then((response)=>{
                console.log(response.data);                                
                this.carregando=false;                                
                alert('Cadastrado com sucesso');
                this.displayCadPhase=true;
            },(error)=>{
                console.log(error);
                this.carregando=false;
            });
        },



        createPhase(phase){
            this.mensagemSuc='';
            this.carregando=true;  
            console.log(phase);
            axios.post(this.url+"phases/",phase).then((response)=>{
                console.log(response.data);
                phase=response.data;                              
                this.relacionaFase(phase); 
                this.carregando=false;                 
            },(error)=>{
                console.log(error);
                this.carregando=false;
            });
        },
        putPhase(){

        },
        deletePhase(){

        },   
                
        relacionaFase(phase){  
            this.mensagemSuc='';                                  
            axios.post(this.url+"recipes/phases/"+this.recipe.recipeId,phase).then((response)=>{
                console.log(response.data);
                this.phase.products=[];
                this.phases.push(this.phase);
                this.phase = {};                
                this.mensagemSuc='Fase relacionada com sucesso';
                this.ok=true;                
            },(error)=>{
                console.log(error);
                this.carregando=false;
            });
        },    


        getResults(index){
            if(this.phases[index].productName.length<3){this.phases[index].products=[];return;}    
            this.phases[index].products=[];                                    
            axios.get(this.url+"/products?&fieldFilter=productName&fieldValue="+this.phases[index].productName,this.config).then((response)=>{                                           
                response.data.values.forEach((pro) => {
                    this.phases[index].products.push(pro);
                });
            },(error)=>{
                console.log(error);
            })
        },

        getProductFinal(name){            
            var array=[];                          
            if(name.length<3){return;}                
            axios.get(this.url+"/products?&fieldFilter=productName&fieldValue="+this.productName,this.config).then((response)=>{                                           
                response.data.values.forEach((pro) => {
                    array.push(pro);                    
                });
            },(error)=>{
                console.log(error);
            })            
            return array;
        }
    }

 
}    