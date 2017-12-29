<<template>

<div>
    <!--                                  -->
    <!--                                  -->
    <!-- Cabeçalho da pagina, logo e user -->
    <!--                                  -->
    <!--                                  -->
                    
<nav class="header fixed-top">
<img src="./../../assets/imagens/onyx.png" class="col-sm-12 logo-system"/> 
<ul class="nav nav-pills bg-primary">
<li class="nav-item">
<a class="nav-link active" router-link to="/">Início</a>
</li> 
<li class="nav-item">
<a class="nav-link active" router-link to="">Gerenciamento de Ordem</a>
</li> 
<li class="nav-item">
<a class="nav-link active" router-link to="">Análises Químicas</a>
</li>
<li class="nav-item">
<a class="nav-link active" router-link to="">Automação</a>
</li>
</ul>

                                    
<!--<router-link to="/" class="user">                
<i class="fa fa-user-o" aria-hidden="true"></i>
Operador 
<i class="fa fa-chevron-down" aria-hidden="true"></i>                                
</router-link>-->     
</nav>
    
    <!--                           -->
    <!--                           -->
    <!-- Menu navegação de atalhos -->
    <!--                           -->
    <!--                           -->
    <!--<nav class="nav-menu fixed-top ">
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
    </nav>-->
       <div class="menu-lateral">
            <img src="./../../assets/imagens/spi.jpg" class="col-sm-0 logo-system"/>
            <h4 class="titulomenu">
                <br>Menu                            
            </h4>
            <div class="texto-menu-lateral card-header" role="tab" id="headingOne">
                <a data-toggle="collapse" href=".collapseOne" aria-expanded="true" aria-controls="collapseOne">THINGS</a>  
                <i style="" class="fa">&#xf0d7;</i></br>
                    <div id="collapseOne" class="sub-menu-lateral collapse collapseOne in" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">Gerenciar Things</div>
                    <div id="collapseOne" class="sub-menu-lateral collapse collapseOne in" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">Criar grupo</div>
                    <div id="collapseOne" class="sub-menu-lateral collapse collapseOne in" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">Hierarquia</div>
                <a data-toggle="collapse"  href=".v-pills-receita" aria-expanded="true" router-link to="/phases"   aria-controls="collapseOne">RECEITA</a>  
                <i style="" class="fa">&#xf0d7;</i></br>
                    <div id="v-pills-receita" class="v-pills-receita sub-menu-lateral collapse in" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion"><router-link to="/phases">Cadastrar Receita</router-link></div>
                    <div id="v-pills-receita" class="v-pills-receita sub-menu-lateral collapse in" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">Relatório de Receita</div>
                <router-link to="" data-toggle="collapse" href="" aria-expanded="true" aria-controls="collapseOne">TAG</router-link>  
                <i style="" class="fa">&#xf0da;</i></br>
                <router-link to="/generateProducts"  data-toggle="collapse" href="" aria-expanded="true" aria-controls="collapseOne">PRODUTOS</router-link>                          
                <i style="" class="fa">&#xf0da;</i></br>
                <router-link to="/toolCreate" data-toggle="collapse" href="" aria-expanded="true" aria-controls="collapseOne">FERRAMENTAS</router-link>    
                <i style="" class="fa">&#xf0da;</i></br>
            </div>                                                                                                        
        </div>        
        <router-view/>      
    </div>        
    <router-view/>-->   

    <!--                        -->
    <!--                        -->
    <!--   Menu lateral Novo    -->
    <!--                        -->
    <!--                        -->         
<div class="container-fluid fixed-top"> 
<div class="row">
<div class="col-md-2 col-xs-1 p-l-0 p-r-0 collapse in" id="sidebar">
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
    <a href="#menu3" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" aria-expanded="false"><i class="fa fa-book"></i> <span class="hidden-sm-down">RECEITA </span></a>          
    <div class="collapse" id="menu3">
        <router-link to="/phases" class="list-group-item" data-parent="#menu3">Cadastrar Receita</router-link>
        <a href="#" class="list-group-item" data-parent="#menu3">Relatório de Receita</a>        
            </div>            
    <router-link to="/generateProducts" class="list-group-item collapsed" data-parent="#sidebar"><i class="fa fa-balance-scale"></i> <span class="hidden-sm-down">  PRODUTOS</span></router-link>         
    <router-link to="/toolCreate" class="list-group-item collapsed" data-parent="#sidebar"><i class="fa fa-building-o"></i> <span class="hidden-sm-down">   FERRAMENTAS</span></router-link>           
    </div>
</div>
<main class="col-md-9 col-xs-11 p-l-2 p-t-2">
    <a href="#sidebar" data-toggle="collapse"><i class="icon-navigate fa fa-navicon fa-lg" style="font-size:30px"></i></a>
    <hr>
        </main>
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

