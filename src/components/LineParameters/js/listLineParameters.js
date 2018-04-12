import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'
es6promisse.polyfill();

function paginacao(total, este) {
    este.pageAtual = este.startat / 20;
    este.total = total;
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

const ipServer = process.env.RECIPE_API;
const ipThings = process.env.THINGS_API;
const ipLineParameters = process.env.LINE_PARAMETERS;
export default {
    name: "ListLineParameters",
    data() {
        return {
            urlLineParameters: ipLineParameters+ 'api/specificPhase',
            urlRecipes: ipServer + '/api/recipes',
            urlPhases: ipServer + '/api/phases',
            urlThings: ipThings + '/api/thinggroups/',
            mensagem:'',
            mensagemSuc:'',
            errors:[],
            recipes: [],
            recipe: {},
            thing: {},
            things: [],
            tagGroup:'',
            parametroCurrent: {},
            parametros:[],            
            parameter: {},
            ferramentas: [],
            ferramenta:{},            
            phases: [],
            cabecalhoSetas:[false, false, false, false, false, false, false],
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
            valores: {},
            vetNomes: [],
            deletar: {}
        }
    },
    components: {
        'b-modal': bModal,
        Stretch,
    },
    directives: {
        'b-modal': bModalDirective,    
    },
    methods: {

        showModal(ref){
            this.$refs[ref].show();
        },
        hideModal(ref){
            this.$refs[ref].hide();
        },        

        putParameter(parametro){
            this.carregando=true;

            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            axios.put(this.urlPhases+'/parameters/'+parametro.phaseParameterId, config);

        },
        createParameter(valores, thing, tagGroup){
            this.carregando=true;
            this.hideModal('modalCreateParameter');
            var item=[];
            var j=0;
            var urls = [];
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };

            axios.post(urlLineParameters, parametro,config).then((response) => { 
                console.log(response);
            }, (error) => {
                console.log(error);
            });   
            this.$router.go();    
        },

      
        deleteParameter(parametro){
            this.carregando = true;
            this.hideModal('modalRemoveParameter');     
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            var urls =  [];
            
            for(var i = 0; i<this.phase.phaseParameters.length; i++)
                if(this.phase.phaseParameters[i].tag.tagGroup == parametro.parametro)
                    urls[i] = axios.delete(this.urlPhases + '/parameters/46',{ data: JSON.parse(JSON.stringify(this.phase.phaseParameters[i]))},config);
                
            this.deletar = {}; 
            for(var t=0; t<this.things.length; t++)                                                   
                for(var j=0; j<this.vetNomes.length; j++)                                                                                                                                                                
                    this.things[t].possibleTagGroups = this.things[t].possibleTagGroups.filter(item => item !== this.vetNomes[j]);
            this.$router.go();
            this.parametros = this.parametros.filter(item => item.parametro !== parametro.parametro);        
            this.buscarPhase();
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


        getParametros(phase) {                           
            // {
            //     "thingGroupId":1,
            //     "tagGroup":"Larg Canal",
            //     "LSE":"4.5",
            //     "LSC":"1",
            //     "LIC":"2",
            //     "LIE":"3",
            //     "value":"foi",
            //     "Unit":"unidade"
            //     }
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };    
            axios.get(this.urlLineParameters+'/46', config).then((response) => {                
                console.log(response.data.values);                                               
            }, (error) => {
                this.mensagem = 'Erro no server ao buscar ' + error;
                this.carregando = false;
            })                                                                    
        },
        //
        // PAGINAÇÃO //
        //

        
        buscarThings() {            
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.recipes = [];

            axios.get(this.urlThings, config).then((response) => {                
                this.things = response.data.values;                                               
            }, (error) => {
                this.mensagem = 'Erro no server ao buscar ' + error;
                this.carregando = false;
            })

        }, 
        buscarPhase() {            
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.recipes = [];
            console.log(this.urlThings)
        
            axios.get(this.urlPhases+'/46', config).then((response) => {                
                this.phase = response.data;
                this.getParametros(this.phase);                                                  
                this.carregando = false;                                              
            }, (error) => {
                this.mensagem = 'Erro no server ao buscar ' + error;
                this.carregando = false;
            })
                
        },
    },
    beforeMount() {        
        this.carregando = true;
        
        this.buscarThings();
        
        this.getParametros();        
    }
}