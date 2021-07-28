//ARQUIVO PARA CONFIGURACAO DO BANCO DE DADOS

import {Pool} from 'pg'

export const pool = new Pool (
    {
        user : 'postgres',
        host: 'localhost',
        password: 'postgres',
        database: 'balancopatrimonial',
        port: 5432
    }
);