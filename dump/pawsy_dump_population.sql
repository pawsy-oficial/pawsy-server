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


insert into pacientes (id_pet, id_clinica ) 
values
	(6, 5),
	(1,5),
	(10, 5),
	(16, 5),
	(16, 1),
	(5, 2),
	(1,2),
	(8, 3);

select pt.url_img, pt.nm_pet, tt.nm_tutor from pacientes pc
	inner join pet pt ON pt.id_pet = pc.id_pet
    inner join tutor tt ON tt.id_tutor = pt.id_tutor
	inner join clinica cl ON cl.id_clinica = pc.id_clinica 
		where cl.id_clinica = 5;
    
insert into comentarios (ds_comentario, vl_avaliacao, dt_comentario, id_tutor, id_clinica)
values
	("Excelente atendimento, recomendo!", 5, '2023-07-15', 1, 1),
	("O serviço deixou a desejar, não voltaria.", 2, '2023-08-05', 2, 2),
	("Ótimo lugar para cuidar do meu pet.", 5, '2023-06-22', 3, 3),
	("A clínica precisa melhorar no atendimento ao cliente.", 3, '2023-07-30', 4, 4),
	("Profissionais dedicados e atenciosos.", 5, '2023-07-10', 5, 5),
	("Esperava mais do serviço, não fiquei satisfeito.", 2, '2023-08-01', 6, 6),
	("Atendimento rápido e eficiente.", 4, '2023-05-12', 7, 7),
	("Exames bem detalhados, recomendo!", 5, '2023-08-08', 8, 8),
	("A equipe foi prestativa, mas o ambiente estava bagunçado.", 3, '2023-07-18', 9, 9),
	("Não tive uma boa experiência, falta organização.", 2, '2023-06-05', 10, 10),
	("Médicos muito qualificados e cuidadosos.", 5, '2023-06-30', 1, 1),
	("Achei os preços um pouco altos.", 3, '2023-07-23', 2, 2),
	("Ambiente limpo e bem equipado.", 4, '2023-08-03', 3, 3),
	("Pessoal simpático, mas achei os serviços caros.", 3, '2023-07-27', 4, 4),
	("Minha experiência foi excelente, voltaria com certeza.", 5, '2023-06-15', 5, 5),
	("Deixou a desejar no atendimento ao cliente.", 2, '2023-07-10', 6, 6),
	("Os exames foram esclarecedores, estou satisfeito.", 4, '2023-08-02', 7, 7),
	("Atendimento rápido e prático, recomendo!", 5, '2023-07-20', 8, 8),
	("Médicos competentes, mas tive que esperar muito.", 3, '2023-06-28', 9, 9),
	("Não voltaria, não gostei do serviço prestado.", 1, '2023-07-05', 10, 10);
        
select tt.url_imagem, tt.nm_tutor, cm.ds_comentario from comentarios cm
	inner join tutor tt ON tt.id_tutor = cm.id_tutor
    inner join clinica cn ON cn.id_clinica = cm.id_clinica
    where cn.id_clinica = 10;
    
-- media pontuacao    
select avg(vl_avaliacao) as avaliação, id_clinica from comentarios WHERE id_clinica = 2;

-- cadastro de médicos
INSERT INTO medico (nm_medico, cd_cpf, dt_nascimento, nm_email, num_celular, pw_medic, id_especialidade, id_endereco, cd_crmv, url_imagem)
VALUES
	('Dr. João Silva', '12345678901', '1985-05-10', 'joao.silva@email.com', '1234567890', 'senha1', 1, 1, 12345, 'url_imagem1.jpg'),
	('Dra. Maria Santos', '23456789012', '1990-02-20', 'maria.santos@email.com', '2345678901', 'senha2', 2, 2, 23456, 'url_imagem2.jpg'),
	('Dr. Pedro Oliveira', '34567890123', '1988-09-15', 'pedro.oliveira@email.com', '3456789012', 'senha3', 3, 3, 34567, 'url_imagem3.jpg'),
	('Dra. Ana Rodrigues', '45678901234', '1992-04-08', 'ana.rodrigues@email.com', '4567890123', 'senha4', 4, 4, 45678, 'url_imagem4.jpg'),
	('Dr. Laura Pereira', '56789012345', '1987-11-22', 'laura.pereira@email.com', '5678901234', 'senha5', 5, 5, 56789, 'url_imagem5.jpg'),
	('Dra. Rafael Carvalho', '67890123456', '1995-07-03', 'rafael.carvalho@email.com', '6789012345', 'senha6', 6, 6, 67890, 'url_imagem6.jpg'),
	('Dr. Sofia Fernandes', '78901234567', '1989-03-17', 'sofia.fernandes@email.com', '7890123456', 'senha7', 7, 7, 78901, 'url_imagem7.jpg'),
	('Dra. Lucas Almeida', '89012345678', '1994-08-30', 'lucas.almeida@email.com', '8901234567', 'senha8', 8, 8, 89012, 'url_imagem8.jpg'),
	('Dr. Isabela Nunes', '90123456789', '1986-01-12', 'isabela.nunes@email.com', '9012345678', 'senha9', 9, 9, 90123, 'url_imagem9.jpg'),
	('Dra. Gabriel Costa', '01234567890', '1991-12-25', 'gabriel.costa@email.com', '0123456789', 'senha10', 10, 10, 01234, 'url_imagem10.jpg');
        
insert into trabalho (cd_medico, cd_clinica) 
values 
	(1,1),
    (1,2),
    (2,2),
	(2,3),
    (3,3),
    (3,4),
    (4,4),
    (4,5),
    (5,5),
    (5,6),
    (6,6),
    (6,7);
    
select md.nm_medico, cl.nm_clinica from trabalho tb
	inner join medico md on md.id_medico = tb.cd_medico
    inner join clinica cl on cl.id_clinica = tb.cd_clinica
	where cl.id_clinica = 2;
    
-- cadastro de vacinas
insert into carteira_vacinas (dt_aplicacao, id_pet, id_medico, dt_retorno, id_vacina, id_clinica) 
values
	('2023-07-10', 1, 1, '2023-08-10', 1, 2),
	('2023-06-15', 1, 1, '2023-07-15', 2, 2),
	('2023-06-03', 2, 3, '2023-09-03', 3, 2),
	('2023-07-20', 4, 4, '2023-08-20', 4, 2),
	('2023-06-25', 3, 3, '2023-07-25', 5, 2),
	('2023-07-05', 6, 6, '2023-09-05', 6, 2),
	('2023-06-30', 4, 1, '2023-08-30', 7, 2),
	('2023-07-10', 8, 2, '2023-08-10', 8, 2),
	('2023-06-15', 9, 9, '2023-07-15', 9, 2),
	('2023-07-03', 10, 10, '2023-09-03', 10, 2);
        
-- carteira de vacinacao
select vc.nm_vacina nome_vacina, cv.dt_aplicacao aplicação, cv.dt_retorno retorno, md.nm_medico médico, md.cd_crmv
	from carteira_vacinas cv
		inner join vacinas vc on vc.id_vacina = cv.id_vacina
        inner join medico md on md.id_medico = cv.id_medico
	where cv.id_pet = 10;

-- quantidade de pets vacinados
select 
	(
		select count(an.nm_animal) from carteira_vacinas cv
			inner join pet pt on pt.id_pet = cv.id_pet
			inner join animal an on an.id_animal = pt.id_animal and an.nm_animal = "gato"
			where cv.id_clinica = 2 and date_format(cv.dt_aplicacao, "%Y-%m") = "2023-06"
			group by an.nm_animal
	) gato,
	(
		select count(an.nm_animal) from carteira_vacinas cv
			inner join pet pt on pt.id_pet = cv.id_pet
			inner join animal an on an.id_animal = pt.id_animal and an.nm_animal = "cachorro"
			where cv.id_clinica = 2 and date_format(cv.dt_aplicacao, "%Y-%m") = "2023-06"
			group by an.nm_animal
	) cachorro;

-- cadastro de nova agenda

insert into agenda (id_clinica, dt_abertura, dt_fechamento, observacoes, nm_agenda) 
values 
	(1, "2023-08-10", "2023-08-15", "",  ""),
    (2, "2023-08-10", "2023-08-25", "Consultas exclusivas para gatos", "");
insert into restricao (dt_restricao, id_agenda)
values 
	("2023-08-13", 1),
    ("2023-08-13", 2),
    ("2023-08-20", 2);

insert into disponibilidade ( id_medico, id_agenda, hr_entrada, hr_saida, tp_consulta, tm_intervalo ) 
values 
	(1, 1, "11:00", "18:00", 1, 15),
    (2, 2, "13:30", "20:00", 2, 30);

select * from disponibilidade;

insert into dias_disponiveis ( id_disponibilidade, id_dia_semana ) 
values 
	(1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (2, 2),
    (2, 3),
    (2, 4),
    (2, 5),
    (2, 6),
    (2, 7),
	(2, 2);

-- insert de novas consultas
-- insert into consulta (dt_consulta, hr_consulta, id_pet, id_medico, id_agenda) values ();