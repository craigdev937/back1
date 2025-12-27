import express from "express";
import { PRODUCT } from "../controllers/ProductCTR";

// ROUTE = /api/products
export const prodRT: express.Router = express.Router();
    prodRT.post("/", PRODUCT.Create);
    prodRT.get("/", PRODUCT.FetchAll);
    prodRT.get("/:id", PRODUCT.GetOne);
    prodRT.put("/:id", PRODUCT.Update);
    prodRT.delete("/:id", PRODUCT.Delete);
    // GET /api/products/customer/:id = 
    // Get Products by CustID.
    prodRT.get("/customer/:id", PRODUCT.GetCustID);
    



