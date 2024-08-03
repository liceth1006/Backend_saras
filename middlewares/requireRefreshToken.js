/* JWT es un estándar para la creación de tokens que se utilizan para autenticar a los usuarios y 
transmitir información segura entre el cliente y el servidor.https://www.npmjs.com/package/jsonwebtoken
*/
import jwt from "jsonwebtoken";

import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error("No existe el token");

    // Verifica el token de actualización utilizando la clave secreta proporcionada en process.env.JWT_REFRESH.
    // El resultado de la verificación contiene el identificador de usuario (use_id) incrustado en el token.

    const { use_id } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    // Agrega el identificador de usuario (use_id) a la solicitud (req) para que esté disponible en las rutas protegidas.
    req.use_id = use_id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: tokenVerificationErrors[error.message] });
  }
};
