'use strict'
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse'
import vBToggle from 'bootstrap-vue/es/directives/toggle/toggle'
import bButton from 'bootstrap-vue/es/components/button/button'
import bListGroup from 'bootstrap-vue/es/components/list-group/list-group'
import bListGroupItem from 'bootstrap-vue/es/components/list-group/list-group-item'
import { directive as onClickaway } from 'vue-clickaway';
import VueCookies from 'vue-cookies'
var app = require('../../../App.vue')
Vue.use(VueCookies);

export default {
    name: "NavBar",
    props: ['username'],
    data() {
        return {
            active: true,
            name: ''
        }
    },
    computed: {},
    components: {
        'b-collapse': bCollapse,
        'b-button': bButton,
        'b-list-group': bListGroup,
        'b-list-group': bListGroupItem
    },
    directives: {
        'b-toggle': vBToggle,
        onClickaway: onClickaway
    },
    methods: {
        away: function() {
            var divToHide = document.getElementById('sidebar');
            divToHide.style.display = 'none';
        },
        Logout() {
            // Limpando o chace de segurança no cookie
            VueCookies.remove('security');
            VueCookies.set('username', null);
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