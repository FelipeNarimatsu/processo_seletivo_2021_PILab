"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//arquivo para definir as rotas (URLS)
var express_1 = require("express");
var router = express_1.Router();
var index_controle_1 = require("../controles/index.controle");
router.get('/usuarios', index_controle_1.getUsuarios); //url utilizada para testes
router.get('/usuarios/:uid', index_controle_1.getUsuariosporId); //url utilizada para testes
router.get('/acoes/:id', index_controle_1.getAcoesporId); //url utilizada para testes
router.post('/auth/signup', index_controle_1.criaUsuario); //URL de criacao de usuario por JSON
router.post('/auth/login', index_controle_1.login); //URL de login por JSON
router.post('/wallet/deposit', index_controle_1.deposito); //URL de deposito por JSON
router.post('/wallet/withdraw', index_controle_1.retirada); //URL de retirada por JSON
router.get('/wallet', index_controle_1.historicoacoes); //URL de vizualizacoes de operacoes
router.put('/update', index_controle_1.alteracoes); //URL para alterações de operacoes ja realizadas
router.delete('/delete', index_controle_1.removeacao); //URL para remover operacoes
router.delete('/delete/user', index_controle_1.removeusuario); //URL para remover o usuarios logado e suas operacoes
exports.default = router;
