import express from "express";
import {readProject} from '../controllers/projectController.js'
import {
  login,
  register,
  profile,
  refreshToken,
  logout,
} from "../controllers/authController.js";
import {
  createActivity,
  readActivity,
} from "../controllers/activityController.js";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import {
  bodyLoginrValidator,
  bodyRegisterValidator,
} from "../middlewares/validationManager.js";
import { readExclusions } from "../controllers/exclusionsController.js";
import { readDocumentTypes } from "../controllers/documentTypesController.js";
const router = express.Router();

// Ruta para crear una nueva actividad
router.post("/activiy",requireToken, createActivity);

// Ruta para leer todas las actividades
router.get("/activiy", readActivity);
router.get("/project", readProject);
router.get("/exclusions", readExclusions);
router.get("/documentTypes", readDocumentTypes);

// Ruta para iniciar sesión
router.post("/login", login);
// Ruta para registrar un nuevo usuario
router.post("/register", register);

//ruta informacion usuario - perfil
router.get("/profile", requireToken, profile);
//renueva el token
router.get("/refresh", requireRefreshToken, refreshToken);

// Ruta para salir de la sesion
router.get("/logout", logout);
export default router;
