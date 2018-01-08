
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

