declare global {
  namespace Express {
    interface Request {
      user?: {  // ? makes it optional
        success: boolean;
        message: string;
        user: { id: number; email: string };
        tokenExpiration: number;
        accessTime: string;
      };
    }
  }
}


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

export interface NotesResponse {
    success: boolean;
    message: string;
    notes?: Note[];
}


export interface Note {
    id: number;
    userId: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}   

export interface NoteList {
    notes: Note[];
    totalCount: number;
}

export interface TokenSavedUserInfo {
    id: number,
    email: string
}