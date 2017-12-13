<template>    
    <div>
        
        <div class="col-lg-5 col-lg-offset-2">
            <div class="panel panel-primary">
                <div class="panel-heading panel-things">Panel Heading</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-lg-3 control-label" for="id">Id</label>
                            <div class="col-lg-8">
                                <input  type="text" class="form-control" id="id" placeholder="Id" />                        
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label" for="name">Nome</label>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" id="name" placeholder="Nome" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label" for="desc">Descrição</label>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" id="desc" placeholder="Descrição" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label" for="code">Código</label>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" id="code" placeholder="Código" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label" for="position">Posição</label>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" id="position" placeholder="Posição" />
                            </div>
                        </div>
                        
                        <div class="pull-right">
                            <span class="glyphicon glyphicon-pencil"></span>
                            <span class="glyphicon glyphicon-ok"></span>
                            <span class="glyphicon glyphicon-remove"></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>    
</template>

<script src="./js/things.js"></script>

<style>
    @import url('./css/things.css');
</style>
