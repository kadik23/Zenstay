import {Router} from 'express';
import usersRouter from './usersRouter.js';
import roomsRouter from './roomsRouter.js'; 
import settingsRouter from './settingsRouter.js';
const router = Router()


router.use(usersRouter)
router.use(roomsRouter)
router.use(settingsRouter)

export default router