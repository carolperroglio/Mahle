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
            cabecalhoSetas: [false, false, false, false],
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
            erro: '',  
            cadEdit:''         
        }
    },
    computed: {},
    components: {
        'b-modal': bModal,
        Stretch,
    },
    directives: {
        'b-modal': bModalDirective,
        VeeValidate
    },
    methods: {
        hideModal() {
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
        hideModalConfirmCreate(){
            this.$refs.modalCadastrarProduto.hide();
        },
        hideModalConfirmPut(){
            this.$refs.modalEditarProduto.hide();
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
        showModalErro(erro){
            this.erro = erro;
            this.$refs.modalErro.show();            
        },
        hideModalErro(){
            this.$refs.modalErro.hide();
        },
        organizar(produtos, campo, pos) {
            produtos.sort(function(a, b) { console.log(a[campo]); return (a[campo] > b[campo]) ? 1 : ((b[campo] > a[campo]) ? -1 : 0); });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = false;

        },
        desorganizar(produtos, campo, pos) {
            produtos.sort(function(a, b) { return (a[campo] > b[campo]) ? -1 : ((b[campo] > a[campo]) ? 1 : 0); });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = true;
                else
                    this.cabecalhoSetas[i] = false;
        },
        validaProduto(produto) {
            return produto.productName == undefined || produto.productName == '' || produto.productCode == undefined || produto.productCode == '' || produto.productGTIN == undefined || produto.productGTIN == '';
        },
        mudaPlace(fieldFilter){
            var place = 'Matéria-Prima';
            if(fieldFilter=='productName')
                place = 'Digite o Nome';
            else if(fieldFilter=='productDescription')
                place = 'Digite a Descrição';
            else if(fieldFilter=='productCode')
                place = 'Digite o Código';
            else if(fieldFilter=='productGTIN')
                place = 'Digite Código de Barras';  
            return place;       
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
            }, (error) => {
                this.carregando = false;
                this.codigosErro(error.response.status); 
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
            }, (error) => {
                this.carregando = false;
                this.codigosErro(error.response.status); 
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
            }, (error) => {
                this.carregando = false;
                this.codigosErro(error.response.status);                                
            });
            this.carregando = false;
        },        
        buscar() {
            this.carregando = true;
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            var u='';
            this.produtos = [];
            if(this.fieldValue==undefined || this.fieldValue.length<=0)
                u = this.url + "?orderField=" + this.orderField + "&order=" + this.order + "&startat=" + this.startat + "&quantity=" + this.quantityPage;
            else
                u = this.url + "?orderField=" + this.orderField + "&order=" + this.order + "&fieldFilter=" + this.fieldFilter + "&fieldValue=" + this.fieldValue + "&startat=" + this.startat + "&quantity=" + this.quantityPage;
               
            setTimeout(() => {
                axios.get(u, config).then((response) => {
                    if (!response.data.values && response.data.productId)
                        this.produtos[0] = response.data;
                    else {
                        paginacao(response, this);
                        this.produtos = response.data.values;
                    }
                    this.carregando = false;
                }, (error) => {
                    this.carregando = false;
                    this.codigosErro(error.response.status);                                                        
                })
            }, 500)
        },
        codigosErro(status){
            if(status == 400)
                this.showModalErro("Erro de requisição código 400");
            else if(status == 404)
                this.showModalErro("Serviço não encontrado código 404");
            else if(status == 500)
                this.showModalErro("Erro no servidor código 500"); 
            else    
                this.showModalErro("Erro desconhecido código" + status);
        },
    },
    beforeMount: function() {
        this.buscar();
    }
};