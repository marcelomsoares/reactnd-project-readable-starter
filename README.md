# Projeto Leitura

O projeto Leitura foi desenvolvido durante o nanodegree de React Developer da Udacity. O projeto consiste em um simples sistema de posts e comentários, com a possibilidade de criação, edição, exclusão e votação em postagens e comentários a fim de avaliar o aprendizado de React e Redux.

## Instalação

Ao clonar o repositório, você terá acesso a dois pequenos sistemas independentes: o 'api-server', disponibilizado pela Udacity, que será a API a qual o sistema realizará operações de consulta, escrita e exclusão; e o sistema 'frontend', que consiste na parte desenvolvida por mim como avaliação de conhecimentos de Redux.

* Executando o projeto Leitura
    - No diretório raiz do repositório clonado, digite:
    - `cd api-server`
    - `npm install`
    - `node server`
    - Em um outro termina, também no diretório raiz do repositório clonado, digite:
    - `cd frontend`
    - `npm install`
    - `npm start` ou `yarn start`
    
Por padrão, a api rodará na porta 3001 (http://localhost:3001), enquanto a aplicação frontend rodará na porta 3000 (http://localhost:3000).

Caso a sua api rode em um outro endereço, será necessário editar o arquivo 'utils/api.js' e alterar a variável DATA_SERVER_URL. Neste arquivo você poderá alterar também a variável AUTHORIZATION_VALUE, que é enviada à api como header de autorização. No sistema, esta variável é utilizada para identificar os posts e comentários criados como atributo 'author'.

## Utilização do sistema

O sistema busca ser o mais simples e intuitivo possível, sendo composto por:

* Um menu na parte superior esquerda, com links de visualizar todos os posts, posts por categorias ou criar um novo post.
* Na parte superior direita estão localizados botões de ordenação dos posts listados na tela.
* Caso esteja em uma tela de listagem de posts, é possível visualizar sua página de detalhes clicando em seu título, onde serão mostrados seus detalhes, comentários e opção de edição, exclusão do post e comentários, bem como criar novos comentários.
* A opção Novo Post do menu levará o usuário para a tela de criação de posts. Uma vez criado um post, você retornará à tela de listagem geral.
