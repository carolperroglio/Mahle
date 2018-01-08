import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
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
            urlRecipeSearch: 'http://brsbap01:8001/api/tags?fieldFilter=tagName&fieldValue=',
            urlRecipes: ipServer + '8003/api/recipes/',
            urlGatewayRecipes: ipServer + '8005/gateway/recipes/',
            carregando: false,
            recipeProduct: {},
            recipeProductDisplay: {},
            recipeProductName: '',
            recipeCadastrada: false,
            recipeProducts: [],
            recipe: {},
            idRecipe: '',
            recipes: [],
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

    methods: {
        abreModal(nome) {
            $(nome).modal('show');
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
            axios.post(this.url + "recipes/product/" + this.recipe.recipeId, recipeProduct).then((response) => {
                console.log(response.data);
                this.carregando = false;
                this.recipeProductDisplay = response.data;
                alert('Cadastrado com sucesso');
            }, (error) => {
                console.log(error);
                this.carregando = false;
            });
        },
        deleteRecipeProduct(recipeProduct, recipeProductEnd) {
            this.mensagemSuc = '';
            this.carregando = true;
            recipeProduct.phaseProductType = 'finished';
            axios.post(this.url + "recipes/product/" + this.recipe.recipeId, recipeProduct).then((response) => {
                console.log(response.data);
                this.carregando = false;
                this.recipeProductDisplay = response.data;
                alert('Cadastrado com sucesso');
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
            axios.delete(this.url + "phases/products/" + phase.phaseId, { data: productPhase }).then((response) => {
                phase.products = phase.products.filter(item => item.phaseProductId != productPhase.phaseProductId);
                this.mensagemSuc = 'Fase relacionada com sucesso';
                this.ok = true;
                this.carregando = false;
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
                this.mensagemSuc = 'Fase relacionada com sucesso';
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