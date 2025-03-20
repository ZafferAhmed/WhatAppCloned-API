const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const apiRoutes = require("./Routes/api");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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
        url: "http://localhost:10000",
        description: "Local server",
      },
      {
        url: "https://whatappcloned-api.onrender.com",
        description: "Deployed server",
      },
    ],
  },
  apis: ["../src/Routes/api.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
