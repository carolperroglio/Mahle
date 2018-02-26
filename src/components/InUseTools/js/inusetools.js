import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
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

export default {
    name: "InUseTools",
    data() {
        return {
            tools: [],
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
            url: process.env.TOOLS_API
        }
    },       
    components: {
        Stretch
    },
    methods: {
        buscar(id = "") {
            this.carregando = true;
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.tools = [];
            axios.get(this.url+'/api/tool/inuse').then((response) => {
                paginacao(response, this);
                this.tools = response.data;
                for (var index in response.data){
                    this.tools[index].status = this.getStatus(response.data[index].status);
                }
                console.log(this.tools);
                this.carregando = false;
            }, (response) => {
                this.mensagem = response.data;
                this.carregando = false;
            })
        },
        getStatus (status){
            var state = {
                'available': "Disponível",
                'in_use': "Em uso",
                'in_maintenance': "Em manutenção",
                'not_available': "Indisponível",
                'inactive': "Inativo",
                'active': "Disponível"
                };
            return state[status];
        }
    },
    beforeMount() {
        this.buscar();
    }
}