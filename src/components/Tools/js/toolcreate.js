import axios from 'axios'
import es6promisse from 'es6-promise'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'
import { setTimeout } from 'timers';
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);
es6promisse.polyfill();

function paginacao(response, este) {
    este.pageAtual = este.startat / 20;
    este.total = response.data.total;
    let fim = Math.ceil(este.total / 20);
    este.pages = [];
    if (este.pageAtual > 11) {
        for (var i = este.pageAtual - 5; i < este.pageAtual + 5 > fim ? este.pageAtual + 5 : fim; i++)
            este.pages[i] = i;
    } else {
        for (var i = 0; i < fim; i++)
            este.pages[i] = i;
    }
}

var IpServer = process.env.TOOLS_API;

export default {
    name: "ToolCreate",
    data() {
        return {
            config: {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            },
            id: "",
            carregando: false,
            ferramentas: [],
            ferramenta: {},
            ferramentaEdit: {},
            url: IpServer + '/api/tool',
            msg: '',
            erro: false,
            f: [],
            tipos: [],
            orderField: '',
            order: '',
            fieldFilter: '',
            fieldValue: '',
            quantityPage: 20,
            startat: 0,
            total: 0,
            pages: [],
            pageAtual: 0,
            errors: [],
            cabecalhoSetas: [false, false, false, false, false, false, false, false, false],
            tooltypeSelected: {}
        }
    },
    components: {
        'b-modal': bModal,
        Stretch
    },
    directives: {
        'b-modal': bModalDirective
    },
    methods: {
        showModal(id) {
            this.$refs[id].show()
        },
        hideModal(id) {
            this.$refs[id].hide()
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
        /***************************/
        /*                         */
        /*                         */
        /*  Validações dos Campos  */
        /*                         */
        /*                         */
        /***************************/

        cleanVariables() {
            this.ferramenta = {
                name: '',
                code: '',
                description: '',
                serialNumber: '',
                unitOfMeasurement: '',
                status: '',
                typeId: '',

            }
            this.tooltypeSelected = {};
        },
        getToolType(tipo) {
            this.ferramenta.typeId = tipo.toolTypeId;
        },
        cadastrar(ferramenta) {
            ferramenta.username = VueCookies.get('username');

            console.log(ferramenta);

            axios.post(this.url, ferramenta).then((response) => {
                this.msg = ferramenta.name + ' cadastrada com sucesso.';
                this.erro = false;
                this.showModal("modalErro");
                this.ferramenta = {};
                this.listar();
                this.carregando = false;
            }).catch((error) => {
                console.log(error);
                this.erro = true;
                this.carregando = false;
                this.msg = "Erro ao cadastrar ferramentas:" + error.message;
                this.showModal("modalErro");
            })

        },
        listar() {
            this.carregando = true;
            this.ferramentas = [];
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };

            // switch (this.fieldValue) {
            //     case 'Criado':
            //         return "created"
            //         break;
            //     case 'Disponível':
            //         return "available"
            //         break;
            //     case 'Ativo':
            //         return "active"
            //         break;
            //     case 'Reprovado':
            //         return "reproved"
            //         break;
            //     case 'Finalizado':
            //         return "ended"
            //         break;
            //     default:
            //         this.erro = true;
            //         this.msg = "Digite o status procurado corretamente"
            //         this.showModal('modalErro')

            // }

            axios.get(this.url + "?orderField=" + this.orderField + "&order=" + this.order + "&fieldFilter=" + this.fieldFilter + "&fieldValue=" + this.fieldValue + "&startat=" + this.startat + "&quantity=" + this.quantityPage).then((response) => {
                this.ferramentas = response.data.values;
                for (var index in response.data.values) {
                    this.ferramentas[index].status = this.getStatus(response.data.values[index].status);
                }
                this.carregando = false;
                this.total = response.data.total;
                paginacao(response, this);
            }).catch((error) => {
                console.log(error);
                this.erro = true;
                this.carregando = false;
                this.msg = error.message;
                this.showModal("modalErro");
            })
        },
        editar(ferramenta) {
            this.carregando = true;
            this.mensagem = '';
            this.mensagemSuc = '';
            ferramenta.username = VueCookies.get('username');

            axios.put(this.url + '/' + ferramenta.toolId + "&username=" + ferramenta.username, ferramenta).then((response) => {
                this.msg = ferramenta.name + ' atualizada com sucesso.';
                this.erro = false;
                this.ferramenta = {};
                this.showModal("modalErro");
            }).catch((error) => {
                console.log(error);
                this.erro = true;
                this.carregando = false;
                this.msg = error.message;
                this.showModal("modalErro");
            })
        },
        buscaTipo() {
            axios.get(this.url + "type").then((response) => {
                this.tipos = response.data;
                console.log(this.tipos);
            }).catch((error) => {
                console.log(error);
                this.erro = true;
                this.carregando = false;
                this.msg = error.message;
                this.showModal("modalErro");
            })
        },
        encontraObj(arr, key, valor) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][key] === valor) {
                    return arr[i];
                }
            }
            return null;
        },
        itemClicado(f) {
            this.ferramentaEdit = JSON.parse(JSON.stringify(f));
            this.errors = [];
            this.$refs.myModalRef.show();
        },
        getStatus(status) {
            var state = {
                'available': "Disponível",
                'in_use': "Em uso",
                'in_maintenance': "Em manutenção",
                'not_available': "Indisponível",
                'inactive': "Inativo",
                'active': "Disponível"
            };
            return state[status];
        },
    },
    beforeMount: function() {
        this.buscaTipo();
        this.listar();
    }
};