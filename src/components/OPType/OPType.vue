<template>
    <div>
            
       <nav class="fixed-top nav-OP">
            <ul class="nav d-flex align-items-center">
                <li class="nav-item col-sm-1.5 bt">
                        <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#cadastrar-tt">
                            Cadastrar Tipo de OP
                        </button>
                </li>
            </ul>
        </nav>

        <div class="row conteudo-tt">
            <div class="op col-md-10">
                    <div class="container-fluid col-md-9">
                     <div class="card">
                        <div class="card-header">
                        <b>Tipos de Ordem de Produção</b>
                        </div> 
                        <div class="card-body"> 
                            <div v-for="(t, index) in Types" v-bind:key="index">
                            <label class="ls">
                            <b><font color="#9BA6A5">Tipo: </font></b>{{t.typeDescription}}</label>&nbsp;
                            <label class="ls">
                            <b><font color="#9BA6A5">Ecopo: </font></b>{{t.typeScope}}</label>&nbsp;
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--    CRIAR TOOLSTYPE    -->
        <!--                       -->
        <!--                       -->
        <!--        modal          -->
        <div class="modal fade" id="cadastrar-tt" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Criar Tipo de Ordem de Produção</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-success" role="alert">
                            Tipo de Ferramenta cadastrada com sucesso !
                        </div>
                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="">Ferramenta</label>
                            <input type="text" class="form-control form-control-sm" placeholder="Nome">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Descrição</label>
                            <input type="text" class="form-control form-control-sm" placeholder="Código">
                        </div>
                        </div>
                        <div class="form-row">
                           <div class="col-md-6">
                            <label for="opType" class="col-form-label">Grupo</label>
                            </div>
                            <div class="col-md-2 btn-add-tt">
                                <button class="btn btn-outline-success btn-sm">
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <div class="btn-group" role="group">
                            <button class="btn btn-success">
                                <i class="fa fa-check-square" aria-hidden="true"></i>
                            </button>
                            <button class="btn btn-danger">
                                <i class="fa fa-window-close" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>              
</template>


<script>
export default {
props: ["nothing"]
};
</script>
<script src="./js/OPType.js">
</script>
<style>
@import url("./css/OPType.css");
</style>


