--ARQUIVO COM OS CODIGOS SQL PARA A CRIACAO DO BANCO DE DADOS E TABELAS (POSTGRES) 

CREATE DATABASE balancopatrimonial;

CREATE TABLE usuarios(
    uid SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    password_ VARCHAR(50)
);

CREATE TABLE acoes(
    id SERIAL PRIMARY KEY,
    description VARCHAR(100),
    value int,
    owner SERIAL,
    type int,
    constraint fk_owner foreign key (owner) references usuarios(uid)
);

/*INSERT INTO usuarios (name, email,password_)
    VALUES ('felipe', 'felipe@email.com','senhasegura');

INSERT INTO usuarios (name, email,password_)
    VALUES ('nath', 'nath@email.com','senhasegura2');
            
INSERT INTO acoes (description,value,owner,type)
    VALUES ('pagamento padaria', 500, 1, 1);

DELETE FROM usuarios WHERE uid = 1;            

DROP TABLE usuarios;*/