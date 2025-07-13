import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { RegistrationRequest, RegistrationResponse, User, TokenSavedUserInfo } from "../interfaces/types";
import generateUserId from "../helpers/generateUserID";
import { users } from "../data/usersArray";


export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, password }: RegistrationRequest = req.body;

    const anyFieldsUndefined: boolean = !name || !email || !password;
    if (anyFieldsUndefined) {
        const undefinedFields: RegistrationResponse = {
            success: false,
            message: "Name or email or password undefined"
        };
        
        res.status(400).json(undefinedFields);
    }

    const anyFieldsEmpty: boolean = name.length === 0 || email.length === 0 || password.length === 0;
    if (anyFieldsEmpty) {
        const emptyFields: RegistrationResponse = {
            success: false,
            message: "Name or email or password blank"
        };
        
        res.status(400).json(emptyFields);
    }


    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({
            success: false,
            message: "Email not properly formatted"
        })
        return;
    }

    const user: User | undefined = users.find(user => user.email === email);
    if (user !== undefined) {
        const existingUserRes: RegistrationResponse = {
            success: false,
            message: "User email already in database" 
        };

        res.status(403).json(existingUserRes);
        return;
    }

    const saltRounds: number = 10;
    const hash: string = await bcrypt.hash(password, saltRounds);

    const newUser: User = {
        id: generateUserId(users),
        name: name,
        email: email,
        password: hash
    }

    // add user to list
    users.push(newUser);


    // checking secret status
    if (!process.env.JWT_SECRET) {
        const undefinedSecretRes: RegistrationResponse = {
            success: false,
            message: "JWT secret not set"
        };
        res.status(500).json(undefinedSecretRes);
        return;
    }

    const tokenSavedUser: TokenSavedUserInfo = {
        id: newUser.id,
        email: newUser.email
    };


    const jwtToken = jwt.sign(tokenSavedUser, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: tokenSavedUser,
        token: jwtToken
    });
       
}