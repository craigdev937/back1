import express from "express";
import { SQL } from "../data/dBase";
import { pschema } from "../validation/Zod";
import { IProd } from "../models/Interfaces";

class ProductClass {
    Create: express.Handler = async (req, res, next) => {
        try {
            const P = pschema.parse(req.body);
            const product = await SQL`INSERT INTO products 
            (name, description, image, price, customer_id) 
            VALUES (${P.name}, ${P.description}, ${P.image},
            ${P.price}, ${P.customer_id}) RETURNING *`;
            res
                .status(res.statusCode)
                .json({
                    success: true,
                    data: <IProd>product[0]
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };

    FetchAll: express.Handler = async (req, res, next) => {
        try {
            const products = await SQL`SELECT p.*, 
            c.name as customer_name,
            c.email as customer_email
            FROM products p
            LEFT JOIN customers c ON p.customer_id = c.id
            ORDER BY p.created_at DESC`;
            res.status(res.statusCode)
                .json({
                    success: true,
                    data: <IProd[]>products
                });
        } catch (error) {
            res.status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };

    GetOne: express.Handler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await SQL` SELECT p.*,
            c.name as customer_name,
            c.email as customer_email
            FROM products p
            LEFT JOIN customers c ON p.customer_id = c.id 
            WHERE p.id = ${id}`;
            res.status(res.statusCode)
                .json({
                    success: true,
                    data: <IProd>product[0]
                });
        } catch (error) {
            res.status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };

    GetCustID: express.Handler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const products = await SQL`SELECT * FROM products 
            WHERE customer_id = ${id}
            ORDER BY created_at DESC`;
            res.status(res.statusCode)
                .json({
                    success: true,
                    data: <IProd[]>products,
                    count: products.length
                });
        } catch (error) {
            res.status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };

    Update: express.Handler = async (req, res, next) => {
        try {
            const P = pschema.parse(req.body);
            const { id } = req.params;
            const product = await SQL`UPDATE products 
                SET name=${P.name}, description=${P.description},
                image=${P.image}, price=${P.price},
                updated_at = CURRENT_TIMESTAMP 
                WHERE id=${id} RETURNING *`;
            res.status(res.statusCode)
                .json({
                    success: true,
                    data: <IProd>product[0]
                });
        } catch (error) {
            res.status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };

    Delete: express.Handler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const deleteProd = await SQL`DELETE FROM products 
            WHERE id=${id} RETURNING *`;
            res.status(res.statusCode)
                .json({
                    success: true,
                    data: <IProd>deleteProd[0]
                });
        } catch (error) {
            res.status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };
};

export const PRODUCT: ProductClass = new ProductClass();



