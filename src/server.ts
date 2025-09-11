import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes.ts";
import {errorHandler, notFoundHandler} from "./middleware/errorHandler.ts";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet());

// Middleware CORS
app.use(
	cors({
		origin:
			process.env.NODE_ENV === "production"
				? ["https://yourdomain.com"] // Substitua pela URL do seu frontend em produção
				: [
						"http://localhost:3000",
						"http://localhost:3001",
						"http://localhost:5173",
				  ],
		credentials: true,
	})
);

// Middleware para parsing de JSON
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true, limit: "10mb"}));

// Rota de health check
app.get("/health", (req, res) => {
	res.json({
		status: "OK",
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
		environment: process.env.NODE_ENV || "development",
	});
});

// Rotas da API
app.use("/api/users", userRoutes);

// Middleware para rotas não encontradas
app.use(notFoundHandler);

// Middleware de tratamento de erros
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
	console.log(`🚀 Servidor rodando na porta ${PORT}`);
	console.log(`📊 Health check: http://localhost:${PORT}/health`);
	console.log(`👥 API Users: http://localhost:${PORT}/api/users`);
	console.log(
		`🐘 PostgreSQL: Certifique-se de que o Docker Compose está rodando`
	);
});
