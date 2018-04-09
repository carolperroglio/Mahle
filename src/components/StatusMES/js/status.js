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

var IpServer = process.env.HIST_ALARM_API;

export default {
    name: "StatusMES",
    data() {
        return {
            url: IpServer + '/api/alarm/',
            urlThings: process.env.THINGS_API + '/api/things/',
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
            things: [],
            showCollapse: false,
            lastId: {}
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
        onEnable(id) {
            $("#" + id).toggle();
        },
        getThings() {
            axios.get(this.urlThings).then((response) => {
                this.things = response.data;
            }, (error) => {
                console.log(error);
            })
        },
        getStatus() {
            this.carregando = true;
            setTimeout(() => {
                axios.get(this.url).then(response => {
                    this.status = response.data;
                    var alarms = [];

                    this.status.forEach(s => {
                        s.hasRedAlert = false;
                        s.hasLowAlert = false;
                        s.hasGreenAlert = false;
                        for (var i = 0; i < this.things.length; i++) {
                            if (s.thingId == this.things[i].thingId) {
                                s.thingName = this.things[i].thingName;
                            }
                        }
                    });
                    this.status.forEach(s => {
                        for (var i = 0; i < s.alarms.length; i++) {
                            if (s.alarms[i].priority == 2) {
                                s.hasRedAlert = true;
                            } else if (s.alarms[i].priority == 1 && s.hasRedAlert == false) {
                                s.hasLowAlert = true;
                            } else if (s.alarms[i].priority == 0 && s.hasRedAlert == false && s.hasLowAlert == false) {
                                s.hasGreenAlert = true;
                            }
                        }
                    });

                    this.carregando = false;
                }).catch(error => {
                    console.log(error);
                })
            }, 200);
        },
        getClass(objeto) {
            var string = {
                'border-radius': '4px',
                'padding': '2%',
                'transition': 'background-color 1000ms linear',
                'box-shadow': '1.5px 1.5px 2px #eee, 1.5px 1.5px 0px #707070',
                'height': '100%'
            }
            if (objeto.hasRedAlert) {
                string["background-color"] = '#ed0404';
            } else if (objeto.hasLowAlert && !objeto.hasRedAlert) {
                string["background-color"] = '#f5fc28';
            } else if (objeto.hasGreenAlert && !objeto.hasRedAlert && !objeto.hasLowAlert) {
                string["background-color"] = '#4bff30';
            }

            return string;
        }
    },
    beforeMount: function() {
        this.getThings();
        this.getStatus();

    }
}