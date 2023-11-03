SET SQL_SAFE_UPDATES = 0;

## tentando popular aqui
INSERT INTO cidade (id_uf, nm_cidade)
VALUES
(25, 'Santos'),
(25, 'Santos'),
(25, 'Santos'),
(25, 'Santos'),
(25, 'Praia Grande'),
(25, 'Praia Grande'),
(25, 'São Vicente'),
(25, 'Santos'),
(25, 'Santos'),
(25, 'Santos'),
(25, 'Santos'),
(25, 'Santos');

INSERT INTO bairro (id_cidade, nm_bairro)
VALUES
(1, 'Bom Retiro'),
(2, 'Bom Retiro'),
(3, 'Santa Maria'),
(4, 'Gonzaga'),
(5, 'Aviação'),
(6, 'Aviação'),
(7, 'Vila Nossa Senhora de Fátima'),
(8, 'Santa Maria'),
(9, 'Castelo'),
(10, 'Bom Retiro'),
(11, 'Gonzaga'),
(12, 'Boqueirão');

INSERT INTO endereco (cd_cep, nm_rua, num_residencia, complemento, latitude, longitude, id_bairro)
VALUES
('11090-175', 'Travessa Carlos Jair de Lima Guimarães', '85', NULL, '-23.936086', '-46.375432', 1),
('11090-160', 'Rua Engenheiro Elias Machado de Almeida', '106', NULL, '-23.937976', '-46.377624', 2),
('11089-230', 'Rua João Fraccaroli', '730', NULL, '-23.941179', '-46.374506', 3),
('11055-290', 'Rua Tymbiras', '15', 'ap: 0907', '-23.966911', '-46.330645', 4),
('11702-750', 'Rua Carlos José Borstens', '163', NULL, '-24.019407', '-46.450610', 5),
('11702-750', 'Rua Carlos José Borstens', '163', NULL, '-24.019407', '-46.450610', 6),
('11355-470', 'Rua Nicarágua', '35', NULL, '-4.940901', '-37.966716', 7),
('11089-220', 'Rua Augusto Gomes Pereira', '700', NULL, '-23.940673', '-46.373528', 8),
('11088-030', 'Rua José Alves do Nascimento', '101', NULL, '-23.939256', '-46.380774', 9),
('11090-000', 'Rua Cmte. Bulcão Vianna', '230', NULL, '-23.936071', '-46.372266', 10),
('11060-003', 'Avenida Ana Costa', '383', NULL, '-23.961059', '-46.331878', 11),
('11045-003', 'Avenida Conselheiro Nébias', '730', NULL, '-23.966243', '-46.323898', 12);

-- alter table tutor drop column sb_tutor;
INSERT INTO tutor (nm_tutor, sb_tutor,cd_cpf, dt_nascimento, nm_email, num_celular, pw_tutor, id_endereco, url_imagem)
VALUES
('Romullo', "melo", '56011132898', '2003-08-24', 'romullomelo013@gmail.com', '12312412312', '$2b$10$CLLqaZ3H4cDDjOzUWFN4DeMWcqRGiF/HOPrmcPShWdgjLHEV/RAta', 1, '1695781169912_pawsy_20221213_033118_Easy-Resize.com.jpg'),
('Ronaldo', "silva",'42661065059', '2000-08-08', 'ronaldo@gmail.com', '22342342342', '$2b$10$yLPXVODxjNnamPRL7rEr..WMUjd0yiCPGa.Hjz4atHW./VSReP1XC', 4, '1696255243714_pawsy_Dr-Tanveer-Ahmed.jpg'),
('Estefani', 'maria', '12579709096', '1999-04-25', 'estefani@hotmail.com', '21998239423', '$2b$10$pl2J20nSDs5hwAXBPHqQDeR7lojEgCdnTewos410sBbBSvf7v1Ate', 6, '1696255532099_pawsy_images.jpeg'),
('Leticia', 'matto','89461252099', '1980-06-30', 'leticia@yahoo.com', '23423872300', '$2b$10$qWvgqe6VdfeCefq9MGHIve5TQPu/G9dzFDHXD6.LrsDqI/1AH6eQO', 7, '1696255677299_pawsy_images (1).jpeg');

INSERT INTO clinica (nm_clinica, cnpj_clinica, email_clinica, tl_clinica, pw_clinica, id_endereco, cd_crmv, url_imagem)
VALUES
('pet care', '25050698000180', 'petcare@gmail.com', '34928492349', '$2b$10$yiz77EBz1B8/OKSp3wQOVufiZAYndhyaNeVd0fmq3vXYE9CKln71O', 8, '56666', '1696256833811_pawsy_baixados.png'),
('clinic vet', '54968239000189', 'clinicvet@clinicvet.com', '23184832482', '$2b$10$ri9fnOBKBXFIN.j3wVYWJ.w6.B1q6ZIEc2AigHBdIeBC3zMWUCC2e', 9, '23423', '1696256963946_pawsy_baixados (1).png'),
('clinica veterinaria Venus', '17817380000154', 'venus@gmail.com', '32482482384', '$2b$10$v0N3P2WCy2heSL6sI1Cfbe5VptMvSUElOjXcymph9XJuRaXSUTVI6', 10, '65646', '1696257089059_pawsy_7ac17ac772698a0a378667dde2bbab43.jpg'),
('Pets veterinário - Gonzaga', '41250583000196', 'petz@contatos.com', '42523432423', '$2b$10$OtgR63O8tgG/2LGa.Om/9uOq0rzcNTXRac.Uagl1cXhwuFBNBf69C', 11, '43543', '1696257226316_pawsy_petz logos 1.jpg'),
('animal vet', '76233982000123', 'vetanimal@gmail.com', '34590983242', '$2b$10$ZIdWNgZx7XGF/9peBQrRTuow836BXkpW9ic5EV4VeG0KiISdZcRqG', 12, '42377', '1696257354003_pawsy_images (2).jpeg');

INSERT INTO medico (nm_medico, cd_cpf, dt_nascimento, nm_email, num_celular, pw_medic, id_especialidade, cd_crmv ,url_imagem)
VALUES 
("jaba", "56011132898", "2000-08-24", "romullomelo013@gmail.com", "14232342342", "$2b$10$1ySpHRaXQLwvuDGkmAR7/.zHdRo4Xe9lS6XGlYGwaH.r6fxGmGzl.", 12, "32222", "1698621579157_pawsy_1697517333077_pawsy_doctor.jpg");