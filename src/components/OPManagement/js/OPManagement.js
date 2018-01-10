import axios from 'axios'
import es6promisse from 'es6-promise'
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
            url: 'http://brsbap01:8005/api/productionorders/' 
        }
    },
    methods: {
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
        itemClicado(o){
            this.OP=o;            
                $("#editarOP").modal('show');                
        },
        editar(OP){
            axios.put(this.url+'statemanagement?productionordernumber='+this.OP.productionOrderNumber+'&state='+this.newStatus).then((response)=>{
                this.OP.currentStatus = this.newStatus;
                this.mensagemSuc = 'Status alterado com sucesso.';
            },(error)=>{   
                this.mensagem = r.response.data;               
            }) 
        }
    },
    beforeMount: function(){
        this.buscaOP();
    }

}