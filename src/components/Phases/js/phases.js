import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
es6promisse.polyfill();
/*
    Example json recipe!
    {
    "recipeId": 3,
    "recipeName": "teste de receita",
    "recipeCode": "5050505050",
        "recipeProduct": {
            "phaseProductId": 13,
            "productId": 1,
            "value": "50",
            "measurementUnit": "kg",
            "product": {
            "productId": 1,
            "producName": "Nome Teste 2",
            "producCode": "TesteCode",
            "productGTIN": "+9999999",
            "childrenProductsIds": []
        }
    },
    "phasesId": []
    }
*/
export default {    
    name: "Phases",
    data(){
        return {                                               
            url:'http://brsbap01:8003/api/', 
            produtos:[],
            produto: {},        
            nomeP:'',
            recipe:{}
        }
    },  
    computed:{       

    },      
    methods:{                        
        getResults(){
            if(this.nomeP.length<3){
                this.produtos=[];
                return;
            }    
            this.produtos=[];
            var config = {
                headers: {'Cache-Control':'no-cache'}
            };            
            users: [];
            axios.get(this.url+"/products?fieldFilter=productName&fieldValue="+this.nomeP,config).then((response)=>{                                 
                response.data.values.forEach((pro) => {
                    this.produtos.push(pro);
                });
            },(error)=>{
                console.log(error);
            })
        }
    }
}    