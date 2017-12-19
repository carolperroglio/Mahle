                                                                                                                                                    <template>
    <div>
        <!--                                  -->
        <!--                                  -->
        <!-- Cabeçalho da pagina, logo e user -->
        <!--                                  -->
        <!--                                  -->
        <header class="header fixed-top">
            <img src="./../../assets/imagens/mahle_logo_azul_escuro.png" class="logo"/>                                      
            <router-link to="/" class="user">                
                <i class="fa fa-user-o" aria-hidden="true"></i>
                Operador 
                <i class="fa fa-chevron-down" aria-hidden="true"></i>                                
            </router-link>                                
        </header>
        <!--                           -->
        <!--                           -->
        <!-- Menu navegação de atalhos -->
        <!--                           -->
        <!--                           -->
        <nav class="nav-menu fixed-top ">
            <ul class="nav justify-content-end col-lg-12">
                <li class="icons col-lg-1">
                    <router-link to="/" class="">                    
                        <center>
                            <img src="./../../assets/imagens/home.png" class="icons"/>
                        </center>
                        <div class="texto-menu">Home</div>             
                    </router-link>
                </li>                                
                <li class="icons col-lg-1">
                    <router-link class="" to="">
                        <center>
                            <img src="./../../assets/imagens/off-button.png" class="icons"/>
                        </center>
                        <div class="texto-menu">On/Off</div>
                    </router-link>
                </li>
                <li class="icons col-lg-1">
                    <router-link class="" to="">
                        <center>
                            <img src="./../../assets/imagens/flask.png" class="icons" />
                        </center>
                        <div class="texto-menu">Análises Químicas</div>
                    </router-link>
                </li>
                <li class="icons col-lg-1">
                    <div>    
                        <router-link class="" to="">
                            <center>
                            <img src="./../../assets/imagens/computer.png" class="icons"/>
                            </center>
                             <div class="texto-menu">Automação</div>
                        </router-link>
                    </div>    
                </li>
            </ul> 
        </nav>


        <!--              -->
        <!--              -->
        <!-- Menu lateral -->
        <!--              -->
        <!--              -->
        <div class="menu-lateral">
            <img src="./../../assets/imagens/spi.jpg" class="col-sm-0 logo-system"/>
            <h4 class="titulomenu">
                <br>Menu                            
            </h4>
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link active" id="v-pills-things-tab" data-toggle="pill" href="#v-pills-things" role="tab" aria-controls="v-pills-things" aria-selected="true">THINGS</a>
                <a class="nav-link" id="v-pills-receita-tab" data-toggle="pill" href="#v-pills-receita" role="tab" aria-controls="v-pills-receita" aria-selected="false">RECEITA</a>  
                <a class="nav-link" id="v-pills-parametros-tab" data-toggle="pill" href="#v-pills-parametros" role="tab" aria-controls="v-pills-parametros" aria-selected="false">PARÂMETROS</a>
                <router-link to="/generateProducts" class="nav-link" id="v-pills-produtos-tab" data-toggle="pill" role="tab" aria-controls="v-pills-produtos" aria-selected="false">PRODUTOS</router-link>
            </div>                                                                                                        
        </div>        
        <router-view/>       
    </div>    

        
</template>

<script>
export default {
  props: ["nothing"]
};
</script>

<style>
@import url("./navBar.css");
</style>
