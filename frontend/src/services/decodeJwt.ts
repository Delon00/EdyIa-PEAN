export function decodeJwt(token: string): any {
    if (!token) {
        return null;
    }

    const parts = token.split('.');

    // Vérifiez si le token a trois parties
    if (parts.length !== 3) {
        throw new Error('Token JWT invalide');
    }

    // La partie payload est la deuxième partie du JWT
    const payload = parts[1];

    // Décoder le payload qui est en base64url
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

    return decodedPayload;
}
