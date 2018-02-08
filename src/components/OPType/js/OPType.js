import axios from 'axios'
import es6promisse from 'es6-promise'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'

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
            select: false,
            carregando: true,
            url: process.env.OP_API
         }
    },
    computed: {},
    components: {
        'b-modal': bModal,
        Stretch
    },
    directives: {
        'b-modal': bModalDirective
    },
    methods: {
        showModal(type) {
            this.Type = type;
            console.log(this.Type);
            this.$refs.myModalRef.show()
          },
          hideModal () {
            this.$refs.myModalRef.hide()
          },
            getOPs(numOP){            
            var array=[];                          
            if(numOP.length<3){return;} 
            this.mensagemSuc = '';
            this.mensagemSuc = '';               
                axios.get(this.url+'/api/productionorders?fieldFilter=productionOrderNumber&fieldValue='+numOP).then((response)=>{                                           
                    response.data.values.forEach((pro) => {
                        array.push(pro);                    
                    });
                },(error)=>{
                    console.log(error);
                })            
                return array;
            },
            editType(){
                this.mensagemSuc = '';
                this.mensagem = '';

                var index = this.thingsGroup.findIndex(index => index.groupName == this.groupName); 

                this.TG.thingGroupId = this.thingsGroup[index].thingGroupId;
                this.TG.groupName = this.thingsGroup[index].groupName;
                this.TG.groupCode = this.thingsGroup[index].groupCode;

                this.Type.thingGroups.push(this.TG);

                var enc = this.Type.thingGroupIds.findIndex(enc => this.thingsGroup[index].thingGroupId);
                console.log(enc);

                if (enc === -1) { 
                    this.Type.thingGroupIds.push(this.thingsGroup[index].thingGroupId); 
                }
                
                console.log(JSON.stringify(this.Type, undefined, 4));
                axios.put(this.url+'/api/productionordertypes/'+this.Type.productionOrderTypeId, this.Type).then((response)=>{                                           
                    console.log(response.data);
                    this.mensagemSuc = 'Tipo alterado com sucesso!';
                },(error)=>{
                    console.log(error);
                    this.mensagem = error.data;
                })
                this.Type = [];
                this.TG = {};
                this.select = false;
            },
            getThingsGroup: function() {
            axios.get(this.url+'/gateway/thinggroups/').then(response => {
                this.thingsGroup = response.data;
                console.log(this.thingsGroup);
            }).catch(error => {
                console.log(error);
            })
            },
            getTypes(){               
                axios.get(this.url+'/api/productionordertypes/').then((response)=>{                                           
                    this.Types = response.data;
                    console.log(response.data);
                    console.log(this.Types);
                    this.carregando = false;
                },(error)=>{
                    console.log(error);
                })
            },
            setSelect(){
                this.select = true;
            }
        },
    beforeMount() {
        this.getTypes();
        this.getThingsGroup();
    }
};
