# Teste W2Bit 2021  - Vaga Desenvolvedor Backend

A descrição das tarefas a serem realizadas estão no endereço https://github.com/rubemfsv/W2Bit-Backend-Challenge e também no arquivo ***task.md*** localizado nesse projeto.

## Desafios e problemas encontrados durante a execução do projeto:

- Problema ao fazer deploy da API no Heroku porque eu estava definindo a PORTA.
- Relembrar dos conceitos de banco de dados relacional porque ultimamente usando NoSQL "MogoDB";
- Não foi possível desenvolver aplicando TDD devido ao prazo de entrega; No dia-dia é o conceito que sigo.
- O maior de todos foi gerenciar o tempo entre trabalho, família e desafio;

## Banco de Dados:

- Ambiente **DEV** com Docker:

``````shell
docker run --name w2bit-postgres -p 5432:8080 -e POSTGRES_USER=w2bit-CrFWwe -e POSTGRES_PASSWORD=tR2aS1s9Ib4KAav -e POSTGRES_DB=bstation -d postgres
``````

- Ambiente **PRODUÇÃO** hospedado na Heroku:

  Credenciais do acesso estão no arquivo https://github.com/thiago231286/w2bit-teste/tree/master/extras/Database/postgresql-access_Heroku.pdf.

## Documentação da API / Insomnia:

- A API está publicada em https://w2bit-teste.herokuapp.com/

- Os arquivos de importação estão localizados em https://github.com/thiago231286/w2bit-teste/tree/master/extras/Insomnia.



Obrigado.

Att, Thiago Cabral