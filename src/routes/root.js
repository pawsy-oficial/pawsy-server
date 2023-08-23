//Na pasta routes, trabalhar funcionalidades isoladas por arquivos 
//exemplo: 
/*
register.js :

app.post('/register', (req, res)=>{
  const { name } = req.body;
  const { cpf } = req.body;
  const { dt_nascimento } = req.body;
  const { email } = req.body;
  const { celular } = req.body;
  ...

  let SQL = "INSERT INTO clinic ( name, cpf, dt_nascimento, email, celular ) VALUES ( ?, ?, ?, ?, ? )";

  ...

  EXEMPLO
    
  });
})

*/ 