'use strict'
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse'
import vBToggle from 'bootstrap-vue/es/directives/toggle/toggle'
import bButton from 'bootstrap-vue/es/components/button/button'
import bListGroup from 'bootstrap-vue/es/components/list-group/list-group'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bListGroupItem from 'bootstrap-vue/es/components/list-group/list-group-item'
import { directive as onClickaway } from 'vue-clickaway';
import VueCookies from 'vue-cookies'
var app = require('../../../App.vue')
Vue.use(VueCookies);

export default {
    name: "NavBar",
    props: {
        username: {
            default: 'null'
        }
    },
    data() {
        return {
            active: true,
            name: '',
            msg: 'TESTE',
            erro: false
        }
    },
    computed: {},
    components: {
        'b-collapse': bCollapse,
        'b-button': bButton,
        'b-list-group': bListGroup,
        'b-list-group': bListGroupItem,
        'b-modal': bModal
    },
    directives: {
        'b-toggle': vBToggle,
        onClickaway: onClickaway
    },
    methods: {
        showModal(id) {
            this.$refs[id].show();
        },
        away: function() {
            var divToHide = document.getElementById('sidebar');
            divToHide.style.display = 'none';
        },
        Logout() {
            // Limpando o chace de segurança no cookie
            VueCookies.remove('security');
            VueCookies.set('username', null);
            VueCookies.set('status', "logoff");
            this.username = VueCookies.get('username');
            //chama o método que busca o username e atribui a nav
            app.default.methods.getUsername();
            //redireciona para a tela principal STATUS DO MES
            location.reload();
            this.$router.push({
                name: "Login"
            });
        }
    }
};