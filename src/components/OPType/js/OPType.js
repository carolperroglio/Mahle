import axios from 'axios'
import es6promisse from 'es6-promise'
es6promisse.polyfill();

export default {
    name: "OPType",
    data() {
        return { 
            carregando: false,    
            OPs: [],
            OP: {},
            thingsGroup: [],
            Types: [],
            Type: {},
            TG: {},
            add: '',
            numOP: '',
            OPId: '',
            OPDesc: '',
            thingId: '',
            typeId: '',
            groupName: '',
            mensagem:'',
            mensagemSuc:'',
            fieldFilter: '',
            fieldValue: '' ,
            lista: false,
            url:'http://brsbap01:8005/api/',
            urlThing: 'http://brsbap01:8001/api/',
            urlOP: 'http://brsbap01:8005/api/productionorders' 
         }
    },
    computed: {},
    methods: {
            getOPs(numOP){            
            var array=[];                          
            if(numOP.length<3){return;} 
            this.mensagemSuc = '';
            this.mensagemSuc = '';               
                axios.get(this.urlOP+'?fieldFilter=productionOrderNumber&fieldValue='+numOP).then((response)=>{                                           
                    response.data.values.forEach((pro) => {
                        array.push(pro);                    
                    });
                },(error)=>{
                    console.log(error);
                })            
                return array;
            },
            editType(){
                mensagemSuc = '';
                mensagem = '';
                var index = this.thingsGroup.findIndex(index => index.groupName == this.groupName); 
                this.TG.thingGroupId = this.thingsGroup[index].thingGroupId;
                this.TG.groupName = this.thingsGroup[index].groupName;
                this.TG.groupCode = this.thingsGroup[index].groupCode;
                this.Type.thingGroups.push(this.TG);
                this.Type.thingGroupIds.push(this.thingsGroup[index].thingGroupId);
                console.log(this.Type);
                axios.put(this.url+'productionordertypes/'+this.Type.productionOrderTypeId, this.Type).then((response)=>{                                           
                    console.log(response.data);
                    this.mensagemSuc = 'Tipo alterado com sucesso!';
                },(error)=>{
                    console.log(error);
                    this.mensagem = error.data;
                })
                this.Type = [];
            },
            openGroups(){
                this.lista = true;

            },
            getThingsGroup: function() {
            axios.get(this.urlThing+'thinggroups/').then(response => {
                this.thingsGroup = response.data;
                console.log(this.thingsGroup);
            }).catch(error => {
                console.log(error);
            })
            },
            getTypes(){               
                axios.get(this.url+'productionordertypes/').then((response)=>{                                           
                    this.Types = response.data;
                    console.log(response.data);
                    console.log(this.Types);
                },(error)=>{
                    console.log(error);
                })
            },
            openEditModal(type){
                this.Type = type;
                $("#editar").modal('show');
                console.log(this.Type);
            },
        },
    beforeMount() {
        this.getTypes();
        this.getThingsGroup();
    }
};
