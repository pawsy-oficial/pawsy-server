const express = require("express")

const { verifyJWT } = require('./middlewares/auth.js');
const router = express.Router()
router.use(express.json());

const registerTutor = require("./controllers/registerControllers.js")
const login = require("./controllers/loginControllers.js")

router.get("/medico", registerTutor.registerMedic);
router.get("/clinica", registerTutor.registerClinic);
router.get("/tutor", registerTutor.registerTutor);

router.post('/login', login.loginTuto);

router.get('/autenticacao', verifyJWT, (req, res) => {
    res.status(200).send({ success: true, message: 'You are authorized!', user: req.decoded });
});

module.exports = router