const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const apiRoutes = require("./Routes/api");

dotenv.config({ path: "./.env" });

const app = express();
app.use(cors({
  origin: ["https://whats-app-clone-ui.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WhatsApp Clone API",
      version: "1.0.0",
      description: "API documentation for WhatsApp Clone backend",
    },
    servers: [
      {
        url: "http://18.144.169.213:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/Routes/api.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
