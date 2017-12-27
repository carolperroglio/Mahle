import axios from 'axios'
import es6promisse from 'es6-promise'
es6promisse.polyfill();


export default {    
    name: "ToolCreate", 
    data(){
        return {                        
            id:"",
            carregando: false,    
            ferramentas:[],
            ferramenta: {},
            url:'http://192.168.11.160:8004/api/tool',
            mensagem:'',
            mensagemSuc:'',          
        }
    },  
    computed:{       
    },      
    methods:{
        cadastrar(ferramenta){    
            this.carregando = true;    
            ferramenta.enabled=true;                                 
            axios.post(this.url,ferramenta).then((r)=>{
                this.mensagem='';
                this.mensagemSuc = "Produto " + ferramenta.name + " cadastrado com sucesso"; 
                this.ferramenta={};               
                if(this.ferramentas.length>0)
                    this.ferramentas.push(produto);              
                this.carregando = false;        
            },(r)=>{                
                this.mensagem = 'Erro no server ' + r;                
                this.carregando = false;
            }) 
                      
        },
        
    }
};
