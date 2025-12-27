import express from "express";
import { SQL } from "../data/dBase";
import { cschema } from "../validation/Zod";
import { ICust } from "../models/Interfaces";

class CustomerClass {
    Create: express.Handler = async (req, res, next) => {
        try {
            const C = cschema.parse(req.body);
            const customer = await SQL`INSERT INTO customers
            (name, email, phone, address)
            VALUES (${C.name}, ${C.email}, ${C.phone}, ${C.address})
            RETURNING *`;
            res
                .status(res.statusCode)
                .json({
                    success: true,
                    data: <ICust>customer[0]
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
            const customers = await SQL`
            SELECT * FROM customers
            ORDER BY created_at DESC`;
            res
                .status(res.statusCode)
                .json({
                    success: true,
                    data: <ICust[]>customers
                })
        } catch (error) {
            res
                .status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };

    GetOne: express.Handler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const customer = await
                SQL`SELECT * FROM customers
                WHERE id = ${id}`;
            res
                .status(res.statusCode)
                .json({
                    success: true,
                    data: <ICust>customer[0]
                })
        } catch (error) {
            res
                .status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };

    Update: express.Handler = async (req, res, next) => {
        try {
            const C = cschema.parse(req.body);
            const { id } = req.params;
            const customer = await SQL`UPDATE customers
                SET name=${C.name}, email=${C.email}, 
                phone=${C.phone}, address=${C.address},
                updated_at = CURRENT_TIMESTAMP
                WHERE id=${id} RETURNING *`;
            res
                .status(res.statusCode)
                .json({
                    success: true,
                    data: <ICust>customer[0]
                })
        } catch (error) {
            res
                .status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };

    Delete: express.Handler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const deleteCust = await SQL`DELETE 
                FROM customers 
                WHERE id=${id} RETURNING *`;
            res.status(res.statusCode)
                .json({
                    success: true,
                    data: <ICust>deleteCust[0]
                })
        } catch (error) {
            res.status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };
};

export const CUSTOMER: CustomerClass = new CustomerClass();



