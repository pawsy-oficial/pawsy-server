SET SQL_SAFE_UPDATES = 1;

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

SELECT * FROM tutor WHERE nm_email = "pedromagro1995@gmail.com";

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
