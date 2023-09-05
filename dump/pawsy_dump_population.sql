-- cadastro novo tutor

select * from bairro;


insert into uf(nm_estado) values
	("AC"),
("AL"),
("AP"),
("AM"),
("BA"),
("CE"),
("DF"),
("ES"),
("GO"),
("MA"),
("MS"),
("MT"),
("MG"),
("PA"),
("PB"),
("PR"),
("PE"),
("PI"),
("RJ"),
("RN"),
("RS"),
("RO"),
("RR"),
	("SC"),
	("SP"),
	("SE"),
	("TO");



insert into cep (cd_cep, nm_cidade, nm_estado, nm_bairro, nm_rua) 
values
	("01000-000", "São Paulo", "SP", "Centro", "Rua A"),
    ("02000-000", "São Paulo", "SP", "Vila B", "Rua B"),
    ("03000-000", "São Paulo", "SP", "Bairro C", "Rua C"),
    ("04000-000", "São Paulo", "SP", "Bairro D", "Rua D"),
    ("05000-000", "São Paulo", "SP", "Vila E", "Rua E"),
    ("06000-000", "São Paulo", "SP", "Vila F", "Rua F"),
    ("07000-000", "São Paulo", "SP", "Bairro G", "Rua G"),
    ("08000-000", "São Paulo", "SP", "Vila H", "Rua H"),
    ("09000-000", "São Paulo", "SP", "Bairro I", "Rua I"),
    ("10000-000", "São Paulo", "SP", "Vila J", "Rua J"),
    ("11000-000", "São Paulo", "SP", "Bairro K", "Rua K"),
    ("12000-000", "São Paulo", "SP", "Vila L", "Rua L"),
    ("13000-000", "São Paulo", "SP", "Bairro M", "Rua M"),
    ("14000-000", "São Paulo", "SP", "Vila N", "Rua N"),
    ("15000-000", "São Paulo", "SP", "Bairro O", "Rua O");
    
insert into endereco (cd_cep, num_residencia, complemento, latitude, longitude) 
values
	("01000-000", "123", "Apto 101", "12.3456", "-45.6789"),
    ("02000-000", "456", "Casa", "12.3456", "-45.6789"),
    ("03000-000", "789", "Sala 2", "12.3456", "-45.6789"),
    ("06000-000", "80", "SP", "12.3456", "-45.6789"),
    ("07000-000", "84", "SP", "12.3456", "-45.6789"),
    ("08000-000", "532", "SP", "12.3456", "-45.6789"),
    ("09000-000", "4532", "SP", "12.3456", "-45.6789"),
    ("10000-000", "234", "SP", "12.3456", "-45.6789"),
    ("11000-000", "32", "SP", "12.3456", "-45.6789"),
    ("12000-000", "346", "SP", "12.3456", "-45.6789"),
    ("13000-000", "921", "SP", "12.3456", "-45.6789"),
    ("14000-000", "669", "SP", "12.3456", "-45.6789"),
    ("15000-000", "13", "SP", "12.3456", "-45.6789");

insert into tutor (nm_tutor, cd_cpf, dt_nascimento, nm_email, num_celular, pw_tutor, id_endereco, url_imagem) 
values 
	("Tutor 1", "12345678901", "1990-01-01", "tutor1@email.com", "1234567890", "senha1", 1, "https://pawsy.com/caminho/imagem/tutor.jpg"),
    ("Tutor 2", "23456789012", "1985-02-15", "tutor2@email.com", "2345678901", "senha2", 2, "https://pawsy.com/caminho/imagem/tutor.jpg"),
    ("Tutor 3", "34567890123", "1992-07-20", "tutor3@email.com", "3456789012", "senha3", 3, "https://pawsy.com/caminho/imagem/tutor.jpg"),
    ("Tutor 4", "45678901234", "1988-11-10", "tutor4@email.com", "4567890123", "senha4", 1, "https://pawsy.com/caminho/imagem/tutor.jpg"),
    ("Tutor 5", "56789012345", "1995-06-05", "tutor5@email.com", "5678901234", "senha5", 2, "https://pawsy.com/caminho/imagem/tutor.jpg"),
    ("Tutor 6", "67890123456", "1983-03-25", "tutor6@email.com", "6789012345", "senha6", 3, "https://pawsy.com/caminho/imagem/tutor.jpg"),
    ("Tutor 7", "78901234567", "1991-09-15", "tutor7@email.com", "7890123456", "senha7", 1, "https://pawsy.com/caminho/imagem/tutor.jpg"),
    ("Tutor 8", "89012345678", "1987-04-30", "tutor8@email.com", "8901234567", "senha8", 2, "https://pawsy.com/caminho/imagem/tutor.jpg"),
    ("Tutor 9", "90123456789", "1994-08-12", "tutor9@email.com", "9012345678", "senha9", 3, "https://pawsy.com/caminho/imagem/tutor.jpg"),
    ("Tutor 10", "01234567890", "1980-12-03", "tutor10@email.com", "0123456789", "senha10", 1, "https://pawsy.com/caminho/imagem/tutor.jpg");
    
    
select tt.nm_tutor, tt.cd_cpf, tt.dt_nascimento, tt.nm_email, tt.num_celular, tt.pw_tutor, CONCAT(cp.nm_rua, ", ",en.num_residencia, " " ,en.complemento) as endereco, tt.url_imagem from tutor tt 
	inner join endereco en ON tt.id_endereco = en.id_endereco
	inner join cep cp ON cp.cd_cep = en.cd_cep;

-- cadastro novo pet

insert into pet (id_tutor, id_raca, id_pelagem, id_sexo, id_animal, num_peso, dt_nascimento, resumo, nm_pet, url_img ) 
values 
	(1, 1, 1, 1, 1, 15.5, '2019-05-15', 'Cachorro brincalhão', 'Rex', 'https://pawsy.com/url_imagem1.jpg'),
	(2, 2, 2, 2, 2, 8.2, '2020-02-28', 'Gato tranquilo', 'Whiskers', 'https://pawsy.com/url_imagem2.jpg'),
	(3, 3, 1, 1, 1, 25.0, '2018-08-10', 'Cachorro ativo', 'Max', 'https://pawsy.com/url_imagem3.jpg'),
	(4, 4, 3, 2, 2, 4.5, '2021-01-10', 'Gato brincalhão', 'Luna', 'https://pawsy.com/url_imagem4.jpg'),
	(5, 5, 2, 1, 1, 18.7, '2017-11-22', 'Cachorro leal', 'Buddy', 'https://pawsy.com/url_imagem5.jpg'),
	(6, 6, 3, 2, 2, 6.0, '2020-07-03', 'Gato curioso', 'Oliver', 'https://pawsy.com/url_imagem6.jpg'),
	(7, 7, 1, 1, 1, 12.3, '2019-03-17', 'Cachorro amoroso', 'Bailey', 'https://pawsy.com/url_imagem7.jpg'),
	(8, 8, 2, 2, 2, 5.8, '2021-04-25', 'Gato afetuoso', 'Milo', 'https://pawsy.com/url_imagem8.jpg'),
	(9, 9, 3, 1, 1, 23.5, '2018-09-08', 'Cachorro protetor', 'Charlie', 'https://pawsy.com/url_imagem9.jpg'),
	(1, 10, 1, 2, 2, 7.0, '2020-11-14', 'Gato independente', 'Sophie', 'https://pawsy.com/url_imagem10.jpg'),
	(2, 11, 2, 1, 1, 19.2, '2017-12-30', 'Cachorro energético', 'Rocky', 'https://pawsy.com/url_imagem11.jpg'),
	(3, 12, 3, 2, 2, 4.2, '2021-03-08', 'Gato carinhoso', 'Chloe', 'https://pawsy.com/url_imagem12.jpg'),
	(3, 13, 1, 1, 1, 16.8, '2019-08-03', 'Cachorro bravo', 'Zeus', 'https://pawsy.com/url_imagem13.jpg'),
	(4, 14, 2, 2, 2, 5.5, '2020-06-20', 'Gato sociável', 'Lily', 'https://pawsy.com/url_imagem14.jpg'),
	(5, 15, 3, 1, 1, 22.0, '2018-01-05', 'Cachorro dócil', 'Coco', 'https://pawsy.com/url_imagem15.jpg'),
	(5, 16, 3, 1, 1, 22.0, '2018-01-05', 'Gato dócil', 'Flor', 'https://pawsy.com/url_imagem15.jpg');
        
select pt.nm_pet, pt.url_img, pt.resumo, pt.dt_nascimento, pt.num_peso, an.nm_animal, sx.nm_sexo, pl.tp_pelagem, rc.nm_raca, tt.nm_tutor from pet pt
	inner join animal an ON an.id_animal = pt.id_animal
    inner join sexo sx ON sx.id_sexo = pt.id_sexo
    inner join pelagem pl ON pl.id_pelagem = pt.id_pelagem
    inner join raca rc ON rc.id_raca = pt.id_raca
    inner join tutor tt ON tt.id_tutor = pt.id_tutor;

-- cadastro nova clinica

insert into redes (user_tiktok, user_insta, num_whats, url_facebook) 
values 
	("@tiktokuser1", "@instauser1", "1234567890", "https://www.facebook.com/page1"),
    ("@tiktokuser2", "@instauser2", "2345678901", "https://www.facebook.com/page2"),
    ("@tiktokuser3", "@instauser3", "3456789012", "https://www.facebook.com/page3"),
    ("@tiktokuser4", "@instauser4", "4567890123", "https://www.facebook.com/page4"),
    ("@tiktokuser5", "@instauser5", "5678901234", "https://www.facebook.com/page5"),
    ("@tiktokuser6", "@instauser6", "6789012345", "https://www.facebook.com/page6"),
    ("@tiktokuser7", "@instauser7", "7890123456", "https://www.facebook.com/page7"),
    ("@tiktokuser8", "@instauser8", "8901234567", "https://www.facebook.com/page8"),
    ("@tiktokuser9", "@instauser9", "9012345678", "https://www.facebook.com/page9"),
    ("@tiktokuser10", "@instauser10", "0123456789", "https://www.facebook.com/page10");

insert into clinica (nm_clinica, cnpj_clinica, email_clinica, tl_clinica, pw_clinica, id_endereco, cd_crmv, url_imagem, ds_sobre, cd_rede) 
values
	("Clínica VetCare", "12345678901234", "contato@vetcare.com", "1234567890", "senha1", 1, "12345", "url_imagem1.jpg", "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni officia recusandae inventore dolorem est eligendi aliquam totam beatae labore dignissimos cumque hic magnam id nobis ut quae, earum facilis praesentium! Earum officia mollitia at eius hic inventore nulla vitae officiis velit beatae aspernatur et, quo veniam dolore dignissimos consequatur. Harum eius eligendi, expedita iusto doloribus quod inventore sapiente numquam obcaecati.Sed fugit similique dolore impedit cumque quaerat amet, repudiandae libero, ut ratione natus, culpa eligendi provident incidunt iste harum dignissimos nobis. Aliquid ipsa laborum quis molestiae illo quidem atque beatae!", 1),
	("Clínica PetHealth", "23456789012345", "atendimento@pethealth.com", "2345678901", "senha2", 2, "23456", "url_imagem2.jpg", "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni officia recusandae inventore dolorem est eligendi aliquam totam beatae labore dignissimos cumque hic magnam id nobis ut quae, earum facilis praesentium! Earum officia mollitia at eius hic inventore nulla vitae officiis velit beatae aspernatur et, quo veniam dolore dignissimos consequatur. Harum eius eligendi, expedita iusto doloribus quod inventore sapiente numquam obcaecati.Sed fugit similique dolore impedit cumque quaerat amet, repudiandae libero, ut ratione natus, culpa eligendi provident incidunt iste harum dignissimos nobis. Aliquid ipsa laborum quis molestiae illo quidem atque beatae!", 2),
	("Clínica AnimalCare", "34567890123456", "suporte@animalcare.com", "3456789012", "senha3", 3, "34567", "url_imagem3.jpg", "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni officia recusandae inventore dolorem est eligendi aliquam totam beatae labore dignissimos cumque hic magnam id nobis ut quae, earum facilis praesentium! Earum officia mollitia at eius hic inventore nulla vitae officiis velit beatae aspernatur et, quo veniam dolore dignissimos consequatur. Harum eius eligendi, expedita iusto doloribus quod inventore sapiente numquam obcaecati.Sed fugit similique dolore impedit cumque quaerat amet, repudiandae libero, ut ratione natus, culpa eligendi provident incidunt iste harum dignissimos nobis. Aliquid ipsa laborum quis molestiae illo quidem atque beatae!", 3),
	("Clínica VetWorld", "45678901234567", "info@vetworld.com", "4567890123", "senha4", 4, "45678", "url_imagem4.jpg", "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni officia recusandae inventore dolorem est eligendi aliquam totam beatae labore dignissimos cumque hic magnam id nobis ut quae, earum facilis praesentium! Earum officia mollitia at eius hic inventore nulla vitae officiis velit beatae aspernatur et, quo veniam dolore dignissimos consequatur. Harum eius eligendi, expedita iusto doloribus quod inventore sapiente numquam obcaecati.Sed fugit similique dolore impedit cumque quaerat amet, repudiandae libero, ut ratione natus, culpa eligendi provident incidunt iste harum dignissimos nobis. Aliquid ipsa laborum quis molestiae illo quidem atque beatae!", 4),
	("Clínica PetClinic", "56789012345678", "contato@petclinic.com", "5678901234", "senha5", 5, "56789", "url_imagem5.jpg", "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni officia recusandae inventore dolorem est eligendi aliquam totam beatae labore dignissimos cumque hic magnam id nobis ut quae, earum facilis praesentium! Earum officia mollitia at eius hic inventore nulla vitae officiis velit beatae aspernatur et, quo veniam dolore dignissimos consequatur. Harum eius eligendi, expedita iusto doloribus quod inventore sapiente numquam obcaecati.Sed fugit similique dolore impedit cumque quaerat amet, repudiandae libero, ut ratione natus, culpa eligendi provident incidunt iste harum dignissimos nobis. Aliquid ipsa laborum quis molestiae illo quidem atque beatae!", 5),
	("Clínica AnimalMed", "67890123456789", "atendimento@animalmed.com", "6789012345", "senha6", 6, "67890", "url_imagem6.jpg", "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni officia recusandae inventore dolorem est eligendi aliquam totam beatae labore dignissimos cumque hic magnam id nobis ut quae, earum facilis praesentium! Earum officia mollitia at eius hic inventore nulla vitae officiis velit beatae aspernatur et, quo veniam dolore dignissimos consequatur. Harum eius eligendi, expedita iusto doloribus quod inventore sapiente numquam obcaecati.Sed fugit similique dolore impedit cumque quaerat amet, repudiandae libero, ut ratione natus, culpa eligendi provident incidunt iste harum dignissimos nobis. Aliquid ipsa laborum quis molestiae illo quidem atque beatae!", 6),
	("Clínica VetLife", "78901234567890", "suporte@vetlife.com", "7890123456", "senha7", 7, "78901", "url_imagem7.jpg", "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni officia recusandae inventore dolorem est eligendi aliquam totam beatae labore dignissimos cumque hic magnam id nobis ut quae, earum facilis praesentium! Earum officia mollitia at eius hic inventore nulla vitae officiis velit beatae aspernatur et, quo veniam dolore dignissimos consequatur. Harum eius eligendi, expedita iusto doloribus quod inventore sapiente numquam obcaecati.Sed fugit similique dolore impedit cumque quaerat amet, repudiandae libero, ut ratione natus, culpa eligendi provident incidunt iste harum dignissimos nobis. Aliquid ipsa laborum quis molestiae illo quidem atque beatae!", 7),
	("Clínica PetCure", "89012345678901", "info@petcure.com", "8901234567", "senha8", 8, "89012", "url_imagem8.jpg", "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni officia recusandae inventore dolorem est eligendi aliquam totam beatae labore dignissimos cumque hic magnam id nobis ut quae, earum facilis praesentium! Earum officia mollitia at eius hic inventore nulla vitae officiis velit beatae aspernatur et, quo veniam dolore dignissimos consequatur. Harum eius eligendi, expedita iusto doloribus quod inventore sapiente numquam obcaecati.Sed fugit similique dolore impedit cumque quaerat amet, repudiandae libero, ut ratione natus, culpa eligendi provident incidunt iste harum dignissimos nobis. Aliquid ipsa laborum quis molestiae illo quidem atque beatae!", 8),
	("Clínica AnimalVet", "90123456789012", "contato@animalvet.com", "9012345678", "senha9", 9, "90123", "url_imagem9.jpg", "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni officia recusandae inventore dolorem est eligendi aliquam totam beatae labore dignissimos cumque hic magnam id nobis ut quae, earum facilis praesentium! Earum officia mollitia at eius hic inventore nulla vitae officiis velit beatae aspernatur et, quo veniam dolore dignissimos consequatur. Harum eius eligendi, expedita iusto doloribus quod inventore sapiente numquam obcaecati.Sed fugit similique dolore impedit cumque quaerat amet, repudiandae libero, ut ratione natus, culpa eligendi provident incidunt iste harum dignissimos nobis. Aliquid ipsa laborum quis molestiae illo quidem atque beatae!", 9),
	("Clínica VetExpert", "01234567890123", "atendimento@vetexpert.com", "0123456789", "senha10", 10, "01234", "url_imagem10.jpg", "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni officia recusandae inventore dolorem est eligendi aliquam totam beatae labore dignissimos cumque hic magnam id nobis ut quae, earum facilis praesentium! Earum officia mollitia at eius hic inventore nulla vitae officiis velit beatae aspernatur et, quo veniam dolore dignissimos consequatur. Harum eius eligendi, expedita iusto doloribus quod inventore sapiente numquam obcaecati.Sed fugit similique dolore impedit cumque quaerat amet, repudiandae libero, ut ratione natus, culpa eligendi provident incidunt iste harum dignissimos nobis. Aliquid ipsa laborum quis molestiae illo quidem atque beatae!", 10);

-- cadatro pacientes

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