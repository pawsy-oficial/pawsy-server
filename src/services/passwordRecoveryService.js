const nodemailer = require('nodemailer');
const db = require('../db')
const crypto = require('crypto');
const bcrypt = require('bcrypt'); 
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const htmlTemplatePath = path.join(__dirname, './template/index.html');
const template = fs.readFileSync(htmlTemplatePath, 'utf-8');

const MAILER_HOST = process.env.MAILER_HOST;
const MAILER_PORT = parseInt(process.env.MAILER_PORT, 10);
const MAILER_SECURE = process.env.MAILER_SECURE === 'true';
const MAILER_USER = process.env.MAILER_USER;
const MAILER_PASS = process.env.MAILER_PASS;

const transport = nodemailer.createTransport({
  host: MAILER_HOST,
  port: MAILER_PORT,
  secure: MAILER_SECURE,
  auth: {
    user: MAILER_USER,
    pass: MAILER_PASS,
  }
});

async function sendRecoveryCodeTutor(req, res) {
  const { email } = req.body;

  let query = "SELECT * FROM tutor WHERE nm_email = ?"; 

  db.query(query, [email], async (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send('Erro ao consultar o banco de dados.');
          return;
      }

      if (result.length === 0) {
          res.status(400).send('E-mail não encontrado.');
          return;
      }

      try {
          const code = crypto.randomBytes(4).toString('hex').toUpperCase();
          const nameEmail = result[0].nm_tutor;
          const filledTemplate = template
              .replace('{{CODE}}', code)
              .replace('{{NAME}}', nameEmail);

          db.query('UPDATE tutor SET recoveryCode = ?, recoveryCodeExpiry = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE nm_email = ?', [code, email], async (updateErr) => {
              if (updateErr) {
                  console.log(updateErr);
                  res.status(500).send('Erro ao atualizar código de recuperação.');
                  return;
              }

              try {
                  await transport.sendMail({
                      from: process.env.MAILER_USER,
                      to: email,
                      subject: 'Seu código de recuperação',
                      html: filledTemplate
                  });
                  res.status(200).send('Código de recuperação enviado com sucesso.');
              } catch (mailError) {
                  console.log(mailError);
                  res.status(500).send('Erro ao enviar e-mail.');
              }
          });
      } catch (error) {
          console.log(error);
          res.status(500).send('Erro ao gerar código de recuperação.');
      }
  });
}

async function verifyAndResetPasswordTutor(req, res) {
  const { email, code, newPassword } = req.body;

  let query = "SELECT * FROM tutor WHERE nm_email = ?"; 

  db.query(query, [email], async (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send('Erro ao consultar o banco de dados.');
          return;
      }
      
      if (result.length === 0) {
          res.status(400).send('E-mail não encontrado.');
          return;
      }

      const storedRecoveryCode = result[0].recoveryCode;
      const storedRecoveryCodeExpiry = result[0].recoveryCodeExpiry;

      const currentDate = new Date();
      const expiryDate = new Date(storedRecoveryCodeExpiry);

      if (code !== storedRecoveryCode || currentDate > expiryDate) {
          res.status(400).send('Código inválido ou expirado');
          return;
      }

      try {
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          db.query('UPDATE tutor SET pw_tutor = ? WHERE nm_email = ?', [hashedPassword, email], (updateErr) => {
              if (updateErr) {
                  console.log(updateErr);
                  res.status(500).send('Erro ao atualizar senha.');
                  return;
              }

              res.status(200).send('Senha atualizada com sucesso.');
          });

      } catch (bcryptError) {
          console.log(bcryptError);
          res.status(500).send('Erro ao criptografar a nova senha.');
      }
  });
}

async function sendRecoveryCodeClinica(req, res) {
  const { email } = req.body;
  let query = "SELECT * FROM clinica WHERE email_clinica = ?"; 

  db.query(query, [email], async (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send('Erro ao consultar o banco de dados.');
          return;
      }

      if (result.length === 0) {
          res.status(400).send('E-mail não encontrado.');
          return;
      }

      try {
          const code = crypto.randomBytes(4).toString('hex').toUpperCase();
          const nameEmail = result[0].nm_clinica; 
          const filledTemplate = template
              .replace('{{CODE}}', code)
              .replace('{{NAME}}', nameEmail);

          db.query('UPDATE clinica SET recoveryCode = ?, recoveryCodeExpiry = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email_clinica = ?', [code, email], async (updateErr) => {
              if (updateErr) {
                  console.log(updateErr);
                  res.status(500).send('Erro ao atualizar código de recuperação.');
                  return;
              }

              try {
                  await transport.sendMail({
                      from: process.env.MAILER_USER,
                      to: email,
                      subject: 'Seu código de recuperação',
                      html: filledTemplate
                  });
                  res.status(200).send('Código de recuperação enviado com sucesso.');
              } catch (mailError) {
                  console.log(mailError);
                  res.status(500).send('Erro ao enviar e-mail.');
              }
          });
      } catch (error) {
          console.log(error);
          res.status(500).send('Erro ao gerar código de recuperação.');
      }
  });
}

async function verifyAndResetPasswordClinica(req, res) {
  const { email, code, newPassword } = req.body;

  let query = "SELECT * FROM clinica WHERE email_clinica = ?"; 

  db.query(query, [email], async (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send('Erro ao consultar o banco de dados.');
          return;
      }
      
      if (result.length === 0) {
          res.status(400).send('E-mail não encontrado.');
          return;
      }

      const storedRecoveryCode = result[0].recoveryCode;
      const storedRecoveryCodeExpiry = result[0].recoveryCodeExpiry;

      const currentDate = new Date();
      const expiryDate = new Date(storedRecoveryCodeExpiry);

      if (code !== storedRecoveryCode || currentDate > expiryDate) {
          res.status(400).send('Código inválido ou expirado');
          return;
      }

      try {
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          db.query('UPDATE clinica SET pw_clinica = ? WHERE email_clinica = ?', [hashedPassword, email], (updateErr) => {
              if (updateErr) {
                  console.log(updateErr);
                  res.status(500).send('Erro ao atualizar senha.');
                  return;
              }

              res.status(200).send('Senha atualizada com sucesso.');
          });

      } catch (bcryptError) {
          console.log(bcryptError);
          res.status(500).send('Erro ao criptografar a nova senha.');
      }
  });
}

async function sendRecoveryCodeMedico(req, res) {
  const { email } = req.body;
  let query = "SELECT * FROM medico WHERE nm_email = ?"; 

  db.query(query, [email], async (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send('Erro ao consultar o banco de dados.');
          return;
      }

      if (result.length === 0) {
          res.status(400).send('E-mail não encontrado.');
          return;
      }

      try {
          const code = crypto.randomBytes(4).toString('hex').toUpperCase();
          const nameEmail = result[0].nm_medico;
          const filledTemplate = template
              .replace('{{CODE}}', code)
              .replace('{{NAME}}', nameEmail);

          db.query('UPDATE medico SET recoveryCode = ?, recoveryCodeExpiry = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE nm_email = ?', [code, email], async (updateErr) => {
              if (updateErr) {
                  console.log(updateErr);
                  res.status(500).send('Erro ao atualizar código de recuperação.');
                  return;
              }

              try {
                  await transport.sendMail({
                      from: process.env.MAILER_USER,
                      to: email,
                      subject: 'Seu código de recuperação',
                      html: filledTemplate
                  });
                  res.status(200).send('Código de recuperação enviado com sucesso.');
              } catch (mailError) {
                  console.log(mailError);
                  res.status(500).send('Erro ao enviar e-mail.');
              }
          });
      } catch (error) {
          console.log(error);
          res.status(500).send('Erro ao gerar código de recuperação.');
      }
  });
}

async function verifyAndResetPasswordMedico(req, res) {
  const { email, code, newPassword } = req.body;

  let query = "SELECT * FROM medico WHERE nm_email = ?"; 

  db.query(query, [email], async (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send('Erro ao consultar o banco de dados.');
          return;
      }
      
      if (result.length === 0) {
          res.status(400).send('E-mail não encontrado.');
          return;
      }

      const storedRecoveryCode = result[0].recoveryCode;
      const storedRecoveryCodeExpiry = result[0].recoveryCodeExpiry;

      const currentDate = new Date();
      const expiryDate = new Date(storedRecoveryCodeExpiry);

      if (code !== storedRecoveryCode || currentDate > expiryDate) {
          res.status(400).send('Código inválido ou expirado');
          return;
      }

      try {
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          db.query('UPDATE medico SET pw_medic = ? WHERE nm_email = ?', [hashedPassword, email], (updateErr) => {
              if (updateErr) {
                  console.log(updateErr);
                  res.status(500).send('Erro ao atualizar senha.');
                  return;
              }

              res.status(200).send('Senha atualizada com sucesso.');
          });

      } catch (bcryptError) {
          console.log(bcryptError);
          res.status(500).send('Erro ao criptografar a nova senha.');
      }
  });
}


module.exports = {
  sendRecoveryCodeTutor,
  verifyAndResetPasswordTutor,
  sendRecoveryCodeClinica,
  verifyAndResetPasswordClinica,
  sendRecoveryCodeMedico,
  verifyAndResetPasswordMedico
}