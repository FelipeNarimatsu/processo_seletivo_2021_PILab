# processo_seletivo_PILab
Comunicação com o banco:
Usuario: postgres
Senha: postgres
Porta: 5432
Para alterar, mudar parâmetros no arquivo database.ts

URLs das funcoes:
POST localhost:3000/auth/signup
POST localhost:3000/auth/login
POST localhost:3000/wallet/deposit
POST localhost:3000/wallet/withdraw
GET localhost:3000/wallet
PUT localhost:3000/update
DELETE localhost:3000/delete
DELETE localhost:3000/delete/user

PARAMEROS JSON NO BODY PARA A CRIACAO DE USUARIO
{
	"nome": "xxxx",
	"email":"xxxxxxxxx",
	"senha":"xxxxxxxxx"
}
OBS: funcao ira retornar um erro caso o usuario nao informe os tres dados pedidos

PARAMEROS JSON NO BODY PARA O LOGIN
{
	"email":"xxxxxxx",
	"senha":"xxxxxxxx"
}
OBS: a funcao de login serve para guardar o UID do usuario e utuliza-lo em funcoes seguintes

PARAMEROS JSON NO BODY PARA O DEPOSITO
{
    "descricao":"xxxxxxxx",
    "valor":xxx
}
OBS: funcao ira retornar um erro caso o usuario nao informe os dois dados pedidos ou caso o login nao foi efetuado previamente

PARAMEROS JSON NO BODY PARA O SAQUE
{
    "descricao":"xxxxxxxx",
    "valor":xxx
}
OBS: funcao ira retornar um erro caso o usuario nao informe os dois dados pedidos ou caso o login nao foi efetuado previamente

PARAMEROS JSON NO BODY PARA A VISUALIZACAO DAS ACOES FEITAS
{
    //nenhum
}
OBS: funcao ira retorar um erro caso o login nao foi efetuado previamente

PARAMEROS JSON NO BODY PARA O UPDATE DAS ACOES FEITAS
{
    "id":xx,                    //obrigatorio
    "descricao": "xxxxxxxx"     //apenas se o usuario quiser atualizar
    "valor": xxxx               //apenas se o usuario quiser atualizar
    "tipo": x                   //apenas se o usuario quiser atualizar
}
OBS: para o update funcionar, o usuario tem que informar um ID de acao que ele vinculada a sua conta, caso contrario a funcao ira retornar um erro,
funcao ira retornar um erro caso o usuario nao tenha feito o login previamente,
os campos de descricao, valor e tipo nao precisam ser neessariamente todos preenchidos, somente os campos que o usuario pretende atualizar, o programa resgata os dados nao informados e os retorna para que nao sejam perdidos no update


PARAMEROS JSON NO BODY PARA O DELETE DAS ACOES
{
    "id":xx
}
OBS: funcao ira retorar um erro caso o usuario nao tenha feito o login previamente, caso o ID da acao digitada nao exista ou se o usuario tentar deletar uma funcao de outro usuario

PARAMEROS JSON NO BODY PARA O DELETAR DE USUARIO E SUAS ACOES
{
    //nenhum
}
OBS: funcao ira retorar um erro caso o usuario nao tenha feito o login previamente# processo_seletivo_2021_PILab
# processo_seletivo_2021_PILab
