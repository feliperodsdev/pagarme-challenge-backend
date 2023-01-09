# Pagarme-> API

- API do desafio Pagarme (https://github.com/pagarme/vagas)

## Como Funciona

- A API com três endpoints e serve como uma aplicação financeira (Simulação). 

> Não estou usando nenhuma integração de pagamento, é apenas para estudos. 

-> REGRAS DE NEGÓCIO
- O serviço é capaz de criar uma transação. A transação recebe diversas informações sendo elas value (valor da transaçaõ -> string), desc (descrição da transação -> string), payment_method (metódo de pagamento 1 para crédito e 2 para débito -> number (1, 2)), card_number(número do cartão -> string), owner_card (nome do dono do cartão -> string), expiration_date_card (data de expiração do cartão (MM-YY) -> string), cvv (número cvv do cartão -> number). 
- Cada transação criada automaticamente cria um Payable (Pagamento) e nesse pagamento basicamente o dia de pagamento será no dia do pagamento se for em débito e D+30 se for crédito. 
- Basicamente na rota que retorna o saldo terão dois saldos, um para oque ele já tem e outro para o que irá receber. 

## Rotas

- "/transaction/create"  (Post) - Cria uma transação na conta do cliente. 
- "/transaction/list" (Get) - Retorna uma lista das transações criadas.
- "/transaction/amount" (Get) - Retorna as informações de saldo da conta. 

## Como usar

Segue a lista de comandos a serem executados no terminal em "../pagarme-challenge-backend": 
-> npm i, ou npm install
-> npx prisma migrate dev (Depois de configurar seu .env file)
-> npm run dev

## DOTENV

DATABASE_URL="postgresql://{user}:{password}@localhost:5432/{dbname}?schema=public"
