import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { ComplimentController } from './controllers/ComplimentController';
import { TagController } from './controllers/TagController';
import { UserController } from './controllers/UserController';
import { ensureAdminMiddleware } from './middlewares/ensureAdminMiddleware';
import { ensureAuthenticatedMiddleware } from './middlewares/ensureAuthenticatedMiddleware';

const router = Router();

const authenticateUserController = new AuthenticateUserController();
const userController = new UserController();
const tagController = new TagController();
const complimentController = new ComplimentController();

router.post("/auth", authenticateUserController.handle);
router.post("/users", userController.store);
router.get("/users", ensureAuthenticatedMiddleware, ensureAdminMiddleware, userController.index);
router.post("/tags", ensureAuthenticatedMiddleware, ensureAdminMiddleware, tagController.store);
router.get("/tags", ensureAuthenticatedMiddleware, tagController.index);
router.post("/compliments", ensureAuthenticatedMiddleware, complimentController.store);
router.get("/users/compliments/receives", ensureAuthenticatedMiddleware, complimentController.getListUserReceiver);
router.get("/users/compliments/sends", ensureAuthenticatedMiddleware, complimentController.getListUserSend);

export default router;