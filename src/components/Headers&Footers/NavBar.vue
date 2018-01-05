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
            <ul class="nav nav-pills bg-dark">
                <li class="nav-item-cab col-md-3">
                    <a class="nav-link bg-dark active" router-link to="/stateManagement">OP Status Management </a>
                </li> 
                <li class="nav-item-cab col-md-2">
                    <a class="nav-link bg-dark active" router-link to="/">Início</a>
                </li> 
                <li class="nav-item-cab col-md-2">
                    <a class="nav-link bg-dark active" router-link to="">Gerenciamento de Ordem</a>
                </li> 
                 <li class="nav-item-cab col-md-2">
                    <a class="nav-link bg-dark active" router-link to="">Gerenciamento de Ferramentas</a>
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
        <div class="container-fluid fixed-top"> 
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
                        <!-- <a href="#menu3" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" aria-expanded="false"><i class="fa fa-book"></i> <span class="hidden-sm-down">RECEITA </span></a>           -->
                        <!-- <div class="collapse" id="menu3">
                            <router-link to="/phases" class="list-group-item" data-parent="#menu3">Cadastrar Receita</router-link>
                            <router-link to="/listRecipes" class="list-group-item" data-parent="#menu3">Relatório de Receita</router-link>
                             <a href="#" class="list-group-item" data-parent="#menu3">Relatório de Receita</a>
                        </div>  -->
                        <router-link to="/listRecipes" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-book"></i> <span class="hidden-sm-down">   RECEITAS</span>
                        </router-link>           
                        <router-link to="/generateProducts" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-balance-scale"></i> 
                            <span class="hidden-sm-down">  PRODUTOS</span>
                        </router-link>         
                        <router-link to="/toolCreate" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-building-o"></i> <span class="hidden-sm-down">   FERRAMENTAS</span>
                        </router-link>
                        <router-link to="/prodOrder" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-industry"></i> <span class="hidden-sm-down">   ORDEM DE PRODUÇÃO</span>
                        </router-link>
                        <router-link to="/historianProduction" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-building-o"></i> <span class="hidden-sm-down">   APONTAMENTOS</span>
                        </router-link>
                        <!--<router-link to="/stateManagement" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-industry"></i> <span class="hidden-sm-down">   OP Status Management</span>
                        </router-link>-->          
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


