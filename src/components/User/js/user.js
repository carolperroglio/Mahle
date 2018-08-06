import Vue from 'vue'
import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'
import VuePassword from 'vue-password'
import { setTimeout } from 'timers';
import pbkdf2 from 'pbkdf2'
import crypto from 'crypto'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);
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
            keyhashed: "",
            /*  Msg pra checagem de usuário*/
            showMsg: false,
            msgUser: '',
            userExist: false,
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
            // encripta
            var key = pbkdf2.pbkdf2Sync(keytohash, 'salt', 1, 32, 'sha512')
            key = key.toString('hex');

            console.log(key);

            this.keyhashed = key;
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
            this.showMsg = false;
            this.userExist = false;
            this.msgUser = "";
        },
        validateForm() {
            var valid = this.$refs.ruleForm.validity;
            if (valid.valid) {
                return true;
            } else {
                console.log('error submit!!');
                console.log(valid);
                return false;
            }
        },
        checkUser(username) {
            this.showMsg = false;
            this.userExist = false;

            for (var x = 0; x < this.userlist.length; x++) {
                if (this.userlist[x].username == username) {
                    this.msgUser = "Nome de Usuário já existe!"
                    this.showMsg = true;
                    this.userExist = true;
                }
            }
            if (!this.showMsg) {
                this.showMsg = true;
                this.msgUser = "Nome de Usuário OK!"
                this.userExist = false;
            }
        },
        /**
         * CRUD USER
         */
        getUsers() {

            axios.get(this.urluser).then((response) => {
                this.userlist = response.data.values;

            }).catch((error) => {
                if (error.message == "Network Error") {
                    this.erro = true;
                    console.log(error);
                    this.msgErro = "Sem acesso a esta tela";
                    this.showModal("modaInfo");
                    VueCookies.set('status', error.message);
                }

            })
        },
        createUser() {
            // this.keyhashed;
            this.hashKey(this.password, this);
            // Verifica se a senha possui pelo menos um número e uma letra
            var isValid = this.validateForm();
            console.log("isValid: " + isValid);
            //Verifica se as senhas conferem para cadastrar o usuário
            if (this.objUser.password == this.objUser.passwordconfirm && isValid) {
                setTimeout(() => {
                    var userInfo = {
                        username: this.username,
                        name: this.name,
                        password: this.keyhashed,
                        email: this.email,
                        enabled: true,
                    }
                    console.log(userInfo);
                    axios.post(this.urluser, userInfo).then((response) => {
                        this.userlist = response.data.values;
                        this.erro = false;
                        this.msgErro = "Usuário criado com Sucesso";
                        this.showModal("modaInfo");
                        this.getUsers();
                    }).catch((error) => {
                        this.erro = true;
                        this.msgErro = error.message;
                        this.showModal("modaInfo");
                        VueCookies.set('status', error.message);
                    })
                }, 1000)
            } else {
                this.erro = true;
                this.msgErro = "Cadastro inválido"
                this.showModal("modaInfo");
            }
        },
        updateUser(id) {
            console.log(this.objUser);
            console.log("id:" + id);

            this.hashKey(this.objUser.password, this);
            // Verifica se a senha possui pelo menos um número e uma letra
            var isValid = this.validateForm();
            console.log("isValid: " + isValid);
            //Verifica se as senhas conferem para cadastrar o usuário
            if (this.objUser.password == this.objUser.passwordconfirm && isValid) {
                setTimeout(() => {
                    this.objUser.password = this.keyhashed;
                    console.log(this.objUser);
                    axios.put(this.urluser + id, this.objUser).then((response) => {
                        this.erro = false;
                        this.msgErro = "Usuário atualizado com Sucesso";
                        this.showModal("modaInfo");
                        this.getUsers();
                    }).catch((error) => {
                        this.erro = true;
                        this.msgErro = "Ocorreu um erro:" + error.message;
                        this.showModal("modaInfo");
                        VueCookies.set('status', error.message);
                    })
                }, 1500)
            } else {
                this.erro = true;
                this.msgErro = "Cadastro inválido"
                this.showModal("modaInfo");
            }
        },
        deleteUser(id) {
            console.log(this.objUser);
            console.log("id:" + id);

            axios.delete(this.urluser + id, this.objUser).then((response) => {
                this.erro = false;
                this.msgErro = "Usuário excluido com Sucesso";
                this.showModal("modaInfo");
                this.getUsers();
            }).catch((error) => {
                this.erro = true;
                this.msgErro = "Ocorreu um erro:" + error.message;
                this.showModal("modaInfo");
                VueCookies.set('status', error.message);
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