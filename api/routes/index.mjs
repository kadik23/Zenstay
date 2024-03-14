import {Router} from 'express';
import usersRouter from './usersRouter.mjs';
import roomsRouter from './roomsrouter.mjs'; 
const router = Router()


router.use(usersRouter)
router.use(roomsRouter)

export default router