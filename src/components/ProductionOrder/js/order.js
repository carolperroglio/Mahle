import axios from 'axios'
import es6promisse from 'es6-promise'
es6promisse.polyfill();


function paginacao(response, este) {
    este.pageAtual = este.startat / 20;
    este.total = response.data.total;
    let fim = Math.ceil(este.total / 20);
    if (este.pageAtual > 11) {
        for (var i = this.pageAtual - 5; i < este.pageAtual + 5 > fim ? este.pageAtual + 5 : fim; i++)
            este.pages[i] = i;
    } else {
        for (var i = 0; i < fim; i++)
            este.pages[i] = i;
    }
}

// Endereço IP do Servidor com as APIs
var ipServer = 'http://192.168.11.80:';

export default {
    name: 'ProductionOrder',
    data() {
        return {
            // ipServer: 'http://192.168.11.160:',
            opId: '',
            urlRecipe: ipServer + '8003/api/recipes/',
            urlOpType: ipServer + '8005/api/productionordertypes/',
            urlPhases: ipServer + '8003/api/phases/',
            urlOp: ipServer + '8005/api/productionorders/',
            urlGatewayRecipe: ipServer + '8005/gateway/recipes/',
            recipeArray: [],
            opArray: [],
            opTypeArray: [],
            paramArray: [],
            recipeObj: {},
            productArray: [],
            recipeSelected: '',
            errors: [],
            opDesc: '',
            opSelected: '',
            phaseSelected: '',
            productionOrderObj: {},
            recipeAdded: '',
            carregando: false,
            quantityPage: 20,
            startat: 0,
            total: 0,
            pages: [],
            pageAtual: 0,
            showProd: false,
            showParam: false,
            idProd: '',
            show: false
        }
    },
    methods: {
        // Make a request for a user with a given ID
        getRecipes: function() {
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.carregando = true;
            axios.get(this.urlRecipe, config).then(response => {
                    // JSON responses are automatically parsed.
                    this.recipeArray = response.data;
                    console.log(response);
                    this.carregando = false;
                })
                .catch(e => {
                    this.errors.push(e)
                })

        },
        getId: function(index) {
            this.idProd = 'verProdutosLista-' + index
            console.log(this.idProd);
            return this.idProd;
        },
        getIdPhase: function(index) {
            this.idProd = 'verPhaseList-' + index
            console.log(this.idProd);
            return this.idProd;
        },
        getOpType: function() {
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.carregando = true;

            axios.get(this.urlOpType, config).then(response => {
                    // JSON responses are automatically parsed.
                    this.opTypeArray = response.data;
                    console.log(response);
                    this.carregando = false;
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        getRecipeGateway: function(id) {
            this.carregando = true;

            axios.get(this.urlGatewayRecipe + id).then(response => {
                    this.recipeObj = response.data;
                    console.log(response.data);
                    this.carregando = false;
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        addRecipe: function(recipe, id) {
            // debugger;
            this.recipeAdded = recipe;

            this.getRecipeGateway(id);
        },
        seeProduct: function(index) {
            debugger;
            // getRecipeGateway(index);
            this.productArray = this.recipeObj.phases[index].phaseProducts;
        },
        seeParam(index) {
            this.paramArray = this.recipeObj.phases[index].phaseParameters;
        },
        //      //
        // CRUD //
        //      //
        getOp: function() {
            //productionOrderObj.recipe.recipeName = "";
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            // ativa barra de load na tela
            this.carregando = true;
            axios.get(this.urlOp, config).then(response => {
                    // JSON responses are automatically parsed.
                    this.opArray = response.data;
                    console.log(response);
                    this.carregando = false;
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        createOp: function(data) {
                // adiciona propriedades necessárias na op que são mandatory
                data.recipe = this.recipeObj;
                data.productionOrderTypeId = this.opSelected;
                data.typeDescription = this.filterDesc;
                console.log(data);
                //////////////////////////////////////////////////
                axios.post(this.urlOp, data).then(response => {
                        this.opArray = response.data;
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
            //           //
            //  END CRUD //
            //           //
    },
    computed: {
        filterDesc: function(value) {
            for (var count = 0; count < this.opTypeArray.length; count++) {
                if (this.opTypeArray[count].productionOrderTypeId == this.opSelected) {
                    this.opDesc = this.opTypeArray[count].typeDescription;
                }
            }
            console.log('desc' + this.opDesc);
            return this.opDesc
        }
    },
    watch: {
        // updatePhaseSelected: function(id) {
        //     var config = {
        //         headers: { 'Cache-Control': 'no-cache' }
        //     };
        //     axios.get(this.urlPhases + id, config).then(response => {
        //             // JSON responses are automatically parsed.
        //             this.opArray = response.data;
        //             console.log(response);
        //         })
        //         .catch(e => {
        //             this.errors.push(e)
        //         })
        // }
    }
}