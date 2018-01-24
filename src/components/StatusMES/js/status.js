import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import { setTimeout } from 'timers';
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse';
import bButton from 'bootstrap-vue/es/components/button/button'
import vBToggle from 'bootstrap-vue/es/directives/toggle/toggle'

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
            status: [],
            pages: [],
            pageAtual: 0,
            orderField: '',
            order: '',
            fieldFilter: '',
            fieldValue: '',
            id: '',
           
        }
    },
    components: {
        'b-collapse': bCollapse,
        'b-button': bButton,
    },
    directives: {
        'b-toggle': vBToggle
    },
    methods: {
        getStatus(){
            this.carregando = true;
            axios.get(this.url).then(response => {
                this.status = response.data;
                console.log(this.status);
                this.carregando = false;
            }).catch(error => {
                console.log(error);
            })
        }
    },
    beforeMount: function() {
        this.getStatus();
    }
}