import Vue from 'vue'
import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import { Stretch } from 'vue-loading-spinner'
import VuePassword from 'vue-password'
Vue.component(VuePassword)
es6promisse.polyfill();

var ipusergroup = process.env.USER_API;

export default {
    name: "Usergroup",
    data() {
        return {
            urlusergroup: ipusergroup + "/api/usergroups/",
            urluser: ipusergroup + "/api/users/",
            urlpermission: ipusergroup + "/api/permissions/",
            urladdpermission: ipusergroup + "/api/usergroups/permissions/",
            urladduser: ipusergroup + "/api/usergroups/users/",
            chart: {},
            password: "",
            carregando: false,
            usergrouplist: [],
            /*properties from Usergroup obj*/
            name: "",
            description: "",
            users: [],
            permissions: [],
            /* ---------------*/
            cabecalhoSetas: [false, false, false, false, false],
            msgErro: "",
            /*OBJ UPDATE Usergroup*/
            objUserGroup: {},
            /* ---------------*/
            erro: false,
            blockButton: true,
            blockButtonUser: true,
            keyhashed: "",
            userlist: [],
            inicialuserlist: [],
            permissionsList: [],
            incialPermissionList: [],
            uSelected: {},
            pSelected: {},
            users2: '',
            traducao:{
                historian_production__allow_read : 'Apontamentos visualização',
                historian_productio__allow_update : 'Apontamentos edição',
                permissions__allow_read : 'Permissão visualização',
                production_order__allow_read : 'Ordem de produção visualização',
                production_order__allow_update : 'Ordem de produção edição',
                products__allow_read : 'Matéria prima visualização',
                products__allow_update : 'Matéria prima edição',
                quality__allow_read : 'Análise química visualização',
                quality__allow_update : 'Análise química edição',
                recipes__allow_read : 'Gerenciamento liga e tira visualização',
                recipes__allow_update : 'Gerenciamento liga e tira edição',
                report__allow_read : 'Relatórios visualização',
                report__allow_update : 'Relatórios edição',
                tools__allow_read : 'Ferramentas visualização',
                tools__allow_update : 'Ferramentas edição',
                usergroups__allow_read : 'Grupo de usuários visualização',
                usergroups__allow_update : 'Grupo de usuários edição',
                user__allow_read : 'Usuários visualização',
                user__allow_update : 'Usuários edição'
            }
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
            var blockButton = true
            var blockButtonUser = true
            this.$refs[id].show();
            this.blockButton = JSON.parse(JSON.stringify(blockButton));
            this.blockButtonUser = JSON.parse(JSON.stringify(blockButtonUser));
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
            this.description = "";
            this.users = [];
            this.permissions = [];
        },
        getUsers() {
            this.userlist = [];
            axios.get(this.urluser).then((response) => {
                this.userlist = response.data.values;
                this.inicialuserlist = response.data.values;


            }).catch(error => {
                this.erro = true;
                this.msgErro = error.message;
                this.showModal("modaInfo");
                VueCookies.set('status', error.message);
            })
        },
        getPermissions() {
            this.permissionsList = [];

            axios.get(this.urlpermission).then((response) => {
                var data = response.data;
                var list = []
                var obj = {};
                for (var key in data) {
                    list.push(key);
                    this.permissionsList.push(key);
                }

                this.incialPermissionList = list;


            }).catch(error => {
                this.erro = true;
                this.msgErro = error.message;
                this.showModal("modaInfo");
                VueCookies.set('status', error.message);
            })
        },
        /**
         * CRUD Usergroup
         */
        getUsergroups() {
            
            this.usergrouplist = [];
            axios.get(this.urlusergroup).then((response) => {
                this.usergrouplist = response.data.values;

            }).catch(error => {
                this.erro = true;
                this.msgErro = error.message;
                this.showModal("modaInfo");
                VueCookies.set('status', error.message);
            })
        },
        createUser() {
            setTimeout(() => {
                var usergroupInfo = {
                    name: this.name,
                    description: this.description,
                    users: this.users,
                    enabled: true,
                    permissions: this.permissions
                }
                axios.post(this.urlusergroup, usergroupInfo).then((response) => {
                    this.usergrouplist = response.data.values;
                    this.msgErro = "Usuário criado com Sucesso";
                    this.showModal("modaInfo");
                    this.getUsergroups();
                    this.getUsers();
                    this.getPermissions();
                }).catch(error => {
                    this.erro = true;
                    this.msgErro = error.message;
                    this.showModal("modaInfo");
                    VueCookies.set('status', error.message);
                })
            }, 1000)
        },
        updateUserGroup(id) {
            console.log(this.objUserGroup);
            console.log("id:" + id);

            axios.put(this.urlusergroup + id, this.objUserGroup).then((response) => {
                this.msgErro = "Usuário atualizado com Sucesso";
                this.showModal("modaInfo");
                this.getUsergroups();
                this.getUsers();
                this.getPermissions();
            }).catch(error => {
                this.erro = true;
                this.msgErro = "Ocorreu um erro:" + error.message;
                this.showModal("modaInfo");
                VueCookies.set('status', error.message);
            })
        },
        deleteUsergroup(id) {
            console.log(this.objUserGroup);
            console.log("id:" + id);

            axios.delete(this.urlusergroup + id, this.objUserGroup).then((response) => {
                this.msgErro = "Usuário excluido com Sucesso";
                this.showModal("modaInfo");
                this.getUsergroups();
                this.getUsers();
                this.getPermissions();
            }).catch(error => {
                this.erro = true;
                this.msgErro = "Ocorreu um erro:" + error.message;
                this.showModal("modaInfo");
                VueCookies.set('status', error.message);
            })
        },
        addUserToGroup(obj, id) {
            console.log("id:" + id);

            axios.post(this.urladduser + id, obj)
                .then((response) => {
                    this.users.push(obj);

                    var newListUser = this.userlist.filter(user => {
                        return user.userId != obj.userId;
                    })
                    this.userlist = newListUser;
                }).catch(error => {
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro:" + error.message;
                    this.showModal("modaInfo");
                    VueCookies.set('status', error.message);
                })
        },
        removeUserFromGroup(obj, id) {
            var config = {
                data: obj
            }
            console.log("id:" + id);
            console.log(obj);

            axios.delete(this.urladduser + id, config)
                .then((response) => {
                    var newUser = this.users.filter(user => {
                        return user.userId != obj.userId;
                    })

                    this.userlist.push(obj);
                    this.users = newUser;
                }).catch(error => {
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro:" + error.message;
                    this.showModal("modaInfo");
                    VueCookies.set('status', error.message);
                })
        },
        addPermissionToGroup(obj, id) {
            axios.post(this.urladdpermission + id + "?&permission=" + obj)
                .then((response) => {
                    var newPermissionList = this.permissionsList.filter(p => {
                        return p != obj;
                    })
                    this.permissionsList = newPermissionList;
                    this.permissions.push(obj);
                }).catch(error => {
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro:" + error.message;
                    this.showModal("modaInfo");
                    VueCookies.set('status', error.message);
                })



        },
        removePermissionOfGroup(obj, id) {
            axios.delete(this.urladdpermission + id + "?&permission=" + obj)
                .then((response) => {
                    var newpermission = this.permissions.filter(perm => {
                        return perm != obj;
                    })
                    this.permissions = newpermission;
                    this.permissionsList.push(obj)
                }).catch(error => {
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro:" + error.message;
                    this.showModal("modaInfo");
                    VueCookies.set('status', error.message);
                })

        },
        //EM CONSTRUÇÃO
        checkPermissionList(obj) {
            this.permissions = [];
            var newListPermission = [];
            this.permissionsList = JSON.parse(JSON.stringify(this.incialPermissionList));

            for (var x = 0; x < obj.permissions.length; x++) {
                for (var i = 0; i < this.permissionsList.length; i++) {
                    if (obj.permissions[x] == this.permissionsList[i])
                        this.permissionsList[i] = null;
                }
            }

            for (var i = 0; i < this.permissionsList.length; i++) {
                if (this.permissionsList[i] != null) {
                    newListPermission.push(this.permissionsList[i]);
                }
            }

            this.permissionsList = newListPermission;

            // if (obj.permissions.length > 0) {
            //     for (var i = 0; i < obj.permissions.length; i++) {
            //         for (var x = 0; x < this.permissionsList.length; x++) {
            //             if (obj.permissions[i] != this.permissionsList[x]) {
            //                 newListPermission.push(this.permissionsList[x]);
            //             }
            //         }
            //     }
            //     this.permissionsList = newListPermission;
            // } else {
            //     this.permissionsList = this.incialPermissionList;
            // }

        },
        checkUserList(obj) {
            this.users = [];
            var newListUser = [];
            this.userlist = JSON.parse(JSON.stringify(this.inicialuserlist));

            // verifica se o usuário ja exite no grupo, se sim, remove da lista
            if (obj.users.length > 0) {
                for (var i = 0; i < this.userlist.length; i++) {
                    for (var x = 0; x < obj.users.length; x++) {
                        if (obj.users[x].userId == this.userlist[i].userId) {
                            this.userlist[i].hasUser = true;
                            // newListUser.push(this.userlist[i]);
                        }
                    }
                }

                for (var i = 0; i < this.userlist.length; i++) {
                    if (!this.userlist[i].hasUser) {
                        newListUser.push(this.userlist[i]);
                    }
                }

                this.userlist = newListUser;
            } else {
                this.userlist = this.inicialuserlist;
            }


            if (obj.users.length >= 0) {
                this.users = obj.users;
            }
            if (obj.permissions.length >= 0) {
                this.permissions = obj.permissions;
            }

        },
        /**
         * END CRUD Usergroup
         */
        getTesteInterceptor() {
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'security': 'CfDJ8D81hm4ZEFZJlBwEqRbZXj9XCdNtlEGuoRm4d42LbQxy-L_EDU61QwmmMF2N82UsdfJD4hexGKe8d3QECAN4DfjC5cXpXwnYEr2ymidc8jyG-9y8NThRJtHhGnC66AiJvG__SHLUEccL5YF2ZG2_682amxDwKgUj0RhloTPzIFmA2i4BYNPPftDd6a9_ULbe1Szor5EOuF2jAlD-WLVjFq1qCSHyQQ_8E2MFjK1V5LQx3wy7eeANxZCpq9Vkpaxvv7NoNQJC941AGJB8-WOEx8mjVQdtLc_x-24JvPPEvXbLFDyH5DThih5ibJptLXdNjlcjqOGpVlmCEyzGFO-qxHlmj20ZoFBg2piX7cvauRB2GcTrJuWSo5eLyI-X23ewj_PpTfFz4OL0ngPZrMd-7U6pMt2mQB6ZJQ7TNziYVPO8WR93nXdMXKSPWC4-yWUDXflXmU5MLqwyW4XrjURktow'
                }
            }
            this.userlist = [];
            axios.get(this.urluser, config).then((response) => {
                this.userlist = response.data.values;
                this.inicialuserlist = response.data.values;


            }).catch(error => {
                this.erro = true;
                this.msgErro = error.message;
                this.showModal("modaInfo");
            })
            axios.interceptors.request.use(function(config) {
                // Do something before request is sent
                console.log(config);
                return config;
            })
        }
    },
    watch: {
        users: function() {
            this.msgErro = "banana"
            console.log(this.users);
            return this.users;
        }

    },
    beforeMount: function() {
this.getUsergroups();
        this.getUsers();
        this.getPermissions();
    }
}