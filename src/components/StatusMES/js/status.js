import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import { setTimeout } from 'timers'
import bButton from 'bootstrap-vue/es/components/button/button'
import vBToggle from 'bootstrap-vue/es/directives/toggle/toggle'
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse'
import Vue from 'vue'
import VueTiles from 'vue-tiles'
import 'vue-tiles/dist/vue-tiles.css'
import { LinkTile, ContentSm, ContentMd, ContentLg } from 'vue-tiles'
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
    name: "StatusMES",
    data() {
        return {
            url: process.env.STATUS_API + '/api/thingstatus/',
            carregando: false,
            quantityPage: 20,
            startat: 0,
            total: 0,
            status: [],
            stat: {},
            pages: [],
            pageAtual: 0,
            orderField: '',
            order: '',
            fieldFilter: '',
            fieldValue: '',
            bottom: 'bottom',
            idstat: '',
            idstatcollpse: '',
            themeArr: ['theme1', 'theme2', 'theme3', 'theme4', 'theme5'],
            selectedTheme: [],           
        }
    },
    components: {
        'b-button': bButton,
        'link-tile': LinkTile,
        'content-sm': ContentSm,
        'content-md': ContentMd,
        'content-lg': ContentLg,
        'b-collapse': bCollapse,
        Stretch
    },
    directives: {
        'b-toggle': vBToggle,
        'v-b-toggle': vBToggle
    },
    methods: {
        onEnable(s) {
            this.stat = {};
            this.stat = s;
        },
        getStatus(){
            this.carregando = true;
            setTimeout(() => {
                axios.get(this.url).then(response => {
                    this.status = response.data;
                    for(var i = 0; i < this.status.length; i++){
                        this.selectedTheme[i] = this.themeArr[Math.floor(Math.random() *  this.themeArr.length)];
                    }
                    this.carregando = false;
                }).catch(error => {
                    console.log(error);
                })
            }, 200);
        }
        },
    beforeMount: function() {
        this.getStatus();
    }
}