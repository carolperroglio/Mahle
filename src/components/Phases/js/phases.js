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
            url:'http://192.168.11.80:8003/api/', 
            product:{},                                           
            recipeProduct:{},
            recipeProductDisplay:{}, 
            recipeProductName:'',           
            recipeCadastrada: false,            
            recipeProducts: [],
            phaseTags:[],
            phaseTag:{},
            carregando:false,
            recipe:{},            
            phase:{},             
            phases:[],
            phaseProduct:{},
            productPhaseName:'',        
            mensagem:'',
            mensagemSuc:'',
            productName:'',
            name:'',                                                           
        }
    },  
    computed:{       

    },     
        
    methods:{ 
        abreModal(nome){
            $(nome).modal('show');
        },

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
            recipeProduct.phaseProductType='finished';          
            axios.post(this.url+"recipes/product/"+this.recipe.recipeId,recipeProduct).then((response)=>{
                console.log(response.data);                                
                this.carregando=false;  
                this.recipeProductDisplay = response.data;                              
                alert('Cadastrado com sucesso');                
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
                phase.products = []
                phase.tags = [];
                phase.expand=false;
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
            axios.post(this.url+"gateway/tags/"+this.phases[index].phaseId,tag).then((response)=>{
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
        createPhaseProduct(productPhase, phase){
            this.mensagemSuc='';
            this.carregando=true;            
            axios.post(this.url+"phases/products/"+phase.phaseId,productPhase).then((response)=>{                            
                phase.products.push(productPhase.product);
                this.phaseProduct = {}; 
                this.productPhaseName               
                this.mensagemSuc='Fase relacionada com sucesso';
                this.ok=true;                
                this.carregando=false;
            },(error)=>{
                console.log(error);
                this.carregando=false;
            });
        },
        deletePhaseProduct(index, product){
            this.mensagemSuc='';
            this.carregando=true;            
            axios.delete(this.url+"phases/products/" + this.phases[index].phaseId,{data: phase}).then((response)=>{
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
        getResults(url,name){            
            var array=[];                          
            if(name.length<3){return;}                
            axios.get(url+name,this.config).then((response)=>{                                           
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