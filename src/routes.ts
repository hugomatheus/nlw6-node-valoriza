import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { ComplimentController } from './controllers/ComplimentController';
import { TagController } from './controllers/TagController';
import { UserController } from './controllers/UserController';
import { ensureAdminMiddleware } from './middlewares/ensureAdminMiddleware';

const router = Router();

const authenticateUserController = new AuthenticateUserController();
const userController = new UserController();
const tagController = new TagController();
const complimentController = new ComplimentController();

router.post("/auth", authenticateUserController.handle);
router.post("/users", userController.store);
router.post("/tags", ensureAdminMiddleware, tagController.store);
router.post("/compliments", ensureAdminMiddleware, complimentController.store);

export default router;