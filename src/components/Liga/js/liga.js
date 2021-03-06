import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'
import { setTimeout } from 'timers';

es6promisse.polyfill();
var ipServerRecipe = process.env.RECIPE_API;
var ipServerOP = process.env.OP_API;
var ipServerThing = process.env.THINGS_API;

export default {
    name: "Liga",
    data() {
        return {
            json: JSON,
            config: {
                headers: { 'Cache-Control': 'no-cache' }
            },
            url: ipServerRecipe + '/api/',
            url2: ipServerThing + '/api/',
            urlProducts: ipServerRecipe + '/api/products?&fieldFilter=productName&fieldValue=',
            urlRecipeSearch: ipServerThing + '/api/tags?fieldFilter=tagName&fieldValue=',
            urlRecipes: ipServerRecipe + '/api/recipes/',
            urlGatewayRecipes: ipServerOP + '/gateway/recipes/',
            valMin: 50,
            valMax: 60,
            cabecalhoSetas: [false, false, false],
            carregando: false,
            recipeCadastrada: false,
            recipe: {},
            recipeTemp:{},
            phase: {},
            phases: [],            
            phaseProduct: {},
            productPhaseName: '',
            produtos: [],
            produto:{},
            cadEdit:'',
            carregando: false,
            mensagem: '',
            mensagemSuc: '',            
            editarActivate: false,
            expand: [],
            errors: [],
            pros: [],
            prosFim: [],
            productRecipeName:'',
            erro:'',
            input:'',
            recipeProduct: {},
            p:{},
            teste:'',
            productRecipeNameEdit:'',
            recipeProductEdit:{},
            prosFimEdit: []
        }
    },
    computed: {
        // uma função "getter" computada (computed getter)
        reversedMessage: function () {
            // `this` aponta para a instância Vue da variável `vm`
            return this.recipeProduct;
        }
    },
    filters: {
        prodTypeName: function(productTypeName) {
            // productTypeName = '';
            var type = {
                'scrap': "Rejeito",
                'finished': "Acabado",
                'semi_finished': "Semi Acabado"
            };
            return type[productTypeName];
        }
    },
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
        
        /************************/
        /*                      */
        /*                      */
        /*  Métodos dos Modals  */
        /*                      */
        /*                      */
        /************************/
        showModalErro(erro){
            this.erro = erro;
            this.$refs.modalErro.show();            
        },
        showModalEditRecipe(recipe) {
        this.recipeProductEdit=recipe.recipeProduct.product;
        this.productRecipeNameEdit=this.recipeProductEdit.productName;
        this.recipeTemp = JSON.parse(JSON.stringify(recipe));
        delete this.recipeTemp.phases;
        this.$refs.modalEditRecipe.show();
        },
        hideModalEditRecipe() {
        this.$refs.modalEditRecipe.hide()
        },
        hideModalEditProPhase() {
        this.$refs.modalEditProPhase.hide()
        },
        showModalAddProd() {
        this.errors = {};            
        this.$refs.modalcadProPhase.show();
        this.mensagemSuc = '';
        this.mensagem = '';
        },
        hideModalAddProd() {
        this.$refs.modalcadProPhase.hide()
        },
        showModalRemoveLiga() {
        this.$refs.modalRemoveLiga.show()
        },
        hideModalRemoveLiga() {
        this.$refs.modalRemoveLiga.hide()
        },
        showModalConfirmEditLiga() {        
            this.$refs.modalConfirmEditLiga.show()
        },
        hideModalConfirmEditLiga() {
        this.$refs.modalConfirmEditLiga.hide()
        },
        showModalRemoveProduto(p, index){
            this.errors = [];
            this.mensagemSuc = '';
            this.produto = JSON.parse(JSON.stringify(p));
            this.produto.index = index;            
            this.$refs.modalRemoveProdutos.show();
        },
        hideModalRemoveProduto(){
        this.$refs.modalRemoveProdutos.hide();
        },

        organizar(produtos, campo, pos){                         
            produtos.sort(function(a,b) {console.log(a[campo]);return (a[campo] > b[campo]) ? 1 : ((b[campo] > a[campo]) ? -1 : 0);});
            for(var i=0; i<this.cabecalhoSetas.length; i++)
                if(i==pos)    
                    this.cabecalhoSetas[i]=false;

        },
        desorganizar(produtos, campo, pos){                         
            produtos.sort(function(a,b) {return (a[campo] > b[campo]) ? -1 : ((b[campo] > a[campo]) ? 1 : 0);});
            for(var i=0; i<this.cabecalhoSetas.length; i++)
                if(i==pos)    
                    this.cabecalhoSetas[i]=true;
                else   
                    this.cabecalhoSetas[i]=false;             
        },
 
        /*****************/
        /*               */
        /*               */
        /*  CRUD Recipe  */
        /*               */
        /*               */
        /*****************/

        getGatewayRecipe: function() {
            var id = this.$route.params.id;
            if (id != 0) {
                this.carregando = true;                
                setTimeout(() => {
                    axios.get(this.urlRecipes + id).then(response => {
                        this.recipe = response.data; 
                        this.productRecipeName = this.recipe.recipeProduct.product.productName;                 
                        if(this.recipe.recipeTypeId == 2){      
                            this.produtos = this.recipe.phases[0].phaseProducts;
                            console.log(response.data);                                                                          
                            this.recipeCadastrada = true;
                        }else{                            
                            this.carregando = false;                        
                            this.codigosErro(error.response.status,"código "+this.recipe.recipeId +" não corresponde a uma receita de liga");
                            this.recipe = {};
                        }    
                        console.log(this.recipe);
                        this.carregando = false;
                        this.editarActivate = true;
                    }).catch(error => {
                        this.carregando = false;                        
                        this.codigosErro(error.response.status);
                    })
                }, 300);
            }
        },

        createRecipe(recipe, produto) {                       
            this.editarActivate = false; this.phase = {};  
            this.phase.phaseName = recipe.recipeName;
            this.phase.phaseCode = recipe.recipeCode;  
            delete produto.parentProductsIds; delete produto.productName;
            delete produto.productDescription; delete produto.productCode;
            delete produto.productGTIN; delete produto.childrenProductsIds;
            delete produto.enabled; delete produto.additionalInformation;
            this.p = recipe; recipe.recipeTypeId = 2;                                                                                                        
            axios.post(this.url + "recipes/", recipe).then((response) => {  
                this.recipe = response.data;
                this.createRecipeProduct(produto);                  
                //this.p = this.recipe;                                                                                                                       
            }, (error) => {                
                this.carregando = false;                        
                this.codigosErro(error.response.status);
            });                        
        },
        createRecipeProduct(produto){
            console.log(produto);
            produto.minvalue = "1"; produto.maxvalue = "1";
            produto.mesuaremntUnit = "Kg";           
            axios.post(this.url + "recipes/product/"+this.recipe.recipeId, produto).then((response) => {
                this.recipe.recipeProduct = response.data;
                this.createPhase(this.phase);
            }, (error) => {             
                this.deleteRecipe(this.recipe);                   
                this.carregando = false;                        
                this.codigosErro(error.response.status, "Erro ao criar produto final da liga!<br>Criação de Liga cancelada");
            });              
        },

        createPhase(phase) {
            this.carregando = true;            
            axios.post(this.url + "phases/", phase).then((response) => {                                             
                this.phase = response.data;                              
                this.relacionaFase(this.phase);                                
            }, (error) => {
                this.deleteRecipe(this.recipe);
                this.carregando = false;                        
                this.codigosErro(error.response.status, "Erro ao criar liga!<br>Criação de Liga cancelada");                            
            });
        }, 


        relacionaFase(phase) {                                                 
            axios.post(this.url + "recipes/phases/" + this.recipe.recipeId, phase).then((response) => {                                                                                
                this.ok = true;
                this.$router.push({ name: 'Liga', params: { id: this.recipe.recipeId }})
                this.$router.go();                
            }, (error) => {
                this.deleteRecipe(this.recipe);
                this.deletePhase(this.phase);
                this.carregando = false;                        
                this.codigosErro(error.response.status, "Erro ao criar liga!<br>Criação de Liga cancelada");                            
            });            
        },
        putRecipe(recipe) {
            this.carregando = true;             
            this.hideModalEditRecipe();                      
            axios.put(this.url + "recipes/" + recipe.recipeId, recipe).then((response) => {
                this.$router.push({ name: 'Liga', params: { id: this.recipe.recipeId }})
                this.$router.go(); 
            }, (error) => {
                this.carregando = false;                        
                this.codigosErro(error.response.status, 'Erro ao editar liga, apenas a matéria-prima foi alterada');
            });
        },
  

        deleteRecipe(recipe) {
            this.carregando = true;            
            axios.delete(this.url + "recipes/" + recipe.recipeId).then((response) => {       
                this.deletePhase(recipe.phases[0],recipe);         
                this.$router.push({ name: 'ListLiga' })
                this.$router.go();                                
                this.carregando = false;
                this.recipeCadastrada = false;
            }, (error) => {                
                this.carregando = false;                        
                this.codigosErro(error.response.status);
            });
            
        },  

        deleteRecipeProduct(recipe, produto) {
            this.carregando = true;    
            this.hideModalConfirmEditLiga();        
            axios.delete(this.url + "recipes/product/" + this.recipe.recipeId,{data : this.recipe.recipeProduct.product}).then((response) => {                                                                          
                this.editRecipeProduct(produto,recipe);                
            }, (error) => {                
                this.carregando = false;   
                if(error.response.status)                     
                    this.codigosErro(error.response.status, 'Erro ao deletar produto');
                else
                    this.codigosErro(0, 'Erro ao deletar produto');
            });            
        },   
        
        editRecipeProduct(produto,recipe){
            produto.minvalue = "1"; produto.maxvalue = "1";
            produto.mesuaremntUnit = "Kg";           
            axios.post(this.url + "recipes/product/"+this.recipe.recipeId, produto).then((response) => {
                this.putRecipe(recipe);                
            }, (error) => {                                          
                this.carregando = false;                        
                this.codigosErro(error.response.status, "Erro ao editar produto final da liga!<br>Ediçao de Liga cancelada");
            });
        },  
        /*****************/
        /*               */
        /*               */
        /*  CRUD Phase   */
        /*               */
        /*               */
        /*****************/
             
        deletePhase(phase, recipe) {
            this.carregando = true;
            this.mensagemSuc = '';
            axios.delete(this.url + "phases/" + phase.phaseId, { data: phase }).then((response) => {
                console.log(response.data);
                this.$router.push({ name: 'Liga', params: {id:0} })
                this.$router.go();
            }, (error) => {
                console.log(error);
                this.carregando = false;
                this.mensagemSuc = 'Erro ao deletar : ' + error;
            })            
        },


        /*****************/
        /*               */
        /*               */
        /*  CRUD Phase   */
        /*   Products    */
        /*               */
        /*****************/        
        createPhaseProduct(phaseProduct, phase) {
            this.mensagemSuc = '';
            this.carregando = true;
            this.hideModalAddProd();
            phaseProduct.measurementUnit='%';
            console.log(phaseProduct);
            setTimeout(() => {                
                console.log("fase");
                console.log(phase);
                axios.post(this.url + "phases/products/" + phase.phaseId, phaseProduct).then((response) => {                    
                    this.produtos.push(response.data);
                    this.phaseProduct = {};
                    this.productPhaseName = '';
                    this.mensagemSuc = 'Fase relacionada com sucesso';                    
                    this.ok = true;
                    this.carregando = false;                
                }, (error) => {
                    console.log(error);
                    this.phaseProduct = {};
                    this.productPhaseName = '';
                    this.carregando = false;
                });
            },300)
        }, 

        deletePhaseProduct(phaseProduct, phase) {
            this.carregando = true;
            this.$refs.modalRemoveProdutos.hide();
            axios.delete(this.url + "phases/products/" + phase.phaseId, { data: phaseProduct}).then((response) => {                
                this.$router.push({ name: 'Liga', params: {id:this.$route.params.id} })
                this.$router.go();                              
                console.log(response);
            }, (error) => {
                console.log(error);
                this.carregando = false;
            });                
        },

        codigosErro(status, text=''){
            if(status == 400)
                this.showModalErro("Erro de requisição "+text+" código 400");
            else if(status == 404)
                this.showModalErro("Serviço não encontrado "+text+" código 404");
            else if(status == 500)
                this.showModalErro("Erro no servidor código "+text+" 500"); 
            else    
                this.showModalErro("Erro desconhecido "+text+" código" + status);
        },

        
        /*****************/
        /*               */
        /*               */
        /*Busca Produtos */
        /*               */
        /*               */
        /*****************/
        getResults(url, name, pros) {                       
            pros = [];     
            if (name.length > 3){                  
                axios.get(url + name, this.config).then((response) => {                                        
                    response.data.values.forEach((pro) => {                        
                        pros.push(pro);
                    });
                }, (error) => {
                    console.log(error);
                })
            }
            return pros;            
        }
    },
    mounted() {
        // if()
        this.getGatewayRecipe();
    }
}