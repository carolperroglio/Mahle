import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'
import positionQtd from '../config/positiontooltype.json'
import { setTimeout } from 'timers';
import { position } from 'bootstrap-vue/es/utils/dom';

es6promisse.polyfill();

export default {
    name: "AssociateTool",
    data() {
        return {
            carregando: false,
            erro: false,
            msg: '',
            typeName: '',
            positionLength: '',
            fSelected: {},
            tools: [],
            toolList: [],
            Groups: [],
            Things: [],
            Tool: [],
            Thing: [],
            tool: '',
            toolName: '',
            typeId: '',
            thingId: '',
            groupId: '',
            fieldFilter: '',
            fieldValue: '',
            notSelected: true,
            group: false,
            thing: false,
            carregando: false,
            url: process.env.TOOLS_API,
            toolType: [],
            pos: 0
        }
    },
    computed: {},
    components: {
        'b-dropdown': bDropdown,
        'b-dropdown-item': bDropdownItem,
        'b-modal': bModal,
        Stretch
    },
    directives: {
        'b-modal': bModalDirective
    },
    methods: {
        showModal(id) {
            this.$refs[id].show();
        },
        hideModal(id) {
            this.$refs[id].hide();
        },
        getTools() {
            console.log(positionQtd);

            var id = this.$route.params.id;
            positionQtd.forEach(obj => {
                if (obj.toolTypeId == id) {
                    this.positionLength = obj.positionQtd;
                }
            })

            axios.get(this.url + '/api/tool?fieldFilter=' + '' + '&fieldValue=' + name).then((response) => {
                // positionQtd.positions.forEach(obj => {
                var x = 0;
                var positions = [];
                while (x < this.positionLength) {
                    positions.push(x + 1);
                    x++
                }
                for (var r = 0; r < response.data.values.length; r++) {
                    if (response.data.values[r].currentThing != undefined) {
                        response.data.values[r].position = 2;
                    }
                }
                x = 0;
                var posAux = {}
                response.data.values.forEach(obj => {
                    // obj.position = x + 1;
                    // x++;
                    if (obj.typeId == id) {
                        if (obj.currentThing != undefined) {
                            var newObj = {};
                            // PRECISA SER MODIFICADO, ISSO FOI FEITO DESSA FORMA PORQUE AINDA NÃO EXISTE POSITION NO JSON RECEBIDO
                            // if(obj.posiiton == null)
                            // newObj.position = obj.position
                            // newObj.position = x
                            var objaux = {};
                            for (var c = 0; c < positions.length; c++) {
                                if (positions[c] == obj.position) {
                                    positions[c] = null;
                                }
                            }
                            newObj.position = obj.position;
                            newObj["tool"] = obj;
                            this.tools.push(newObj);
                        } else {
                            this.toolList.push(obj);
                        }
                    }
                });

                var positiiionnnn = [];
                for (var s = 0; s < positions.length; s++) {
                    if (positions[s] != null) {
                        positiiionnnn.push(positions[s]);
                    }
                }

                var count = 0;
                // while (this.tools.length < this.positionLength) {
                while (count < positiiionnnn.length) {
                    var pos = positiiionnnn[count];
                    var objeto = new Object();
                    var objeto = {
                        "position": pos,
                        "tool": {
                            "toolId": null,
                            "name": "",
                            "description": "",
                            "serialNumber": null,
                            "code": null,
                            "lifeCycle": "",
                            "currentLife": "",
                            "unitOfMeasurement": "",
                            "typeId": undefined,
                            "typeName": "",
                            "status": "",
                            "currentThingId": undefined
                        }
                    }

                    count++;
                    this.tools.push(objeto);
                }
            }).catch((error) => {
                this.erro = true;
                this.carregando = false;
                this.msg = error.message;
                this.showModal("modalErro");
            })
        },
        getThingAllowedToAssociate(groupIdAllowed) {
            axios.get(this.url + '/gateway/thinggroups/' + groupIdAllowed).then((response) => {
                var thinggroup = response.data;
                this.thingId = thinggroup.things[0].thingId;
            })
        },
        getToolType(id) {
            this.carregando = true;
            this.group = true;
            axios.get(this.url + '/api/tooltype/' + id).then((response) => {
                this.toolType = response.data;
                this.getThingAllowedToAssociate(this.toolType.thingGroupIds[0]);
            }).catch((error) => {
                console.log(error);
                this.erro = true;
                this.msg = error.message;
                this.showModal("modalErro");
            })

        },

        AssociateTool(fSelected) {
            var id = this.$route.params.id;
            this.getToolType(id);

            setTimeout(() => {
                axios.put(this.url + '/api/tool/AssociateTool/associate?thingId=' + this.thingId + '&toolid=' + this.fSelected.toolId).then((response) => {
                    this.erro = false;
                    this.carregando = false;
                    this.msg = 'Ferramenta associada com sucesso';
                    this.showModal("modalErro");
                    this.getTools();
                    location.reload();
                }).catch((error) => {
                    this.erro = true;
                    this.carregando = false;
                    this.msg = error.message;
                    this.showModal("modalErro");
                })
            }, 1500)

        },
        DessassociateTool() {
            var id = this.$route.params.id;
            this.getToolType(id);

            setTimeout(() => {
                axios.put(this.url + '/api/tool/AssociateTool/disassociate?thingId=' + this.thingId + '&toolid=' + this.fSelected.toolId, this.fSelected).then((response) => {
                    this.erro = false;
                    this.carregando = false;
                    this.msg = 'Ferramenta desassociada com sucesso';
                    this.showModal("modalErro");
                    this.getTools();
                    location.reload();
                }).catch((error) => {
                    this.erro = true;
                    this.carregando = false;
                    this.msg = error.message;
                    this.showModal("modalErro");
                })
            }, 1500)
        },
        getStatus(status) {
            var state = {
                'available': "Disponível",
                'in_use': "Em uso",
                'in_maintenance': "Em manutenção",
                'not_available': "Indisponível",
                'inactive': "Inativo",
                'active': "Disponível"
            };
            return state[status];
        },
    },
    beforeMount: function() {
        this.getTools();
    }
};