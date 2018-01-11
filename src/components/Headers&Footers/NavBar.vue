<template>
    <div>
            <!--                                  -->
            <!--                                  -->
            <!-- Cabeçalho da pagina, logo e user -->
            <!--                                  -->
            <!--                                  -->
    <div class="container fluid">  
        <nav class="header fixed-top">
            <img src="./../../assets/imagens/onyx3.png" class="logo-system"/>
            <ul class="nav nav-pills nav-justified bg-dark">
                <li class="nav-item-cab col-md-3">
                    <router-link class="nav-link active bg-dark" router-link to="/stateManagement">OP Status Management </router-link>
                </li> 
                <li class="nav-item-cab col-md-2">
                    <router-link class="nav-link bg-dark active" router-link to="/">Início</router-link>
                </li> 
                <li class="nav-item-cab col-md-2">
                    <router-link class="nav-link bg-dark active" router-link to="">Gerenciamento de Ordem</router-link>
                </li> 
                 <li class="nav-item-cab col-md-2">
                    <router-link class="nav-link bg-dark active" router-link to="/statusManagement">Gerenciamento de Ferramentas</router-link>
                </li> 
                <!--<li class="nav-item-cab">
                    <a class="nav-link active" router-link to="">Análises Químicas</a>
                </li>-->
                <!--<li class="nav-item-cab">
                    <a class="nav-link active" router-link to="">Automação</a>
                </li>-->
            </ul>    
        </nav>
    </div> 

        <!--                        -->
        <!--   Rodapé da Página     -->
        <!--                        -->
    <footer>
        <div class="footer-text"> Sistema Onyx V1.0</div>
    </footer>

        <img src="./../../assets/imagens/mahle.png" class="logo-mahle"/>
        <img src="./../../assets/imagens/logonegativo2.png" class="logo-spi"/>

        <!--                        -->
        <!--                        -->
        <!--   Menu lateral Novo    -->
        <!--                        -->
        <!--                        -->             
        <div class="container-fluid fixed-top menu-btn"> 
            <div class="row">
                <div class="col-xs-1 p-l-0 p-r-0 collapse in" id="sidebar">
                    <div class="list-group panel">
                        <a href="#menu2" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" aria-expanded="false"><i class="fa fa-odnoklassniki"></i> <span class="hidden-sm-down">   OPERADOR</span> </a>
                        <div class="collapse" id="menu2">
                            <a href="#" class="list-group-item" data-parent="#menu1"> Logout </a>
                        </div>
                        <a href="#menu1" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" aria-expanded="false"><i class="fa fa-wpforms"></i> <span class="hidden-sm-down">   THINGS</span> </a>
                        <div class="collapse" id="menu1">
                            <a href="#" class="list-group-item" data-parent="#menu1"> Gerenciar Things </a>
                            <a href="#" class="list-group-item" data-parent="#menu1"> Criar grupo</a>
                            <a href="#" class="list-group-item" data-parent="#menu1"> Hierarquia </a>
                            <div class="collapse" id="menu1sub1">
                                <div class="collapse" id="menu1sub1">
                                </div>
                            </div> 
                        </div>
                        <router-link to="/listRecipes" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar">
                            <i class="fa fa-book"></i> 
                            <span class="hidden-sm-down">  RECEITA</span>
                        </router-link>        
                        <router-link to="/generateProducts" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-balance-scale"></i> 
                            <span class="hidden-sm-down">  PRODUTOS</span>
                        </router-link>         
                        <router-link to="/toolCreate" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-cogs"></i> <span class="hidden-sm-down">    FERRAMENTAS</span>
                        </router-link>
                        <router-link to="/prodOrder" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-industry"></i> <span class="hidden-sm-down">   ORDEM DE PRODUÇÃO</span>
                        </router-link>
                        <router-link to="/historianProduction" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-database"></i> <span class="hidden-sm-down">   APONTAMENTOS</span>
                        </router-link>
                        <router-link to="/associateTool" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-cogs"></i> <span class="hidden-sm-down">   ASSOCIAÇÃO DE FERRAMENTAS</span>
                        </router-link>
                        <router-link to="/AssociateOP" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-industry"></i> <span class="hidden-sm-down">   ASSOCIAÇÃO DE OP</span>
                        </router-link> 
                        <router-link to="/stateTransitionHistory" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-file-o"></i> <span class="hidden-sm-down">    HISTÓRICOS</span>
                        </router-link>          
                        <router-link to="/toolType" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-cogs"></i> <span class="hidden-sm-down">   TIPO DE FERRAMENTAS</span>
                        </router-link>
                        <!-- <router-link to="/statusManagement" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-cogs"></i> <span class="hidden-sm-down">   GERENCIAMENTO DE FERRAMENTAS</span>
                        </router-link> -->
                        <router-link to="/OPManagement" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-industry"></i> <span class="hidden-sm-down">   GERENCIAMENTO DE OP</span>
                        </router-link> 
                        <router-link to="/opType" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-industry"></i> <span class="hidden-sm-down">   TIPO DE OP</span>
                        </router-link> 
                    </div>
                </div>
                    <a href="#sidebar" data-toggle="collapse" id="open" @click="open()">
                        <i class="icon-navigate fa fa-navicon fa-lg"></i>
                    </a>
                    <a href="#sidebar" data-toggle="collapse" id="close" @click="close()">
                        <i class="icon-navigate fa fa-close fa-lg"></i>
                    </a>
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
<script src="./js/navbar.js">
</script>
<style>
@import url("./navBar.css");
</style>


