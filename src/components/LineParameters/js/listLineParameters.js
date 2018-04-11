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

var ipServer = process.env.RECIPE_API;
var ipThings = process.env.THINGS_API
export default {
    name: "ListLineParameters",
    data() {
        return {
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
            parameters:[],
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

            for(var i=0; i<thing.tags.length; i++){
                console.log(thing.tags[i]);
                if(thing.tags[i].tagGroup == tagGroup && thing.tags[i].tagDescription == 'vn')
                    item[j++]={"tagId":thing.tags[i].tagId, "setupValue":valores.vn};
                else if(thing.tags[i].tagGroup == tagGroup && thing.tags[i].tagDescription == 'unidade')                     
                    item[j++]={"tagId":thing.tags[i].tagId, "setupValue":valores.unidade};
                else if(thing.tags[i].tagGroup == tagGroup && thing.tags[i].tagDescription == 'lic')
                    item[j++]={"tagId":thing.tags[i].tagId, "setupValue":valores.lic};    
                else if(thing.tags[i].tagGroup == tagGroup && thing.tags[i].tagDescription == 'lie') 
                    item[j++]={"tagId":thing.tags[i].tagId, "setupValue":valores.lie};
                else if(thing.tags[i].tagGroup == tagGroup && thing.tags[i].tagDescription == 'lsc')
                    item[j++]={"tagId":thing.tags[i].tagId, "setupValue":valores.lsc};
                else if(thing.tags[i].tagGroup == tagGroup && thing.tags[i].tagDescription == 'lse')               
                    item[j++]={"tagId":thing.tags[i].tagId, "setupValue":valores.lse};                               
            }

            for(var i = 0; i<item.length; i++)
                axios.post(this.urlPhases + '/parameters/46',JSON.parse(JSON.stringify(item[i])),config);
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
            var j = 0;    
            for (var i = 0; i < phase.phaseParameters.length; i++) {
                if (phase.phaseParameters[i].tag != undefined) {                      
                    if (this.parameters[phase.phaseParameters[i].tag.tagGroup] != undefined)
                        this.parameters[phase.phaseParameters[i].tag.tagGroup].push(phase.phaseParameters[i]);                        
                    else {                        
                        this.vetNomes[j++] = phase.phaseParameters[i].tag.tagGroup;                        
                        this.parameters[phase.phaseParameters[i].tag.tagGroup] = [];
                        this.parameters[phase.phaseParameters[i].tag.tagGroup].push(phase.phaseParameters[i]);
                    }
                }
            } 
                      
            j = 0;
            for (i = 0; i < this.vetNomes.length; i++) {
                this.parametros[i] = {};
                for (j = 0; j < this.parameters[this.vetNomes[i]].length; j++) {
                    if (this.parameters[this.vetNomes[i]][j].tag.tagDescription == 'vn')                       
                        this.parametros[i].vn = this.parameters[this.vetNomes[i]][j];                        
                    else if (this.parameters[this.vetNomes[i]][j].tag.tagDescription == 'lie')
                        this.parametros[i].lie = this.parameters[this.vetNomes[i]][j];
                    else if (this.parameters[this.vetNomes[i]][j].tag.tagDescription == 'lic')
                        this.parametros[i].lic = this.parameters[this.vetNomes[i]][j];                        
                    else if (this.parameters[this.vetNomes[i]][j].tag.tagDescription == 'lsc')
                        this.parametros[i].lsc = this.parameters[this.vetNomes[i]][j];                       
                    else if (this.parameters[this.vetNomes[i]][j].tag.tagDescription == 'lse')
                        this.parametros[i].lse = this.parameters[this.vetNomes[i]][j];                       
                    else if (this.parameters[this.vetNomes[i]][j].tag.tagDescription == 'unidade')
                        this.parametros[i].unidade = this.parameters[this.vetNomes[i]][j];
                       
                }
            }
            for (i = 0; i < this.vetNomes.length; i++)
                this.parametros[i].parametro = this.parameters[this.vetNomes[i]][0].tag.tagGroup;
 
            for(var t=0; t<this.things.length; t++)                                                   
                for(var j=0; j<this.vetNomes.length; j++)                                                                                                                                                                
                    this.things[t].possibleTagGroups = this.things[t].possibleTagGroups.filter(item => item !== this.vetNomes[j]);                               
                                                   
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
        setTimeout(() => {
            this.buscarPhase();
        },5000);    
    }
}