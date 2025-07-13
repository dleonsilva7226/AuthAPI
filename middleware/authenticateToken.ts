import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    console.log('INFO: Authenticating token');
    const authHeader: string | undefined = req.headers.authorization;
    const token: string | undefined = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({
            success: false,
            message: "No token provided. Please log in again."
        });
        return;
    }

    if (!process.env.JWT_SECRET) {
        res.status(500).json({ 
            success: false,
            message: 'JWT secret is not defined' 
        });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: Error | null, decoded: any) => {
        if (err) {
            res.status(403).json({
                success: false,
                message: "Invalid token. Please log in again. Could not connect to the protected route."
            });
            return;
        }

        //adding a new parameter to the request object
        req.user = {
            success: true,
            message: "Token successfully verified",
            user: {
                id: decoded.id,
                email: decoded.email
            },
            tokenExpiration: decoded.exp, // Token expiration time
            accessTime: new Date().toLocaleString() // Time of access
        };

        next();
    });

}