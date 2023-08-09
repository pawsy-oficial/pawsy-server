CREATE DATABASE pawsy_database;

USE pawsy_database;

CREATE TABLE especialidade 
( 
    id_especialidade INT AUTO_INCREMENT,  
    nm_especialidade VARCHAR(255) NOT NULL,
    constraint pk_especialidade primary key (id_especialidade)
);

CREATE TABLE cep 
( 
    cd_cep char(8),  
    nm_cidade VARCHAR(255) NOT NULL,  
    nm_estado VARCHAR(255) NOT NULL,  
    nm_bairro VARCHAR(255) NOT NULL,  
    nm_rua VARCHAR(255) NOT NULL,
    constraint pk_cep primary key (cd_cep)
); 

CREATE TABLE endereco 
( 
    id_endereco INT AUTO_INCREMENT,  
    cd_cep char(8),  
    num_residencia INT NOT NULL,  
    complemento VARCHAR(255),  
    latitude DECIMAL(10, 6) NOT NULL,  
    longitude DECIMAL(10, 6) NOT NULL,
    CONSTRAINT pk_endereco PRIMARY KEY (id_endereco),
    CONSTRAINT FOREIGN KEY (cd_cep) REFERENCES cep(cd_cep)
); 

CREATE TABLE clinica 
( 
 id_clinica INT NOT NULL,  
 nm_clinica VARCHAR(255) NOT NULL,  
 cnpj_clinica CHAR(14) NOT NULL,  
 email_clinica VARCHAR(255) NOT NULL,  
 tl_clinica CHAR(11) NOT NULL,  
 pw_clinica VARCHAR(255) NOT NULL,  
 id_endereco INT NOT NULL,  
 cd_crmv INT NOT NULL,  
 constraint primary key (id_clinica, cd_crmv),  
 UNIQUE (cnpj_clinica,email_clinica,tl_clinica),
 CONSTRAINT fk_endereco
    FOREIGN KEY (id_endereco) 
    REFERENCES endereco (id_endereco)
);

CREATE TABLE medico 
( 
 id_medico INT NOT NULL,  
 nm_medico VARCHAR(255) NOT NULL,  
 cd_cpf CHAR(11) NOT NULL,  
 dt_nascimento DATE NOT NULL,  
 nm_email VARCHAR(255) NOT NULL,  
 num_celular CHAR(11) NOT NULL,  
 pw_medic VARCHAR(255) NOT NULL,  
 id_especialidade INT,
 id_endereco INT,  
 cd_crmv INT NOT NULL,
 PRIMARY KEY (id_medico, cd_crmv),
 UNIQUE (cd_cpf,nm_email,num_celular),
 CONSTRAINT fk_especialidade
    FOREIGN KEY (id_especialidade)
    REFERENCES especialidade (id_especialidade),
 CONSTRAINT fk_endereco_medico
    FOREIGN KEY (id_endereco)
    REFERENCES endereco (id_endereco)
);

CREATE TABLE tutor 
( 
    id_tutor INT AUTO_INCREMENT,  
    nm_tutor VARCHAR(255) NOT NULL,  
    cd_cpf CHAR(11) NOT NULL UNIQUE,  
    dt_nascimento DATE NOT NULL,  
    nm_email VARCHAR(255) UNIQUE,  
    num_celular CHAR(11) NOT NULL UNIQUE,  
    pw_tutor VARCHAR(255) NOT NULL,  
    id_endereco INT,  
    CONSTRAINT pk_tutor PRIMARY KEY (id_tutor),
    CONSTRAINT fk_tutor_endereco
        FOREIGN KEY (id_endereco)
        REFERENCES endereco (id_endereco)
);

CREATE TABLE raca 
( 
    id_raca INT PRIMARY KEY AUTO_INCREMENT,  
    nm_raca VARCHAR(255) NOT NULL,
    tp_raca VARCHAR(3) NOT NULL
); 

CREATE TABLE pelagem 
( 
    id_pelagem INT PRIMARY KEY AUTO_INCREMENT,  
    nm_pelagem VARCHAR(255) NOT NULL
); 

CREATE TABLE sexo 
( 
    id_sexo INT PRIMARY KEY AUTO_INCREMENT,  
    nm_sexo VARCHAR(255) NOT NULL 
); 

CREATE TABLE animal 
( 
    id_animal INT PRIMARY KEY AUTO_INCREMENT,  
    nm_animal VARCHAR(255) NOT NULL 
);

CREATE TABLE pet 
( 
    id_pet INT PRIMARY KEY AUTO_INCREMENT,  
    id_tutor INT,  
    id_raca INT,  
    id_pelagem INT,  
    id_sexo INT,  
    id_animal INT,  
    num_peso INT,  
    dt_nascimento DATE,  
    resumo INT,  
    img_pet VARCHAR(255),  
    nm_pet VARCHAR(255) NOT NULL,  
    url_img VARCHAR(255),
    CONSTRAINT fk_pet_tutor
        FOREIGN KEY (id_tutor)
        REFERENCES tutor (id_tutor),
    CONSTRAINT fk_pet_raca
        FOREIGN KEY (id_raca)
			REFERENCES raca(id_raca),
    CONSTRAINT fk_pet_pelagem
        FOREIGN KEY (id_pelagem)
			REFERENCES pelagem(id_pelagem), 
    CONSTRAINT fk_pet_sexo
        FOREIGN KEY (id_sexo)
			REFERENCES sexo(id_sexo),  
    CONSTRAINT fk_pet_animal
        FOREIGN KEY (id_animal)
			REFERENCES animal(id_animal) 
);

CREATE TABLE saude 
( 
    id_saude INT PRIMARY KEY AUTO_INCREMENT,  
    id_pet INT NOT NULL,  
    bool_alergia boolean NOT NULL,
    desc_alergia varchar(255),
    bool_castrado boolean NOT NULL,  
    bool_tratamento boolean NOT NULL,
    desc_tratamento varchar(255),
    tp_comportamento VARCHAR(255) NOT NULL,  
    status VARCHAR(255) NOT NULL,
    CONSTRAINT fk_saude_pet
        FOREIGN KEY (id_pet)
        REFERENCES pet (id_pet)
); 

CREATE TABLE consulta 
( 
    id_consulta INT PRIMARY KEY AUTO_INCREMENT,  
    dt_consulta DATE NOT NULL,  
    hr_consulta TIME NOT NULL,
    id_pet INT NOT NULL,
    id_medico INT NOT NULL,
    CONSTRAINT fk_consulta_pet
        FOREIGN KEY (id_pet)
        REFERENCES pet (id_pet),
    CONSTRAINT fk_consulta_medico
        FOREIGN KEY (id_medico)
        REFERENCES medico (id_medico)
);

CREATE TABLE agenda 
( 
    id_agenda INT PRIMARY KEY AUTO_INCREMENT,  
    id_clinica INT NOT NULL,  
    dt_abertura DATE NOT NULL,  
    dt_fechamento DATE NOT NULL,  
    observacoes VARCHAR(255),  
    id_consulta INT,
    nm_agenda VARCHAR(255) NOT NULL,
    CONSTRAINT fk_agenda_consulta
        FOREIGN KEY (id_consulta)
        REFERENCES consulta (id_consulta)
);

CREATE TABLE historico 
( 
    cd_historico INT PRIMARY KEY AUTO_INCREMENT,  
    id_pet INT NOT NULL,  
    descricao VARCHAR(255) NOT NULL,  
    dt_visita DATE NOT NULL,  
    id_clinica INT,
    CONSTRAINT fk_historico_pet
        FOREIGN KEY (id_pet)
        REFERENCES pet (id_pet),
    CONSTRAINT fk_historico_clinica
        FOREIGN KEY (id_clinica)
        REFERENCES clinica(id_clinica)
);

CREATE TABLE restricao 
( 
    id_restricao INT PRIMARY KEY AUTO_INCREMENT,  
    dt_restricao DATE NOT NULL,  
    id_agenda INT,
    CONSTRAINT fk_restricao_agenda
        FOREIGN KEY (id_agenda)
        REFERENCES agenda (id_agenda)
);

CREATE TABLE medicos_disponiveis 
( 
    id_disponibilidade INT PRIMARY KEY AUTO_INCREMENT,  
    id_medico INT NOT NULL,
    id_agenda INT NOT NULL,  
    time_entrada TIME NOT NULL,  
    time_saida TIME NOT NULL,
    CONSTRAINT fk_disponibilidade_medico
        FOREIGN KEY (id_medico)
        REFERENCES medico (id_medico),
    CONSTRAINT fk_disponibilidade_agenda
        FOREIGN KEY (id_agenda)
        REFERENCES agenda (id_agenda)
);

CREATE TABLE dias_semanais 
( 
    id_days INT PRIMARY KEY AUTO_INCREMENT,  
    id_disponibilidade INT NOT NULL, 
    dia_semana VARCHAR(255) NOT NULL,
    CONSTRAINT fk_days_disponibilidade
        FOREIGN KEY (id_disponibilidade)
        REFERENCES medicos_disponiveis (id_disponibilidade)
);

CREATE TABLE pacientes 
( 
    id_paciente INT PRIMARY KEY AUTO_INCREMENT,  
    id_tutor INT NOT NULL, 
    id_pet INT NOT NULL,
    CONSTRAINT fk_pacientes_tutor
        FOREIGN KEY (id_tutor)
        REFERENCES tutor (id_tutor),
    CONSTRAINT fk_pacientes_pet
        FOREIGN KEY (id_pet)
        REFERENCES pet (id_pet)
);

CREATE TABLE vacinas 
( 
    id_vacina INT auto_increment,  
    nm_vacina VARCHAR(255) NOT NULL,  
    tp_vacina VARCHAR(3) NOT NULL,
    CONSTRAINT pk_vacina primary key (id_vacina)
);

CREATE TABLE carteira_vacinas 
( 
    id_aplicacao INT PRIMARY KEY AUTO_INCREMENT,  
    dt_aplicacao DATE NOT NULL,  
    id_pet INT NOT NULL,
    id_medico INT NOT NULL,
    dt_retorno DATE NOT NULL,  
    id_vacina INT NOT NULL,
    CONSTRAINT fk_carteira_vacinas_pet
        FOREIGN KEY (id_pet)
        REFERENCES pet (id_pet),
    CONSTRAINT fk_carteira_vacinas_medico
        FOREIGN KEY (id_medico)
        REFERENCES medico (id_medico),
    CONSTRAINT fk_carteira_vacinas_vacina
        FOREIGN KEY (id_vacina)
        REFERENCES vacinas (id_vacina)
);

CREATE TABLE carteira_vermifugo 
( 
    id_aplicacao INT PRIMARY KEY AUTO_INCREMENT,  
    id_pet INT NOT NULL, 
    id_medico INT NOT NULL, 
    nm_vermifugo VARCHAR(255) NOT NULL,  
    dt_aplicacao DATE NOT NULL,
    CONSTRAINT fk_carteira_vermifugo_pet
        FOREIGN KEY (id_pet)
        REFERENCES pet (id_pet),
    CONSTRAINT fk_carteira_vermifugo_medico
        FOREIGN KEY (id_medico)
        REFERENCES medico (id_medico)
);


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

insert into pelagem (nm_pelagem)
values
	("Curto"),
	("Médio"),
	("Grande");
    
insert into animal (nm_animal) values ("cachorro"), ("gato");

insert into sexo (nm_sexo) values ("macho"), ("fêmea");

insert into especialidade (nm_especialidade)
values ("Dermatologia"),
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

