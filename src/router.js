const express = require("express")

const { verifyJWT } = require('./middlewares/auth.js');
const validate = require("./middlewares/validation")

const router = express.Router()
router.use(express.json());

const registerTutor = require("./controllers/registerControllers.js")
const login = require("./controllers/loginControllers.js")
const tutorSchema = require("./schemas/tutorSchema.js")

router.get("/", (req, res)=>{
    res.status(200).send("Welcome Pawsy")
});

router.get("/medico", registerTutor.registerMedic);
router.get("/clinica", registerTutor.registerClinic);

router.post("/tutor-register", validate(tutorSchema), registerTutor.registerTutor);


router.post('/loginTutor', login.loginTuto);
// Clinic
// Medic

router.get('/autenticacao', verifyJWT, (req, res) => {
    res.status(200).send({ success: true, message: 'You are authorized!', user: req.decoded });
});

module.exports = router