import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import { Stretch } from 'vue-loading-spinner'
es6promisse.polyfill();

function paginacao(total, este) {
    este.pageAtual = este.startat / este.quantityPage;
    este.total = total;
    let fim = Math.ceil(este.total / este.quantityPage);
    var num = este.pageAtual + 5 > fim ? fim : este.pageAtual + 5
    if (este.pageAtual > 11) {
        for (var i = este.pageAtual - 5; i < num; i++)
            este.pages[i] = i;
    } else {
        for (var i = 0; i < num; i++)
            este.pages[i] = i;
    }
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
            cabecalhoSetas:[false, false, false],
            carregando: false,
            quantityPage: 100,
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
    components: {
        'b-modal': bModal,
        Stretch,
    },
    methods: {
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
        recipeDelete(id){
            this.carregando = true;
            console.log(this.urlRecipes);
            axios.delete(this.urlRecipes+'/'+id).then(response => {
                console.log(response);
                this.carregando = false;
            }).catch(error => {
                console.log(error);
                this.carregando = false;
            })
        },
        organizar(recipe, campo, pos){                         
            recipe.sort(function(a,b) {return (a[campo] > b[campo]) ? 1 : ((b[campo] > a[campo]) ? -1 : 0);});
            for(var i=0; i<this.cabecalhoSetas.length; i++)
                if(i==pos)    
                    this.cabecalhoSetas[i]=false;

        },
        desorganizar(recipe, campo, pos){                         
            recipe.sort(function(a,b) {return (a[campo] > b[campo]) ? -1 : ((b[campo] > a[campo]) ? 1 : 0);});
            for(var i=0; i<this.cabecalhoSetas.length; i++)
                if(i==pos)    
                    this.cabecalhoSetas[i]=true;
                else   
                    this.cabecalhoSetas[i]=false;             
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
                console.log(error);
                this.carregando = false;
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
            setTimeout(() => {},500);
            axios.get(this.urlRecipes + "?orderField=" + this.orderField + "&order=" + this.order + "&fieldFilter=" + this.fieldFilter + "&fieldValue=" + this.fieldValue + "&startat=" + this.startat + "&quantity=" + this.quantityPage, config).then((response) => {                
                this.recipes = [];                    
                for(var i=0; i<response.data.values.length; i++)
                    if(response.data.values[i].recipeTypeId == 1)
                        this.recipes.push(response.data.values[i]);
                console.log(this.recipes);         
                paginacao(this.recipes.length, this);                                       
                for(var i=0; i<this.recipes.length; i++)
                    if(this.recipes[i].recipeDescription == undefined)
                        this.recipes[i].recipeDescription = '';
                this.carregando = false;
            }, (error) => {
                this.mensagem = 'Erro no server ao buscar ' + error;
                this.carregando = false;
            })
                
            
        },
    },
    created() {
        this.buscar();
        // this.getPhasesById();
    }
}