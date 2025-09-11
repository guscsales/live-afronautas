import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/userController';
import { validateBody, validateParams } from '../middleware/validation';
import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
} from '../schemas/user';

const router = Router();

// GET /users - Listar todos os usuários
router.get('/', getUsers);

// GET /users/:id - Buscar usuário por ID
router.get('/:id', validateParams(userIdSchema), getUserById);

// POST /users - Criar novo usuário
router.post('/', validateBody(createUserSchema), createUser);

// PUT /users/:id - Atualizar usuário
router.put(
  '/:id',
  validateParams(userIdSchema),
  validateBody(updateUserSchema),
  updateUser
);

// DELETE /users/:id - Deletar usuário
router.delete('/:id', validateParams(userIdSchema), deleteUser);

export default router;
