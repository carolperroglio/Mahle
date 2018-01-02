import axios from 'axios'
import es6promisse from 'es6-promise'
es6promisse.polyfill();


export default {
    name: "NavBar",
    data() {
        return {  }
    },
    computed: {},
    methods: {
        open() {
            document.getElementById("open").style.display="none";
            document.getElementById("close").style.display="block";
        },
        close() {
            
            document.getElementById("open").style.display="block";
            document.getElementById("close").style.display="none";
        }
    },
};
