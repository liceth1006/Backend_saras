import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Generar el token de acceso
export const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not defined');
  }
  const token = jwt.sign({ use_id: userId }, process.env.JWT_SECRET, { expiresIn: 9000 });
  return { token, expiresIn: 9000 };
};
export const generateRefreshToken = (userId, res) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET not defined');
  }

  console.log("Clave secreta:", process.env.JWT_REFRESH_SECRET); // Para depuración
  const refreshToken = jwt.sign({ use_id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: 1000 });
  console.log("Token generado:", refreshToken);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.MODO === 'production', // Solo para HTTPS en producción
    sameSite: 'strict', // Solo enviar cookies para el mismo sitio
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
  });
};


export const tokenVerificationErrors = {
  "invalid signature": "La firma del JWT no es válida",
  "jwt expired": "JWT expirado",
  "invalid token": "Token no válido",
  "No Bearer": "Utiliza formato Bearer",
  "jwt malformed": "JWT formato no válido",
};