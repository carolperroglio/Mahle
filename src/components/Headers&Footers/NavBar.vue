                                                                                                                                                    <template>
    <div>
        <!--                                  -->
        <!--                                  -->
        <!-- Cabeçalho da pagina, logo e user -->
        <!--                                  -->
        <!--                                  -->
        <header class="header fixed-top">
            <div class="row  mb-0">                
                <div class="col-sm-10">
                    <img src="./../../assets/imagens/mahle_logo_azul_escuro.png" class="logo"/>                                      
                </div>                
                <a class="user col-sm-0 no-gutters" href="#">                
                    <i class="fa fa-user-o" aria-hidden="true"></i>
                    Operador 
                    <i class="fa fa-chevron-down" aria-hidden="true"></i>                
                </a>                                
            </div>                                     
        </header>
        <!--                           -->
        <!--                           -->
        <!-- Menu navegação de atalhos -->
        <!--                           -->
        <!--                           -->
        <nav class="nav-menu fixed-top">
            <ul class="nav justify-content-end">
                <li class="nav-item">
                    <a class="nav-link" href="/#/">
                        <center>
                            <img src="./../../assets/imagens/home.png" class="icons" />
                        </center>
                        <p>Home</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="">
                        <center>
                            <img src="./../../assets/imagens/contract.png" class="icons" />
                        </center>
                        <p>Cadastrar OP</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="">
                        <center>
                            <img src="./../../assets/imagens/stick-man.png" class=" icons" />
                        </center>
                        <p>Acompanhamento</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="">
                        <center>
                            <img src="./../../assets/imagens/off-button.png" class="icons" />
                        </center>
                        <p>On/Off</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="">
                        <center>
                            <img src="./../../assets/imagens/flask.png" class="icons" />
                        </center>
                        <p>Análises Quimicas</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="">
                        <center><img src="./../../assets/imagens/computer.png" class="icons" /></center>
                        <p>Automação</p>
                    </a>
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
            <h4 class="titulomenu" id="test">
                <br>Menu                            
            </h4>
            <div class="">
                <nav>
                    <ul>
                        <li><br>THINGS</li>    
                        <li><br>RECEITA</li>    
                        <li><br>PARÂMETROS</li>    
                        <li><br><a href="#/generateProducts">PRODUTOS</a></li>    
                    </ul>          
                </nav>
            </div>                                                                                                  
        </div>        
        <router-view/>       
    </div>    

        
</template>

<script>


export default {
    props: ['nothing'],
}
</script>

<style>
    @import url('./navBar.css');
</style>
