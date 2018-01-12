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
                    <li class="nav-item-cab col-md-2">
                        <router-link class="nav-link bg-dark active" router-link to="/"><i class= "fa fa-home" style="font-size:25px; cursor:pointer"></i>  <br>Início</router-link>
                    </li> 
                    <li class="nav-item-cab col-md-3">
                        <router-link class="nav-link active bg-dark" router-link to="/stateManagement"><i class= "fa fa-power-off" style="font-size:25px; cursor:pointer"></i>  <br>OP Status Management </router-link>
                    </li> 
                    <li class="nav-item-cab col-md-2">
                        <router-link class="nav-link bg-dark active" router-link to="/OPManagement"><i class= "fa fa-industry" style="font-size:25px; cursor:pointer"></i>  <br>Gerenciamento de Ordem</router-link>
                    </li> 
                    <li class="nav-item-cab col-md-2">
                        <router-link class="nav-link bg-dark active" router-link to="/statusManagement"><i class= "fa fa-cogs" style="font-size:25px; cursor:pointer"></i>  <br>Gerenciamento de Ferramentas</router-link>
                    </li> 
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
            <div class="row refactor-class-row">
                <div class="col-xs-1 p-l-0 p-r-0 collapse in" id="sidebar">
                    <div class="list-group panel">
                        <a href="#menu2" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" aria-expanded="false"><i class="fa fa-odnoklassniki">
                            </i> 
                        <span class="hidden-sm-down">   
                            OPERADOR
                        </span> 
                        </a>
                        <div class="collapse" id="menu2">
                            <router-link to="#" class="list-group-item" data-parent="#menu1"> Logout </router-link>
                        </div>
                        
                        <router-link to="/generateProducts" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-barcode"></i> 
                            <span class="hidden-sm-down">  
                                MATERIAIS
                            </span>
                        </router-link>
                        <router-link to="/listRecipes" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar">
                            <i class="fa fa-book"></i> 
                            <span class="hidden-sm-down">  
                                RECEITA
                            </span>
                        </router-link>

                        <a href="#menu1" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" aria-expanded="false">
                            <i class="fa fa-cogs"></i> 
                                <span class="hidden-sm-down">   
                                FERRAMENTAS
                                </span> 
                        </a>  
                        <div class="collapse" id="menu1">
                            <router-link to="/toolCreate" class="list-group-item" data-parent="#menu1"> 
                                Cadastro de Ferramentas 
                            </router-link>
                            <router-link to="/toolType" class="list-group-item" data-parent="#menu1"> 
                                Tipo de Ferramentas 
                            </router-link>
                            <router-link to="/associateTool" class="list-group-item" data-parent="#menu1"> 
                                Associação de Ferramentas 
                            </router-link>
                             <router-link to="/inUseTools" class="list-group-item" data-parent="#menu1"> 
                                Ferramentas em uso
                            </router-link>
                            <div class="collapse" id="menu1sub1">
                                <div class="collapse" id="menu1sub1">
                                </div>
                            </div> 
                        </div>         

                        <a href="#menu3" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" aria-expanded="false">
                            <i class="fa fa-industry"></i> 
                                <span class="hidden-sm-down">   
                                 ORDEM DE PRODUÇÃO
                                </span> 
                        </a>  
                        <div class="collapse" id="menu3">
                            <router-link to="/prodOrder" class="list-group-item" data-parent="#menu3"> 
                                Cadastro de Ordem de Produção
                            </router-link>
                            <router-link to="/opType" class="list-group-item" data-parent="#menu3"> 
                                Tipo de Ordem de Produção 
                            </router-link>
                            <router-link to="/AssociateOP" class="list-group-item" data-parent="#menu3"> 
                                Associação de Ordem de Produção
                            </router-link>
                            <div class="collapse" id="menu3sub1">
                                <div class="collapse" id="menu3sub1">
                                </div>
                            </div> 
                        </div>
                      
                        <router-link to="/historianProduction" class="list-group-item collapsed" data-parent="#sidebar">
                            <i class="fa fa-database"></i> <span class="hidden-sm-down">   APONTAMENTOS</span>
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


