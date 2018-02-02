import axios from 'axios'
import es6promisse from 'es6-promise'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
es6promisse.polyfill();

function paginacao(response, este){
    este.pageAtual=este.startat/20;                       
    este.total = response.data.total; 
    let fim=Math.ceil(este.total/20);             
    if(este.pageAtual>11){                    
        for(var i=this.pageAtual-5; i< este.pageAtual+5>fim?este.pageAtual+5:fim; i++)                    
            este.pages[i]=i;
    }else{                        
        for(var i=0; i<fim; i++)                    
            este.pages[i]=i;               
    }                  
}

export default {    
    name: "ToolCreate", 
    data(){
        return {  
            config: {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            },                      
            id:"",
            carregando: false,    
            ferramentas:[],
            ferramenta: {},
            url:'http://brsbap01:8004/api/tool',
            mensagem:'',
            mensagemSuc:'',  
            f:[],
            tipos:[], 
            orderField: '',
            order: '',
            fieldFilter: '',
            fieldValue: '',
            quantityPage: 20,
            startat: 0,
            total: 0,
            pages: [],
            pageAtual: 0,
                   
        }
    },  
    computed:{       
    },   
    components: {
        'b-modal': bModal
    },
    directives: {
        'b-modal': bModalDirective
    },     
    methods:{
          showModal () {
            this.$refs.myModalRef.show()
          },
          hideModal () {
            this.$refs.myModalRef.hide()
          },
        cadastrar(ferramenta){      
           // this.carregando = true; 
            this.mensagem='';   
            this.mensagemSuc= '';
            ferramenta.typeId = this.encontraObj(this.tipos, "name", ferramenta.typeName).id;    
            console.log(ferramenta);               
            axios.post(this.url,ferramenta).then((response)=>{
                this.mensagemSuc = 'Ferramenta ' + ferramenta.name + ' cadastrada com sucesso.'; 
                this.ferramenta={};               
                this.ferramentas.push(ferramenta);
                this.carregando = false;        
            },(r)=>{                
                this.mensagem = 'Erro no server ' + r;                
                this.carregando = false;
            }) 
                      
        },
        listar(){              
            this.carregando = true;                                                                             
            this.ferramentas = [];
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            axios.get(this.url+"?orderField="+this.orderField+"&order="+this.order+"&fieldFilter="+this.fieldFilter+"&fieldValue="+this.fieldValue+"&startat="+this.startat+"&quantity="+this.quantityPage).then((response)=>{     
            this.ferramentas =response.data.values;
            console.log(this.ferramentas);
            for (var index in response.data.values){
                switch(response.data.values[index].status){
                    case "available":
                    this.ferramentas[index].status = "Disponível";
                    break;
                    case "in_use":                    
                    this.ferramentas[index].status = "Em uso";
                    break;
                    case "in_maintenance":
                    this.ferramentas[index].status = "Em manutenção";
                    break;
                    case "not_available":
                    this.ferramentas[index].status = "Indisponível";
                    break;
                    case "inactive":
                    this.ferramentas[index].status = "Inativo";
                    break;
                    case "active":
                    this.ferramentas[index].status = "Disponível";
                    break;
                }
            } 
                paginacao(response,this);
            },(error)=>{                  
                this.mensagem = 'Erro no server ' + error;                
                this.carregando = false;  
            })                         
        },
        editar(ferramenta){              
            this.carregando = true;   
            this.mensagem='';   
            this.mensagemSuc= '';
            axios.put(this.url+'/'+ferramenta.id, ferramenta).then((response)=>{  
                this.mensagemSuc = 'Ferramenta ' + ferramenta.name + ' atualizada com sucesso.';
                this.ferramenta={}; 
                },(error)=>{                  
                this.mensagem = 'Erro no server ' + error;                
                this.carregando = false;  
            })                       
        },
        buscaTipo(){
            axios.get(this.url+"type").then((response)=>{
                this.tipos=response.data;
                console.log(this.tipos);  
                },(error)=>{                   
                })                         
        },
        encontraObj(arr, key, valor){
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][key] === valor) {
                    return arr[i];
                    }
                }
                return null;
            },
        itemClicado(f){
                this.ferramenta=f;            
                $("#editarFerr").modal('show');
                }
        },       

    beforeMount: function(){
        this.buscaTipo()
    }
};
