import { Router } from 'express';
import { getPsychologists, getPsychologistById } from '../controllers/psychologistController';

const router = Router();

router.get('/', getPsychologists);
router.get('/:id', getPsychologistById);

export default router;
