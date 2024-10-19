export interface User {
    id: number;
    prenom: string;
    nom: string;
    email: string;
    password: string;
    role: string;
    date_de_naissance?: Date;
    genre?: string;
    ville?: string;
    code_postal?: string;
    pays?: string;
    telephone?: string;
    created_at: Date;
    updated_at: Date;
}
