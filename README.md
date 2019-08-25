<p align="center">
  <a href="https://facebook.com/lourencodaniel.carlos" target="_blank" >
    <h1>G'CableTv</h1>
    <h3>A gestão mora aquí!!!</h3>
  </a>
</p>
<p align="center">
</p>

[G'CableTv](https://facebook.com/lourencodaniel.carlos) é uma api nodejs para gestão de empresa voltadas à TV por cabo, desenvolvida por [Lourenço Daniel Sebastião Carlos](https://facebook.com/lourencodaniel.carlos) (também conhecido por [Enzo Daniel Carlos](https://facebook.com/lourencodaniel.carlos)), que tem como principal objectivo fornecer para o cliente o CRUD completo das entidades relevantes num sistema de gestão. É totalmente padronizado, com gestão de status de erros (tudo em JSON), é de fácil utilização, fornecendo assim uma aprendizagem curta e ao mesmo tempo poderosa.

**(o_^)**
_Enzo Daniel Carlos (25/08/2019 - 22h:42min.)_

## Instalação

Primeiro tu deves ter o
[NodeJs](https://nodejs.org) instalado.  Faça um clone do repositório, eu
recomendo que uses o [VisualStudioCode](https://code.visualstudio.com) como editor. 

**Abra o arquivo db.js (caminho: models/db.js), apartir da linha 4 verás o codigo:**
``` 
const sequelize = new Sequelize("testcabletv", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    underscored: true
  }
});
```
**#Dicas:**

1: _"testcabletv"_ - coloque o nome do teu banco de dados (obs.: primeiro cria o banco de dados).

2: _"root"_ - é o nome do usuário do _mysql_, isso é padrão, mas se estiveres a usar um outro tipo de conexão podes trocar.

3: _""_ - é onde deves colocar a _password(Palavra-passe)_ do teu banco de dados.

4: _host: "localhost"_ - é onde deves colocar o nome do teu servidor. 

5: _dielect: "mysql"_ - é onde deves colocar o tipo de banco de dados em que vais te conectar, neste caso o meu é _mysql_.


**Abra o arquivo db.js (caminho: models/db.js), quase a ultima deste arquivo verás o código:**

``` 
/* db.sequelize.sync({
  force: true
}) */
```
**#Dicas:**

1: _"descomenta o código"_ tem de ficar assim:
``` 
db.sequelize.sync({
  force: true
})
```
ATT: _"root"_ - esse código é responsável pela criação das tabelas no banco de dados, bem como os relacionamento entre elas. **Uma vez executado, deve-se comentar, caso contrário, irá apagar e criar novas tabelas sempre que exutares a API**.

**Abra o CMD na raiz do projecto e comando: npm install**
``` 
gcabletv01> npm install

```
**Depois da instalação dos pacote execute para iniciar a API o comando: node index.js**
``` 
gcabletv01> node index.js

```
## Testando a API

Obviamente as tabelas vão estar sem dados para retornar, teremos que add dados.

Essa **API** tem muitas rotas, para ser curto e objectivo faça isso:

1. Abra a pasta `routes` que está na pasta do projecto e Analise cada rota estabelecidas.
2. Abra o arquivo `index.js` e decore as chamadas dos conjuntos de rotas.
3. Teste as rotas, e preferência use o [Postman](https://www.getpostman.com) para testar a rotas.

## Qualquer Dúvida

**Facebook**: `Enzo Daniel Carlos`

**Instagram**: `@enzodanielcarlos`

**WhatsApp**: `+244 936785605`

**Call**: `+244 916785605 / +244 936785605`

