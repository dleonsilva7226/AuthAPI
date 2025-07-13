import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import type { LoginRequest, LoginResponse, User } from "../interfaces/types";
import { users } from "../data/usersArray";

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password }: LoginRequest = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400).json({ 
            success: false,
            message: "Email and password are required." 
        });
        return;
    }

    // Check if email is valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ 
            success: false,
            message: "Invalid email format." 
        });
        return;
    }

    // Find user by email
    const user: User | undefined = users.find(user => user.email === email);

    if (user === undefined || user === null) {
        res.status(401).json({ 
            success: false,
            message: "User email not found." 
        });
        return;
    }

    // token creation
    if (process.env.JWT_SECRET === undefined) {
        res.status(500).json({ 
            success: false,
            message: "Server error"
        });
        return;
    }

    const token: string = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });

    const hashedPassword: string | undefined = user.password;
    bcrypt.compare(password, hashedPassword).then((result: boolean) => {
        if (!result) {
            const invalidLoginRes: LoginResponse = {
                success: false,
                message: "Invalid password."
            }
            res.status(401).json(invalidLoginRes);
            return;
        }
        const loginRes: LoginResponse = {
            success: true,
            message: "Login successful.",
            jwtToken: token
        }

        res.status(200).json(loginRes);
    });



}
