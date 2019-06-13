# app-torneio
API Rest para Torneios com autenticação JWT

# deploy:
- apontar url de mongodb em mongo.js
- criar collections torneio, etapa. jogador, pontuacao, usuario: 
  - db.createCollection("torneio")
  - db.createCollection("etapa")
  - db.createCollection("jogador")
  - db.createCollection("pontuacao")
  - db.createCollection("usuario")
- criar documento em collection usuario com nome e senha
  - db.usuario.insert({ nome: "admin", senha: "root" })
- primeiro acesso: 
  - rodar aplicação node environment/server.js
  - primeira requisição método POST /login com bodyRequest { nome: "admin", senha: "root" }
    - response retornará um token JWT copie e utilize para todas outras requisições
    - setar para 'x-access-token' no header
  
# endpoints:

1. CRUD de Torneios: methods GET,POST,PUT,DELETE para /torneios
- bodyRequest: { nome: "torneio", descricao: "descricao" }
      
2. CRUD de Etapas: methods GET,POST,PUT,DELETE para /etapas
- bodyRequest: { nome: "etapa 1", descricao: "descricao etapa", ordem:1, torneioObj: {objectID.torneio} }

3. CRUD de Jogadores: method GET,POST,PUT,DELETE para /jogador
- bodyRequest: { nome: "joao" }

4. Cadastrar/alterar pontuação de um jogador para uma etapa: method POST /pontuacao
- bodyRequest: { jogadorObj: {objectID.jogador}, etapaObj: {objectID.etapa}, score: {pontuação} }

5. Remover pontuação de um jogador para uma etapa: method DELETE /pontuacao
- bodyRequest: { jogadorObj: {objectID.jogador}, etapaObj: {objectID.etapa} }

6. Visualizar ranking de jogadores por etapa: method GET /pontuacao/etapa/{idEtapa}

7. Visualizar ranking de jogadores por torneio: method GET /pontuacao/torneio/{idTorneio}

# dependências

- node.js, express, mongoose, jsonwebtoken

# obrigado :)
