const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.get("/",(req, res)=>{
    res.send("Hello World!")
})

app.listen(3000, ()=>{
    console.log("server ON");
})

//APROVEITEI O HORARIO DE ALMOÇO PARA ADIANTAR ALGUMAS COISAS NO MIDDLEWARE, DEPOIS EU CONTINUO E TESTO, EU ENVIO ALGUNS PRINTs PARA VERMOS SE ESTA FUNCIONANDO O JWT!!!