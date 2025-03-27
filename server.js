import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import router from "./routes/router.js"
import swaggerDocument from "./swagger-output.json" with { type: "json" };

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

// adding base route
app.get("/", (req, res) => res.send("Express on Vercel"));

app.use(router);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
