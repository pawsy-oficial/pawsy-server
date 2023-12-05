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
const schendule = require("./controllers/schenduleControllers.js")
const scheduleRegister = require("./controllers/schedule/clinic/CreateSchedule.js")
const GenerateAvailableConsultations = require("./controllers/schedule/clinic/GenerateAvailableConsultations.js")
const ListClinicsForConsultations = require("./controllers/schedule/tutor/ListClinicPreview.js")
const CreateAppointment = require("./controllers/schedule/tutor/CreateAppointment.js")

// schemas
const tutorSchema = require("./schemas/tutorSchema.js");
const schemaClinic = require("./schemas/clinicSchema.js");
const schemaPet = require("./schemas/petSchema.js");
const schemaMedic = require("./schemas/medicSchema.js");
const getSpecialty = require("./controllers/especialty.js");
const getAllRaces = require("./controllers/racesControllers.js")
const verifyPet = require("./controllers/verifyPetControllers.js")
const getCoordinate = require("./controllers/coordinatesControllers.js")
const Previews = require("./controllers/previewControllers.js")
const PopulationsControllerSchedule = require("./controllers/schedule/clinic/PopulationsController.js")
const GetConsultationsMarked = require("./controllers/schedule/tutor/GetConsultationsMarked.js")
const GetConsultations = require("./controllers/schedule/clinic/GetConsultations.js")
const WellbeingAlgorithm = require("./controllers/WellbeingAlgorithm.js")
const getInfosBem = require("./controllers/WellbeingAlgorithm.js")
const Passeio = require("./controllers/WellbeingAlgorithm.js")

const { sendRecoveryCodeTutor, verifyAndResetPasswordTutor, sendRecoveryCodeClinica, verifyAndResetPasswordClinica, sendRecoveryCodeMedico, verifyAndResetPasswordMedico } = require('./services/passwordRecoveryService.js');
const schemaVermifuge = require("./schemas/vermifugeSchema.js");
// const getAllPets = require("./controllers/tutor/getMyPetsControllers.js");
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
const { getAllConsultation, getAllMyPets, getAllMedics } = require("./controllers/getAllControllers.js");
const ListScheduleClinic = require("./controllers/schedule/clinic/ListSchedulesClinic.js")
const VerifyStatusSchedule = require("./controllers/schedule/clinic/VerifyStatusSchedule.js")
const ListSchedulesActives = require("./controllers/schedule/tutor/ListSchedulesActives.js")
const ListFreeConsultations = require("./controllers/schedule/tutor/ListFreeConsultations.js")
const GetTypesConsultationsSchedule = require("./controllers/schedule/tutor/GetTypesConsultationsSchedule.js")
const { getVaccines, getAllTypeVaccines, getAllVermifuges } = require("./controllers/medic/getVaccinesAndVermifuge.js");
const { clinicsPet, getAllPetsTutor } = require("./controllers/medic/clinicsPet.js");
const postHistory = require("./controllers/history/postHistory.js");
const updatePassword = require("./controllers/updatePasswordController.js");
const { getAllTypeRevenue, getRevenues, getAllRevenues } = require("./controllers/medic/getRevenues.js");
const getAllPets = require("./controllers/tutor/getMyPetsControllers.js");
const { deleteRevenues } = require("./controllers/medic/deleteRevenues.js");
const { deleteVaccine } = require("./controllers/medic/deleteVaccine");
const { deleteVermifuge } = require("./controllers/medic/deleteVermifuge.js");
    
// Consultas de dados
router.get("/", (req, res)=>{
    res.status(200).send("Welcome to Pawsy")
});
router.post("/upload-files", upload.single('file'), uploadFiles.uploadFilesImage)
router.get("/especialidade", getSpecialty)
router.get("/uf", uf)
router.get("/raca", getAllRaces)
router.get("/tutor/:id", authMiddlewareTutor, verifyPet)
router.use("/files", express.static(`${__dirname}/libs/uploads`))
router.get("/coordinates", authMiddlewareTutor, getCoordinate.tutorCoordinates)
router.get("/ClinicCoordinates", authMiddlewareTutor, getCoordinate.ClinicCoordinates)
router.get("/ClinicPreviews", Previews.ClinicPreview)
router.get("/get-tipoConsulta", authMiddlewareClinic, PopulationsControllerSchedule.TipoConsulta)
router.get("/get-medicosIntegrados", PopulationsControllerSchedule.MedicosIntegrados) // removi o meddleware dessa rota
router.get("/get-medicosIntegrados-schedule", authMiddlewareTutor, PopulationsControllerSchedule.MedicosIntegrados) // melhorar essa rota - ver se é possivel deixar ela dinamica
router.get("/countPatients/:idClinic", authMiddlewareClinic, integratePatientClinic.countPatientsClinic)
router.get("/clinicsMedic", authMiddlewareMedic, clinicsMedic)
router.get("/clinicsPet/:idClinic", authMiddlewareMedic, clinicsPet)
router.get("/pets/:petId", authMiddlewareMedic, petInfos)
router.get("/pesquisa", searchClinicsControllers)
router.get("/comment/:id", getCommentsClinic)
router.get("/getAllTypeAds", getAllTypeAds)
router.get("/getAllAds/:idClinic", getAllAds)
router.get("/getAllPets", authMiddlewareClinic, integratePatientClinic.pets)
router.get("/getAllPatients/:idClinic", authMiddlewareClinic, integratePatientClinic.getAllPatientsClinic)
// get all
router.get("/get-all-consultation", getAllConsultation)
router.get("/get-all-pets/:idTutor", authMiddlewareTutor, getAllPets)
router.get("/medico", authMiddlewareClinic, getAllMedics)

//bem-estar
router.get("/bem-estar/:id", authMiddlewareTutor, WellbeingAlgorithm.WellbeingAlgorithm)
router.get("/get-bem-estar/:id", authMiddlewareTutor, getInfosBem.getInfosBem)
router.post("/passeio/:id", Passeio.Passeio)

//shedules
router.get("/list-schedules/:id", ListScheduleClinic.ListScheduleClinic)
router.get("/schedules-ativas/:id", ListSchedulesActives.ListSchedulesActives)
router.get("/list-clinics-consultations", ListClinicsForConsultations.ListClinicPreview)
router.get("/list-free-consultations/:id", authMiddlewareTutor,ListFreeConsultations.ListFreeConsultations)
router.get("/get-tipos-consultas-schedule/:id", authMiddlewareTutor, GetTypesConsultationsSchedule.GetTypesConsultationsSchedule)
router.get("/get-medicos-schedule/:id", authMiddlewareTutor, GetTypesConsultationsSchedule.GetMedicsSchedule)
router.get("/get-pets-tutor/:id", authMiddlewareTutor, GetTypesConsultationsSchedule.GetPetsTutor)
router.get("/get-info-clinic/:id", authMiddlewareTutor, GetTypesConsultationsSchedule.GetClinicsInfo)
router.post("/marcar-consulta", authMiddlewareTutor, CreateAppointment.CreateAppointment)
router.get("/get-consultas-tutor/:id", authMiddlewareTutor, GetConsultationsMarked.GetConsultationsMarked)
router.get("/get-consultas-agenda/:id", authMiddlewareClinic, GetConsultations.GetConsultations)

// verify(middleware)
router.get("/status-schedule/:id", authMiddlewareClinic, VerifyStatusSchedule.VerifyStatusSchedule)
router.get("/get-all-vermifuge/:idTutor/:idPet", getAllVermifuges)
router.get("/get-vaccine/:idPet", getVaccines)
router.get("/get-all-type-vaccines", getAllTypeVaccines)
router.get("/get-all-my-pets/:idClinic/:idTutor", getAllPetsTutor)
router.get("/get-type-revenue", getAllTypeRevenue)
router.get("/get-revenues/:idRevenues", getRevenues)
router.get("/get-all-revenues/:idPet", getAllRevenues)
// Registros
router.post("/medico", validate(schemaMedic), registerTutor.registerMedic);
router.post("/clinica", validate(schemaClinic),registerTutor.registerClinic);
router.post("/tutor-register", validate(tutorSchema), registerTutor.registerTutor);
router.post("/pet-register", validate(schemaPet) ,registerTutor.registerPet);
router.post("/vermifuge", registerTutor.registerVermifuge);
router.post("/comment", authMiddlewareTutor, postCommentsClinic)
router.post("/ads", authMiddlewareClinic, postAds)
router.post("/agenda-register", authMiddlewareClinic, scheduleRegister.CreateSchedule);
router.post("/vaccine", registerTutor.registerVaccine);
router.post("/history", postHistory)
router.post("/revenues", registerTutor.registerRevenues);
// router.post("/tupleRevenue", registerTutor.registerTupleRevenue);

// Integrações
router.post("/integrar-medico-clinica", integrarMedicoClinica.integrateMedicClinic)
router.post("/integrar-paciente-clinica", integratePatientClinic.integratePetPatientClinic)

//Consultas
router.post("/gerar-consultas", authMiddlewareClinic, GenerateAvailableConsultations.GenerateAvailableConsultations)

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

// register schendule

router.post('/newSchendule', authMiddlewareClinic, schendule.registerNewSchendule)

module.exports = router
// update
router.post('/update-pet', updatePet)
router.post('/update-clinic-profile', updateClinic)
router.put('/ads', authMiddlewareClinic, updatePostAd)
router.put('/tutor', authMiddlewareTutor, updateAcountTutor)
router.put('/tutorAddress', authMiddlewareTutor, updateAddressTutor)
router.put('/medic', authMiddlewareMedic, updateAcountMedic)
router.put('/password', updatePassword)

// delete
router.delete('/ads/:idAd', authMiddlewareClinic, deletePostAd ) // ok
router.delete('/patient/:idClinic/:idPet', authMiddlewareClinic, removePatient) // ok
router.delete('/integrar-medico-clinica/:idClinic/:idMedic', authMiddlewareClinic, removeMedic) // o
router.delete('/delete-revenues/:idRevenue', authMiddlewareMedic, deleteRevenues)
router.delete('/delete-vacina/:idVaccine', authMiddlewareMedic, deleteVaccine)
router.delete('/delete-vermifugo/:idVermifugo', authMiddlewareMedic, deleteVermifuge)

// disabled account
router.delete('/tutor/:idTutor', authMiddlewareTutor, removeAcountTutor) // ok  
router.delete('/clinic/:idClinic', authMiddlewareClinic, removeAcountClinic) 
router.delete('/medic/:idMedic', authMiddlewareMedic, removeAcountMedic) // ok




module.exports = router
