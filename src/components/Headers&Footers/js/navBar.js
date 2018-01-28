'use strict'
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse'
import vBToggle from 'bootstrap-vue/es/directives/toggle/toggle'
import bButton from 'bootstrap-vue/es/components/button/button'
import bListGroup from 'bootstrap-vue/es/components/list-group/list-group'
import bListGroupItem from 'bootstrap-vue/es/components/list-group/list-group-item'
import { directive as onClickaway } from 'vue-clickaway';

export default {
    name: "NavBar",
    data() {
        return { 
          
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
          }
    }
 };

