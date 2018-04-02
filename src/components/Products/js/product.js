'use strict'
import axios from 'axios'
import es6promisse from 'es6-promise'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { setTimeout } from 'timers';

es6promisse.polyfill();

function paginacao(response, este) {
    este.pageAtual = este.startat / este.quantityPage;
    este.total = response.data.total;
    let fim = Math.ceil(este.total / este.quantityPage);
    if (este.pageAtual > 11) {
        for (var i = this.pageAtual - 5; i < este.pageAtual + 5 > fim ? este.pageAtual + 5 : fim; i++)
            este.pages[i] = i;
    } else {
        for (var i = 0; i < fim; i++)
            este.pages[i] = i;
    }
}

export default {
    name: "GenerateProducts",
    data() {
        return {
            id: "",
            carregando: false,
            quantityPage: 100,
            startat: 0,
            total: 0,
            pages: [],
            cabecalhoSetas:[false, false, false, false],
            pageAtual: 0,
            produtos: [],
            produto: {},
            url: process.env.RECIPE_API + '/api/products/',
            mensagem: '',
            mensagemSuc: '',
            orderField: '',
            fieldValue: '',
            fieldFilter: '',
            order: '',
            errors: [],
            
        }
    },
    computed: {
    },
    components: {
        'b-modal': bModal,
        Stretch,
    },
    directives: {
        'b-modal': bModalDirective,
        VeeValidate
    },
    methods: {        
        hideModal () {
            this.$refs.myModalRef.hide()
        },
        showModal(produto, index) {              
            this.errors = [];
            this.mensagemSuc = '';
            this.produto = JSON.parse(JSON.stringify(produto));
            this.produto.index = index;
            this.$refs.myModalRef.show();
        }, 
        showModalConfirmCreate() {                          
            this.$refs.modalCadastrarProduto.show();
        }, 
        showModalConfirmPut() {                 
            this.$refs.modalEditarProduto.show();
        },    
        showModalRemoveProduto(produto, index) {
            this.errors = [];
            this.mensagemSuc = '';
            this.produto = JSON.parse(JSON.stringify(produto));
            this.produto.index = index;
            this.$refs.modalRemoveProduct.show()
        },
        hideModalRemoveProduct() {
            this.$refs.modalRemoveProduct.hide()
        },       
        


        organizar(produtos, campo, pos){                         
            produtos.sort(function(a,b) {console.log(a[campo]);return (a[campo] > b[campo]) ? 1 : ((b[campo] > a[campo]) ? -1 : 0);});
            for(var i=0; i<this.cabecalhoSetas.length; i++)
                if(i==pos)    
                    this.cabecalhoSetas[i]=false;

        },
        desorganizar(produtos, campo, pos){                         
            produtos.sort(function(a,b) {return (a[campo] > b[campo]) ? -1 : ((b[campo] > a[campo]) ? 1 : 0);});
            for(var i=0; i<this.cabecalhoSetas.length; i++)
                if(i==pos)    
                    this.cabecalhoSetas[i]=true;
                else   
                    this.cabecalhoSetas[i]=false;             
        },
        validaProduto(produto){
            return produto.productName==undefined || produto.productName=='' || produto.productCode==undefined || produto.productCode=='' || produto.productGTIN==undefined || produto.productGTIN=='';
        },
        cadastrar(produto) {
            this.mensagem = '';
            this.mensagemSuc = '';
            this.carregando = true;
            produto.enabled = true;
            axios.post(this.url, produto).then((r) => {
                this.mensagem = '';
                this.mensagemSuc = "Produto " + produto.productName + " cadastrado com sucesso";                
                this.produto = {};                
                this.produtos.push(produto);
                this.carregando = false;
                this.$refs.modalCadastrarProduto.hide();
            }, (r) => {
                this.mensagem = 'Erro no server ' + r;
                this.carregando = false;
            })          

        },

        put(produto) {
            this.mensagem = '';
            this.mensagemSuc = '';
            this.carregando = true;
            axios.put(this.url + produto.productId, produto).then((r) => {
                this.mensagem = '';
                this.mensagemSuc = "Produto " + produto.productName + " atualizado com sucesso";
                this.produtos[produto.index] = produto;                
                this.carregando = false;
                this.$refs.modalEditarProduto.hide();
            }, (r) => {
                this.carregando = false;
                this.mensagem = 'Erro no server ' + r;
            })

        },

        excluir(produto) {
            this.mensagem = '';
            this.mensagemSuc = '';
            this.carregando = true;
        
            axios.delete(this.url + produto.productId).then((r) => {
                this.mensagem = '';
                this.mensagemSuc = "Produto " + produto.productName + " deletado com sucesso";                
                this.produtos = this.produtos.filter(item => item.productId !== produto.productId);
                this.produto = {};
                this.carregando = false;
                this.hideModalRemoveProduct();
            }, (r) => {
                this.mensagem = 'Erro no server ' + r;
                this.carregando = false;
            });            
            this.carregando = false;
        },
        
        buscar() {
            this.carregando = true;
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.produtos = [];
            console.log(this.order, this.orderField);
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
    },
    beforeMount: function(){
        this.buscar();
    }
};
