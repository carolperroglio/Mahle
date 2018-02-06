'use strict'

import axios from 'axios'
import es6promisse from 'es6-promise'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'

es6promisse.polyfill();

function paginacao(response, este) {
    este.pageAtual = este.startat / 20;
    este.total = response.data.total;
    let fim = Math.ceil(este.total / 20);
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
            quantityPage: 20,
            startat: 0,
            total: 0,
            pages: [],
            pageAtual: 0,
            produtos: [],
            produto: {},
            url: 'http://34.239.125.82:8002/api/products/',
            mensagem: '',
            mensagemSuc: '',
            orderField: '',
            fieldValue: '',
            fieldFilter: '',
            order: ''
        }
    },
    computed: {
    },
    components: {
        'b-modal': bModal,
        Stretch
    },
    directives: {
        'b-modal': bModalDirective
    },
    methods: {
          showModal () {
            this.$refs.myModalRef.show()
          },
          hideModal () {
            this.$refs.myModalRef.hide()
          },
          showModal2(produto) {
            this.produto = produto;
            this.$refs.myModalRef.show()
          },
        cadastrar(produto) {
            this.carregando = true;
            produto.enabled = true;
            axios.post(this.url, produto).then((r) => {
                this.mensagem = '';
                this.mensagemSuc = "Produto " + produto.productName + " cadastrado com sucesso";
                this.produto = {};
                if (this.produtos.length > 0)
                    this.produtos.push(produto);
                this.carregando = false;
            }, (r) => {
                this.mensagem = 'Erro no server ' + r;
                this.carregando = false;
            })

        },

        put(produto) {
            this.carregando = true;
            axios.put(this.url + produto.productId, produto).then((r) => {
                this.mensagem = '';
                this.mensagemSuc = "Produto " + produto.productName + " atualizado com sucesso";
                this.produto = {}
                this.carregando = false;
            }, (r) => {
                this.carregando = false;
                this.mensagem = 'Erro no server ' + r;
            })

        },

        excluir(produto) {
            this.carregando = true;
            axios.delete(this.url + produto.productId).then((r) => {
                this.mensagem = '';
                this.mensagemSuc = "Produto " + produto.productName + " deletado com sucesso";
                this.produto = {};
                this.produtos = this.produtos.filter(item => item !== produto);
                this.carregando = false;
            }, (r) => {
                this.mensagem = 'Erro no server ' + r;
                this.carregando = false;
            });
        },
        
        buscar() {
            this.carregando = true;
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.produtos = [];
            console.log(this.order, this.orderField);
            setTimeout(() => {
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
            }, 2000);
            
        }
    },
    beforeMount: function(){
        this.buscar();
    }
};
