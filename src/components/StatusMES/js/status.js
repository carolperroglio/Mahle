import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import { setTimeout } from 'timers';

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
    name: "StatusMES",
    data() {
        return {
            url: 'http://brsbap01:8006/api/thingstatus/',
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
            id: ''
        }
    },
    methods: {
        getThingsGroup: function() {
            axios.get(this.urlThingsGroup).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
        }
    },
    beforeMount() {
        this.getThingsGroup();
    }
}