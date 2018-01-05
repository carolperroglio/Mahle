import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
es6promisse.polyfill();

var ipServer = 'http://brsbap01:';

export default {
    name: "Phases",
    props: ['id'],
    data() {
        return {
            urlRecipes: ipServer + '8003/api/recipes/',
            urlPhases: ipServer + '8003/api/phases',
            recipes: [],
            phases: [],
            carregando: false,
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
    },
    beforeMount() {
        this.getRecipe();
        // this.getPhasesById();
    }
}