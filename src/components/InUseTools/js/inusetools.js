import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
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
            url: 'http://34.239.125.82:8005/api/tool/inuse'
        }
    },
    methods: {
        buscar(id = "") {
            this.carregando = true;
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.tools = [];
            axios.get(this.url).then((response) => {
                paginacao(response, this);
                this.tools = response.data;
                for (var index in response.data){
                    switch(response.data[index].status){
                        case "available":
                        this.tools[index].status = "Disponível";
                        break;
                        case "in_use":                    
                        this.tools[index].status = "Em uso";
                        break;
                        case "in_maintenance":
                        this.tools[index].status = "Em manutenção";
                        break;
                        case "not_available":
                        this.tools[index].status = "Indisponível";
                        break;
                        case "inactive":
                        this.tools[index].status = "Inativo";
                        break;
                        case "active":
                        this.tools[index].status = "Disponível";
                        break;
                    }
                }
                console.log(this.tools);
                this.carregando = false;
            }, (response) => {
                this.mensagem = response.data;
                this.carregando = false;
            })
        },
    },
    beforeMount() {
        this.buscar();
    }
}