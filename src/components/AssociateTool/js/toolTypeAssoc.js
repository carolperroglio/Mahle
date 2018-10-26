import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'

es6promisse.polyfill();

export default {
    name: "toolTypeAssociate",
    data() {
        return {
            carregando: false,
            Tools: [],
            AllTools: [],
            Groups: [],
            Things: [],
            Tool: [],
            Thing: [],
            tool: '',
            toolName: '',
            toolId: '',
            thingId: '',
            typeId: '',
            groupId: '',
            mensagem: '',
            mensagemSuc: '',
            fieldFilter: '',
            fieldValue: '',
            notSelected: true,
            group: false,
            thing: false,
            lista: false,
            lista2: false,
            carregando: false,
            url: process.env.TOOLS_API,
            toolType: [],            
            desbobinador:[],                 
            formadoraDeCanal:[],                                                
            fornoDeBronze:[],            
            fusao:[],                
            resfriamento:[],            
            fresaDeDesbaste:[],
            tesoura:[],            
            tracionador:[],                                   
            orderTools : ['8','9','6','5','4','17','7','16','21','14','15','2','10','13','19','18','3','12','11','20']
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
        getTools(name) {
            var array = [];
            if (name.length < 3) { return; }
                axios.get(this.url + '/api/tool?fieldFilter=name&fieldValue=' + name).then((response) => {
                    response.data.values.forEach((pro) => {
                        array.push(pro);
                        console.log(response);
                    });
                }, (error) => {
                    console.log(error);
                })
            return array;
        },        
        getToolType() {
            this.carregando = true;
            this.group = true;
            axios.get(this.url + '/api/tooltype/').then((response) => {                
                // var valida = true; var j = 0;
                // this.orderTools.forEach((o)=>{
                //     j=0;valida=true;
                //     while(valida && j<response.data.length){                                                     
                //         if(o == response.data[j].toolTypeId){                            
                //             this.toolType.push(response.data[j]);                                 
                //             valida = false;
                //         }
                //         ++j;
                //     }
                // })                
                this.desbobinador.push(response.data.filter((x)=>{if (x.toolTypeId==8||x.toolTypeId==9) return x}));
                this.formadoraDeCanal.push(response.data.filter((x)=>{if (x.toolTypeId==6||x.toolTypeId==5||x.toolTypeId==4) return x}));
                this.fornoDeBronze.push(response.data.filter((x)=>{if (x.toolTypeId==17||x.toolTypeId==7) return x}));
                this.fusao.push(response.data.filter((x)=>{if (x.toolTypeId==16||x.toolTypeId==21||x.toolTypeId==14) return x}));
                this.resfriamento.push(response.data.filter((x)=>{if (x.toolTypeId==15||x.toolTypeId==2||x.toolTypeId==10||x.toolTypeId==13||x.toolTypeId==19||x.toolTypeId==18) return x}));
                this.fresaDeDesbaste.push(response.data.filter((x)=>{if (x.toolTypeId==3||x.toolTypeId==12) return x}));
                this.tesoura.push(response.data.filter((x)=>{if (x.toolTypeId==11) return x}));
                this.tracionador.push(response.data.filter((x)=>{if (x.toolTypeId==20) return x}));
            }, (error) => {
                console.log(error);
            })
            this.lista = true;
        },
        openSelectGroup() {
            this.carregando = true;
            this.group = true;
            axios.get(this.url + '/api/tooltype/' + this.typeId).then((response) => {
                this.Groups = response.data.thingGroups;
            }, (error) => {
                console.log(error);
            })
            this.lista = true;
            axios.get(this.url + '/api/tool/' + this.toolId).then((response) => {
                this.Tool = response.data;
                console.log(response.data);
                this.Tool.status = this.getStatus(response.data.status);
                this.carregando = false;
            }, (r) => {
                this.mensagem = r;
                this.carregando = false;
            })

        },
        openSelectThings() {
            this.thing = true;
            axios.get(this.url + '/gateway/thinggroups/' + this.groupId).then((response) => {
                this.Things = response.data.things;
                console.log(this.Things);
            }, (error) => {
                console.log(error);
            })

        },
        getAssoc() {
            this.mensagemSuc = '';
            this.mensagem = '';
            axios.put(this.url + '/api/tool/AssociateTool/associate?thingId=' + this.thingId + '&toolid=' + this.toolId).then((response) => {
                this.Tool = response.data;
                console.log(response.data);
                this.Tool.status = this.getStatus(response.data.status);
                this.Thing = response.data.currentThing;
                this.lista2 = true;
                this.mensagemSuc = 'Ferramenta associada com sucesso.';
            }, (r) => {
                this.mensagem = r.response.data;
                this.carregando = false;
            })

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
        //this.getAllTools();
        this.getToolType();
    }
};