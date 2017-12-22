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


       <div class="menu-lateral">
            <img src="./../../assets/imagens/spi.jpg" class="col-sm-0 logo-system"/>
            <h4 class="titulomenu">
                <br>Menu                            
            </h4>
            <div class="texto-menu-lateral card-header" role="tab" id="headingOne">
                <a data-toggle="collapse" href=".collapseOne" aria-expanded="true" aria-controls="collapseOne">THINGS</a></br>
                <div id="collapseOne" class="sub-menu-lateral collapse collapseOne show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">Gerenciar Things</div>
                <div id="collapseOne" class="sub-menu-lateral collapse collapseOne show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">Criar grupo</div>
                <div id="collapseOne" class="sub-menu-lateral collapse collapseOne show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">Hierarquia</div>
                <a data-toggle="collapse"  href=".v-pills-receita" aria-expanded="true" router-link to="/phases"   aria-controls="collapseOne">RECEITA</a><br>
                <div id="v-pills-receita" class="v-pills-receita sub-menu-lateral collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion"><router-link to="/phases">Cadastrar Receita</router-link></div>
                <div id="v-pills-receita" class="v-pills-receita sub-menu-lateral collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">Relatório de Receita</div>
                <router-link to="" data-toggle="collapse" href="" aria-expanded="true" aria-controls="collapseOne">PARÂMETROS</router-link><br>
                <router-link to="/generateProducts" data-toggle="collapse" href="" aria-expanded="true" aria-controls="collapseOne">PRODUTOS</router-link><br>
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
