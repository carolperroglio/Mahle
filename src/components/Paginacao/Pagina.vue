<<template>
    <div class="paginacao fixed-bottom" v-show="total>0">
        <nav aria-label="">
            <ul class="pagination justify-content-center">
                <li v-show="startat>0" class="page-item" >
                    <a class="page-link" href="#" @click="buscar(startat-=20, quantityPage)">Previous</a>
                </li>
                <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index) in pages" v-bind:key="index">
                    <a class="page-link"  href="#" @click="buscar(startat=num*20, quantityPage)">{{num+1}}</a>
                </li>                                                                                
                <li class="page-item" v-show="pages.length>1 && startat+20<total">
                    <a class="page-link" href="#" @click="buscar(startat+=20, quantityPage)">Next</a> 
                </li>
            </ul>
        </nav>  
    </div> 
</template>

<script src="./js/pagina.js">
</script>


