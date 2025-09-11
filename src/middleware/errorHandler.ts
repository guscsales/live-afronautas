import {Request, Response, NextFunction} from "express";

export interface AppError extends Error {
	statusCode?: number;
	isOperational?: boolean;
}

// Middleware de tratamento de erros
export const errorHandler = (
	error: AppError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error("Error:", error);

	// Se a resposta já foi enviada, delega para o handler padrão do Express
	if (res.headersSent) {
		return next(error);
	}

	const statusCode = error.statusCode || 500;
	const message = error.message || "Erro interno do servidor";

	res.status(statusCode).json({
		error: message,
		...(process.env.NODE_ENV === "development" && {stack: error.stack}),
	});
};

// Middleware para capturar rotas não encontradas
export const notFoundHandler = (req: Request, res: Response) => {
	res.status(404).json({
		error: "Rota não encontrada",
		path: req.originalUrl,
		method: req.method,
	});
};
