'use strict'
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse'
import vBToggle from 'bootstrap-vue/es/directives/toggle/toggle'
import bButton from 'bootstrap-vue/es/components/button/button'
import bListGroup from 'bootstrap-vue/es/components/list-group/list-group'
import bListGroupItem from 'bootstrap-vue/es/components/list-group/list-group-item'

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
        'b-toggle': vBToggle
    },
    methods: {
    },
    beforeMount: function(){
        var divToHide = document.getElementById('sidebar');
        document.onclick = function(e){
            if(e.target.id !== 'sidebar'){
            divToHide.style.display = 'none';
            }
        };
    }
 };

