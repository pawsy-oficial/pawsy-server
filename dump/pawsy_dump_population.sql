SET SQL_SAFE_UPDATES = 0;

-- selects para a banca //////

select * from pacientes;
select * from trabalho;
select * from tutor;
select * from medico;
select * from clinica;

desc clinica;

-- ///////////////////////////

INSERT INTO tutor (nm_tutor, cd_cpf, dt_nascimento, nm_email, num_celular, pw_tutor, id_endereco, url_imagem)
VALUES ('Tutor1', '50096888831', '1980-01-01', 'tutor1@email.com', '1234567890', 'password123', 1, 'url_to_tutor1_image'),
       ('Tutor2', '23456784141', '1990-01-01', 'tutor2@email.com', '2345678901', 'password456', 2, 'url_to_tutor2_image');
              
INSERT INTO pet (id_tutor, id_raca, id_pelagem, id_sexo, id_animal, num_peso, dt_nascimento, resumo, img_pet, nm_pet, url_img)
VALUES (25, 1, 1, 1, 1, 25, '2015-01-20', 'Labrador preto', 'img_black_labrador', 'Bobby', 'url_to_bobby_image'),
       (25, 2, 2, 2, 2, 4, '2018-07-17', 'Gato Persa branco', 'img_white_persa', 'Mia', 'url_to_mia_image');
       
select * from pet where id_tutor = 25;
select * from clinica;
select * from pacientes;
select * from pelagem;
select * from animal;

SELECT * FROM pet 
JOIN tutor ON pet.id_tutor = tutor.id_tutor 
WHERE pet.id_pet = 25 AND tutor.cd_cpf = '50096888831';

SELECT * FROM tutor WHERE cd_cpf = '50096888831';
SELECT * FROM pet WHERE id_pet = 25;


-- Inserir dados na tabela raca
INSERT INTO raca (nm_raca, tp_raca) VALUES ('Labrador', 'Cão');
INSERT INTO raca (nm_raca, tp_raca) VALUES ('Persa', 'Gat');
INSERT INTO raca (nm_raca, tp_raca) VALUES ('Siames', 'Gat');

-- Inserir dados na tabela pelagem
INSERT INTO pelagem (tp_pelagem) VALUES ('Curto');
INSERT INTO pelagem (tp_pelagem) VALUES ('Longo');
INSERT INTO pelagem (tp_pelagem) VALUES ('Misto');



-- Inserir dados na tabela animal
INSERT INTO animal (nm_animal) VALUES ('Cachorro');
INSERT INTO animal (nm_animal) VALUES ('Gato');
INSERT INTO animal (nm_animal) VALUES ('Pássaro');

-- Inserir dados na tabela tutor
INSERT INTO tutor (nm_tutor, cd_cpf, dt_nascimento, nm_email, num_celular, pw_tutor, id_endereco, url_imagem) VALUES 
('Maria Silva', '12345678901', '1990-05-15', 'maria@gmail.com', '11987654321', 'senha123', 1, 'url_to_maria_image'),
('João Pereira', '98765432109', '1985-08-10', 'joao@yahoo.com', '11965432178', 'joao1234', 2, 'url_to_joao_image');

SELECT * FROM tutor WHERE id_tutor IN (1, 2);
SELECT * FROM raca WHERE id_raca IN (1, 2);
SELECT * FROM pelagem WHERE id_pelagem IN (1, 2);
SELECT * FROM sexo WHERE id_sexo IN (1, 2);
SELECT * FROM animal WHERE id_animal IN (1, 2);

select * from clinica;

INSERT INTO pet (id_tutor, id_raca, id_pelagem, id_sexo, id_animal, num_peso, dt_nascimento, resumo, img_pet, nm_pet, url_img)
VALUES (1, 1, 1, 1, 1, 25, '2015-01-20', 'Labrador preto', 'img_black_labrador', 'Bobby', 'url_to_bobby_image');



SELECT 
            e.cd_cep AS CEP,
            e.nm_rua AS Rua,
            e.num_residencia AS Numero,
            e.complemento AS Complemento,
            e.latitude AS Latitude,
            e.longitude AS Longitude,
            b.nm_bairro AS Bairro,
            c.nm_cidade AS Cidade,
            u.nm_estado AS Estado
        FROM clinica cl
        JOIN endereco e ON cl.id_endereco = e.id_endereco
        JOIN bairro b ON e.id_bairro = b.id_bairro
        JOIN cidade c ON b.id_cidade = c.id_cidade
        JOIN uf u ON c.id_uf = u.id_uf
        WHERE cl.id_clinica = 7;




    

-- 10-08-2023
-- 15-08-2023

-- Inserindo 3 endereços fictícios:

-- Inserindo 3 médicos fictícios:

INSERT INTO medico 
    (nm_medico, cd_cpf, dt_nascimento, nm_email, num_celular, pw_medic, id_especialidade, id_endereco, cd_crmv, url_imagem) 
VALUES 
    ('Dr. João Silva', '12345678901', '1980-01-01', 'joao.silva@exemplo.com', '1122334455', 'senha123', 1, 1, 12345, 'http://exemplo.com/1.jpg'),

    ('Dra. Maria Pereira', '23456789012', '1985-05-15', 'maria.pereira@exemplo.com', '2211334455', 'senha456', 2, 2, 23456, 'http://exemplo.com/2.jpg'),

    ('Dr. Pedro Costa', '34567890123', '1990-10-20', 'pedro.costa@exemplo.com', '3311223344', 'senha789', 3, 3, 34567, 'http://exemplo.com/3.jpg');



INSERT INTO endereco 
    (cd_cep, nm_rua, num_residencia, complemento, latitude, longitude, id_bairro) 
VALUES 
    ('12345-678', 'Rua das Flores', 10, 'Perto da padaria', -23.550520, -46.633308, 1),
    ('23456-789', 'Avenida dos Pássaros', 22, 'Ao lado do mercado', -23.551220, -46.634408, 2),
    ('34567-890', 'Travessa dos Gatos', 33, 'Em frente à escola', -23.552320, -46.635508, 3);

-- Inserindo 3 conjuntos fictícios de redes sociais:

INSERT INTO redes 
    (user_tiktok, user_insta, num_whats, url_facebook) 
VALUES 
    ('petcare_user', 'petcare_insta', '+551122334455', 'https://facebook.com/petcare'),
    ('saudepet_user', 'saudepet_insta', '+551133445566', 'https://facebook.com/saudepet'),
    ('amigosanimais_user', 'amigosanimais_insta', '+551144556677', 'https://facebook.com/amigosanimais');


-- Inserindo 3 clínicas fictícias:

INSERT INTO clinica 
    (nm_clinica, cnpj_clinica, email_clinica, tl_clinica, pw_clinica, id_endereco, cd_crmv, url_imagem, ds_sobre, cd_rede) 
VALUES 
    ('PetCare Clínica', '11222333444455', 'contato@petcare.com', '1122334455', 'senha123', 1, 12345, 'http://example.com/1.jpg', 'Clínica especializada em animais exóticos.', 1),

    ('SaúdePet', '22333444555666', 'atendimento@saudepet.com', '2211334455', 'senha456', 2, 23456, 'http://example.com/2.jpg', 'A melhor clínica para o seu pet!', 2),

    ('Amigos Animais', '33444555666777', 'info@amigosanimais.com', '3311223344', 'senha789', 3, 34567, 'http://example.com/3.jpg', 'Cuidamos do seu pet como se fosse nosso.', 3);


-- Insert data into `uf` table
INSERT INTO uf (nm_estado)
VALUES ('Rio de Janeiro'), 
       ('São Paulo'), 
       ('Minas Gerais');

-- Insert data into `cidade` table referencing the states
INSERT INTO cidade (id_uf, nm_cidade)
VALUES (1, 'Rio de Janeiro'), 
       (1, 'Niterói'), 
       (2, 'São Paulo'), 
       (2, 'Campinas'), 
       (3, 'Belo Horizonte');

-- Insert data into `bairro` table referencing the cities
INSERT INTO bairro (id_cidade, nm_bairro)
VALUES (1, 'Copacabana'), 
       (1, 'Ipanema'), 
       (2, 'Centro'), 
       (3, 'Moema'), 
       (3, 'Itaim Bibi'), 
       (5, 'Savassi');

-- Insert data into `endereco` table referencing the neighborhoods
INSERT INTO endereco (cd_cep, nm_rua, num_residencia, complemento, latitude, longitude, id_bairro)
VALUES ('12345-678', 'Rua Barata', 123, 'Apto 301', -22.970722, -43.182365, 1), 
       ('23456-789', 'Avenida Atlantica', 456, NULL, -22.981041, -43.190899, 1), 
       ('34567-890', 'Rua Fictícia', 789, 'Bloco 2', -22.906847, -43.172896, 2), 
       ('45678-901', 'Avenida São João', 101, NULL, -23.5475, -46.6368, 4), 
       ('56789-012', 'Rua Principal', 102, 'Lado B', -22.932925, -43.104486, 3), 
       ('67890-123', 'Alameda das Rosas', 103, 'Casa 1', -19.933548, -43.9385707, 6);
       

-- Insert data into `tutor` table
INSERT INTO tutor (nm_tutor, cd_cpf, dt_nascimento, nm_email, num_celular, pw_tutor, id_endereco, url_imagem) 
VALUES 
('John Doe', '12345678900', '1990-01-01', 'johndoe@example.com', '12345678901', 'password1', 1, 'http://example.com/image1.jpg'),
('Jane Smith', '98765432100', '1992-02-02', 'janesmith@example.com', '98765432102', 'password2', 2, 'http://example.com/image2.jpg'),
('Bob Brown', '45678912300', '1985-03-03', 'bobbrown@example.com', '45678912303', 'password3', 3, 'http://example.com/image3.jpg'),
('Alice White', '78912345600', '1995-04-04', 'alicewhite@example.com', '78912345604', 'password4', 4, 'http://example.com/image4.jpg'),
('Charlie Green', '32145678900', '1988-05-05', 'charliegreen@example.com', '32145678905', 'password5', 5, 'http://example.com/image5.jpg'),
('Daisy Blue', '65432178900', '1987-06-06', 'daisyblue@example.com', '65432178906', 'password6', 6, 'http://example.com/image6.jpg');

















## tentando popular aqui
alter table tutor drop column sb_tutor;
INSERT INTO tutor (nm_tutor, cd_cpf, dt_nascimento, nm_email, num_celular, pw_tutor, id_endereco, url_imagem)
VALUES
('Romullo', '56011132898', '2003-08-24', 'romullomelo013@gmail.com', '12312412312', '$2b$10$CLLqaZ3H4cDDjOzUWFN4DeMWcqRGiF/HOPrmcPShWdgjLHEV/RAta', 1, '1695781169912_pawsy_20221213_033118_Easy-Resize.com.jpg'),
('Ronaldo', '42661065059', '2000-08-08', 'ronaldo@gmail.com', '22342342342', '$2b$10$yLPXVODxjNnamPRL7rEr..WMUjd0yiCPGa.Hjz4atHW./VSReP1XC', 4, '1696255243714_pawsy_Dr-Tanveer-Ahmed.jpg'),
('Estefani', '12579709096', '1999-04-25', 'estefani@hotmail.com', '21998239423', '$2b$10$pl2J20nSDs5hwAXBPHqQDeR7lojEgCdnTewos410sBbBSvf7v1Ate', 6, '1696255532099_pawsy_images.jpeg'),
('Leticia', '89461252099', '1980-06-30', 'leticia@yahoo.com', '23423872300', '$2b$10$qWvgqe6VdfeCefq9MGHIve5TQPu/G9dzFDHXD6.LrsDqI/1AH6eQO', 7, '1696255677299_pawsy_images (1).jpeg');

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


select * from endereco;

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

INSERT INTO clinica (nm_clinica, cnpj_clinica, email_clinica, tl_clinica, pw_clinica, id_endereco, cd_crmv, url_imagem)
VALUES
('pet care', '25050698000180', 'petcare@gmail.com', '34928492349', '$2b$10$yiz77EBz1B8/OKSp3wQOVufiZAYndhyaNeVd0fmq3vXYE9CKln71O', 8, '56666', '1696256833811_pawsy_baixados.png'),
('clinic vet', '54968239000189', 'clinicvet@clinicvet.com', '23184832482', '$2b$10$ri9fnOBKBXFIN.j3wVYWJ.w6.B1q6ZIEc2AigHBdIeBC3zMWUCC2e', 9, '23423', '1696256963946_pawsy_baixados (1).png'),
('clinica veterinaria Venus', '17817380000154', 'venus@gmail.com', '32482482384', '$2b$10$v0N3P2WCy2heSL6sI1Cfbe5VptMvSUElOjXcymph9XJuRaXSUTVI6', 10, '65646', '1696257089059_pawsy_7ac17ac772698a0a378667dde2bbab43.jpg'),
('Pets veterinário - Gonzaga', '41250583000196', 'petz@contatos.com', '42523432423', '$2b$10$OtgR63O8tgG/2LGa.Om/9uOq0rzcNTXRac.Uagl1cXhwuFBNBf69C', 11, '43543', '1696257226316_pawsy_petz logos 1.jpg'),
('animal vet', '76233982000123', 'vetanimal@gmail.com', '34590983242', '$2b$10$ZIdWNgZx7XGF/9peBQrRTuow836BXkpW9ic5EV4VeG0KiISdZcRqG', 12, '42377', '1696257354003_pawsy_images (2).jpeg');

