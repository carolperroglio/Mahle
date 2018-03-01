# Mahle

Repositório do sistema Onyx 

![Onyx](https://raw.githubusercontent.com/carolperroglio/Mahle/master/onyx.jpg)

## Build Setup

* Instalar todas as dependências

``` 
npm install
```

* Servidor com hot reload --> localhost:8080
```
npm run dev
```

* Build para produção
```
npm run build
```

## Configuração do servidor para a produção

* Instalar os seguintes plugins:
  * rewrite 2.0 x64
  * node x64
  * iisnode full x64
  * iisexpress x86
  * C++ 2010 redistributable x64 ou x86
* Na aplication pool, editar o .NET FRAMEWORK para "No Managed Code"
* No servidor IIS, copiar os itens da pasta dist para dentro da pasta raiz da aplicação "frontendMahle";
* Restart no servidor.
