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
                    <li class="nav-item-cab col-md-2">
                        <router-link class="nav-link bg-dark active btn-config" router-link to="/"><i class= "fa fa-home" style="font-size:44px; cursor:pointer"></i>  <br>Início</router-link>
                    </li>                    
                    <li class="nav-item-cab col-md-2">
                        <router-link class="nav-link bg-dark active btn-config" router-link to="/historian"><i class= "fa fa-bar-chart" style="font-size:44px; cursor:pointer"></i>  <br>Rastreamento de processo</router-link>
                    </li> 
                    <!-- <li class="nav-item-cab col-md-2">
                        <router-link class="nav-link bg-dark active btn-config" router-link to="/statusManagement"><i class= "fa fa-cogs" style="font-size:44px; cursor:pointer"></i>  <br>Ferramentas</router-link>
                    </li>  -->
                    <li class="nav-item-cab col-md-2">
                        <router-link class="nav-link bg-dark active btn-config" router-link to="/historianMain"><i class= "fa fa-keyboard-o" style="font-size:44px; cursor:pointer"></i>  <br>Apontamentos</router-link>
                    </li> 
                    <!-- <li class="nav-item-cab col-md-1.5">
                        <router-link class="nav-link bg-dark active btn-config" router-link to="/historianProductionTira"><i class= "fa fa-keyboard-o" style="font-size:44px; cursor:pointer"></i>  <br>Apontamentos Tira</router-link>
                    </li>  -->
                    <li class="nav-item-cab col-md-1" v-show="username != 'null'">
                        <router-link to="#" class="nav-link bg-dark active btn-config">
                            <i class= "fa fa-user bgcolor" style="font-size:20px; cursor:pointer"></i> <br>
                        <p style="font-size:15px; cursor:pointer"> {{username}}  </p>
                        
                        </router-link>
                    </li>
                    <li class="nav-item-cab col-md-1 bgcolor" @click.stop.prevent="Logout()" v-show="username != 'null'">
                        <i class="fa fa-user-times bgcolor-u-delete" style="font-size:20px; cursor:pointer" ></i><br>  
                        <p style="font-size:15px; cursor:pointer"> Logout </p>
                    </li> 
                </ul>    
            </nav>
        </div> 

        <router-view/>


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
             <b-button v-b-toggle.sidebar id="open">
                <i class="icon-navigate fa fa-navicon fa-lg"></i>
            </b-button>       
        </div>   
            
                <b-collapse class="fixed-top col-md-6 p-l-0 p-r-0" id="sidebar" >
                   
                        <!-- <div class="list-group-item collapsed" cursor="pointer" v-b-toggle.menu2><i class="fa fa-odnoklassniki"></i> 
                            OPERADOR
                            <i class="fa fa-chevron-down pull-right"></i>
                        </div> -->
                        <!-- <b-collapse id="menu2">    -->
                            <router-link to="/login"  class="list-group-item collapsed" cursor="pointer" v-b-toggle.sidebar> 
                                <i class="fa fa-user-circle"></i> Login 
                                
                            </router-link>                   
                            <!-- <button to="" @click.stop.prevent="Logout()"  class="list-group-item collapsed" cursor="pointer" v-b-toggle.sidebar> 
                                <i class="fa fa-user-times"></i> Logout 
                            </button> -->
                        <!-- </b-collapse> -->

                        <router-link to="/user" class="list-group-item collapsed" data-parent="#sidebar" v-b-toggle.sidebar>
                            <i class="fa fa-user-md"></i> 
                            <span class="hidden-sm-down">  
                                USUÁRIOS
                            </span>
                        </router-link>
                        <router-link to="/usergroup" class="list-group-item collapsed" data-parent="#sidebar" v-b-toggle.sidebar>
                            <i class="fa fa-users"></i> 
                            <span class="hidden-sm-down">  
                                GRUPO DE USUÁRIOS
                            </span>
                        </router-link>

                        <router-link to="/generateproducts" class="list-group-item collapsed" data-parent="#sidebar" v-b-toggle.sidebar>
                            <i class="fa fa-barcode"></i> 
                            <span class="hidden-sm-down">  
                                MATÉRIAS-PRIMAS
                            </span>
                        </router-link>
                        <!--Bye bye receitas <router-link to="/listRecipes" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" cursor="pointer">
                            <i class="fa fa-book"></i> 
                            <span class="hidden-sm-down">  
                                RECEITA
                            </span>
                        </router-link>-->
                        <router-link to="/listtira" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" cursor="pointer" v-b-toggle.sidebar>
                            <i class="fa fa-bars"></i> 
                            <span class="hidden-sm-down">  
                                GERENCIAMENTO DE TIRA
                            </span>
                        </router-link>
                        <router-link to="/listliga" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" cursor="pointer" v-b-toggle.sidebar>
                            <i class="fa fa-book"></i> 
                            <span class="hidden-sm-down">  
                                GERENCIAMENTO DE LIGA
                            </span>
                        </router-link>
                        <router-link to="/listlineparameters" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" cursor="pointer" v-b-toggle.sidebar>
                            <i class="fa fa-random"></i> 
                            <span class="hidden-sm-down">  
                                PARAMETROS DE LINHA
                            </span>
                        </router-link>
                        <!-- <router-link to="/historianalarms" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" cursor="pointer" v-b-toggle.sidebar>
                            <i class="fa fa-bell"></i> 
                            <span class="hidden-sm-down">  
                                ALARMES
                            </span>
                        </router-link> -->

                        <div class="list-group-item collapsed" data-parent="#sidebar" v-b-toggle.menu1 cursor="pointer">
                            <i class="fa fa-cogs"></i> 
                                <span class="hidden-sm-down">   
                                FERRAMENTAS/INSUMOS
                                </span> 
                             <i class="fa fa-chevron-down pull-right"></i> 
                        </div> 
                        <b-collapse id="menu1">
                            <router-link to="/toolCreate" class="list-group-item" data-parent="#menu1" v-b-toggle.sidebar> 
                                Cadastro de Ferramentas/Insumos 
                            </router-link>
                            <!-- <router-link to="/toolType" class="list-group-item" data-parent="#menu1" v-b-toggle.sidebar> 
                                Tipo de Ferramentas/Insumos 
                            </router-link> -->
                            <router-link to="/toolTypeAssoc" class="list-group-item" data-parent="#menu1" v-b-toggle.sidebar> 
                                Associação de Ferramentas/Insumos 
                            </router-link>
                            <!-- <router-link to="/inUseTools" class="list-group-item" data-parent="#menu1" v-b-toggle.sidebar> 
                                Ferramentas/Insumos em uso
                            </router-link> -->
                            <router-link to="/ToolsManagement" class="list-group-item" data-parent="#menu1" v-b-toggle.sidebar> 
                                Gerenciamento de Ferramentas/Insumos
                            </router-link>
                            <div class="collapse" id="menu1sub1">
                                <div class="collapse" id="menu1sub1">
                                </div>
                            </div> 
                        </b-collapse>          

                        <a class="list-group-item collapsed"  v-b-toggle.menu3  >
                            <i class="fa fa-industry"></i> 
                                <span class="hidden-sm-down">   
                                 ORDEM DE PRODUÇÃO
                                </span> 
                             <i class="fa fa-chevron-down pull-right"></i> 
                        </a>  
                        <b-collapse id="menu3" @click.stop="active = !active">
                            <router-link to="/prodOrderTira" class="list-group-item" data-parent="#menu3" v-b-toggle.sidebar> 
                                <!-- <i class="fa fa-industry"></i>  -->
                                Ordens de produção - Tiras
                            </router-link>
                            <router-link to="/prodOrderLiga" class="list-group-item" data-parent="#menu3" v-b-toggle.sidebar> 
                                <!-- <i class="fa fa-gear"></i>  -->
                                Ordens de produção - Ligas (OPL)
                            </router-link>
                            <router-link to="/opInAnalysis" class="list-group-item" data-parent="#menu3" v-b-toggle.sidebar> 
                                <!-- <i class="fa fa-thermometer-quarter"></i>  -->
                                Ordens de produção Em Análise
                            </router-link>
                        </b-collapse>

                        <a class="list-group-item collapsed"  v-b-toggle.reports  >
                            <i class="fa fa-line-chart"></i> 
                                <span class="hidden-sm-down">   
                                 RELATÓRIOS
                                </span> 
                             <i class="fa fa-chevron-down pull-right"></i> 
                        </a>  
                        <b-collapse id="reports" @click.stop="active = !active">
                            <router-link to="/historian" class="list-group-item" data-parent="#reports" v-b-toggle.sidebar> 
                                Rastreamento de Processos
                            </router-link>
                            <router-link to="/alarms" class="list-group-item" data-parent="#reports" v-b-toggle.sidebar> 
                                Alarmes
                            </router-link>
                            <router-link to="/resampling" class="list-group-item" data-parent="#reports" v-b-toggle.sidebar> 
                                Reamostragem
                            </router-link>
                        </b-collapse>
                    </b-collapse>   
                    </div>   
        <!-- <router-view/> -->
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


