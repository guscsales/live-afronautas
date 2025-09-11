import {Request, Response, NextFunction} from "express";
import {z, ZodSchema} from "zod";

// Middleware para validar body da requisição
export const validateBody = (schema: ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			req.body = schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof z.ZodError) {
				return res.status(400).json({
					error: "Dados de entrada inválidos",
					details: error.errors.map((err) => ({
						field: err.path.join("."),
						message: err.message,
					})),
				});
			}
			next(error);
		}
	};
};

// Middleware para validar parâmetros da URL
export const validateParams = (schema: ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			req.params = schema.parse(req.params);
			next();
		} catch (error) {
			if (error instanceof z.ZodError) {
				return res.status(400).json({
					error: "Parâmetros inválidos",
					details: error.errors.map((err) => ({
						field: err.path.join("."),
						message: err.message,
					})),
				});
			}
			next(error);
		}
	};
};
