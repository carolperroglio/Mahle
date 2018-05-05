import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import { setTimeout } from 'timers';
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'

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

var ipServer = process.env.TOOLS_API;

export default {
    name: "ToolsManagement",
    data() {
        return {
            urlTool: ipServer + '/api/tool/',
            urlStateConfig: ipServer + '/api/tool/stateconfiguration/',
            urlStateManagement: ipServer + '/api/tool/statemanagement/id?toolid=',
            tools: [],
            tool: {},
            tooltype: {},
            statesConfig: [],
            obj: {},
            carregando: false,
            needJustification: false,
            tsUpdated: false,
            buttons: {},
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
            cabecalhoSetas: [false, false, false, false, false],

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
        hideModal() {
            this.$refs.modalGerT.hide()
        },
        organizar(hp, campo, pos) {
            hp.sort(function(a, b) {
                return (a[campo] > b[campo]) ? 1 : ((b[campo] > a[campo]) ? -1 : 0);
            });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = false;
        },
        desorganizar(hp, campo, pos) {
            hp.sort(function(a, b) {
                return (a[campo] > b[campo]) ? -1 : ((b[campo] > a[campo]) ? 1 : 0);
            });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = true;
                else
                    this.cabecalhoSetas[i] = false;
        },
        getStateConfig: function() {
            axios.get(this.urlStateConfig).then(response => {
                this.statesConfig = response.data.states;
            }).catch(error => {
                console.log(error);
            })
        },
        getTool: function() {
            this.carregando = true;

            axios.get(this.urlTool).then(response => {
                paginacao(response, this);
                this.tools = response.data.values;
                this.carregando = false;
            }).catch(error => {
                this.carregando = false;
                console.log(error);
            })
        },
        updateStatus: function(obj) {
            axios.put(this.urlStateManagement + obj.id + '&state=' + obj.status, this.obj).then(response => {
                this.tsUpdated = true;
                setTimeout(function() {
                    this.tsUpdated = false;
                }, 200);
            }).catch(error => {
                console.log(error);
            })
            console.log(obj);
        },
        getStatusCorresponding(obj) {
            switch (obj.status) {
                case 'in_use':
                    obj.status = "Em uso"
                    return obj
                    break;
                case 'in_maintenance':
                    obj.status = "Em Manutenção"
                    return obj
                    break;
                case 'not_available':
                    obj.status = "Indisponível"
                    return obj
                    break;
                case 'inactive':
                    obj.status = "Inativo"
                    return obj
                    break;
                case 'active':
                    obj.status = "Ativo"
                    return obj
                    break;
                case 'available':
                    obj.status = "Disponível"
                    return obj
                    break;
                default:
                    break;
            }
        },
        catchToolToChange: function(tool) {
            this.$refs.modalGerT.show()
            this.buttons = {};
            var obj = {};
            var count = 0;
            var nextPossibilityString = '';
            // this.tool = tool;
            for (var x = 0; x < this.statesConfig.length; x++) {
                if (this.statesConfig[x].state == tool.status) {
                    var nextLenth = this.statesConfig[x].possibleNextStates.length;
                    while (count < nextLenth) {
                        nextPossibilityString = this.statesConfig[x].possibleNextStates[count];
                        obj[nextPossibilityString] = true;
                        count++;
                    }
                }
            }
            this.buttons = obj;
            this.tool = this.getStatusCorresponding(tool);
        },

        changeStatus: function(obj, status) {
            this.needJustification = false;
            obj.status = status;
            // this.tool = obj;
            for (var x = 0; x < this.statesConfig.length; x++) {
                if (this.statesConfig[x].state == status) {
                    if (this.statesConfig[x].needsJustification == true) {
                        this.needJustification = true;
                    }
                }
            }

            this.tool = this.getStatusCorresponding(obj);
        },
        buscar(id = "") {
            this.carregando = true;
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.opArray = [];
            console.log(this.order, this.orderField)
            axios.get(this.urlOp + "?orderField=" + this.orderField + "&order=" + this.order + "&fieldFilter=" + this.fieldFilter + "&fieldValue=" + this.fieldValue + "&startat=" + this.startat + "&quantity=" + this.quantityPage, config).then((response) => {
                paginacao(response, this);
                this.opArray = response.data;
                console.log(this.opArray);
                this.carregando = false;
            }, (error) => {
                this.mensagem = 'Erro no server ao buscar ' + error;
                this.carregando = false;
            })
            console.log(this.opArray);
        },
    },
    filters: {
        StatusName: function(status) {
            switch (status) {
                case 'in_use':
                    return "Em uso"
                    break;
                case 'in_maintenance':
                    return status = "Em Manutenção"
                    break;
                case 'not_available':
                    return "Indisponível"
                    break;
                case 'inactive':
                    return "Inativo"
                    break;
                case 'active':
                    return "Ativo"
                    break;
                case 'available':
                    return "Disponível"
                    break;
                case 'Em uso':
                    return "Em uso"
                    break;
                case 'Em Manutenção':
                    return status = "Em Manutenção"
                    break;
                case 'Indisponível':
                    return "Indisponível"
                    break;
                case 'Inativo':
                    return "Inativo"
                    break;
                case 'Ativo':
                    return "Ativo"
                    break;
                case 'Disponível':
                    return "Disponível"
                    break;
                default:
                    break;
            }
        }

    },
    beforeMount() {
        this.getStateConfig();
        this.getTool();
    }
}