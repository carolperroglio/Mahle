'use strict'
import { Dropdown } from 'bootstrap-vue/es/components';

export default {
    name: "NavBar",
    data() {
        return { 
            show: false
         }
    },
    computed: {},
    methods: {
        open() {
            document.getElementById("open").style.display="none";
            document.getElementById("close").style.display="block";
            this.show = true;
        },
        close() {
            document.getElementById("open").style.display="block";
            document.getElementById("close").style.display="none";
            this.show = false;
        }
        
    },
 };

