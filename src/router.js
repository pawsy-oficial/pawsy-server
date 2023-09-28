// configurações e importações
const express = require("express")

const { authMiddlewareTutor, authMiddlewareClinic, authMiddlewareMedic } = require('./middlewares/authMiddleware.js');
const validate = require("./middlewares/validation")

const cors = require("cors")

const router = express.Router()
router.use(express.json());
router.use(cors())
const upload = require("./libs/multerConfig.js");

// controllers
const registerTutor = require("./controllers/registerControllers.js")
const uploadFiles = require("./controllers/uploadFilesControllers.js")
const login = require("./controllers/loginControllers.js")
const uf = require("./controllers/cepStateControllers.js")
const integrarMedicoClinica = require("./controllers/integrateMedicClinic.js")
const integratePatientClinic = require("./controllers/integratePetPatientClinic.js")

// schemas
const tutorSchema = require("./schemas/tutorSchema.js");
const schemaClinic = require("./schemas/clinicSchema.js");
const schemaPet = require("./schemas/petSchema.js");
const schemaMedic = require("./schemas/medicSchema.js");
const getSpecialty = require("./controllers/especialty.js");
const getAllRaces = require("./controllers/racesControllers.js")
const verifyPet = require("./controllers/verifyPetControllers.js")
const getAllMedics = require("./controllers/getAllMedicsControllers.js")
const getCoordinate = require("./controllers/coordinatesControllers.js")
const ClinicCoordinates = require("./controllers/coordinatesControllers.js")

const { sendRecoveryCodeTutor, verifyAndResetPasswordTutor, sendRecoveryCodeClinica, verifyAndResetPasswordClinica, sendRecoveryCodeMedico, verifyAndResetPasswordMedico } = require('./services/passwordRecoveryService.js');

// Consultas de dados
router.get("/", (req, res)=>{
    res.status(200).send("Welcome to Pawsy")
});
router.post("/upload-files", upload.single('file'), uploadFiles.uploadFilesImage)
router.get("/especialidade", getSpecialty)
router.get("/uf", uf)
router.get("/raca", getAllRaces)
router.get("/tutor/:id", authMiddlewareTutor, verifyPet)
router.get("/medico", authMiddlewareClinic, getAllMedics)
router.use("/files", express.static(`${__dirname}/libs/uploads`))
router.get("/coordinates", authMiddlewareTutor, getCoordinate.tutorCoordinates)
router.get("/ClinicCoordinates", authMiddlewareTutor, getCoordinate.ClinicCoordinates)

// Registros
router.post("/medico", validate(schemaMedic), registerTutor.registerMedic);
router.post("/clinica", validate(schemaClinic),registerTutor.registerClinic);
router.post("/tutor-register", validate(tutorSchema), registerTutor.registerTutor);
router.post("/pet-register", validate(schemaPet), registerTutor.registerPet);

// Integrações
router.post("/integrar-medico-clinica", integrarMedicoClinica.integrateMedicClinic)
router.post("/integrar-paciente-clinica", integratePatientClinic.integratePetPatientClinic)

// Logins
router.post('/loginTutor', login.loginTuto);
router.post('/loginClinic', login.loginClinic);
router.post('/loginMedic', login.loginMedic)


// Recuperação de senha
router.post('/sendCodeTutor', sendRecoveryCodeTutor)
router.post('/resetPasswordTutor', verifyAndResetPasswordTutor)
router.post('/sendCodeClinic', sendRecoveryCodeClinica)
router.post('/resetPasswordClinic', verifyAndResetPasswordClinica)
router.post('/sendCodeMedic', sendRecoveryCodeMedico)
router.post('/resetPasswordMedic', verifyAndResetPasswordMedico)

// router.use(authMiddlewareTutor, authMiddlewareClinic, authMiddlewareMedic)
// abaixo desse comando, o login deverá ter sido autenticado para acessar as rotas

router.get('/profileTutor', authMiddlewareTutor, login.getProfileTutor);
router.get('/profileClinic', authMiddlewareClinic, login.getProfileClinic);
router.get('/profileMedic', authMiddlewareMedic, login.getProfileMedic);

module.exports = router