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
            carregando: false,
            recipeProduct: {},
            recipeProductDisplay: {},
            recipeProductName: '',
            recipeCadastrada: false,
            recipeProducts: [],
            recipe: {},
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
        }
    },
    computed: {

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

        createRecipe(recipe) {
            this.mensagemSuc = '';
            this.carregando = true;
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
        getResults(name) {
            var array = [];
            if (name.length < 3) { return; }
            axios.get(this.urlProducts + name, this.config).then((response) => {
                response.data.values.forEach((pro) => {
                    array.push(pro);
                });
            }, (error) => {
                console.log(error);
            })
            return array;
        }
    },

}