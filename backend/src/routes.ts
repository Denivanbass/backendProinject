import { Router } from 'express';

import { CreateMoldeController } from './controllers/molde/CreateMoldeController.js';
import { CreateColaboradorController } from './controllers/colaborador/CreateColaboradorController.js';
import { CreateCavidadeController } from './controllers/cavidade/CreateCavidadeController.js';
import { CreateOcorrenciaController } from './controllers/ocorrencia/CreateOcorrenciaController.js';
import { DetailOcorrenciaController } from './controllers/ocorrencia/DetailOcorrenciaController.js';
import { OcorrenciasController } from './controllers/ocorrencia/OcorrenciasController.js';
import { CreateVersionController } from './controllers/versao/CreateVersionController.js';
import { BuscarMoldeController } from './controllers/molde/BuscarMoldeController.js';
import { BuscarCavFechadaController } from './controllers/molde/BuscarCavFechadas.js';
import { BuscarColaboradorController } from './controllers/colaborador/BuscarColaboradorController.js';
import { BuscarDefeitosController } from './controllers/defeitos/BuscarDefeitosController.js';
import { CreateDefeitoController } from './controllers/defeitos/CreateDefeitoController.js';
import { AbrirCavidadeController } from './controllers/ocorrencia/AbrirCavidadeController.js';
import { BuscarTodosMoldesController } from './controllers/molde/BuscarTodosMoldesController.js';
import { ExcluirMoldeController } from './controllers/molde/ExcluirMoldeController.js';


const router = Router();


// Molde:
router.post('/molde/cadastro', new CreateMoldeController().handle)
router.get('/molde/:codigo_molde/:codigo_versao', new BuscarMoldeController().handle)
router.get('/fechada/:codigo_molde/:codigo_versao', new BuscarCavFechadaController().handle)
router.get('/moldes', new BuscarTodosMoldesController().handle)
router.delete('/molde/excluir', new ExcluirMoldeController().handle)


// Cavidade:
router.post('/cavidade/cadastro', new CreateCavidadeController().handle)

// Versão:
router.post('/versao', new CreateVersionController().handle)


// Colaboradores:
router.get('/colaborador/', new BuscarColaboradorController().handle)
router.post('/colaborador/cadastro', new CreateColaboradorController().handle)

// Defeitos:
router.get('/defeitos', new BuscarDefeitosController().handle)
router.post('/defeitos', new CreateDefeitoController().handle)

// Rotas para ocorrencias
router.get('/ocorrencia', new DetailOcorrenciaController().handle)
router.get('/ocorrencias', new OcorrenciasController().handle)
router.post('/ocorrencia/registro', new CreateOcorrenciaController().handle)
router.put('/abrircavidade', new AbrirCavidadeController().handle)



export { router }; 