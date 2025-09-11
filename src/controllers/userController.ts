import type {Request, Response, NextFunction} from "express";
import pool from "../database/connection.ts";
import type {CreateUserData, UpdateUserData, User} from "../schemas/user.ts";

// GET /users - Listar todos os usuários
export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await pool.query(
			"SELECT * FROM users ORDER BY created_at DESC"
		);
		res.json({
			success: true,
			data: result.rows,
			count: result.rows.length,
		});
	} catch (error) {
		next(error);
	}
};

// GET /users/:id - Buscar usuário por ID
export const getUserById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {id} = req.params;
		const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

		if (result.rows.length === 0) {
			return res.status(404).json({
				success: false,
				error: "Usuário não encontrado",
			});
		}

		res.json({
			success: true,
			data: result.rows[0],
		});
	} catch (error) {
		next(error);
	}
};

// POST /users - Criar novo usuário
export const createUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userData: CreateUserData = req.body;

		const query = `
      INSERT INTO users (name, email, age)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

		const values = [userData.name, userData.email, userData.age || null];
		const result = await pool.query(query, values);

		res.status(201).json({
			success: true,
			data: result.rows[0],
			message: "Usuário criado com sucesso",
		});
	} catch (error: any) {
		// Tratar erro de email duplicado
		if (error.code === "23505" && error.constraint === "users_email_key") {
			return res.status(409).json({
				success: false,
				error: "Email já está em uso",
			});
		}
		next(error);
	}
};

// PUT /users/:id - Atualizar usuário
export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {id} = req.params;
		const userData: UpdateUserData = req.body;

		// Verificar se o usuário existe
		const existingUser = await pool.query("SELECT * FROM users WHERE id = $1", [
			id,
		]);
		if (existingUser.rows.length === 0) {
			return res.status(404).json({
				success: false,
				error: "Usuário não encontrado",
			});
		}

		// Construir query dinamicamente baseada nos campos fornecidos
		const updates: string[] = [];
		const values: any[] = [];
		let paramCount = 1;

		if (userData.name !== undefined) {
			updates.push(`name = $${paramCount++}`);
			values.push(userData.name);
		}

		if (userData.email !== undefined) {
			updates.push(`email = $${paramCount++}`);
			values.push(userData.email);
		}

		if (userData.age !== undefined) {
			updates.push(`age = $${paramCount++}`);
			values.push(userData.age);
		}

		if (updates.length === 0) {
			return res.status(400).json({
				success: false,
				error: "Nenhum campo para atualizar foi fornecido",
			});
		}

		const query = `
      UPDATE users 
      SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `;

		values.push(id);
		const result = await pool.query(query, values);

		res.json({
			success: true,
			data: result.rows[0],
			message: "Usuário atualizado com sucesso",
		});
	} catch (error: any) {
		// Tratar erro de email duplicado
		if (error.code === "23505" && error.constraint === "users_email_key") {
			return res.status(409).json({
				success: false,
				error: "Email já está em uso",
			});
		}
		next(error);
	}
};

// DELETE /users/:id - Deletar usuário
export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {id} = req.params;

		const result = await pool.query(
			"DELETE FROM users WHERE id = $1 RETURNING *",
			[id]
		);

		if (result.rows.length === 0) {
			return res.status(404).json({
				success: false,
				error: "Usuário não encontrado",
			});
		}

		res.json({
			success: true,
			data: result.rows[0],
			message: "Usuário deletado com sucesso",
		});
	} catch (error) {
		next(error);
	}
};
