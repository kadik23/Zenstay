import {Router} from 'express';
import usersRouter from './usersRouter.js';
import roomsRouter from './roomsRouter.js'; 
const router = Router()


router.use(usersRouter)
router.use(roomsRouter)

export default router