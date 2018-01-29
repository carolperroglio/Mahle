import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
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
            url: 'http://34.239.125.82:8003/api/productionorders/' 
        }
    },
    components: {
        'b-dropdown': bDropdown,
        'b-dropdown-item': bDropdownItem,
        'b-modal': bModal
    },
    directives: {
        'b-modal': bModalDirective
    }, 
    methods: {
        showModal (o) {
            this.OP=o; 
        this.$refs.modalGerOP.show()
      },
        hideModal () {
        this.$refs.modalGerOP.hide()
      },
        buscaOP(){
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
                },(error)=>{                   
                }) 
        },
        editar(OP){
            axios.put(this.url+'statemanagement/id?productionOrderId='+this.OP.productionOrderId+'&state='+this.newStatus).then((response)=>{
                this.OP.currentStatus = this.newStatus;
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