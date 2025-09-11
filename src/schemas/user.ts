import { z } from 'zod';

// Schema para criação de usuário
export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(255, 'Nome deve ter no máximo 255 caracteres'),
  email: z
    .string()
    .email('Email deve ter um formato válido')
    .max(255, 'Email deve ter no máximo 255 caracteres'),
  age: z
    .number()
    .int('Idade deve ser um número inteiro')
    .min(0, 'Idade deve ser maior ou igual a 0')
    .max(120, 'Idade deve ser menor ou igual a 120')
    .optional(),
});

// Schema para atualização de usuário (todos os campos opcionais)
export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(255, 'Nome deve ter no máximo 255 caracteres')
    .optional(),
  email: z
    .string()
    .email('Email deve ter um formato válido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .optional(),
  age: z
    .number()
    .int('Idade deve ser um número inteiro')
    .min(0, 'Idade deve ser maior ou igual a 0')
    .max(120, 'Idade deve ser menor ou igual a 120')
    .optional(),
});

// Schema para parâmetros de ID
export const userIdSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'ID deve ser um número válido')
    .transform(Number),
});

// Tipos TypeScript baseados nos schemas
export type CreateUserData = z.infer<typeof createUserSchema>;
export type UpdateUserData = z.infer<typeof updateUserSchema>;
export type UserIdParams = z.infer<typeof userIdSchema>;

// Tipo do usuário completo
export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  created_at: Date;
  updated_at: Date;
}
