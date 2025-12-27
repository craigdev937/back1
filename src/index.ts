import "dotenv/config";
import express from "express";
import logger from "morgan";
import helmet from "helmet";
import { custRT } from "./routes/CustomerRT";
import { prodRT } from "./routes/ProductRT";

(async () => {
    const app: express.Application = express();
    app.use(helmet());

    // CORS Setup.
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method === "options") {
            res.header("Access-Control-Allow-Methods",
                "POST, GET, PUT, PATCH, DELETE");
            res
                .status(res.statusCode)
                .json({ "status message": "OK" });
        };
        next();
    });

    app.use(express.urlencoded());
    app.use(express.json());
    app.use(logger("dev"));
    app.use("/api/customer", custRT);
    app.use("/api/products", prodRT);
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`🌐: http://localhost:${port}`);
        console.log("Press CTRL + C to exit.");
    })
})();



