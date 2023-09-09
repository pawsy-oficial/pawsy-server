const express = require("express")

const { verifyJWT } = require('./middlewares/auth.js');
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

// schemas
const tutorSchema = require("./schemas/tutorSchema.js");
const schemaClinic = require("./schemas/clinicSchema.js");
const schemaMedic = require("./schemas/medicSchema.js");
const getSpecialty = require("./controllers/especialty.js");


router.get("/", (req, res)=>{
    res.status(200).send("Welcome to Pawsy")
});

router.use("/files", express.static(`${__dirname}/libs/uploads`))

router.get("/uf", uf)
router.get("/especialidade", getSpecialty)

router.post("/medico", validate(schemaMedic), registerTutor.registerMedic);
router.post("/clinica", validate(schemaClinic), registerTutor.registerClinic);
router.post("/tutor-register", validate(tutorSchema), registerTutor.registerTutor);


router.post("/upload-files", upload.single('file'), uploadFiles.uploadFilesImage)

router.post('/login', login.loginTuto);

router.get('/autenticacao', verifyJWT, (req, res) => {
    res.status(200).send({ success: true, message: 'You are authorized!', user: req.decoded });
});

module.exports = router