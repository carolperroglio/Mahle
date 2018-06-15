import Vue from 'vue'
import axios from 'axios'
import es6promisse from 'es6-promise'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import {
    Stretch
} from 'vue-loading-spinner'
import VuePassword from 'vue-password'
import VueCookies from 'vue-cookies'
import {
    setTimeout
} from 'timers';
import Router from 'vue-router'
var app = require('../../../App.vue')
var pbkdf2 = require("pbkdf2")
const crypto = require('crypto');

Vue.use(VueCookies)
Vue.component(VuePassword)
es6promisse.polyfill();

var ipusergroup = process.env.USER_API;

export default {
    name: "Login",
    data() {
        return {
            urllogin: ipusergroup + "/api/login/",
            password: '',
            username: '',
            credentials: {},
            keyhashed: '',
            msgErro: "",
            erro: false,
            carregando: false,

        }
    },
    components: {
        'b-modal': bModal,
        Stretch
    },
    methods: {
        showModal(id) {
            this.$refs[id].show();
        },
        hashKey(keytohash, este) {
            // encripta
            var key = pbkdf2.pbkdf2Sync(keytohash, 'salt', 1, 32, 'sha512')
            key = key.toString('hex');

            console.log(key);

            return key;
        },
        storeUser(credential) {

            // Armazenando a chave de segurança no cookie
            VueCookies.set('security', credential.security, { expires: '12h' });
            VueCookies.set('username', this.username, { expires: '12h' });
            //chama o método que busca o username e atribui a nav
            app.default.methods.getUsername();
            //redireciona para a tela principal STATUS DO MES
            location.reload();
            this.$router.push({
                name: "StatusMES"
            });


            // VueCookies.set
        },
        login() {
            this.carregando = true;
            this.keyhashed = this.hashKey(this.password, this);
            console.log(this);
            console.log(VueCookies);

            setTimeout(() => {
                console.log(this.keyhashed);

                // obj to log - api/login
                var obj = {
                    password: this.keyhashed,
                    username: this.username,
                }

                axios.post(this.urllogin, obj)
                    .then((response) => {
                        VueCookies.set('status', "200");
                        this.carregando = false;
                        var credential = response.data;
                        // store the username,password, and security in the scope (this)
                        this.storeUser(credential);
                        console.log(credential);

                        // Defining cookie - session
                        console.log(Vue.Cookies)
                            // Vue.Cookies. Cookies.set(credential.username, 'Hello world!');

                    }).catch((error) => {
                        this.carregando = false;
                        if (error.response) {
                            var status = error.response.status;
                            if (status == 401) {
                                this.erro = true;
                                this.msgErro = "Usuário sem permissão";
                                this.showModal("modaInfo");
                                VueCookies.set('status', status);
                                console.log(error.message);
                            } else if (status == 404) {
                                this.erro = true;
                                this.msgErro = "Senha e/ou usuário inválido/inexistente";
                                this.showModal("modaInfo");
                                VueCookies.set('status', status);
                                console.log(error.message);
                            }
                        } else {
                            var status = error.status;
                            this.erro = true;
                            this.msgErro = "Usuário não existente";
                            this.showModal("modaInfo");
                            VueCookies.set('status', status);
                            console.log(status);
                        }
                    })
            }, 2000)
        },
        returnToScreen() {
            var statuscode = VueCookies.get('status');
            setTimeout(() => {
                if (statuscode == 404) {
                    this.erro = true;
                    this.msgErro = "Senha inválida";
                    this.showModal("modaInfo");
                    this.$router.push({ name: "Login" })
                } else if (statuscode == "Network Error") {
                    this.erro = true;
                    this.msgErro = "Sem acesso a esta tela";
                    this.showModal("modaInfo");
                    this.$router.push({ name: "Login" })
                } else if (statuscode == "no-security") {
                    this.erro = true;
                    this.msgErro = "Login expirou - favor efetuar o login novamente";
                    this.showModal("modaInfo");
                    this.$router.push({ name: "Login" })
                }
            }, 1500);

        }
    },
    beforeMount: function() {
        this.returnToScreen();
    }
}