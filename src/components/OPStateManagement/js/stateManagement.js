import axios from 'axios'
import es6promisse from 'es6-promise'
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

// Endereço IP do Servidor com as APIs
var ipServer = 'http://34.239.125.82:';

export default {
    name: 'StateManagement',
    data() {
        return {
            urlState: ipServer + '8003/api/stateconfiguration/',
            urlOp: ipServer + '8003/api/productionorders/',
            opSelected: '',
            opArray: [],
            carregando: false
        }
    },
    methods: {
        getOpState: function() {
            axios.get(urlState).then(response => {
                this.opSelected = response;
                console.log(this.opSelected);
            }).catch({

            })
        }
    },
    getOp: function() {
        //productionOrderObj.recipe.recipeName = "";
        var config = {
            headers: { 'Cache-Control': 'no-cache' }
        };
        // ativa barra de load na tela
        this.carregando = true;
        axios.get(this.urlOp, config).then(response => {
                // JSON responses are automatically parsed.
                this.opArray = response.data;
                // for (var x = 0; x < this.opArray.length; x++) {
                //     if (this.opArray[x].recipe.recipeProduct == undefined) {
                //         this.opArray[x].hasProd = false;
                //     } else {
                //         this.opArray[x].hasProd = true;
                //     }

                // }
                console.log(response);
                this.carregando = false;
            })
            .catch(e => {
                this.errors.push(e)
            })
    }
}