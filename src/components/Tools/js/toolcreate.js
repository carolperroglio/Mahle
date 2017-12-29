import axios from 'axios'
import es6promisse from 'es6-promise'
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
        }
    },  
    computed:{       
    },      
    methods:{
        cadastrar(ferramenta){      
            this.carregando = true; 
            this.mensagem='';   
            ferramenta.enabled=true;  
            ferramenta.typeId = this.encontraObj(this.tipos, "name", ferramenta.typeName).id;                   
            axios.post(this.url,ferramenta).then((response)=>{
                this.mensagemSuc = "Ferramenta " + ferramenta.name + " cadastrada com sucesso"; 
                this.ferramenta={};  
                console.log(response);             
                this.ferramentas.push(ferramenta);
                this.carregando = false;        
            },(r)=>{                
                this.mensagem = 'Erro no server ' + r;                
                this.carregando = false;
            }) 
                      
        },
        listar(){              
            this.carregando = true;                                               
            var config = {
                headers: {'Cache-Control':'no-cache'}
            };                               
            this.ferramentas = [];
            axios.get(this.url, config).then((response)=>{                                               
            console.log(response.data);
            this.ferramentas =response.data;
            console.log(this.ferramentas);
                this.carregando = false;  
            },(error)=>{                  
                this.mensagem = 'Erro no server ao buscar ' + error;                
                this.carregando = false;  
            })                         
        },
        editar(ferramenta){              
            this.carregando = true;   
            this.mensagemSuc = '';
            axios.put(this.url, ferramenta).then((response)=>{                                               
            console.log(response.data);
            console.log(this.ferramentas);
                },(error)=>{                  
                this.mensagem = 'Erro no server ao buscar ' + error;                
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

        /*
        buscar(id = "") {
            this.carregando = true;
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.produtos = [];
            console.log(this.order, this.orderField)
            axios.get(this.url + "?orderField=" + this.orderField + "&order=" + this.order + "&fieldFilter=" + this.fieldFilter + "&fieldValue=" + this.fieldValue + "&startat=" + this.startat + "&quantity=" + this.quantityPage, config).then((response) => {
                if (!response.data.values && response.data.productId)
                    this.produtos[0] = response.data;
                else {
                    paginacao(response, this);
                    this.produtos = response.data.values;
                }
                this.carregando = false;
            }, (error) => {
                this.mensagem = 'Erro no server ao buscar ' + error;
                this.carregando = false;
            })
        }
        */
       

    beforeMount: function(){
        this.buscaTipo()
    }
};
