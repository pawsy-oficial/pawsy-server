-- cadastro novo tutor

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

select * from cep;  

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

insert into clinica (nm_clinica, cnpj_clinica, email_clinica, tl_clinica, pw_clinica, id_endereco, cd_crmv, url_imagem) values ();