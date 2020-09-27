# Desafio Back-end  Mestres da WEB

Desafio realizado para a vaga de Back-end no Mestres da Web

## Agradecimentos

Antes, gostaria de agradecer a equipe do Mestres da Web pela oportunidade oferecida para concorrer a essa vaga, muito obrigado mesmo.

## Descrição do desafio
Com o atual cenário da pandemia, as empresas de todos os seguimentos tiveram que acelerar seu processo tecnológico, afim de continuar entregando valor para seu consumidor. 

Sendo assim, crie um sistema capaz de gerenciar o estoque de uma loja virtual de roupas, em que apenas o administrador da plataforma seja capaz de criar, listar, editar e deletar produtos. 

Todos os produtos devem apresentar a opção de cadastros de SKUs, ou seja, de variações do mesmo produto, indicando a quantidade correspondente a cada SKU. Ex: Camiseta com tamanhos P, M, G; Tênis com tamanhos 39, 40, 41, 42.

## Arquitetura

A arquitetura montada nesse sistema tem como base princípios como SOLID, DRY, DDD e outros. 

Todo domínio de regra de negócio no sistema foi separado da tecnologia utilizada, evitando que a regra de negócio fique acoplada em certas tecnologias e possibilitando a escalabilidade e substituição de tecnologias como o banco de dados, provedor de hash de senha entre outros.

Como exemplo o banco utilizado foi o PostgreSQL, mas qualquer outro banco de dados poderia ser utilizado em paralelo ou substituir sem problemas algum, pois praticamente todo sistema depende de interfaces e não abstrações reais.

## Modelagem banco de dados

A modelagem do banco de dados foi feita de maneira que fosse a mais dinâmica possível, fazendo com que o sistema escale de maneira inteligente. Com isso, possibilitando criações de tipos de produtos e atributos com seus valores de acordo com a necessidade do cliente. Também possibilita que se possa ter mais de um estoque caso necessário.

Modelagem: https://ibb.co/8r8kStM

## Testes

Testes foram feitos em cima dos services da aplicação, por possuirem as regras de negócio.

Os teste podem ser rodados utilizando o comando ```yarn test ou npm run test```, além do feedback do terminal, o teste possuí o coverage, que demonstra o quão bem cada funcionalidade foi testada.

Os arquivos do coverage ficam na pasta coverage na raiz do projeto, abrindo o index.html você terá todo um relatório dos testes rodados.

Test coverage: https://ibb.co/d0fVkK1

## Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- TypeScript
- TypeORM
- Jest
- uuid
- bcryptjs
- jsonwebtoken (JWT)

## Instalação

 ### Docker

Foi utilizado o docker para levantar uma instância do banco, o comando para criação do container foi :

```docker run --name desafio_mestres_da_web -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres```

É necessário acessar o banco e criar uma database com o nome de **desafio_mdw**

### Aplicação

Após realizar o clone da aplicação, siga esses passos:

- Abra o terminal e digite ```yarn ou npm install```, para a instalação dos pacotes.
- Verifique no arquivo **ormconfig.json** se as configurações de conexão com o banco estão corretas.
- Agora rode no terminal o comando ```yarn typeorm migration:run ou npm run typeorm migration:run```
- Após rode no terminal o comando ```yarn seed:run ou npm run seed:run```
- Agora só inicializar o servidor usando ```yarn dev:server ou npm run dev:server```

## Insomnia

Com o foco no back-end acabei optando por não desenvolver um front-end, para desenvolver um back-end mais bem estruturado e arquitetado, então para realizar os testes da api eu utilizei o insomnia e vou aqui estar colocando o arquivo para facilitar o teste da api.

Link: http://www.mediafire.com/file/fvnjezvdn8axqhh/Insomnia_2020-09-27.json/file

## Guia API

Para realizar os testes na api's eu criei um seed onde ele já traz vários dados pré dispostos para se realizar os testes, vou passar aqui por cada endpoint explicando como funciona e o que é necessário para funcionar.

### Autenticação

Antes de começar a utilizar as rotas é necessário um token JWT com o acesso de admin e passar no header Authorization para realizar as requisições para isso você seguirá esses passos:

- Irá fazer uma requisição para ```{{ sua_url_local }}/sessions``` com os usuários pré existentes :
  - admin -> email: ```admin@gmail.com```, password: ```admin123```
  - ou para testar a autentição nas rotas do admin -> email: ```user@gmail.com```, password: ```user123```
  
### Rotas Sessions

#### Create

Retorna um token para o usuário logado utilizar e se autenticar.

- URL: ```{{ sua_url_local }}/sessions```
- METHOD: **POST**
- PAYLOAD ESPERADO EX: ```{
	"email": "admin@gmail.com",
	"password": "admin123"
}```

### Rotas users

### Create

Cria um usuário no sistema.

- URL: ```{{ sua_url_local }}/users```
- METHOD: **POST**
- PAYLOAD ESPERADO EX: ```{
	"name": "José Alberto",
	"email": "teste7@gmail.com",
	"password": "12345678"
}```

### Rotas products

### List

Lista os produtos cadastrados

- URL: ```{{ sua_url_local }}/products```
- METHOD: **GET**

### Create

Cria um produto no sistema.

- URL: ```{{ sua_url_local }}/products```
- METHOD: **POST**
- PAYLOAD ESPERADO EX: ````{
	"name": "Camisa Ricky and Morty",
	"sku": "CABKMW2",
	"description": "CAMISA BRANCA DA BROOKSFIELD DO RICK MORTY TAMANHO M",
	"price": 10.20,
	"product_type_id": "88218b81-93b0-4818-a605-0b77a832ea08",
	"brand_id": "0cb45f9e-947b-4fc1-9010-84b1605ce4f0",
	"attributes": [
		{
			"id": "6bc48ec5-14ec-4e50-898c-0314b2d5120e",
				"values_ids": ["50715a7d-d599-480f-9fa3-a63dbf50dd41", "af943b55-8c9c-404a-be77-883c3210fcda"]
		}
	]
}````

Os atributos product_type_id, brand_id, attributes.id e attributes.values_ids, são valores que já são inclusos no seed do sistema.

Como não possui rotas para esses recursos através do banco é possível utilizar os valores que foram realizados o seed.

**ATENÇÃO - Exemplo** 

Como essa é uma parte mais complica irei colocar um exemplo de como pegar essas variáveis, siga esses passos:

- product_type_id -> Deve se escolher um tipo de produto como por exemplo 'Camisa' e pegar o seu id na tabela ```product_types```;
- brand_id -> Apenas escolha qualquer marca na tabela ```brands```;
- attributes.id -> Esse aqui começa a ficar um pouco mais complicado, pois todo attributo é ligado a um tipo de product_type, ou seja deve se escolher um atributo que seja do product_type escolhido anteriormente na tabela ```product_attributes```.
- attributes.values_ids -> Aqui é mesma coisa do anterior, mas esse é liga a um atributo, então vá na tabela de ```product_attribute_values``` e escolha values com o id do atributo escolhido anteriormente.

### Update

Atualiza um produto no sistema.

- URL: ```{{ sua_url_local }}/products/:id```
- METHOD: **PUT**
- PAYLOAD ESPERADO EX: ````{
	"name": "Camisa Ricky and Morty",
	"sku": "CABKMW2",
	"description": "CAMISA BRANCA DA BROOKSFIELD DO RICK MORTY TAMANHO M",
	"price": 10.20,
	"product_type_id": "88218b81-93b0-4818-a605-0b77a832ea08",
	"brand_id": "0cb45f9e-947b-4fc1-9010-84b1605ce4f0",
	"attributes": [
		{
			"id": "6bc48ec5-14ec-4e50-898c-0314b2d5120e",
				"values_ids": ["50715a7d-d599-480f-9fa3-a63dbf50dd41", "af943b55-8c9c-404a-be77-883c3210fcda"]
		}
	]
}````

Mesma idéia do create, porém esse todos as propriedades são opcionais podendo mudar um outro apenas.

Os atributos product_type_id, brand_id, attributes.id e attributes.values_ids, são valores que já são inclusos no seed do sistema.

Como não possui rotas para esses recursos através do banco é possível utilizar os valores que foram realizados o seed.

**ATENÇÃO - Exemplo** 

Como essa é uma parte mais complica irei colocar um exemplo de como pegar essas variáveis, siga esses passos:

- product_type_id -> Deve se escolher um tipo de produto como por exemplo 'Camisa' e pegar o seu id na tabela ```product_types```;
- brand_id -> Apenas escolha qualquer marca na tabela ```brands```;
- attributes.id -> Esse aqui começa a ficar um pouco mais complicado, pois todo attributo é ligado a um tipo de product_type, ou seja deve se escolher um atributo que seja do product_type escolhido anteriormente na tabela ```product_attributes```.
- attributes.values_ids -> Aqui é mesma coisa do anterior, mas esse é liga a um atributo, então vá na tabela de ```product_attribute_values``` e escolha values com o id do atributo escolhido anteriormente.

### Delete

Deleta um produto cadastrado

- URL: ```{{ sua_url_local }}/products/:id```
- METHOD: **DELETE**

### Rotas stocks

### List

Lista os estoques cadastrados (No seed dois estoques são criados)

- URL: ```{{ sua_url_local }}/stocks```
- METHOD: **GET**

### Rotas stocks - products

### List

Lista os produtos cadastrados no estoque especificado

- URL: ```{{ sua_url_local }}/stocks/:id/products```
- METHOD: **GET**

### Add

Adiciona um ou mais produtos no estoque.

- URL: ```{{ sua_url_local }}/stocks/:id/products```
- METHOD: **POST**
- PAYLOAD ESPERADO EX: ````{
	"productIds": [
		"a3864f3d-1807-473f-b739-18a348ca729a"
	]
}````

*O atributo productIds só precisa de ids validos de produtos para cadastrar no estoque especificado.*

## Possíveis Mudanças

Aqui colocarei algumas mudanças que queria realizar, mas pelo tempo que possuía não foi possível realizar.

- Possibilitar na modelagem de banco que um produto possa ter mais de um tipo.
- Abstrair as entidades ligadas ao typeORM.
