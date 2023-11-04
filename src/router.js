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
const scheduleRegister = require("./controllers/schedule/clinic/CreateSchedule.js")

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
const Previews = require("./controllers/previewControllers.js")
const PopulationsControllerSchedule = require("./controllers/schedule/clinic/PopulationsController.js")

const { sendRecoveryCodeTutor, verifyAndResetPasswordTutor, sendRecoveryCodeClinica, verifyAndResetPasswordClinica, sendRecoveryCodeMedico, verifyAndResetPasswordMedico } = require('./services/passwordRecoveryService.js');
const schemaVermifuge = require("./schemas/vermifugeSchema.js");
const getAllPets = require("./controllers/tutor/getMyPetsControllers.js");
const updatePet = require("./controllers/tutor/updatePetsControllers.js");
const clinicsMedic = require("./controllers/medic/clinicsMedic.js");
const petInfos = require("./controllers/medic/petInfos.js");
const { updateClinic } = require("./controllers/clinic/updateClinicControllers.js");
const { searchClinicsControllers } = require("./controllers/searchClinicsControllers.js");
const { postCommentsClinic, getCommentsClinic } = require("./controllers/commentsControllers.js");
const {getAllTypeAds, getAllAds} = require("./controllers/ads/getAllAdsControllers.js");
const postAds = require("./controllers/ads/postAds.js");
const deletePostAd = require("./controllers/ads/deleteController.js");
const updatePostAd = require("./controllers/ads/updateController.js");
const { removePatient } = require("./controllers/clinic/removePatientControllers.js");
const { removeAcountTutor } = require("./controllers/tutor/removeTutorAcountControllers.js");
const { removeMedic } = require("./controllers/clinic/removeMedicController.js");
const { removeAcountClinic } = require("./controllers/clinic/removeAcountClinicControllers.js");
const { updateAcountTutor, updateAddressTutor } = require("./controllers/tutor/updateAcountControllers.js");
const { updateAcountMedic } = require("./controllers/medic/updateAcountMedic.js");
const { removeAcountMedic } = require("./controllers/medic/removeAcountMedic.js");

const { getVaccines, getAllTypeVaccines, getAllVermifuges } = require("./controllers/medic/getVaccinesAndVermifuge.js");
const { clinicsPet, getAllPetsTutor } = require("./controllers/medic/clinicsPet.js");

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
router.get("/ClinicPreviews", Previews.ClinicPreview)
router.get("/get-all-pets/:idTutor", authMiddlewareTutor, getAllPets)
router.get("/get-tipoConsulta", authMiddlewareClinic, PopulationsControllerSchedule.TipoConsulta)
router.get("/get-medicosIntegrados", PopulationsControllerSchedule.MedicosIntegrados) // removi o meddleware dessa rota
router.get("/getAllPets", authMiddlewareClinic, integratePatientClinic.pets)
router.get("/getAllPatients/:idClinic", authMiddlewareClinic, integratePatientClinic.getAllPatientsClinic)
router.get("/countPatients/:idClinic", authMiddlewareClinic, integratePatientClinic.countPatientsClinic)
router.get("/clinicsMedic", authMiddlewareMedic, clinicsMedic)
router.get("/clinicsPet", authMiddlewareMedic, clinicsPet)
router.get("/pets/:petId", authMiddlewareMedic, petInfos)
router.get("/pesquisa", searchClinicsControllers)
router.get("/comment/:id", getCommentsClinic)
router.get("/getAllTypeAds", getAllTypeAds)
router.get("/getAllAds/:idClinic", getAllAds)
router.get("/get-all-vermifuge/:idTutor/:idPet", authMiddlewareMedic, getAllVermifuges)
router.get("/get-vaccine/:idPet", authMiddlewareMedic, getVaccines)
router.get("/get-all-type-vaccines", getAllTypeVaccines)
router.get("/get-all-my-pets/:idClinic/:idTutor", getAllPetsTutor)

// Registros
router.post("/medico", validate(schemaMedic), registerTutor.registerMedic);
router.post("/clinica", validate(schemaClinic),registerTutor.registerClinic);
router.post("/tutor-register", validate(tutorSchema), registerTutor.registerTutor);
router.post("/pet-register", validate(schemaPet) ,registerTutor.registerPet);
router.post("/vermifuge", registerTutor.registerVermifuge);
router.post("/comment", authMiddlewareTutor, postCommentsClinic)
router.post("/ads", authMiddlewareClinic, postAds)
// router.post("/agenda-register", authMiddlewareClinic, scheduleRegister.CreateSchedule);
router.post("/vaccine", registerTutor.registerVaccine);

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

// update
router.post('/update-pet', updatePet)
router.post('/update-clinic-profile', updateClinic)
router.put('/ads', authMiddlewareClinic, updatePostAd)
router.put('/tutor', authMiddlewareTutor, updateAcountTutor)
router.put('/tutorAddress', authMiddlewareTutor, updateAddressTutor)
router.put('/medic', authMiddlewareMedic, updateAcountMedic)

// delete
router.delete('/ads/:idAd', authMiddlewareClinic, deletePostAd ) // ok
router.delete('/patient/:idClinic/:idPet', authMiddlewareClinic, removePatient) // ok
router.delete('/integrar-medico-clinica/:idClinic/:idMedic', authMiddlewareClinic, removeMedic) // ok

// disabled account
router.delete('/tutor/:idTutor', authMiddlewareTutor, removeAcountTutor) // ok  
router.delete('/clinic/:idClinic', authMiddlewareClinic, removeAcountClinic) 
router.delete('/medic/:idMedic', authMiddlewareMedic, removeAcountMedic) // ok




module.exports = router
