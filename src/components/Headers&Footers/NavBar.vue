<template>
    <div>

        <!--                                  -->
        <!--                                  -->
        <!-- Cabeçalho da pagina, logo e user -->
        <!--                                  -->
        <!--                                  -->

        <div class="fluid">  
            <nav class="fixed-top">
                <img src="./../../assets/imagens/mahle.png" class="logo-system"/>
                <ul class="nav nav-pills nav-justified bg-dark">
                    <li class="nav-item-cab col-md-1">
                        <router-link class="nav-link bg-dark active btn-config" router-link to="/home"><i class= "fa fa-home" style="font-size:44px; cursor:pointer"></i>  <br>Início</router-link>
                    </li>                    
                    <li class="nav-item-cab col-md-1.5">
                        <router-link class="nav-link bg-dark active btn-config" router-link to="/historian"><i class= "fa fa-bar-chart" style="font-size:44px; cursor:pointer"></i>  <br>Rastreamento de processo</router-link>
                    </li> 

                    <li class="nav-item-cab col-md-2">
                        <router-link class="nav-link bg-dark active btn-config" router-link to="/statusManagement"><i class= "fa fa-cogs" style="font-size:44px; cursor:pointer"></i>  <br>Ferramentas</router-link>
                    </li> 
                    <li class="nav-item-cab col-md-1.5">
                        <router-link class="nav-link bg-dark active btn-config" router-link to="/historianProductionLiga"><i class= "fa fa-keyboard-o" style="font-size:44px; cursor:pointer"></i>  <br>Apontamentos Liga</router-link>
                    </li> 
                    <li class="nav-item-cab col-md-1.5">
                        <router-link class="nav-link bg-dark active btn-config" router-link to="/historianProductionTira"><i class= "fa fa-keyboard-o" style="font-size:44px; cursor:pointer"></i>  <br>Apontamentos Tira</router-link>
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

        <img src="./../../assets/imagens/onyx3.png" class="logo-onyx img-responsive"/>
        <img src="./../../assets/imagens/logonegativo2.png" class="logo-spi"/>

        <!--                        -->
        <!--                        -->
        <!--   Menu lateral Novo    -->
        <!--                        -->
        <!--                        -->  
        <div v-on-clickaway="away" id="divside">
        <div class="row fixed-top menu-btn">             
             <b-button v-b-toggle.sidebar id="open" >
                <i class="icon-navigate fa fa-navicon fa-lg"></i>
            </b-button>       
        </div>   
            
                <b-collapse class="fixed-top col-md-6 p-l-0 p-r-0" id="sidebar" flush>
                   
                        <div class="list-group-item collapsed" cursor="pointer" v-b-toggle.menu2><i class="fa fa-odnoklassniki"></i> 
                            OPERADOR
                            <i class="fa fa-chevron-down pull-right"></i>
                        </div>
                        <b-collapse id="menu2">                      
                            <router-link to="#" data-parent="#menu1" class="list-group-item collapsed" cursor="pointer"> 
                                Logout 
                            </router-link>
                        </b-collapse>

                        <router-link to="/statusmes" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" cursor="pointer">
                            <i class="fa fa-check-square"></i> 
                            <span class="hidden-sm-down">  
                                STATUS DO MES
                            </span>
                        </router-link>

                        <router-link to="/generateProducts" class="list-group-item collapsed" data-parent="#sidebar" >
                            <i class="fa fa-barcode"></i> 
                            <span class="hidden-sm-down">  
                                MATERIAIS
                            </span>
                        </router-link>
                        <!--Bye bye receitas <router-link to="/listRecipes" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" cursor="pointer">
                            <i class="fa fa-book"></i> 
                            <span class="hidden-sm-down">  
                                RECEITA
                            </span>
                        </router-link>-->
                        <router-link to="/listtira" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" cursor="pointer">
                            <i class="fa fa-book"></i> 
                            <span class="hidden-sm-down">  
                                GERENCIAMENTO DE TIRA
                            </span>
                        </router-link>
                        <router-link to="/listliga" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" cursor="pointer">
                            <i class="fa fa-book"></i> 
                            <span class="hidden-sm-down">  
                                GERENCIAMENTO DE LIGA
                            </span>
                        </router-link>
                        <router-link to="/listliga" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" cursor="pointer">
                            <i class="fa fa-book"></i> 
                            <span class="hidden-sm-down">  
                                PARAMETROS DE LINHA
                            </span>
                        </router-link>
                        <router-link to="/historianalarms" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" cursor="pointer">
                            <i class="fa fa-bell"></i> 
                            <span class="hidden-sm-down">  
                                ALARMES
                            </span>
                        </router-link>

                        <div class="list-group-item collapsed" data-parent="#sidebar" v-b-toggle.menu1 cursor="pointer">
                            <i class="fa fa-cogs"></i> 
                                <span class="hidden-sm-down">   
                                FERRAMENTAS/INSUMOS
                                </span> 
                             <i class="fa fa-chevron-down pull-right"></i> 
                        </div>  
                        <b-collapse id="menu1">
                            <router-link to="/toolCreate" class="list-group-item" data-parent="#menu1"> 
                                Cadastro de Ferramentas/Insumos 
                            </router-link>
                            <router-link to="/toolType" class="list-group-item" data-parent="#menu1"> 
                                Tipo de Ferramentas/Insumos 
                            </router-link>
                            <router-link to="/associateTool" class="list-group-item" data-parent="#menu1"> 
                                Associação de Ferramentas/Insumos 
                            </router-link>
                             <router-link to="/inUseTools" class="list-group-item" data-parent="#menu1"> 
                                Ferramentas/Insumos em uso
                            </router-link>
                            <router-link to="/ToolsManagement" class="list-group-item" data-parent="#menu1"> 
                                Gerenciamento de Ferramentas/Insumos
                            </router-link>
                            <div class="collapse" id="menu1sub1">
                                <div class="collapse" id="menu1sub1">
                                </div>
                            </div> 
                        </b-collapse>         

                        <a class="list-group-item collapsed"  v-b-toggle.menu3>
                            <i class="fa fa-industry"></i> 
                                <span class="hidden-sm-down">   
                                 ORDEM DE PRODUÇÃO
                                </span> 
                             <i class="fa fa-chevron-down pull-right"></i> 
                        </a>  
                        <b-collapse id="menu3">
                            <router-link to="/prodOrder" class="list-group-item" data-parent="#menu3"> 
                                Cadastro de Ordem de Produção
                            </router-link>
                            <!-- <router-link to="/opType" class="list-group-item" data-parent="#menu3"> 
                                Tipo de Ordem de Produção 
                            </router-link>
                            <router-link to="/AssociateOP" class="list-group-item" data-parent="#menu3"> 
                                Associação de Ordem de Produção
                            </router-link>
                            <router-link to="/OPManagement" class="list-group-item" data-parent="#menu3"> 
                                Gerenciamento de Ordem de Produção
                            </router-link> -->
                        </b-collapse>
                    </b-collapse>      
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
export default {
  props: ["nothing"]
};
</script>
<style>
@import url("./navBar.css");
</style>


