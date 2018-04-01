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
            carregando: false,
            recipeCadastrada: false,
            recipe: {},
            phase: {},
            phases: [],
            phaseProduct: {},
            productPhaseName: '',
            carregando: false,
            mensagem: '',
            mensagemSuc: '',            
            editarActivate: false,
            expand: [],
            errors: []
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

          showModalCadFase() {
            this.$refs.myModalRefCF.show()
          },
          hideModalCadFase() {
            this.$refs.myModalRefCF.hide()
          },
          showModalEditFase() {
            this.$refs.modalEditFase.show()
          },
          hideModalEditFase() {
            this.$refs.modalEditFase.hide()
          },
          showModalEditRecipe() {
            this.$refs.modalEditRecipe.show()
          },
          hideModalEditRecipe() {
            this.$refs.modalEditRecipe.hide()
          },
          showModalAddProd() {
            this.errors = {};
            this.phaseProduct={};
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
                console.log(this.urlGatewayRecipes+id);
                setTimeout(() => {
                    axios.get(this.urlGatewayRecipes + id).then(response => {
                        this.recipe = response.data;
                        this.phases = response.data.phases;
                        console.log(response.data);                                                
                        this.recipeCadastrada = true;
                        this.carregando = false;
                        this.editarActivate = true;
                    }).catch(error => {
                        console.log(error);
                        this.carregando = false;
                    })
                }, 300);
            }
        },
        createRecipe(recipe) {
            this.mensagemSuc = '';
            this.carregando = true;
            this.editarActivate = false;
            console.log(recipe);
            console.log(this.url + "recipes/");
            axios.post(this.url + "recipes/", recipe).then((response) => {
                console.log(response.data);
                this.recipe = response.data;
                this.carregando = false;
                this.recipeCadastrada = true;
            }, (error) => {
                console.log(error);
                this.carregando = false;
            });
        },
        putRecipe(recipe) {
            this.mensagemSuc = '';
            this.carregando = true;
            axios.put(this.url + "recipes/" + recipe.recipeId, recipe).then((response) => {
                console.log(response.data);
                recipe = response.data;
                this.ok = true;
                this.carregando = false;
            }, (error) => {
                console.log(error);
                this.carregando = false;
            });
        },
        deleteRecipe(recipe) {
            this.mensagemSuc = '';
            this.carregando = true;
            axios.delete(this.url + "recipes/" + recipe.recipeId).then((response) => {
                console.log(response.data);
                recipe = {};                
                this.carregando = false;
            }, (error) => {                
                this.carregando = false;
            });
        },


        /*****************/
        /*               */
        /*               */
        /*  CRUD Phase   */
        /*               */
        /*               */
        /*****************/
        createPhase(phase) {
            this.mensagemSuc = '';
            this.carregando = true;
            axios.post(this.url + "phases/", phase).then((response) => {
                phase = response.data;
                this.relacionaFase(phase);
                console.log(phase);
                this.carregando = false;
            }, (error) => {
                console.log(error);
                this.carregando = false;
            });
        },
        putPhase(phase) {
            this.mensagemSuc = '';
            this.carregando = true;
            axios.put(this.url + "phases/" + phase.phaseId, phase).then((response) => {
                this.mensagem = '';
                this.mensagemSuc = "Fase " + phase.phaseName + " atualizada com sucesso";
                console.log(response.data);
                this.phase = {};
                this.carregando = false;
            }, (error) => {
                console.log(error);
                this.carregando = false;
                this.mensagemSuc = 'Erro ao deletar : ' + error;
            })
        },
        deletePhase(phase, recipe) {
            this.carregando = true;
                this.mensagemSuc = '';
            if(confirm("Tem certeza que deseja excluir a fase?")){
                axios.delete(this.url + "recipes/phases/" + recipe.recipeId, { data: phase }).then((response) => {
                    console.log(response.data);
                    this.phases = this.phases.filter(item => item !== phase);
                    this.phase = {};
                    this.carregando = false;
                }, (error) => {
                    console.log(error);
                    this.carregando = false;
                    this.mensagemSuc = 'Erro ao deletar : ' + error;
                })
            }
        },
        relacionaFase(phase) {
            axios.post(this.url + "recipes/phases/" + this.recipe.recipeId, phase).then((response) => {
                console.log(response.data);
                phase.products = [];
                phase.parameters = [];
                this.phases.push(phase);
                this.phase = {};
                this.mensagemSuc = 'Fase relacionada com sucesso';
                this.ok = true;
            }, (error) => {
                console.log(error);
                this.carregando = false;
            });
        },

        /*****************/
        /*               */
        /*               */
        /*  CRUD Phase   */
        /*   Products    */
        /*               */
        /*****************/
        createPhaseProduct(productPhase, phase) {
            this.mensagemSuc = '';
            this.carregando = true;

            setTimeout(() => {
                console.log("produto da fase");
                console.log(productPhase);
                console.log("fase");
                console.log(phase);
                axios.post(this.url + "phases/products/" + this.phase.phaseId, productPhase).then((response) => {
                productPhase.phaseProductId = response.data.phaseProductId;
                this.phase.phaseProducts.push(productPhase);
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
            })
        },
        deletePhaseProduct(productPhase, phase) {
             this.carregando = true;
             this.mensagemSuc = '';
             
            if(confirm("Tem certeza que deseja excluir o produto da fase?")){
                console.log("produto da fase");
                console.log(productPhase);
                console.log("fase");
                console.log(phase.phaseId);
                axios.delete(this.url + "phases/products/" + phase.phaseId, { data: productPhase }).then((response) => {
                    phase.products = phase.products.filter(item => item.phaseProductId != productPhase.phaseProductId);
                    this.mensagemSuc = 'Fase relacionada com sucesso';
                    this.ok = true;
                    this.carregando = false;
                    console.log(response);
                }, (error) => {
                    console.log(error);
                    this.carregando = false;
                });
            }         
        },

        /*****************/
        /*               */
        /*               */
        /*Busca Produtos */
        /*               */
        /*               */
        /*****************/
        getResults(url, name) {
            var array = [];
            if (name.length < 3) { return; }
            axios.get(url + name, this.config).then((response) => {
                response.data.values.forEach((pro) => {
                    array.push(pro);
                });
            }, (error) => {
                console.log(error);
            })
            return array;
        }
    },
    mounted() {
        // if()
        this.getGatewayRecipe();
    }
}