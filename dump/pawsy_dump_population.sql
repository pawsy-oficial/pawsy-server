SET SQL_SAFE_UPDATES = 0;

-- selects para a banca //////

select * from pacientes;
select * from trabalho;

select * from tutor;
select * from medico;
select * from clinica;

-- ///////////////////////////

INSERT INTO tutor (nm_tutor, cd_cpf, dt_nascimento, nm_email, num_celular, pw_tutor, id_endereco, url_imagem)
VALUES ('Tutor1', '50096888831', '1980-01-01', 'tutor1@email.com', '1234567890', 'password123', 1, 'url_to_tutor1_image'),
       ('Tutor2', '23456784141', '1990-01-01', 'tutor2@email.com', '2345678901', 'password456', 2, 'url_to_tutor2_image');
       
select * from tutor where cd_cpf = "50096888831";
       
INSERT INTO pet (id_tutor, id_raca, id_pelagem, id_sexo, id_animal, num_peso, dt_nascimento, resumo, img_pet, nm_pet, url_img)
VALUES (25, 1, 1, 1, 1, 25, '2015-01-20', 'Labrador preto', 'img_black_labrador', 'Bobby', 'url_to_bobby_image'),
       (25, 2, 2, 2, 2, 4, '2018-07-17', 'Gato Persa branco', 'img_white_persa', 'Mia', 'url_to_mia_image');
       
select * from pet where id_tutor = 25;
select * from clinica;

select * from pacientes;
select * from raca where id_raca = 1;
select * from pet;

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

-- Inserir dados na tabela sexo
INSERT INTO sexo (nm_sexo) VALUES ('Macho');
INSERT INTO sexo (nm_sexo) VALUES ('Fêmea');

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


-- Inserir dados na tabela pet
INSERT INTO pet (id_tutor, id_raca, id_pelagem, id_sexo, id_animal, num_peso, dt_nascimento, resumo, img_pet, nm_pet, url_img) VALUES 
(1, 1, 1, 1, 1, 25, '2015-01-20', 'Labrador preto', 'img_black_labrador', 'Bobby', 'url_to_bobby_image'),
(2, 2, 2, 2, 2, 4, '2018-07-17', 'Gato Persa branco', 'img_white_persa', 'Mia', 'url_to_mia_image');

select * from pet;

-- Inserir dados na tabela clinica
INSERT INTO clinica (nm_clinica, cnpj_clinica, email_clinica, tl_clinica, pw_clinica, id_endereco, cd_crmv, url_imagem, ds_sobre, cd_rede) VALUES 
('Clínica Vet ABC', '11111111111111', 'vetabc@gmail.com', '1123456789', 'clinicavet123', 1, 12345, 'url_to_clinica_abc', 'A melhor clínica da região!', 1),
('Pet Health XYZ', '99999999999999', 'pethxyz@yahoo.com', '1129876543', 'pethxyz456', 2, 98765, 'url_to_pet_health', 'Especializados em animais exóticos!', 2);



INSERT INTO clinica (nm_clinica, cnpj_clinica, email_clinica, tl_clinica, pw_clinica, id_endereco, cd_crmv, url_imagem, ds_sobre, cd_rede)
VALUES ('Clinica A', '12345678901234', 'clinicaA@email.com', '12345678901', 'senha123', 1, 1001, 'url_imagemA.jpg', 'Descrição da Clinica A', 1);

INSERT INTO clinica (nm_clinica, cnpj_clinica, email_clinica, tl_clinica, pw_clinica, id_endereco, cd_crmv, url_imagem, ds_sobre, cd_rede)
VALUES ('Clinica B', '23456789012345', 'clinicaB@email.com', '23456789012', 'senha456', 2, 1002, 'url_imagemB.jpg', 'Descrição da Clinica B', 2);

INSERT INTO medico (nm_medico, cd_cpf, dt_nascimento, nm_email, num_celular, pw_medic, id_especialidade, id_endereco, cd_crmv, url_imagem)
VALUES ('Medico A', '12345678901', '1980-01-01', 'medicoA@email.com', '98765432101', 'senha321', 1, 1, 1001, 'url_imagemMedicoA.jpg');

INSERT INTO medico (nm_medico, cd_cpf, dt_nascimento, nm_email, num_celular, pw_medic, id_especialidade, id_endereco, cd_crmv, url_imagem)
VALUES ('Medico B', '23456789012', '1985-05-05', 'medicoB@email.com', '87654321098', 'senha654', 2, 2, 1002, 'url_imagemMedicoB.jpg');

INSERT INTO clinica (nm_clinica, cnpj_clinica, email_clinica, tl_clinica, pw_clinica, id_endereco, cd_crmv, url_imagem, ds_sobre, cd_rede)
VALUES ('Clinica C', '34567890123456', 'clinicaC@email.com', '34567890123', 'senha789', 3, 1003, 'url_imagemC.jpg', 'Descrição da Clinica C', 3);

INSERT INTO medico (nm_medico, cd_cpf, dt_nascimento, nm_email, num_celular, pw_medic, id_especialidade, id_endereco, cd_crmv, url_imagem)
VALUES ('Medico C', '34567890123', '1990-10-10', 'medicoC@email.com', '76543210987', 'senha987', 3, 3, 1003, 'url_imagemMedicoC.jpg');

select * from clinica where nm_clinica = "Clinica C";

select * from medico where nm_medico = "Medico C";

INSERT INTO trabalho (cd_medico, cd_clinica)
VALUES (4, 10);

INSERT INTO trabalho (cd_medico, cd_clinica)
VALUES (5, 11);

DELETE FROM trabalho WHERE cd_medico = 5;

select * from trabalho;


select * from medico where nm_email =  "pedromagro1995@gmail.com";

update medico set nm_email = "pedromagro1995@gmail.com" where id_medico = 3;

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

SELECT * FROM clinica where id_clinica = "7";
SELECT * FROM clinica where cnpj_clinica = "11222333444455";

UPDATE clinica SET email_clinica = "pedromagro1995@gmail.com" where email_clinica = "contato@petcare.com";

SELECT * FROM tutor WHERE nm_email = "pepe@etec.sp";

update tutor set nm_tutor = "Pedro" where nm_email = "pedromagro1995@gmail.com";
update tutor set nm_email = "pedromagro1995@gmail.com" where nm_email = "luana.falcantara@gmail.com";

INSERT INTO raca (nm_raca, tp_raca)
VALUES
    ("BullDog", "dog"),
    ("Pitbull", "dog"),
    ("Beagle", "dog"),
    ("Poodle", "dog"),
    ("Husky", "dog"),
    ("Dachshund", "dog"),
    ("Pug", "dog"),
    ("Shih Tzu", "dog"),
    ("Pastor Alemão", "dog"),
    ("Rottweiler", "dog"),
    ("Labrador", "dog"),
    ("Pinscher", "dog"),
    ("Golden Retriever", "dog"),
    ("Maltes", "dog"),
    ("Chihuahua", "dog"),
    
    ("Persa", "cat"),
    ("Siamês", "cat"),
    ("Maine Coon", "cat"),
    ("Angorá", "cat"),
    ("Sphynx", "cat"),
    ("Ragdoll", "cat"),
    ("Ashera", "cat"),
    ("American Shorthair", "cat"),
    ("Exótico", "cat");

insert into pelagem (tp_pelagem)
values
	("Curto"),
	("Médio"),
	("Grande");
    
insert into animal (nm_animal) values ("cachorro"), ("gato");

insert into sexo (nm_sexo) values ("macho"), ("fêmea");

insert into especialidade (nm_especialidade)
values 
	("Dermatologia"),
    ("Oftalmologia"),
    ("Cardiologia"),
    ("Ortopedia"),
    ("Neurologia"),
    ("Oncologia"),
    ("Anestesiologia"),
    ("Radiologia"),
    ("Nutrição"),
    ("Comportamento Animal"),
    ("Reprodução"),
    ("Odontologia"),
    ("Cirurgião");


insert into vacinas ( nm_vacina, tp_vacina ) 
values 
	("V08", "dog"),
    ("V10", "dog"),
    ("V12", "dog"),
    ("V03", "cat"),
    ("V04", "cat"),
    ("V05", "cat"),
    ("antirrábica", "all"),
    ("leishmaniose", "dog"),
    ("gripe canina", "dog"),
    ("giárdia ", "dog");

insert into dia_semana (nm_dia) 
values 
	("Domingo"),
    ("Segunda-feira"),
    ("Terça-feira"),
    ("Quarta-feira"),
    ("Quinta-feira"),
    ("Sexta-feira"),
    ("Sábado");


insert into tipo_consulta(nm_tipo)
values 
	("consulta - rotina"),
    ("exame geral"),
    ("eletrocardiograma"),
    ("ecocardiograma"),
    ("ultrassonografia"),
    ("hemograma"),
    ("cirurgia"),
    ("consulta - dentista"),
    ("consulta - dermatologista"),
    ("consulta - otorrinolaringologista"),
    ("consulta - oftalmologista");
    

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
