//arquivo para definir as rotas (URLS)
import { Router } from 'express'

const router = Router();

import {criaUsuario, deposito, getAcoesporId, getUsuarios, getUsuariosporId, login, historicoacoes, retirada, alteracoes, removeacao, removeusuario} from '../controles/index.controle'

router.get('/usuarios', getUsuarios);//url utilizada para testes
router.get('/usuarios/:uid', getUsuariosporId);//url utilizada para testes
router.get('/acoes/:id',getAcoesporId);//url utilizada para testes
router.post('/auth/signup',criaUsuario);//URL de criacao de usuario por JSON
router.post('/auth/login',login);//URL de login por JSON
router.post('/wallet/deposit',deposito);//URL de deposito por JSON
router.post('/wallet/withdraw',retirada);//URL de retirada por JSON
router.get('/wallet',historicoacoes);//URL de vizualizacoes de operacoes
router.put('/update',alteracoes);//URL para alterações de operacoes ja realizadas
router.delete('/delete',removeacao);//URL para remover operacoes
router.delete('/delete/user',removeusuario);//URL para remover o usuarios logado e suas operacoes

export default router; 
