import express from "express";

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
import { readCommitments } from "../controllers/comitmentsController.js";
//import { readEnvironmentalSocialInfo} from"../controllers/environmental_social_infoController.js";
import {
  getBeneficiaryDetails,
  postBeneficiaryInformation,
} from "../controllers/beneficiaryInformationController.js";
import { readBeneficiary } from "../controllers/beneficiariesController.js";
import { readProjectTypes } from "../controllers/projectTypesController.js";
import { readSectors } from "../controllers/sectorsController.js";
import { readLocations } from "../controllers/locationController.js";
import { readLandUses } from "../controllers/LandUseController.js";
import { readSoilTypes } from "../controllers/soilTypeController.js";
import { postInvestmentProject } from "../controllers/investmentProjectController.js";
import { readTypeCategories } from "../controllers/typeCategoryController.js";
import {
  getEnvironmentalManagementDetails,
  postEnvironmentalManagement,
} from "../controllers/EnvironmentalManagementController.js";
import { postProjectPermits } from "../controllers/ProjectPermitsController.js";
import { postEnvironmentalSocialImpactManagement } from "../controllers/EnvironmentalSocialImpactController.js";
import { postGenderIssues } from "../controllers/genderIssuesController.js";
import { postCommunityHealthSafety } from "../controllers/communityHealthSafetyController.js";
import { postProjectEmissionsWaste } from "../controllers/ProjectEmissionsWasteController.js";
import { postProjectInputs } from "../controllers/ProjectInputsController.js";
import { postLaborConditions } from "../controllers/laborConditionsController.js";
import { postProjectArea } from "../controllers/projectAreasController.js";
import { readAreasOfInterest } from "../controllers/areasOfInterestController.js";
import { postCreditBeneficiaryEnvironmentalInfo } from "../controllers/CreditBeneficiaryEnvironmentController.js";
import { postProjectCapitalEmissions } from "../controllers/projectCapitalEmissionsController.js";
import { postCapitalProject } from "../controllers/capitalProjectController.js";
import { postCapitalProjectInputs } from "../controllers/capitalProjectInputsController.js";
import { postPermit } from "../controllers/permitsController.js";
import { readEnvironmentalPermits } from "../controllers/environmentalPermitsController.js";
const router = express.Router();

// Ruta para crear una nueva actividad
router.post("/activiy", requireToken, createActivity);
router.post(
  "/beneficiaryInformation",
  requireToken,
  postBeneficiaryInformation
);
router.post("/investment-projects", postInvestmentProject);
router.post(
  "/environmental-management",
  requireToken,
  postEnvironmentalManagement
);
router.post("/project-permits", requireToken, postProjectPermits);
router.post(
  "/environmental-social-impact",
  requireToken,
  postEnvironmentalSocialImpactManagement
);
router.post("/gender-issues", requireToken, postGenderIssues);
router.post(
  "/community-health-safety",
  requireToken,
  postCommunityHealthSafety
);
router.post(
  "/project-emissions-waste",
  requireToken,
  postProjectEmissionsWaste
);
router.post(
  "/labor-conditions",
  requireToken,
  postLaborConditions
);
router.post("/project-inputs", requireToken, postProjectInputs);
router.post('/project-areas', postProjectArea);
router.post('/credit-beneficiary-environmental-info', postCreditBeneficiaryEnvironmentalInfo);
router.post('/capital-emissions', postProjectCapitalEmissions);
router.post('/capital-project', postCapitalProject);
router.post('/capital-project-inputs', postCapitalProjectInputs);
router.post('/permit', postPermit);
// Ruta para leer  datos (get) que no requiere token
router.get("/documentTypes", readDocumentTypes);
router.get("/commitments", requireToken, readCommitments);
//router.get("/environmental_social_info", readEnvironmentalSocialInfo)
// Ruta para leer  datos (get) que requiere token
router.get("/activity", requireToken, readActivity);
router.get("/exclusions", requireToken, readExclusions);
router.get("/sector", requireToken, readSectors);
router.get("/projectTypes", requireToken, readProjectTypes);
router.get("/beneficiary", requireToken, readBeneficiary);
router.get("/beneficiary/:userId", requireToken, getBeneficiaryDetails);
router.get("/locations", readLocations);
router.get("/land-uses", readLandUses);
 router.get("/soil-types", readSoilTypes);
router.get("/type-categories", readTypeCategories);
router.get("/environmental-management/:id", getEnvironmentalManagementDetails);
router.get('/areas-of-interest', readAreasOfInterest);
router.get('/environmental-permits', readEnvironmentalPermits);
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
