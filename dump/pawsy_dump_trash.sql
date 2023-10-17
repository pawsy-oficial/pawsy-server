###
 NÃO EXECUTAR!!!!!!!!!!!!!!!!!!!!
###
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







-- Inserindo 3 clínicas fictícias:

#INSERT INTO clinica 
#    (nm_clinica, cnpj_clinica, email_clinica, tl_clinica, pw_clinica, id_endereco, cd_crmv, url_imagem, ds_sobre, cd_rede) 
#VALUES 
#    ('PetCare Clínica', '11222333444455', 'contato@petcare.com', '1122334455', 'senha123', 1, 12345, 'http://example.com/1.jpg', 'Clínica especializada em animais exóticos.', 1),

#    ('SaúdePet', '22333444555666', 'atendimento@saudepet.com', '2211334455', 'senha456', 2, 23456, 'http://example.com/2.jpg', 'A melhor clínica para o seu pet!', 2),

#    ('Amigos Animais', '33444555666777', 'info@amigosanimais.com', '3311223344', 'senha789', 3, 34567, 'http://example.com/3.jpg', 'Cuidamos do seu pet como se fosse nosso.', 3);