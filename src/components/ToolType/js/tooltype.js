import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import { setTimeout } from 'timers';
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

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

var ipServer = process.env.TOOLS_API;

export default {
    name: "ToolType",
    data() {
        return {
            urlToolType: ipServer + '/api/tooltype/',
            urlThingsGroup: ipServer + '/gateway/thinggroups',
            toolsType: [],
            tooltype: {},
            tooltypeUp: {},
            thingsGroup: [],
            groups: [],
            groupSelected: {},
            ttCreated: false,
            ttUpdated: false,
            ttDeleted: false,
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
            cabecalhoSetas: [false, false, false, false, false],
        }
    },
    components: {
        'b-modal': bModal
    },
    directives: {
        'b-modal': bModalDirective
    },
    methods: {

        showModal() {
            this.$refs.myModalRef.show()
        },
        hideModal() {
            this.$refs.myModalRef.hide()
        },
        showModalEdit() {
            this.$refs.myModalEdit.show()
        },
        hideModalEdit() {
            this.$refs.myModalEdit.hide()
        },
        organizar(hp, campo, pos) {
            hp.sort(function(a, b) {
                return (a[campo] > b[campo]) ? 1 : ((b[campo] > a[campo]) ? -1 : 0);
            });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = false;
        },
        desorganizar(hp, campo, pos) {
            hp.sort(function(a, b) {
                return (a[campo] > b[campo]) ? -1 : ((b[campo] > a[campo]) ? 1 : 0);
            });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = true;
                else
                    this.cabecalhoSetas[i] = false;
        },
        //
        // GET THINGSGROUP
        //
        getThingsGroup: function() {
            axios.get(this.urlThingsGroup).then(response => {
                this.thingsGroup = response.data;
                console.log(this.thingsGroup);
            }).catch(error => {
                console.log(error);
            })
        },
        //
        // CRUD TOOLTYPE
        //
        getToolType: function() {
            axios.get(this.urlToolType).then(response => {
                this.toolsType = response;
            }).catch(error => {
                console.log(error);
            })
        },
        createToolType: function(data) {
            data.thingGroupIds = [];
            data.status = 'available';
            for (var i = 0; i < this.groups.length; i++) {
                data.thingGroupIds.push(this.groups[i].thingGroupId);
            }
            console.log(data);
            axios.post(this.urlToolType, data).then(response => {
                this.ttCreated = true;
                setTimeout(function() {
                    this.ttCreated = false;
                }, 2000)
                console.log('TT CREATED');
            }).catch(error => {
                console.log(error);
            })
        },
        updateToolType: function(data) {
            // data.thingGroupIds = [];
            // data.status = 'available';
            for (var i = 0; i < this.groups.length; i++) {
                data.thingGroupIds.push(this.groups[i].thingGroupId);
            }
            console.log(data);
            axios.put(this.urlToolType, data).then(response => {
                this.ttUpdated = true;
                setTimeout(function() {
                    this.ttUpdated = false;
                }, 2000)
                console.log('TT EDITED');
            }).catch(error => {
                console.log(error);
            })
        },
        deleteToolType: function(obj) {
            var id = obj.id;
            axios.delete(this.urlToolType + id).then(response => {
                this.ttDeleted = true;
                setTimeout(function() {
                    this.ttDeleted = false;
                }, 2000)
                this.tooltypeUp = {};
                console.log("Deleted")
            }).catch(error => {
                console.log(error);
            })
        },
        //
        // ASSOCIATE OBJ FROM EDIT TO VARIABLE
        //
        catchObjToUpdate: function(obj) {
            this.tooltypeUp = obj;
            this.groups = [];
            for (var count = 0; count < obj.thingGroups.length; count++) {
                this.groups.push(obj.thingGroups[count]);
            }
            console.log(this.tooltypeUp);
        },
        //
        // ADDING 'N REMOVING GROUP FROM TOOLSTYPE
        //
        addThingsGroup: function(group) {
            var sameObj = false;
            for (var i = 0; i < this.groups.length; i++) {
                if (this.groups[i].thingGroupId == group.thingGroupId) {
                    sameObj = true;
                }
            }
            if (!sameObj) this.groups.push(group);
        },
        removeGroup: function(obj) {
            var groups = this.groups;
            this.groups = [];
            for (var x = 0; x < groups.length; x++) {
                if (groups[x].thingGroupId != obj.thingGroupId) {
                    this.groups.push(groups[x]);
                }
            }
            return this.groups;

        },
        //
        // PAGINAÇÃO //
        //
        buscar(id = "") {
            this.carregando = true;
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.toolsType = [];
            console.log(this.order, this.orderField)
            axios.get(this.urlToolType + "?orderField=" + this.orderField + "&order=" + this.order + "&fieldFilter=" + this.fieldFilter + "&fieldValue=" + this.fieldValue + "&startat=" + this.startat + "&quantity=" + this.quantityPage, config).then((response) => {
                paginacao(response, this);
                this.toolsType = response.data;
                console.log('this.recipes');
                console.log(this.recipes);

                this.carregando = false;
            }, (error) => {
                this.mensagem = 'Erro no server ao buscar ' + error;
                this.carregando = false;
            })
            console.log(this.toolsType);
        },
    },
    beforeMount() {
        this.buscar();
        this.getThingsGroup();
    }
}