import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
es6promisse.polyfill();

export default {    
    name: "Phases",
    data(){
        return {
            json:JSON, 
            config : {
                headers: {'Cache-Control':'no-cache'}
            },                                              
            url:'http://192.168.11.160:8003/api/',                                             
            recipeProduct:{},
            recipeCadastrada: false,
            recipeProductEnd:{},
            recipeProducts: [],
            carregando:false,
            recipe:{},            
            phase:{},             
            phases:[],
            tag:{},
            tags:[],
            mensagem:'',
            mensagemSuc:'',
            productName:'',
            name:'',            
            displayCadPhase:false,
            phaseProduct:{},            
            phaseProducts: [],
            expand:false,
            displayCadProPhase:false,
            displayCadTagPhase: false,
            msgVis: true,                                          
        }
    },  
    computed:{       

    },      
    methods:{ 

        /*****************/
        /*               */
        /*               */
        /*  CRUD Recipe  */
        /*               */
        /*               */
        /*****************/
        
        createRecipe(recipe){             
            this.mensagemSuc='';
            this.carregando=true;                       
            axios.post(this.url+"recipes/",recipe).then((response)=>{
                console.log(response.data);                
                this.recipe=response.data;
                this.carregando=false;
                this.recipeCadastrada=true;
            },(error)=>{
                console.log(error);
                this.carregando=false;
            });
        },          
        putRecipe(recipe){
            this.mensagemSuc='';
            this.carregando=true;                       
            axios.put(this.url+"recipes/"+recipe.recipeId,recipe).then((response)=>{
                console.log(response.data);
                recipe=response.data;
                this.ok=true;
                this.carregando=false;
            },(error)=>{
                console.log(error);
                this.carregando=false;
            });
        },

        /*****************/
        /*               */        
        /*  CRUD Recipe  */
        /*   Product     */
        /*               */
        /*****************/

        createRecipeProduct(recipeProduct, recipeProductEnd){
            this.mensagemSuc='';                                    
            this.carregando=true;            
            recipeProductEnd.productId=recipeProduct.productId;            
            axios.post(this.url+"recipes/product/"+this.recipe.recipeId,recipeProductEnd).then((response)=>{
                console.log(response.data);                                
                this.carregando=false;                                
                alert('Cadastrado com sucesso');
                this.displayCadPhase=true;
            },(error)=>{
                console.log(error);
                this.carregando=false;
            });
        },


        /*****************/
        /*               */
        /*               */
        /*  CRUD Phase   */
        /*               */
        /*               */
        /*****************/

        createPhase(phase){
            this.mensagemSuc='';
            this.carregando=true;              
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
        putPhase(phase){
            this.mensagemSuc='';
            this.carregando=true;
            axios.delete(this.url+"phases/"+phase.phaseId,phase).then((response)=>{
                this.mensagem='';
                this.mensagemSuc= "Fase " + phase.phaseName + " atualizada com sucesso";                                           
                console.log(response.data);                
                this.phase={};
                this.carregando=false;  
            },(error)=>{
                console.log(error);
                this.carregando=false; 
                this.mensagemSuc='Erro ao deletar : '+ error; 
            })
        },
        deletePhase(phase, recipe){ 
            this.mensagemSuc='';            
            this.carregando=true;                         
            axios.delete(this.url+"recipes/phases/"+recipe.recipeId,{data: phase}).then((response)=>{                                           
                console.log(response.data);
                this.phases = this.phases.filter(item => item !== phase); 
                this.phase={};
                this.carregando=false;  
            },(error)=>{
                console.log(error);
                this.carregando=false; 
                this.mensagemSuc='Erro ao deletar : '+ error; 
            })
        },                   
        relacionaFase(phase){                                                                       
            axios.post(this.url+"recipes/phases/"+this.recipe.recipeId,phase).then((response)=>{
                console.log(response.data);
                phase.tags=[];                
                this.phases.push(phase);
                this.phase = {};                
                this.mensagemSuc='Fase relacionada com sucesso';
                this.ok=true;                
            },(error)=>{
                console.log(error);
                this.carregando=false;
            });
        },    
        
        createPhaseTag(index, tag){
            this.mensagemSuc='';
            this.carregando=true; 
            console.log(tag);           
            axios.post(this.url+"phases/parameters/"+this.phases[index].phaseId,tag).then((response)=>{
                console.log(response.data);   
                debugger;             
                this.phases[index].tags.push(response.data); 
                this.tag = {};              
                this.mensagemSuc='Fase relacionada com sucesso';
                this.ok=true;                
                this.carregando=false;
            },(error)=>{
                console.log(error);
                this.carregando=false;
            });
        },

        /*****************/
        /*               */
        /*               */
        /*  CRUD Phase   */
        /*   Products    */
        /*               */
        /*****************/

        createPhaseProduct(index, product){
            this.mensagemSuc='';
            this.carregando=true;            
            axios.post(this.url+"phases/products/"+this.phases[index].phaseId,product).then((response)=>{
                console.log(response.data);                
                this.phases[index].products.push(response.data);
                this.phase = {};                
                this.mensagemSuc='Fase relacionada com sucesso';
                this.ok=true;                
                this.carregando=false;
            },(error)=>{
                console.log(error);
                this.carregando=false;
            });
        },

        /*****************/
        /*               */
        /*               */
        /*Busca Produtos */
        /*               */
        /*               */
        /*****************/

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