"use strict";
//ARQUIVO PARA CONFIGURACAO DO BANCO DE DADOS
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    database: 'balancopatrimonial',
    port: 5432
});
