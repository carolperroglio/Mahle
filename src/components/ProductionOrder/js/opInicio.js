import axios from 'axios'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import bBadge from 'bootstrap-vue/es/components/badge/badge'
import { Stretch } from 'vue-loading-spinner'



export default {
    name: "OPInAnalysis",
    data() {
        return {
            carregando: false,
            erro: false,
            urlOP: process.env.OP_API,
            urlProd: process.env.RECIPE_API,
            urlAnalysis: process.env.ANALYSIS_API,
            msgErro: "",
            ops: [],
            opNumber: '',
            cargaUtilizada: '',
            opSelected: {}

        }
    },
    components: {
        'b-dropdown': bDropdown,
        'b-dropdown-item': bDropdownItem,
        'b-modal': bModal,
        'b-badge': bBadge,
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
        getOPResult() {
            this.ops = [];
            console.log('opNumber: ' + this.opNumber)
            if (this.opNumber.length >= 3) {
                axios.get(this.urlOP + "/api/productionorders/v2?&filters=productionOrderTypeId,2&filters=productionOrderNumber," + this.opNumber)
                    .then((response) => {
                        this.ops = response.data.values;
                    }).catch((error) => {
                        this.carregando = false;
                        this.erro = true;
                        this.msgErro = "Ocorreu um erro: " + error.message;
                        this.showModal("modalInfo");
                    })
            }
        },
        // EM CONSTRUÇÃO
        sendLastAnalysis() {
            axios.post(this.urlAnalysis)
                .then((response) => {
                    this.erro = true;
                    this.msgErro = "Ultima análise realizada enviada";
                    this.showModal("modalInfo");
                }).catch((error) => {
                    this.carregando = false;
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro: " + error.message;
                    this.showModal("modalInfo");
                })
        }
    }
}