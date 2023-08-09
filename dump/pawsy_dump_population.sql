-- cadastro novo tutor

insert into cep (cd_cep, nm_cidade, nm_estado, nm_bairro, nm_rua) 
values
	("01000000", "São Paulo", "SP", "Centro", "Rua A"),
    ("02000000", "São Paulo", "SP", "Vila B", "Rua B"),
    ("03000000", "São Paulo", "SP", "Bairro C", "Rua C"),
    ("04000000", "São Paulo", "SP", "Bairro D", "Rua D"),
    ("05000000", "São Paulo", "SP", "Vila E", "Rua E");
insert into endereco (cd_cep, num_residencia, complemento, latitude, longitude) 
values
	("01000000", "123", "Apto 101", "12.3456", "-45.6789"),
    ("02000000", "456", "Casa", "12.3456", "-45.6789"),
    ("03000000", "789", "Sala 2", "12.3456", "-45.6789");
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
	inner join cep cp ON cp.cd_cep = en.cd_cep
    where tt.id_tutor = 4;
    

