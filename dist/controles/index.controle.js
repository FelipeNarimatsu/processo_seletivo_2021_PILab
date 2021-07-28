"use strict";
//arquivo para criacoes de funcoes para serem importadas para o index.ts da pasta rotas
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeusuario = exports.removeacao = exports.alteracoes = exports.historicoacoes = exports.retirada = exports.deposito = exports.login = exports.criaUsuario = exports.getAcoesporId = exports.getUsuariosporId = exports.getUsuarios = void 0;
var database_1 = require("../database");
//VARIAVEIS UTILIZADAS PARA O SISTEMA DE LOGIN
var emailentrada;
var senhaentrada;
var nomelogin;
var idselecionado;
//FUNCAO DE TESTE
var getUsuarios = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resposta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.pool.query('SELECT * FROM usuarios')];
            case 1:
                resposta = _a.sent();
                //console.log(resposta.rows)
                res.status(200).json(resposta.rows);
                return [2 /*return*/];
        }
    });
}); };
exports.getUsuarios = getUsuarios;
//FUNCAO DE TESTE
var getUsuariosporId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, resposta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uid = parseInt(req.params.uid);
                return [4 /*yield*/, database_1.pool.query('SELECT * FROM usuarios WHERE uid = $1', [uid])];
            case 1:
                resposta = _a.sent();
                //console.log(resposta.rows)
                res.status(200).json(resposta.rows);
                return [2 /*return*/];
        }
    });
}); };
exports.getUsuariosporId = getUsuariosporId;
//FUNCAO DE TESTE
var getAcoesporId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, resposta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, database_1.pool.query('SELECT * FROM acoes WHERE id = $1', [id])];
            case 1:
                resposta = _a.sent();
                res.status(200).json(resposta.rows);
                return [2 /*return*/];
        }
    });
}); };
exports.getAcoesporId = getAcoesporId;
var criaUsuario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nome, email, senha, resposta;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, nome = _a.nome, email = _a.email, senha = _a.senha;
                if (!(nome != null && email != null && senha != null)) return [3 /*break*/, 2];
                return [4 /*yield*/, database_1.pool.query('INSERT INTO usuarios (name,email,password_) VALUES ($1,$2,$3)', [nome, email, senha])];
            case 1:
                resposta = _b.sent();
                return [2 /*return*/, res.status(201).json('USUARIO CRIADO COM SUCESSO')];
            case 2: return [2 /*return*/, res.status(417).json('FALTA DE PARAMETROS PARA A CRIACAO DO NOVO USUARIO')];
        }
    });
}); };
exports.criaUsuario = criaUsuario;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var i, id, numerodeusuarios, iteracoes, consultanome, nomeconsulta, consultasenha, consultaemail, senhaconsulta, emailconsulta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nomelogin = req.body.nome;
                emailentrada = req.body.email;
                senhaentrada = req.body.senha;
                i = 1;
                id = 1;
                return [4 /*yield*/, database_1.pool.query('SELECT * FROM usuarios')];
            case 1:
                numerodeusuarios = _a.sent();
                iteracoes = numerodeusuarios.rowCount;
                _a.label = 2;
            case 2:
                if (!(i <= iteracoes)) return [3 /*break*/, 10];
                return [4 /*yield*/, database_1.pool.query('SELECT name FROM usuarios WHERE uid = $1', [id])];
            case 3:
                consultanome = _a.sent();
                nomeconsulta = JSON.stringify(consultanome.rows).toString().split("\"", 4)[3];
                if (!(nomeconsulta == null)) return [3 /*break*/, 7];
                id++;
                return [4 /*yield*/, database_1.pool.query('SELECT name FROM usuarios WHERE uid = $1', [id])];
            case 4:
                consultanome = _a.sent(); //CONSULTA DO NOME NO BANCO
                nomeconsulta = JSON.stringify(consultanome.rows).toString().split("\"", 4)[3];
                _a.label = 5;
            case 5:
                if (!(nomeconsulta == null)) return [3 /*break*/, 7];
                id++;
                return [4 /*yield*/, database_1.pool.query('SELECT name FROM usuarios WHERE uid = $1', [id])];
            case 6:
                consultanome = _a.sent(); //CONSULTA DO NOME NO BANCO
                nomeconsulta = JSON.stringify(consultanome.rows).toString().split("\"", 4)[3];
                return [3 /*break*/, 5];
            case 7: return [4 /*yield*/, database_1.pool.query('SELECT password_ FROM usuarios WHERE uid = $1', [id])];
            case 8:
                consultasenha = _a.sent();
                return [4 /*yield*/, database_1.pool.query('SELECT email FROM usuarios WHERE uid = $1', [id])];
            case 9:
                consultaemail = _a.sent();
                senhaconsulta = JSON.stringify(consultasenha.rows).toString().split("\"", 4)[3];
                emailconsulta = JSON.stringify(consultaemail.rows).toString().split("\"", 4)[3];
                if (emailconsulta == emailentrada && senhaconsulta == senhaentrada) {
                    idselecionado = id; //MARCA O ID DO USUARIO LOGADO PARA FUTURAS FUNCOES PODEREM UTILIZAR
                    return [2 /*return*/, res.status(200).json({
                            message: 'LOGIN EFETUADO',
                            body: {
                                usuario: {
                                    nomeconsulta: nomeconsulta,
                                    emailconsulta: emailconsulta
                                }
                            }
                        })];
                }
                i++;
                id++;
                return [3 /*break*/, 2];
            case 10: return [2 /*return*/, res.status(401).json("USUARIO OU SENHA INCORRETOS")];
        }
    });
}); };
exports.login = login;
var deposito = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, descricao, valor, resposta;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, descricao = _a.descricao, valor = _a.valor;
                if (!(descricao != null && valor != null)) return [3 /*break*/, 4];
                if (!(idselecionado == null)) return [3 /*break*/, 1];
                //console.log("EFETUE O LOGIN")
                return [2 /*return*/, res.status(401).json("EFETUE O LOGIN")];
            case 1: return [4 /*yield*/, database_1.pool.query('INSERT INTO acoes (description,value,owner,type) VALUES ($1,$2,$3,$4)', [descricao, valor, idselecionado, 2])];
            case 2:
                resposta = _b.sent();
                return [2 /*return*/, res.status(201).json('DEPOSITO EFETUADO')];
            case 3: return [3 /*break*/, 5];
            case 4: return [2 /*return*/, res.status(417).json('FALTA DE PARAMETROS PARA REALIZAR A OPERACAO')];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deposito = deposito;
var retirada = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, descricao, valor, resposta;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, descricao = _a.descricao, valor = _a.valor;
                if (!(descricao != null && valor != null)) return [3 /*break*/, 4];
                if (!(idselecionado == null)) return [3 /*break*/, 1];
                //console.log("EFETUE O LOGIN")
                return [2 /*return*/, res.status(401).json("EFETUE O LOGIN")];
            case 1: return [4 /*yield*/, database_1.pool.query('INSERT INTO acoes (description,value,owner,type) VALUES ($1,$2,$3,$4)', [descricao, valor, idselecionado, 1])];
            case 2:
                resposta = _b.sent();
                return [2 /*return*/, res.status(201).json('RETIRADA EFETUADA')];
            case 3: return [3 /*break*/, 5];
            case 4: return [2 /*return*/, res.status(417).json('FALTA DE PARAMETROS PARA REALIZAR A OPERACAO')];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.retirada = retirada;
var historicoacoes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resposta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(idselecionado == null)) return [3 /*break*/, 1];
                //console.log("EFETUE O LOGIN")
                return [2 /*return*/, res.status(401).json("EFETUE O LOGIN")];
            case 1: return [4 /*yield*/, database_1.pool.query('SELECT * FROM acoes WHERE owner = $1', [idselecionado])];
            case 2:
                resposta = _a.sent();
                //console.log(resposta.rows)
                return [2 /*return*/, res.status(200).json(resposta.rows)];
        }
    });
}); };
exports.historicoacoes = historicoacoes;
var alteracoes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, descricao, valor, tipo, resgatadescricao, resgatavalor, resgatavalor, resposta2, resposta;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, descricao = _a.descricao, valor = _a.valor, tipo = _a.tipo;
                if (!(descricao == null)) return [3 /*break*/, 2];
                return [4 /*yield*/, database_1.pool.query('SELECT description FROM acoes WHERE id = $1', [id])];
            case 1:
                resgatadescricao = _b.sent();
                descricao = JSON.stringify(resgatadescricao.rows).toString().split("\"", 4)[3];
                _b.label = 2;
            case 2:
                if (!(valor == null)) return [3 /*break*/, 4];
                return [4 /*yield*/, database_1.pool.query('SELECT value FROM acoes WHERE id = $1', [id])];
            case 3:
                resgatavalor = _b.sent();
                valor = parseInt(JSON.stringify(resgatavalor.rows).toString().split(":", 4)[1]);
                _b.label = 4;
            case 4:
                if (!(tipo == null)) return [3 /*break*/, 6];
                return [4 /*yield*/, database_1.pool.query('SELECT type FROM acoes WHERE id = $1', [id])];
            case 5:
                resgatavalor = _b.sent();
                tipo = parseInt(JSON.stringify(resgatavalor.rows).toString().split(":", 4)[1]);
                _b.label = 6;
            case 6:
                if (!(idselecionado == null)) return [3 /*break*/, 7];
                console.log("EFETUE O LOGIN");
                return [2 /*return*/, res.status(401).json("EFETUE O LOGIN")];
            case 7: return [4 /*yield*/, database_1.pool.query('SELECT owner FROM acoes WHERE id = $1', [id])];
            case 8:
                resposta2 = _b.sent();
                if (!(idselecionado != parseInt(JSON.stringify(resposta2.rows).toString().split(":", 4)[1]))) return [3 /*break*/, 9];
                return [2 /*return*/, res.status(401).json('USUARIO LOGADO NAO É DONO DA ACAO OU ID DA ACAO NAO EXISTE')];
            case 9: return [4 /*yield*/, database_1.pool.query('UPDATE acoes SET description = $1, value = $2, type = $3 WHERE id = $4', [descricao, valor, tipo, id])];
            case 10:
                resposta = _b.sent();
                if (resposta.rowCount == 0) {
                    return [2 /*return*/, res.status(225).json("ID DA ACAO NAO EXISTE")];
                }
                else {
                    return [2 /*return*/, res.status(201).json("ALTERACAO EFETUADA COM SUCESSO")];
                }
                _b.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.alteracoes = alteracoes;
var removeacao = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, consulta, resposta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                if (idselecionado == null) {
                    console.log("EFETUE O LOGIN");
                    return [2 /*return*/, res.status(401).json("EFETUE O LOGIN")];
                }
                return [4 /*yield*/, database_1.pool.query('SELECT owner FROM acoes WHERE id = $1', [id])];
            case 1:
                consulta = _a.sent();
                if (!(parseInt(JSON.stringify(consulta.rows).toString().split(":", 4)[1]) == idselecionado)) return [3 /*break*/, 3];
                return [4 /*yield*/, database_1.pool.query('DELETE FROM acoes WHERE id = $1', [id])];
            case 2:
                resposta = _a.sent();
                if (resposta.rowCount == 1) {
                    return [2 /*return*/, res.status(201).json('ACAO APAGADA')];
                }
                else {
                    return [2 /*return*/, res.status(225).json('ACAO NAO EXISTE')];
                }
                return [3 /*break*/, 4];
            case 3: return [2 /*return*/, res.status(401).json('USUARIO LOGADO NAO É DONO DA ACAO OU ACAO NAO EXISTE')];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removeacao = removeacao;
var removeusuario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, consulta, consulta2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                if (idselecionado == null) {
                    console.log("EFETUE O LOGIN");
                    return [2 /*return*/, res.status(401).json("EFETUE O LOGIN")];
                }
                return [4 /*yield*/, database_1.pool.query('DELETE FROM acoes WHERE owner = $1', [idselecionado])];
            case 1:
                consulta = _a.sent();
                return [4 /*yield*/, database_1.pool.query('DELETE FROM usuarios WHERE uid = $1', [idselecionado])];
            case 2:
                consulta2 = _a.sent();
                return [2 /*return*/, res.status(201).json('USUARIO APAGADO JUNTO COM SUAS RESPECTIVAS ACOES')];
        }
    });
}); };
exports.removeusuario = removeusuario;
