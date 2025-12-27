import express from "express";
import { CUSTOMER } from "../controllers/CustomerCTR";

export const custRT: express.Router = express.Router();
    custRT.post("/", CUSTOMER.Create);
    custRT.get("/", CUSTOMER.FetchAll);
    custRT.get("/:id", CUSTOMER.GetOne);
    custRT.put("/:id", CUSTOMER.Update);
    custRT.delete("/:id", CUSTOMER.Delete);



