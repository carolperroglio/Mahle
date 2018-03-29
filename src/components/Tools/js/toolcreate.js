import axios from 'axios'
import es6promisse from 'es6-promise'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'
import { setTimeout } from 'timers';

es6promisse.polyfill();

function paginacao(response, este) {
    este.pageAtual = este.startat / 20;
    este.total = response.data.total;
    let fim = Math.ceil(este.total / 20);
    if (este.pageAtual > 11) {
        for (var i = this.pageAtual - 5; i < este.pageAtual + 5 > fim ? este.pageAtual + 5 : fim; i++)
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
            url: IpServer + '/api/tool',
            mensagem: '',
            mensagemSuc: '',
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

        }
    },
    computed: {},
    components: {
        'b-modal': bModal,
        Stretch
    },
    directives: {
        'b-modal': bModalDirective
    },
    methods: {
        showModal() {
            this.errors = [];
            this.$refs.myModalRef.show()
        },
        hideModal() {
            this.$refs.myModalRef.hide()
        },
        showModalCad() {
            this.errors = [];
            this.$refs.modalCadTool.show()
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


        cadastrar(ferramenta) {
            // this.carregando = true; 
            this.mensagem = '';
            this.mensagemSuc = '';
            ferramenta.typeId = this.encontraObj(this.tipos, "name", ferramenta.typeName).id;
            console.log(ferramenta);
            axios.post(this.url, ferramenta).then((response) => {
                this.mensagemSuc = 'Ferramenta ' + ferramenta.name + ' cadastrada com sucesso.';
                this.ferramenta = {};
                this.ferramentas.push(ferramenta);
                this.carregando = false;
            }, (r) => {
                this.mensagem = 'Erro no server ' + r;
                this.carregando = false;
            })

        },
        listar() {
            this.carregando = true;
            this.ferramentas = [];
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };

            axios.get(this.url + "?orderField=" + this.orderField + "&order=" + this.order + "&fieldFilter=" + this.fieldFilter + "&fieldValue=" + this.fieldValue + "&startat=" + this.startat + "&quantity=" + this.quantityPage).then((response) => {
                this.ferramentas = response.data.values;
                console.log(this.ferramentas);
                for (var index in response.data.values) {
                    this.ferramentas[index].status = this.getStatus(response.data.values[index].status);
                }
                this.carregando = false;
                paginacao(response, this);
            }, (error) => {
                this.mensagem = 'Erro no server ' + error;
                this.carregando = false;
            })
        },
        editar(ferramenta) {
            this.carregando = true;
            this.mensagem = '';
            this.mensagemSuc = '';
            axios.put(this.url + '/' + ferramenta.id, ferramenta).then((response) => {
                this.mensagemSuc = 'Ferramenta ' + ferramenta.name + ' atualizada com sucesso.';
                this.ferramenta = {};
            }, (error) => {
                this.mensagem = 'Erro no server ' + error;
                this.carregando = false;
            })
        },
        buscaTipo() {
            axios.get(this.url + "type").then((response) => {
                this.tipos = response.data;
                console.log(this.tipos);
            }, (error) => {})
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
            this.ferramenta = f;
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