import { Router } from 'express';


import { CreateColaboradorController } from './controllers/colaborador/CreateColaboradorController.js';
import { CreateOcorrenciaController } from './controllers/ocorrencia/CreateOcorrenciaController.js';
import { DetailOcorrenciaController } from './controllers/ocorrencia/DetailOcorrenciaController.js';
import { OcorrenciasController } from './controllers/ocorrencia/OcorrenciasController.js';
import { BuscarMoldeController } from './controllers/molde/BuscarMoldeController.js';
import { BuscarCavFechadaController } from './controllers/molde/BuscarCavFechadas.js';
import { BuscarColaboradorController } from './controllers/colaborador/BuscarColaboradorController.js';
import { BuscarDefeitosController } from './controllers/defeitos/BuscarDefeitosController.js';
import { CreateDefeitoController } from './controllers/defeitos/CreateDefeitoController.js';
import { AbrirCavidadeController } from './controllers/ocorrencia/AbrirCavidadeController.js';
import { BuscarTodosMoldesController } from './controllers/molde/BuscarTodosMoldesController.js';
import { ExcluirMoldeController } from './controllers/molde/ExcluirMoldeController.js';
import { LoginController } from './controllers/login/LoginController.js';
import { CreateMoldeVersaoController } from './controllers/molde/CreateMoldeVersaoController.js';
import Auth from './middlewares/Auth.js';


const router = Router();


// Molde:

router.post('/molde/register', new CreateMoldeVersaoController().handle) // ok
router.get('/moldes',  new BuscarTodosMoldesController().handle) // ok
router.get('/molde/:codigo_molde/:codigo_versao', new BuscarMoldeController().handle) // ok
router.get('/fechada/:codigo_molde/:codigo_versao', new BuscarCavFechadaController().handle) // ok
router.delete('/molde/excluir', new ExcluirMoldeController().handle) // ok


// Colaboradores:
router.get('/colaborador', new BuscarColaboradorController().handle) // ok
router.post('/colaborador/cadastro', new CreateColaboradorController().handle) // ok

// Login:
router.post('/login', new LoginController().handle) // ok

// Defeitos:
router.get('/defeitos', new BuscarDefeitosController().handle) // ok
router.post('/defeitos', new CreateDefeitoController().handle) // ok

// Rotas para ocorrencias
router.get('/ocorrencia', new DetailOcorrenciaController().handle) // ok
router.get('/ocorrencias', new OcorrenciasController().handle) // ok
router.post('/ocorrencia/registro', new CreateOcorrenciaController().handle) // ok
router.put('/abrircavidade', new AbrirCavidadeController().handle)// ok



export { router }; 