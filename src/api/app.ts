import "dotenv/config";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { routers } from "./routes";
import { errorHandlerMiddleware, jsonApiResponseMiddleware } from "./middlewares";
import swaggerOptions from "./config/swagger.config";

const app = express();

// Swagger setup
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jsonApiResponseMiddleware);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(routers);

app.use(errorHandlerMiddleware);

app.listen(8000, () => {
    console.log("✅ Server is running on port 8000");
    console.log("📚 Swagger docs available at http://localhost:8000/api-docs");
});