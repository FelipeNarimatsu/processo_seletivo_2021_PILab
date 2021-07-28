//arquivo para criacoes de funcoes para serem importadas para o index.ts da pasta rotas

import {query, Request, Response} from 'express'
import {QueryResult} from 'pg'
import {pool} from '../database'

//VARIAVEIS UTILIZADAS PARA O SISTEMA DE LOGIN
var emailentrada:any;
var senhaentrada:any;
var nomelogin:any;
var idselecionado:any;

//FUNCAO DE TESTE
export const getUsuarios = async (req: Request, res: Response) => {
    const resposta: QueryResult = await pool.query('SELECT * FROM usuarios');
    //console.log(resposta.rows)
    res.status(200).json(resposta.rows);
}

//FUNCAO DE TESTE
export const getUsuariosporId  = async (req: Request, res: Response) => {
    const uid = parseInt(req.params.uid)
    const resposta: QueryResult = await pool.query('SELECT * FROM usuarios WHERE uid = $1', [uid]);
    //console.log(resposta.rows)
    res.status(200).json(resposta.rows);
}

//FUNCAO DE TESTE
export const getAcoesporId = async (req: Request, res:Response) => {
    const id = parseInt(req.params.id)
    const resposta: QueryResult = await pool.query('SELECT * FROM acoes WHERE id = $1', [id]);
    res.status(200).json(resposta.rows);
}


export const criaUsuario = async (req: Request, res:Response): Promise<Response> => {
    const {nome,email, senha} = req.body;
    if(nome != null && email != null && senha != null){
        const resposta: QueryResult = await pool.query('INSERT INTO usuarios (name,email,password_) VALUES ($1,$2,$3)',[nome,email,senha]);
        return res.status(201).json('USUARIO CRIADO COM SUCESSO');
    }
    else{
        return res.status(417).json('FALTA DE PARAMETROS PARA A CRIACAO DO NOVO USUARIO');
    }

}

export const login = async (req: Request, res:Response): Promise<Response> => {
    nomelogin = req.body.nome;
    emailentrada = req.body.email; 
    senhaentrada = req.body.senha;

    let i=1;
    let id=1;

    const numerodeusuarios: QueryResult = await pool.query('SELECT * FROM usuarios');
    const iteracoes = numerodeusuarios.rowCount;

    while (i <= iteracoes){
        let consultanome: QueryResult = await pool.query('SELECT name FROM usuarios WHERE uid = $1', [id]);//CONSULTA DO NOME NO BANCO
        let nomeconsulta = JSON.stringify(consultanome.rows).toString().split("\"",4)[3];
        if(nomeconsulta == null){
            id++;
            consultanome = await pool.query('SELECT name FROM usuarios WHERE uid = $1', [id]);//CONSULTA DO NOME NO BANCO
            nomeconsulta = JSON.stringify(consultanome.rows).toString().split("\"",4)[3];
            while (nomeconsulta == null){
                id++;
                consultanome = await pool.query('SELECT name FROM usuarios WHERE uid = $1', [id]);//CONSULTA DO NOME NO BANCO
                nomeconsulta = JSON.stringify(consultanome.rows).toString().split("\"",4)[3];
            }
        }
        
        const consultasenha: QueryResult = await pool.query('SELECT password_ FROM usuarios WHERE uid = $1', [id]);//CONSULTA A SENHA NO BANCO
        const consultaemail: QueryResult = await pool.query('SELECT email FROM usuarios WHERE uid = $1', [id]);//CONSULTA O EMAIL NO BANCO
        
        const senhaconsulta = JSON.stringify(consultasenha.rows).toString().split("\"",4)[3];
        const emailconsulta = JSON.stringify(consultaemail.rows).toString().split("\"",4)[3];
        if (emailconsulta == emailentrada && senhaconsulta == senhaentrada){
            idselecionado = id; //MARCA O ID DO USUARIO LOGADO PARA FUTURAS FUNCOES PODEREM UTILIZAR
            return res.status(200).json({
                message: 'LOGIN EFETUADO',
                body: {
                    usuario:{
                        nomeconsulta,
                        emailconsulta
                    }
                }
            })
        }
        i++;
        id++;
    }
    return res.status(401).json("USUARIO OU SENHA INCORRETOS");
}

export const deposito = async (req: Request, res:Response): Promise<Response> => {
    const {descricao,valor} = req.body;
    if(descricao != null && valor != null){
        if (idselecionado == null){
            //console.log("EFETUE O LOGIN")
            return res.status(401).json("EFETUE O LOGIN");
        }
        else{
            const resposta: QueryResult = await pool.query('INSERT INTO acoes (description,value,owner,type) VALUES ($1,$2,$3,$4)',[descricao,valor,idselecionado,2]);
            return res.status(201).json('DEPOSITO EFETUADO');
        }
    }
    else{
        return res.status(417).json('FALTA DE PARAMETROS PARA REALIZAR A OPERACAO');
    }
}

export const retirada = async (req: Request, res:Response): Promise<Response> => {
    const {descricao,valor} = req.body;
    if(descricao != null && valor != null){
        if (idselecionado == null){
            //console.log("EFETUE O LOGIN")
            return res.status(401).json("EFETUE O LOGIN");
        }
        else{
            const resposta: QueryResult = await pool.query('INSERT INTO acoes (description,value,owner,type) VALUES ($1,$2,$3,$4)',[descricao,valor,idselecionado,1]);
            return res.status(201).json('RETIRADA EFETUADA');
        }
    }
    else{
        return res.status(417).json('FALTA DE PARAMETROS PARA REALIZAR A OPERACAO');
    }
}

export const historicoacoes  = async (req: Request, res: Response): Promise<Response> => {
    if (idselecionado == null){
        //console.log("EFETUE O LOGIN")
        return res.status(401).json("EFETUE O LOGIN");
    }
    else {
        const resposta: QueryResult = await pool.query('SELECT * FROM acoes WHERE owner = $1', [idselecionado]);
        //console.log(resposta.rows)
        return res.status(200).json(resposta.rows);
    }
}

export const alteracoes = async (req: Request, res:Response): Promise<Response> => {
    let {id,descricao,valor,tipo} = req.body;
    if(descricao==null){
        const resgatadescricao: QueryResult = await pool.query('SELECT description FROM acoes WHERE id = $1', [id]);
        descricao = JSON.stringify(resgatadescricao.rows).toString().split("\"",4)[3];
    }
    if(valor == null){
        const resgatavalor: QueryResult = await pool.query('SELECT value FROM acoes WHERE id = $1', [id]);
        valor = parseInt(JSON.stringify(resgatavalor.rows).toString().split(":",4)[1]);
    }
    if(tipo==null){
        const resgatavalor: QueryResult = await pool.query('SELECT type FROM acoes WHERE id = $1', [id]);
        tipo = parseInt(JSON.stringify(resgatavalor.rows).toString().split(":",4)[1]);
    }
    if (idselecionado == null){
        console.log("EFETUE O LOGIN")
        return res.status(401).json("EFETUE O LOGIN");
    }
    else{
        const resposta2: QueryResult = await pool.query('SELECT owner FROM acoes WHERE id = $1', [id]);
        if (idselecionado != parseInt(JSON.stringify(resposta2.rows).toString().split(":",4)[1])){
            return res.status(401).json('USUARIO LOGADO NAO É DONO DA ACAO OU ID DA ACAO NAO EXISTE');
        }
        else{
            //return res.status(201).json('ATUALIZAO EFETUADA');
            const resposta: QueryResult = await pool.query('UPDATE acoes SET description = $1, value = $2, type = $3 WHERE id = $4',[descricao,valor,tipo,id]);
            if(resposta.rowCount == 0){
            return res.status(225).json("ID DA ACAO NAO EXISTE");
            }
            else{
                return res.status(201).json("ALTERACAO EFETUADA COM SUCESSO");
            }
        }
        
    }
}

export const removeacao = async (req: Request, res:Response): Promise<Response> => {
    const {id} = req.body;
    if (idselecionado == null){
        console.log("EFETUE O LOGIN")
        return res.status(401).json("EFETUE O LOGIN");
    }
    
    const consulta: QueryResult = await pool.query('SELECT owner FROM acoes WHERE id = $1',[id]);
    if(parseInt(JSON.stringify(consulta.rows).toString().split(":",4)[1]) == idselecionado){
        const resposta: QueryResult = await pool.query('DELETE FROM acoes WHERE id = $1',[id]);
        if(resposta.rowCount == 1){
            return res.status(201).json('ACAO APAGADA');
        }
        else{
            return res.status(225).json('ACAO NAO EXISTE');
        }
    }
    else{
        return res.status(401).json('USUARIO LOGADO NAO É DONO DA ACAO OU ACAO NAO EXISTE');
    }
}

export const removeusuario = async (req: Request, res:Response): Promise<Response> => {
    const {id} = req.body;
    if (idselecionado == null){
        console.log("EFETUE O LOGIN")
        return res.status(401).json("EFETUE O LOGIN");
    }
    
    const consulta: QueryResult = await pool.query('DELETE FROM acoes WHERE owner = $1',[idselecionado]);
    const consulta2: QueryResult = await pool.query('DELETE FROM usuarios WHERE uid = $1',[idselecionado]);
    return res.status(201).json('USUARIO APAGADO JUNTO COM SUAS RESPECTIVAS ACOES');
}