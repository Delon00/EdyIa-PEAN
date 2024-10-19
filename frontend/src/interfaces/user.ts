export interface User {
    id: number;
    email: string;
    nom: string;
    prenom: string;
    date_de_naissance?: Date;
    genre?: string;
    ville?: string;
    code_postal?: string;
    pays?: string;
    telephone?: string;
    password?: string;
    role?: string;
    subscription_expired_at?: Date;
    jetons?: any[];
    courses?: any[];
    accessLogs?: any[];
    created_at?: Date;
    updated_at?: Date;
    transactions?: any[];
}
