import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

es6promisse.polyfill();
var ipServer = 'http://brsbap01:';

export default {
    name: "Phases",
    data() {
        return {
            json: JSON,
            config: {
                headers: { 'Cache-Control': 'no-cache' }
            },
            url: ipServer + '8003/api/',
            url2: ipServer + '8001/api/',
            urlProducts: ipServer + '8003/api/products?&fieldFilter=productName&fieldValue=',
            urlRecipeSearch: 'http://brsbap01:8003/api/tags?fieldFilter=tagName&fieldValue=',
            urlRecipes: ipServer + '8003/api/recipes/',
            urlGatewayRecipes: ipServer + '8006/gateway/recipes/',

            carregando: false,
            recipeProduct: {},
            recipeProductDisplay: {},
            recipeProductName: '',
            recipeCadastrada: false,
            recipeProducts: [],
            recipe: {},
            idRecipe: '',
            recipes: [],
            RP: '',
            phase: {},
            phases: [],
            phaseProduct: {},
            productPhaseName: '',
            phaseTag: {},
            phaseParameter: {},
            phaseTags: [],
            carregando: false,
            mensagem: '',
            mensagemSuc: '',
            productName: '',
            name: '',
            tagName: '',
            editarActivate: false,
            expand: []
        }
    },
    filters: {
        prodTypeName: function(productTypeName) {
            // productTypeName = '';
            if (productTypeName == 'scrap') {
                return productTypeName = "Rejeito";
            } else if (productTypeName == 'finished') {
                return productTypeName = "Acabado";
            } else if (productTypeName == 'semi_finished') {
                return productTypeName = "Semi Acabado";
            } else if (productTypeName == null) {}
        }
    },
    components: {
        'b-dropdown': bDropdown,
        'b-dropdown-item': bDropdownItem,
        'b-modal': bModal
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
            this.phaseProduct={};
            this.$refs.modalcadProPhase.show()
          },
          hideModalAddProd() {
            this.$refs.modalcadProPhase.hide()
          },
          showModalAddParam() {
            this.phaseParameter={};
            this.tagName='';
            this.mensagemSuc='';
            this.$refs.modalCadParam.show()
          },
          hideModalAddParam() {
            this.$refs.modalCadParam.hide()
          },
          showModalAddProdFin() {
            this.$refs.modalProFinal.show()
          },
          hideModalAddProdFin() {
            this.$refs.modalProFinal.hide()
          },
          
        /*****************/
        /*               */
        /*               */
        /*  CRUD Recipe  */
        /*               */
        /*               */
        /*****************/

        changeView: function(pha) {
            if (pha.expand == false) {
                return true;
            } else {
                return false;
            }
        },
        getGatewayRecipe: function() {
            var id = this.$route.params.id;
            if (id != 0) {
                this.carregando = true;
                axios.get(this.urlGatewayRecipes + id).then(response => {
                    this.recipe = response.data;
                    this.phases = response.data.phases;
                    console.log(this.phases);
                    console.log(id);
                    for (var i = 0; i < this.phases.length; i++) {
                        this.expand[i] = false;
                        console.log(this.expand[i]);
                    }
                    this.recipeCadastrada = true;
                    this.carregando = false;
                    this.editarActivate = true;
                }).catch(error => {
                    console.log(error);
                    this.carregando = false;
                })
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

        /*****************/
        /*               */
        /*  CRUD Recipe  */
        /*   Product     */
        /*               */
        /*****************/
        createRecipeProduct(recipeProduct, recipeProductEnd) {
            this.mensagemSuc = '';
            this.carregando = true;
            recipeProduct.phaseProductType = 'finished';
            console.log(recipeProduct);
            console.log(this.url + "recipes/product/" + this.recipe.recipeId);
            axios.post(this.url + "recipes/product/" + this.recipe.recipeId, recipeProduct).then((response) => {
                console.log(response.data);
                this.carregando = false;
                this.recipeProductDisplay = response.data;
            }, (error) => {
                console.log(error);
                this.carregando = false;
            });
        },
        deleteRecipeProduct(recipeProduct) {
            this.mensagemSuc = '';
            this.carregando = true;
            this.pID = recipeProduct.productId;
            axios.get(this.url+'products/'+this.pID).then(response => {
                console.log("JSON -->>>");
                console.log(response.data);
                this.RP = response.data;
            }).catch(error => {
                console.log(error);
                this.carregando = false;
            })
            console.log("JSON de produto da receita");
            console.log(this.RP);
            console.log(this.url + "recipes/product/" + this.recipe.recipeId);
            axios.delete(this.url + "recipes/product/" + this.recipe.recipeId,this.RP).then((response) => {
                console.log(response.data);
                this.carregando = false;
                this.recipeProductDisplay = response.data;
                alert("Deletado!!");
            }, (error) => {
                console.log(error);
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
                console.log(response.data);
                phase = response.data;
                this.relacionaFase(phase);
                this.carregando = false;
            }, (error) => {
                console.log(error);
                this.carregando = false;
            });
        },
        putPhase(phase) {
            this.mensagemSuc = '';
            this.carregando = true;
            axios.delete(this.url + "phases/" + phase.phaseId, phase).then((response) => {
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
            this.mensagemSuc = '';
            this.carregando = true;
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
        },
        relacionaFase(phase) {
            axios.post(this.url + "recipes/phases/" + this.recipe.recipeId, phase).then((response) => {
                console.log(response.data);
                phase.products = [];
                phase.parameters = [];
                phase.expand = false;
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
            console.log("produto da fase");
            console.log(productPhase);
            console.log("fase");
            console.log(phase);
            console.log("Fases");
            console.log(this.phases);
            axios.post(this.url + "phases/products/" + phase.phaseId, productPhase).then((response) => {
                productPhase.phaseProductId = response.data.phaseProductId;
                phase.products.push(productPhase);
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
        },
        deletePhaseProduct(productPhase, phase) {
            this.mensagemSuc = '';
            this.carregando = true;
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
        },

        /*****************/
        /*               */
        /*               */
        /*  CRUD Phase   */
        /*   Parameters  */
        /*               */
        /*****************/
        createPhaseParameter(phaseParameter, phase) {
            this.mensagemSuc = '';
            this.carregando = true;
            console.log(phaseParameter);
            console.log(phase);
            axios.post(this.url + "phases/parameters/" + phase.phaseId, phaseParameter).then((response) => {
                phaseParameter.phaseParameterId = response.data.phaseParameterId;
                phase.parameters.push(phaseParameter);
                this.phaseParameter = {};
                this.tagName = '';
                this.mensagemSuc = 'Parâmetro cadastrado com sucesso!';
                this.ok = true;
                this.carregando = false;
            }, (error) => {
                console.log(error);
                this.phaseParameter = {};
                this.tagName = '';
                this.carregando = false;
            });
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