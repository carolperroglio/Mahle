import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import { Stretch } from 'vue-loading-spinner'
es6promisse.polyfill();

// function paginacao(response, este) {
//     debugger;
//     este.pageAtual = este.startat / 20;
//     este.total = response.data.total;
//     let fim = Math.ceil(este.total / 20);
//     este.pages = [];
//     if (este.pageAtual > 11) {
//         for (var i = este.pageAtual - 5; i < este.pageAtual + 5 > fim ? fim : este.pageAtual + 5 ; i++)
//             este.pages[i] = i;
//     } else {
//         for (var i = 0; i < fim; i++)
//             este.pages[i] = i;
//     }
// }

function paginacao(response, este) {
    este.pageAtual = este.startat / este.quantityPage;
    este.total = response.data.total;
    let fim = Math.ceil(este.total / este.quantityPage);
    var num = este.pageAtual + 5 > fim ? fim : este.pageAtual + 5;
    var comeco = este.pageAtual - 5 > 0 ? este.pageAtual - 5 : 0;
    este.pages = [];
    var j = 0;    
    for (var i = comeco; i < num; i++)
        este.pages[j++] = i;                
}

var ipServer = process.env.RECIPE_API;

export default {
    name: "ListTira",
    data() {
        return {
            urlRecipes: ipServer + '/api/recipes/',
            urlPhases: ipServer + '/api/phases',
            recipes: [],
            phases: [],
            cabecalhoSetas: [false, false, false],
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
            id: '',
            erro: '',
        }
    },
    components: {
        'b-modal': bModal,
        Stretch,
    },
    methods: {

        showModalErro(erro) {
            this.erro = erro;
            this.$refs.modalErro.show();
        },
        /*****************/
        /*               */
        /*  CRUD Recipe  */
        /*               */
        /*****************/
        getRecipe: function() {
            this.carregando = true;

            console.log(this.urlRecipes);
            axios.get(this.urlRecipes).then(response => {
                this.recipes = response.data.values;
                this.carregando = false;

            }).catch(error => {
                this.carregando = false;
                this.codigosErro(error.response.status);
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
                this.carregando = false;
                this.codigosErro(error.response.status);
            });
        },
        recipeDelete(id) {
            this.carregando = true;
            console.log(this.urlRecipes);
            axios.delete(this.urlRecipes + '/' + id).then(response => {
                console.log(response);
                this.carregando = false;
            }).catch(error => {
                this.carregando = false;
                this.codigosErro(error.response.status);
            })
        },

        mudaPlace(fieldFilter) {
            var place = 'Tira';
            if (fieldFilter == 'recipeName')
                place = 'Digite o Nome da Tira';
            else if (fieldFilter == 'recipeCode')
                place = 'Digite o Código da Tira';
            return place;
        },
        organizar(recipe, campo, pos) {
            recipe.sort(function(a, b) { return (a[campo] > b[campo]) ? 1 : ((b[campo] > a[campo]) ? -1 : 0); });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = false;

        },
        desorganizar(recipe, campo, pos) {
            recipe.sort(function(a, b) { return (a[campo] > b[campo]) ? -1 : ((b[campo] > a[campo]) ? 1 : 0); });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = true;
                else
                    this.cabecalhoSetas[i] = false;
        },
        /*****************/
        /*               */
        /*  GET Phase  */
        /*               */
        /*****************/
        getPhasesById: function(id) {
            console.log(id);
            this.carregando = true;
            axios.get(this.urlRecipes + id, config).then(response => {
                this.phases = response.data;
                this.carregando = false;
            }).catch(error => {
                this.carregando = false;
                this.codigosErro(error.response.status);
            })
        },
        //
        // PAGINAÇÃO //
        //
        buscar() {
            this.carregando = true;
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.recipes = [];            
            axios.get(this.urlRecipes + "v2?filters=recipeTypeId,1&filters=orderField," + this.orderField + "&filters=order," + this.order + "&filters=" + this.fieldFilter + "," + this.fieldValue + "&startat=" + this.startat + "&quantity=" + this.quantityPage, config).then((response) => {
                this.recipes = response.data.values;
                paginacao(response, this);
                this.carregando = false;                
            }, (error) => {
                this.carregando = false;
                this.codigosErro(error.response.status);
            })
        },
        codigosErro(status) {
            if (status == 400)
                this.showModalErro("Erro de requisição código 400");
            else if (status == 404)
                this.showModalErro("Serviço não encontrado código 404");
            else if (status == 500)
                this.showModalErro("Erro no servidor código 500");
            else
                this.showModalErro("Erro desconhecido código" + status);
        },
    },
    created() {
        this.buscar();
        // this.getPhasesById();
    }
}