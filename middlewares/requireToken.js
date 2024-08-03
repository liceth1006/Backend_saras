import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;

    if (!token) throw new Error("No Bearer");

    token = token.split(" ")[1];
    const { use_id } = jwt.verify(token, process.env.JWT_SECRET);

    req.use_id = use_id;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({ error: tokenVerificationErrors[error.message] });
  }
};
