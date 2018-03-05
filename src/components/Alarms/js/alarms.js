import axios from 'axios'
import es6promisse from 'es6-promise'
es6promisse.polyfill();

export default {
    name: "Alarms",
    data() {
        return {
            things: []
        }
    },
    computed: {},
    methods: {
        getThings(){                                  
            axios.get(this.url+'/api/things').then((response)=>{                                           
                this.things = response.data;
                console.log(this.things);
            },(error)=>{
                console.log(error);
            }) 
            }
    },
    beforeMount: function() {
        this.getThings();
    }
};
