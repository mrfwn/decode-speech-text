import { Router } from 'express';
import TranscriptionController from './app/controllers/TranscriptionController';
import TranscriptValidateStore from './app/validators/transcription/TranscriptionStore';
import TranscriptValidateUpdate from './app/validators/transcription/TranscriptionUpdate';

const routes = new Router();

routes.get('/transcriptions', TranscriptionController.index);
routes.post(
  '/transcriptions',
  TranscriptValidateStore,
  TranscriptionController.store
);
routes.put(
  '/transcriptions/:id',
  TranscriptValidateUpdate,
  TranscriptionController.update
);
routes.delete('/transcriptions/:id', TranscriptionController.delete);

export default routes;
