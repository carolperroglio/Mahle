import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'
import { setTimeout } from 'timers';
import { debug } from 'util';

es6promisse.polyfill();
var ipServerRecipe = process.env.RECIPE_API;
var ipServerOP = process.env.OP_API;
var ipServerThing = process.env.THINGS_API;

export default {
    name: "Tira",
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
            carregando: false,
            recipeProduct: {},
            recipeCadastrada: false,
            recipe: {},
            recipes: [],
            parameters:{},
            parametros:[],
            phase: {},
            phases: [],
            phaseProduct: {},
            phaseParameter: {},        
            carregando: false,
            mensagem: '',
            mensagemSuc: '',
            name: '',
            tagName: '',
            vetNomes: [],
            editarActivate: false,
            expand: [],
            errors: [],
            cabecalhoSetas:[false, false, false, false, false, false, false],
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
                console.log(this.urlGatewayRecipes+id);
                setTimeout(() => {
                    axios.get(this.urlGatewayRecipes + id).then(response => {
                        this.recipe = response.data;                 
                        for(var i = 0; i < this.recipe.phases.length; i++)
                            if(this.recipe.phases[i].phaseId!=46)
                                this.phase = this.recipe.phases[i];                                                  
                        this.getParametros();
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

        getParametros: function(){
            var j = 0;                                                                        
            for(var i = 0; i < this.phase.phaseParameters.length; i++){ 
                if(this.phase.phaseParameters[i].tag.tagGroup!=undefined){
                    if(this.parameters[this.phase.phaseParameters[i].tag.tagGroup]!=undefined)
                        this.parameters[this.phase.phaseParameters[i].tag.tagGroup].push(this.phase.phaseParameters[i]);
                    else{
                        this.vetNomes[j++] = this.phase.phaseParameters[i].tag.tagGroup;
                        this.parameters[this.phase.phaseParameters[i].tag.tagGroup] = [];
                        this.parameters[this.phase.phaseParameters[i].tag.tagGroup].push(this.phase.phaseParameters[i]);
                    }     
                }                                                          
            }  
            j=0;                                                              
            for(i=0; i<this.vetNomes.length; i++){                            
                this.parametros[i] = {};                                                                                                                                                                       
                for(j=0; j<this.parameters[this.vetNomes[i]].length; j++){                                                                                       
                    if(this.parameters[this.vetNomes[i]][j].tag.tagDescription == 'vn')                                   
                        this.parametros[i].vn = this.parameters[this.vetNomes[i]][j].setupValue;  
                    else if(this.parameters[this.vetNomes[i]][j].tag.tagDescription == 'lie')   
                        this.parametros[i].lie = this.parameters[this.vetNomes[i]][j].setupValue;  
                    else if(this.parameters[this.vetNomes[i]][j].tag.tagDescription == 'lic')   
                        this.parametros[i].lic = this.parameters[this.vetNomes[i]][j].setupValue; 
                    else if(this.parameters[this.vetNomes[i]][j].tag.tagDescription == 'lsc')   
                        this.parametros[i].lsc = this.parameters[this.vetNomes[i]][j].setupValue;   
                    else if(this.parameters[this.vetNomes[i]][j].tag.tagDescription == 'lse')
                        this.parametros[i].lse = this.parameters[this.vetNomes[i]][j].setupValue;                                    
                    else if(this.parameters[this.vetNomes[i]][j].tag.tagDescription == 'unidade')
                        this.parametros[i].unidade = this.parameters[this.vetNomes[i]][j].setupValue;                                                                                                             
                }                              
            }                              
            for(i=0; i<this.vetNomes.length; i++)
                this.parametros[i].parametro = this.parameters[this.vetNomes[i]][0].tag.tagGroup;
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