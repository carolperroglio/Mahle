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
const ipLineParameters = process.env.LINE_PARAMETERS_API;
export default {
    name: "ListLineParameters",
    data() {
        return {
            urlLineParameters: ipLineParameters+ '/api/specificPhase',
            urlRecipes: ipServer + '/api/recipes',
            urlPhases: ipServer + '/api/phases',
            urlThings: ipThings + '/api/thinggroups/',            
            error:'',
            thing: {},
            things: [],
            tagGroup:'',           
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
        showModalErro(erro){
            this.error = erro;
            this.$refs.modalErro.show();            
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

        putParameter(parametro){
            this.carregando=true;

            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            axios.put(this.urlLineParameters+'/46', parametro, config).then((response) => {
                this.getParametros();
                this.carregando = false;
            }, (error) => {
                this.carregando = false;
                if(error.response)
                    this.codigosErro(error.response.status);
                else
                    this.codigosErro(0);
            });

        },

        createParameter(parametro, thing, tagGroup){
            this.carregando=true;
            this.hideModal('modalCreateParameter');       
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };            
            parametro.thingGroupId = thing.thingGroupId;
            parametro.tagGroup = tagGroup;
            axios.post(this.urlLineParameters, parametro,config).then((response) => {
                this.parametros.push(response.data);      
                this.carregando = false;                         
            }, (error) => {
                this.carregando = false;
                if(error.response)
                    this.codigosErro(error.response.status);
                else
                    this.codigosErro(0);
            });                   
        },

        deleteParameter(parametro){
            this.carregando = true;
            this.hideModal('modalRemoveParameter');     
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            axios.delete(this.urlLineParameters+'/46', {data: parametro}, config).then((response) => {                
                setTimeout(this.getParametros(), 500);                           
            }, (error) => {
                this.carregando = false;
                if(error.response)
                    this.codigosErro(error.response.status);
                else
                    this.codigosErro(0);
            }) 
        },        

        getParametros() {                                       
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };    
            
            axios.get(this.urlLineParameters+'/46', config).then((response) => {                                
                this.parametros = response.data.parameters;                
                console.log(parametros);
                this.carregando = false;
            }, (error) => {
                this.carregando = false;
                if(error.response)
                    this.codigosErro(error.response.status);
                else
                    this.codigosErro(0);
            }) 
                                                                                   
        },
        //
        // PAGINAÇÃO //
        //
        validaTag(possibleTagGroups, index){                        
            console.log(parametros);
            for(var i = 0; i<this.parametros.length; i++)
                if(possibleTagGroups[index] == this.parametros[i].tagGroup)
                    return false;
            return true;        
        },
        
        codigosErro(status=-1){
            if(status == 400)
                this.showModalErro("Erro de requisição código 400");
            else if(status == 404)
                this.showModalErro("Serviço não encontrado código 404");
            else if(status == 500)
                this.showModalErro("Erro no servidor código 500");             
            else    
                this.showModalErro("Erro desconhecido código " + status);
        },

        buscarThings() {            
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.recipes = [];
            axios.get(this.urlThings, config).then((response) => {  
                this.things = response.data.values;
                this.getParametros();                                                     
            }, (error) => {
                this.carregando = false;
                if(error.response)
                    this.codigosErro(error.response.status);
                else
                    this.codigosErro(0);
            })
        }, 
    },

    beforeMount() {        
        this.carregando = true;
        
        this.buscarThings();                                
    }
}