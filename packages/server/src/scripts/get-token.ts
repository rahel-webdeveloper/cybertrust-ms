import jwt from 'jsonwebtoken';

const getToken = (id: string, role: string) =>
  jwt.sign({ id, role }, Bun.env.JWT_SECRET, {
    expiresIn: Bun.env.JWT_EXPIRES_IN,
  });

export default getToken;
