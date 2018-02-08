import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'

es6promisse.polyfill();

export default {
    name: 'OPManagement',
    data() {
        return {
            fieldValue: '',
            OPs: [],
            OP: {},
            newStatus: '',
            mensagem: '',
            mensagemSuc: '',
            newNextSt: [],
            states: [],
            state: '',
            nextstates: [],
            carregando: false,
            url: process.env.OP_API + '/api/productionorders/',
            url2: process.env.OP_API + '/api/productionordertypes/'
        }
    },
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
        showModal (o) {
            this.OP=o; 
        this.$refs.modalGerOP.show();
        this.newNextSt = [];
        this.carregando = true;
            
            axios.get(this.url+this.OP.productionOrderId).then((response)=>{
                this.state = response.data.currentStatus;
                console.log(this.state);
            },(error)=>{                   
            });
            axios.get(this.url2+this.OP.productionOrderTypeId).then((response)=>{
                this.states = response.data.stateConfiguration.states;
                console.log(this.states);
                    switch(this.state){
                        case "created":
                        this.nextstates = this.states[0].possibleNextStates;
                        break;
                        case "active":                    
                        this.nextstates = this.states[1].possibleNextStates;
                        break;
                        case "paused":
                        this.nextstates = this.states[2].possibleNextStates;
                        break;
                        case "ended":
                        this.nextstates = this.states[3].possibleNextStates;
                        break;
                        case "inactive":
                        this.nextstates = this.states[4].possibleNextStates;
                        break;                    
                    }
                    this.nextstates.map( state => {
                        console.log("oi");
                        switch(state){
                            case "created":
                            this.newNextSt.push("Criada");
                            break;
                            case "active":                    
                            this.newNextSt.push("Ativa");
                            break;
                            case "inactive":
                            this.newNextSt.push("Inativa");
                            break;
                            case "paused":
                            this.newNextSt.push("Pausada");
                            break;
                            case "ended":
                            this.newNextSt.push("Encerrada");
                            break;
                            case "waiting_approval":
                            this.newNextSt.push("Aguardando Aprovação");
                            break;
                            case "approved":
                            this.newNextSt.push("Aprovada");
                            break;
                            case "reproved":
                            this.newNextSt.push("Reprovada");
                            break;    
                        }    
                    });
                    console.log(this.newNextSt);
                    console.log(this.nextstates);
                    this.carregando = false;
            },(error)=>{
                this.carregando = false;                   
            })
      },
        hideModal () {
        this.$refs.modalGerOP.hide()
      },
        buscaOP(){
            this.carregando = true;
            setTimeout(() => {
                axios.get(this.url).then((response)=>{
                    
                    this.OPs=response.data.values;
                    console.log(this.OPs);

                    this.OPs.forEach((op) => {
                            switch(op.currentStatus){
                                case "created":
                                op.currentStatus = "Criada";
                                break;
                                case "active":                    
                                op.currentStatus = "Ativa";
                                break;
                                case "inactive":
                                op.currentStatus = "Inativa";
                                break;
                                case "paused":
                                op.currentStatus = "Pausada";
                                break;
                                case "ended":
                                op.currentStatus = "Encerrada";
                                break;
                                case "waiting_approval":
                                op.currentStatus = "Aguardando Aprovação";
                                break;
                                case "approved":
                                op.currentStatus = "Aprovada";
                                break;
                                case "reproved":
                                op.currentStatus = "Reprovada";
                                break;                    
                            }
                    });
                    this.carregando = false;
                },(error)=>{            
                    this.carregando = false;       
                }) 
            }, 1000);
        },
        editar(OP){
            var stat = '';
            switch(this.newStatus){
                case "Criada":
                stat = "created";
                break;
                case "Ativa":                    
                stat = "active";
                break;
                case "Inativa":
                stat = "inactive";
                break;
                case "Pausada":
                stat = "paused";
                break;
                case "Encerrada":
                stat = "ended";
                break;
                case "Aguardando Aprovação":
                stat = "waiting_approval";
                break;
                case "Aprovada":
                stat = "approved";
                break;
                case "Reprovada":
                stat = "reproved";
                break;                    
            }
            axios.put(this.url+'statemanagement/id?productionOrderId='+this.OP.productionOrderId+'&state='+stat).then((response)=>{
                this.OP.currentStatus = stat;
                this.mensagemSuc = 'Status alterado com sucesso.';
            },(error)=>{   
                this.mensagem = error.response.data;               
            })   
        }
    },
    beforeMount: function(){
        this.buscaOP();
    }

}