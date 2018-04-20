import axios from 'axios'
import es6promisse from 'es6-promise'
import $ from 'jquery'
import AmCharts from 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import jsPDF from 'jspdf';
import 'amcharts3/amcharts/plugins/export/libs/pdfmake/pdfmake.js'
import 'amcharts3/amcharts/plugins/export/libs/FileSaver.js/FileSaver.js'
import 'amcharts3/amcharts/plugins/export/libs/blob.js/blob.js'
import html2canvas from 'html2canvas';
// import Plotly from 'plotly.js/dist/plotly';
es6promisse.polyfill();


function exportChart(chart) {



    chart["export"].capture({}, function() {

        // SAVE TO PNG
        this.toPNG({}, function(base64) {

            // We have now a Base64-encoded image data
            // which we can now transfer to server via AJAX
            // i.e. jQuery.post( "saveimage.php", { "data": base64 } )
            console.log(base64);
        });
    });
}
export default {
    name: "HomePage",
    data() {
        return {
            chart: {}
        }
    },
    computed: {},
    methods: {
        showmodal() {
            $('#exampleModal').modal('toggle')

        },
        exportChart() {

            html2canvas(document.body).then(function(canvas) {
                console.log(canvas.toDataURL('image/png'));
                document.body.appendChild(canvas);
            });

        },
        // getchart() {
        //     var TESTER = document.getElementById('tester');
        //     console.log($('#tester'));
        //     console.log(TESTER);
        //     Plotly.plot('tester', [{
        //         x: [1, 2, 3, 4, 5],
        //         y: [1, 2, 4, 8, 16]
        //     }], {
        //         margin: { t: 0 }
        //     });

        //     /* Current Plotly.js version */
        //     console.log(Plotly.BUILD);
        // }

    },
    beforeMount() {
        // this.getchart()
        // this.exportChart();
    }
};