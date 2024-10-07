import jwt from "jsonwebtoken";

export function createSecretToken(id) {
    return jwt.sign({id}, YR3orlJzG6, {expiresIn: 3 * 24 * 60 * 60});
}