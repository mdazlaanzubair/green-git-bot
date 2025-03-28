import "dotenv/config";

import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import router from "./routes/router.js"
import swaggerDocument from "./swagger-output.json" with { type: "json" };

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// added base route
app.get("/", (req, res) => res.send("Git bot is running"));

app.use(router);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Git bot is listening at http://localhost:${port}`);
});
