export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface RegistrationRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegistrationResponse {
    success: boolean;
    message: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    jwtToken?: string;
}

export interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}   

export interface NoteList {
    notes: Note[];
    totalCount: number;
}

export interface TokenSavedUserInfo {
    id: number,
    email: string
}