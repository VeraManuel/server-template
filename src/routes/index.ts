import { Router } from 'express';
import helloRoute from './hello.route';

const router = Router();

router.use(helloRoute);

export default router;
