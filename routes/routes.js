import express from "express";
import { readProject } from "../controllers/projectController.js";
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
import { getBeneficiaryDetails,postBeneficiaryInformation } from "../controllers/beneficiaryInformationController.js";
import {readBeneficiary} from '../controllers/beneficiariesController.js'
import {readProjectTypes} from '../controllers/projectTypesController.js'
import {getQuestionProjectTypeDetails} from '../controllers/QuestionProjectTypeController.js'
import {readSectors} from '../controllers/sectorsController.js'
const router = express.Router();

// Ruta para crear una nueva actividad
router.post("/activiy", requireToken, createActivity);
router.post("/beneficiaryInformation", requireToken, postBeneficiaryInformation);
router.post('/beneficiaryDetails', getQuestionProjectTypeDetails);

// Ruta para leer  datos (get) que no requiere token
router.get("/documentTypes", readDocumentTypes);

// Ruta para leer  datos (get) que requiere token
router.get("/activity",requireToken, readActivity);
router.get("/project",requireToken, readProject);
router.get("/exclusions",requireToken, readExclusions);
router.get("/sector",requireToken, readSectors);
router.get("/projectTypes",requireToken, readProjectTypes);
router.get("/beneficiary",requireToken, readBeneficiary);
router.get("/beneficiary/:userId", requireToken, getBeneficiaryDetails);

//ruta informacion usuario - perfil
router.get("/profile", requireToken, profile);



// Ruta para iniciar sesión
router.post("/login", login);
// Ruta para registrar un nuevo usuario
router.post("/register", register);

//renueva el token
router.get("/refresh", requireRefreshToken, refreshToken);

// Ruta para salir de la sesion
router.get("/logout", logout);

export default router;
