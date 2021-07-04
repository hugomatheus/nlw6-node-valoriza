import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { TagController } from './controllers/TagController';
import { UserController } from './controllers/UserController';
import { ensureAdminMiddleware } from './middlewares/ensureAdminMiddleware';

const router = Router();

const authenticateUserController = new AuthenticateUserController();
const userController = new UserController();
const tagController = new TagController();

router.post("/auth", authenticateUserController.handle);
router.post("/users", userController.store);
router.post("/tags", ensureAdminMiddleware, tagController.store);

export default router;