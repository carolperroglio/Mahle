import Vue from 'vue'
import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'
import VuePassword from 'vue-password'
import passwordHash from 'password-hash-and-salt'
import { setTimeout } from 'timers';
Vue.component(VuePassword)
es6promisse.polyfill();

var ipuser = process.env.USER_API;

export default {
    name: "User",
    data() {
        return {
            urluser: ipuser + "/api/users/",
            chart: {},
            password: "",
            carregando: false,
            userlist: [],
            /*properties from user obj*/
            name: "",
            username: "",
            password: "",
            passwordconfirm: "",
            email: "",
            /* ---------------*/
            cabecalhoSetas: [false, false, false, false, false],
            msgErro: "",
            /*OBJ UPDATE USER*/
            objUser: {},
            /* ---------------*/
            erro: false,
            keyhashed: ""
        }
    },
    components: {
        'b-dropdown': bDropdown,
        'b-dropdown-item': bDropdownItem,
        'b-modal': bModal,
        Stretch
    },
    computed: {},
    methods: {
        showModal(id) {
            this.$refs[id].show();

            if (id == "modaInfo") {
                this.$refs[id].show();
                this.$refs.cadUser.hide();
            }
        },
        hideModal(id) {
            this.$refs[id].hide();
        },
        organizar(array, campo, pos) {
            array.sort(function(a, b) {
                return (a[campo] > b[campo]) ? 1 : ((b[campo] > a[campo]) ? -1 : 0);
            });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = false;
        },
        desorganizar(array, campo, pos) {
            array.sort(function(a, b) {
                return (a[campo] > b[campo]) ? -1 : ((b[campo] > a[campo]) ? 1 : 0);
            });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = true;
                else
                    this.cabecalhoSetas[i] = false;
        },
        b64EncodeUnicode(str) {
            // first we use encodeURIComponent to get percent-encoded UTF-8,
            // then we convert the percent encodings into raw bytes which
            // can be fed into btoa.
            var x = btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                function toSolidBytes(match, p1) {
                    return String.fromCharCode('0x' + p1);
                }));
            return x;
            console.log(x);
        },
        b64DecodeUnicode(str) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            return decodeURIComponent(atob(str).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        },
        hashKey(keytohash, este) {
            var keyhashed;
            // Creating hash and salt 
            passwordHash(keytohash).hash(function(error, hash) {
                if (error)
                    throw new Error('Something went wrong!');

                // Store hash (incl. algorithm, iterations, and salt) 

                // Verifying a hash 
                passwordHash('hack').verifyAgainst(keyhashed, function(error, verified) {
                    if (error)
                        throw new Error('Something went wrong!');
                    if (!verified) {
                        console.log("Don't try! We got you!");
                    } else {
                        console.log("The secret is...");
                    }
                });
                keyhashed = hash;
                este.keyhashed = hash;
                console.log("keyhashed" + keyhashed);
            })
        },
        assignValue(keyhashed) {
            this.keyhashed = keyhashed;
        },
        cleanVariableCreate() {
            this.name = "";
            this.username = "";
            this.password = "";
            this.passwordconfirm = "";
            this.email = "";
        },
        /**
         * CRUD USER
         */
        getUsers() {
            axios.get(this.urluser).then((response) => {
                this.userlist = response.data.values;

            }).catch(error => {
                this.erro = true;
                this.msgErro = error.message;
                showModal("modaInfo");
            })
        },
        createUser() {
            // this.keyhashed;
            this.hashKey(this.password, this);
            setTimeout(() => {
                var userInfo = {
                    username: this.username,
                    name: this.name,
                    password: this.keyhashed,
                    email: this.email,
                    enabled: true,
                }
                axios.post(this.urluser, userInfo).then((response) => {
                    this.userlist = response.data.values;
                    this.msgErro = "Usuário criado com Sucesso";
                    this.showModal("modaInfo");
                    this.getUsers();
                }).catch(error => {
                    this.erro = true;
                    this.msgErro = error.message;
                    this.showModal("modaInfo");
                })
            }, 1000)
        },
        updateUser(id) {
            console.log(this.objUser);
            console.log("id:" + id);

            this.hashKey(this.objUser.password, this);

            setTimeout(() => {
                this.objUser.password = this.keyhashed;
                axios.put(this.urluser + id, this.objUser).then((response) => {
                    this.msgErro = "Usuário atualizado com Sucesso";
                    this.showModal("modaInfo");
                    this.getUsers();
                }).catch(error => {
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro:" + error.message;
                    this.showModal("modaInfo");
                })
            }, 1500)
        },
        deleteUser(id) {
            console.log(this.objUser);
            console.log("id:" + id);

            axios.delete(this.urluser + id, this.objUser).then((response) => {
                this.msgErro = "Usuário excluido com Sucesso";
                this.showModal("modaInfo");
                this.getUsers();
            }).catch(error => {
                this.erro = true;
                this.msgErro = "Ocorreu um erro:" + error.message;
                this.showModal("modaInfo");
            })
        }
        /**
         * END CRUD USER
         */
    },
    beforeMount: function() {
        this.b64EncodeUnicode('✓ à la mode');
        this.getUsers();
    }
}