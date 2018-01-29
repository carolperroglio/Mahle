import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
es6promisse.polyfill();

function paginacao(response, este) {
    este.pageAtual = este.startat / 20;
    este.total = response.data.total;
    let fim = Math.ceil(este.total / 20);
    var num = este.pageAtual + 5 > fim ? fim : este.pageAtual + 5
    if (este.pageAtual > 11) {
        for (var i = este.pageAtual - 5; i < num; i++)
            este.pages[i] = i;
    } else {
        for (var i = 0; i < num; i++)
            este.pages[i] = i;
    }
}

var ipServer = 'http://34.239.125.82:';

export default {
    name: "Phases",
    data() {
        return {
            urlRecipes: ipServer + '8002/api/recipes',
            urlPhases: ipServer + '8002/api/phases',
            recipes: [],
            phases: [],
            carregando: false,
            quantityPage: 20,
            startat: 0,
            total: 0,
            pages: [],
            pageAtual: 0,
            orderField: '',
            order: '',
            fieldFilter: '',
            fieldValue: '',
            id: ''
        }
    },
    methods: {
        /*****************/
        /*               */
        /*  CRUD Recipe  */
        /*               */
        /*****************/
        getRecipe: function() {
            this.carregando = true;

            axios.get(this.urlRecipes).then(response => {
                this.recipes = response.data.values;
                this.carregando = false;

            }).catch(error => {
                console.log(error);
                this.carregando = false;
            })
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
        /*  GET Phase  */
        /*               */
        /*****************/
        getPhasesById: function(id) {
            console.log(id);
            this.carregando = true;
            axios.get(this.urlRecipes + id).then(response => {
                this.phases = response.data;
                this.carregando = false;
            }).catch(error => {
                console.log(error);
                this.carregando = false;
            })
        },
        //
        // PAGINAÇÃO //
        //
        buscar(id = "") {
            this.carregando = true;
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.recipes = [];
            console.log(this.order, this.orderField)
            axios.get(this.urlRecipes + "?orderField=" + this.orderField + "&order=" + this.order + "&fieldFilter=" + this.fieldFilter + "&fieldValue=" + this.fieldValue + "&startat=" + this.startat + "&quantity=" + this.quantityPage, config).then((response) => {
                paginacao(response, this);
                this.recipes = response.data.values;
                console.log('this.recipes');
                console.log(this.recipes);

                this.carregando = false;
            }, (error) => {
                this.mensagem = 'Erro no server ao buscar ' + error;
                this.carregando = false;
            })
            console.log(this.recipes);
        },
    },
    beforeMount() {
        this.buscar();
        // this.getPhasesById();
    }
}