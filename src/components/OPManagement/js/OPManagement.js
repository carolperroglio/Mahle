import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'
import { setTimeout } from 'timers';

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
            carregandost: false,
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
        showModal () {
        this.$refs.modalGerOP.show();
      },
        hideModal () {
        this.$refs.modalGerOP.hide()
      },
    buscaOP(){
            this.carregando = true;
                axios.get(this.url).then((response)=>{
                    
                    this.OPs=response.data.values;
                    console.log(this.OPs);

                    this.OPs.forEach((op) => {
                        op.currentStatus = this.getStatus(op.currentStatus);     
                    });
                    this.carregando = false;
                },(error)=>{            
                    this.carregando = false;       
                }) 
        },
        editar(OP){
            
            if(confirm("Tem certeza que deseja mudar o status?")){
                var stat = this.getEstados(this.newStatus);
            axios.put(this.url+'statemanagement/id?productionOrderId='+this.OP.productionOrderId+'&state='+stat).then((response)=>{
                this.OP.currentStatus = stat;
                this.mensagemSuc = 'Status alterado com sucesso.';
            },(error)=>{   
                this.mensagem = error.response.data;               
            })
            }
            
        },

        configOPEstate(o){
            this.OP=o; 
            this.buscaEstadoAtual();
            if(this.nextstates != []){
                this.showModal();
            }
        },
        buscaEstadoAtual(){
            axios.get(this.url+this.OP.productionOrderId).then((response)=>{
                this.state = response.data.currentStatus;
                console.log(this.state);
                this.nextstates = this.getNextStatus(this.state);
                console.log(this.nextstates);
            },(error)=>{                   
            });
        },
        getStatus (status){
            var state = {
                'created': "Criada",
                'active': "Ativa",
                'paused': "Pausada",
                'ended': "Encerrada",
                'inactive': "Inativa"
                };
            return state[status];          
        },
        getNextStatus (status){
            var state = {
                'created':  ["Inativa","Ativa"],
                'active': ["Pausada","Encerrada"],
                'paused': ["Ativa","Encerrada"],
                'ended': [],
                'inactive': []
                };
            return state[status];          
        },
        getEstados (estado){
            var state = {
                'Criada': "created",
                'Ativa': "active",
                'Pausada': "paused",
                'Encerrada': "ended",
                'Inativa': "inactive"
                };
            return state[status];          
        }


    },
    beforeMount: function(){
        this.buscaOP();
    }

}