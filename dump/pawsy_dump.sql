DROP DATABASE IF EXISTS PAWSY_DATABASE;

CREATE DATABASE pawsy_database;

USE pawsy_database;

CREATE TABLE IF NOT EXISTS especialidade 
( 
    id_especialidade INT AUTO_INCREMENT,  
    nm_especialidade VARCHAR(255) NOT NULL,
    constraint pk_especialidade primary key (id_especialidade)
);

CREATE TABLE IF NOT EXISTS uf 
( 
    id_uf INT AUTO_INCREMENT PRIMARY KEY,  
    nm_estado VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS cidade 
( 
    id_cidade INT AUTO_INCREMENT PRIMARY KEY,
    id_uf INT,
    nm_cidade VARCHAR(255) NOT NULL,
    CONSTRAINT FOREIGN KEY (id_uf) REFERENCES uf(id_uf)
);

CREATE TABLE IF NOT EXISTS bairro 
( 
    id_bairro INT AUTO_INCREMENT PRIMARY KEY,
    id_cidade INT,
    nm_bairro VARCHAR(255) NOT NULL,
    CONSTRAINT FOREIGN KEY (id_cidade) REFERENCES cidade(id_cidade)
);

CREATE TABLE IF NOT EXISTS endereco 
( 
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,  
    cd_cep CHAR(9) NOT NULL,
    nm_rua VARCHAR(255) NOT NULL,
    num_residencia INT NOT NULL,  
    complemento VARCHAR(255),
    latitude DECIMAL(10, 6) NOT NULL,  
    longitude DECIMAL(10, 6) NOT NULL,
    id_bairro INT,
    CONSTRAINT FOREIGN KEY (id_bairro) REFERENCES bairro(id_bairro)
);

-- A decisão de apenas puxar o bairro na tabela endereco é uma escolha de design para aproveitar o relacionamento entre tabelas e evitar redundância.
-- Ou seja:
-- Um bairro pertence a uma cidade.
-- Uma cidade pertence a um uf (estado).

CREATE TABLE IF NOT EXISTS redes(
	cd_rede int not null auto_increment,
    user_tiktok varchar(64) unique,
    user_insta varchar(64) unique,
    num_whats varchar(13) unique,
    url_facebook varchar(200),
    CONSTRAINT pk_rede PRIMARY KEY (cd_rede)
);

CREATE TABLE IF NOT EXISTS clinica 
( 
 id_clinica INT NOT NULL auto_increment,  
 nm_clinica VARCHAR(255) NOT NULL,  
 cnpj_clinica CHAR(14) NOT NULL,  
 email_clinica VARCHAR(255) NOT NULL,  
 tl_clinica CHAR(11) NOT NULL,  
 pw_clinica VARCHAR(255) NOT NULL,  
 id_endereco INT NOT NULL,  
 cd_crmv INT NOT NULL,  
 url_imagem VARCHAR(300) not null,
 recoveryCode VARCHAR(255),
recoveryCodeExpiry DATETIME,
 ds_sobre varchar(680),
 cd_rede int,
 bl_disabled boolean default(false),
 
 constraint primary key (id_clinica, cd_crmv),  
 UNIQUE (cnpj_clinica,email_clinica,tl_clinica),
 CONSTRAINT fk_endereco
    FOREIGN KEY (id_endereco) 
    REFERENCES endereco (id_endereco),
 CONSTRAINT fk_rede 
	FOREIGN KEY (cd_rede) 
    REFERENCES redes(cd_rede)
);

CREATE TABLE IF NOT EXISTS medico 
( 
 id_medico INT NOT NULL auto_increment,  
 nm_medico VARCHAR(255) NOT NULL,  
 sb_medico VARCHAR(64) NULL,
 cd_cpf CHAR(11) NOT NULL,  
 dt_nascimento DATE NOT NULL,  
 nm_email VARCHAR(255) NOT NULL,  
 num_celular CHAR(11) NOT NULL,  
 pw_medic VARCHAR(255) NOT NULL,  
 id_especialidade INT,
 id_endereco INT,  
 cd_crmv INT NOT NULL,
 bl_disabled boolean default(false),
 url_imagem VARCHAR(300) not null,
	recoveryCode VARCHAR(8) NULL,
	recoveryCodeExpiry DATETIME NULL,
 
 PRIMARY KEY (id_medico, cd_crmv),
 UNIQUE (cd_cpf,nm_email,num_celular),
 CONSTRAINT fk_especialidade
    FOREIGN KEY (id_especialidade)
    REFERENCES especialidade (id_especialidade),
 CONSTRAINT fk_endereco_medico
    FOREIGN KEY (id_endereco)
    REFERENCES endereco (id_endereco)
);

CREATE TABLE IF NOT EXISTS trabalho(
	cd_trabalho int not null auto_increment,
    cd_medico int not null,
    cd_clinica int not null,
    dt_inscricao datetime not null,
    
    CONSTRAINT pk_trabalho PRIMARY KEY (cd_trabalho),
    CONSTRAINT fk_medico FOREIGN KEY ( cd_medico ) REFERENCES medico(id_medico),
    CONSTRAINT fk_clinica FOREIGN KEY ( cd_clinica ) REFERENCES clinica(id_clinica)
);

CREATE TABLE IF NOT EXISTS tutor 
( 
    id_tutor INT AUTO_INCREMENT,  
    nm_tutor VARCHAR(64) NOT NULL,  
    sb_tutor VARCHAR(64),
    cd_cpf CHAR(11) NOT NULL UNIQUE,  
    dt_nascimento DATE NOT NULL,  
    nm_email VARCHAR(255) UNIQUE,  
    num_celular CHAR(11) NOT NULL UNIQUE,  
    pw_tutor VARCHAR(255) NOT NULL,  
    id_endereco INT,  
    url_imagem VARCHAR(300) not null,
    recoveryCode VARCHAR(8),
	recoveryCodeExpiry DATETIME,
    bl_disabled boolean default(false),
    CONSTRAINT pk_tutor PRIMARY KEY (id_tutor),
    CONSTRAINT fk_tutor_endereco
        FOREIGN KEY (id_endereco)
        REFERENCES endereco (id_endereco)
);

CREATE TABLE IF NOT EXISTS comentarios (
	cd_comentario int not null auto_increment,
    ds_comentario varchar(300) not null,
    vl_avaliacao int not null,
    dt_comentario datetime not null,
    id_tutor int not null,
    id_clinica int not null,
    
    CONSTRAINT pk_comentario PRIMARY KEY (cd_comentario),
    CONSTRAINT fk_tutor_comentario 
		FOREIGN KEY (id_tutor) 
        REFERENCES tutor(id_tutor),
	CONSTRAINT fk_clinica_comentario 
		FOREIGN KEY (id_clinica) 
        REFERENCES clinica(id_clinica)
);

CREATE TABLE IF NOT EXISTS raca 
( 
    id_raca INT PRIMARY KEY AUTO_INCREMENT,  
    nm_raca VARCHAR(255) NOT NULL,
    tp_raca VARCHAR(3) NOT NULL
); 

CREATE TABLE IF NOT EXISTS pelagem 
( 
    id_pelagem INT PRIMARY KEY AUTO_INCREMENT,  
    tp_pelagem VARCHAR(255) NOT NULL
); 

CREATE TABLE IF NOT EXISTS sexo 
( 
    id_sexo INT PRIMARY KEY AUTO_INCREMENT,  
    nm_sexo VARCHAR(255) NOT NULL 
); 

CREATE TABLE IF NOT EXISTS animal 
( 
    id_animal INT PRIMARY KEY AUTO_INCREMENT,  
    nm_animal VARCHAR(255) NOT NULL 
);

CREATE TABLE IF NOT EXISTS pet 
( 
    id_pet INT PRIMARY KEY AUTO_INCREMENT,  
    id_tutor INT,
    id_raca INT,
    id_pelagem INT,
    id_sexo INT,
    id_animal INT,
    num_peso DECIMAL(4,2) default 0,  
    dt_nascimento DATE,  
    resumo VARCHAR(255),       
    nm_pet VARCHAR(255) NOT NULL,  
    url_img VARCHAR(300),
    
	tx_alergia VARCHAR(264) default "não informado",
    bl_castrado BOOL,
    tx_comportamento VARCHAR(64) default "não informado",
    tx_tratamento VARCHAR(264) default "não informado",
    num_altura DECIMAL(4,2) default 0,
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

CREATE TABLE IF NOT EXISTS vacinados(
	cd_aplicacao int not null auto_increment,
    cd_pet int not null,
    cd_clinica int not null,
    
    CONSTRAINT pk_aplicacao PRIMARY KEY (cd_aplicacao),
    CONSTRAINT fk_pet 
		FOREIGN KEY (cd_pet) 
        REFERENCES pet(id_pet),
	CONSTRAINT fk_clinica_responsavel FOREIGN KEY ( cd_clinica ) REFERENCES clinica(id_clinica)
);

CREATE TABLE IF NOT EXISTS saude 
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

CREATE TABLE IF NOT EXISTS agenda 
( 
    id_agenda INT PRIMARY KEY AUTO_INCREMENT,  
    id_clinica INT NOT NULL,  
    dt_abertura DATE NOT NULL,  
    dt_fechamento DATE NOT NULL,  
    observacoes VARCHAR(255),  
    nm_agenda VARCHAR(32) NOT NULL,
  	status bool
);

CREATE TABLE IF NOT EXISTS consulta_disponivel 
( 
    id_consulta_disp INT PRIMARY KEY AUTO_INCREMENT,  
    dt_consulta DATE NOT NULL,  
    hr_consulta TIME NOT NULL,
  	status_consulta bool null,
    id_medico INT NOT NULL,
    id_agenda INT NOT NULL,
    CONSTRAINT fk_consulta_disp_medico
        FOREIGN KEY (id_medico)
        REFERENCES medico (id_medico),
    CONSTRAINT fk_consulta_disp_agenda
        FOREIGN KEY (id_agenda)
        REFERENCES agenda (id_agenda)
);

CREATE TABLE IF NOT EXISTS consulta_agendada 
( 
    id_consulta_agendada INT PRIMARY KEY AUTO_INCREMENT,
    id_consulta_disp INT NOT NULL,
    id_pet INT NOT NULL,
    CONSTRAINT fk_consulta_agendada_disp
        FOREIGN KEY (id_consulta_disp)
        REFERENCES consulta_disponivel (id_consulta_disp),
    CONSTRAINT fk_consulta_agendada_pet
        FOREIGN KEY (id_pet)
        REFERENCES pet (id_pet)
);

CREATE TABLE IF NOT EXISTS historico 
( 
    cd_historico INT AUTO_INCREMENT,  
    id_pet INT NOT NULL,  
    descricao VARCHAR(255) NOT NULL,  
    dt_visita DATE NOT NULL,  
    id_clinica INT,
    CONSTRAINT pk_historico PRIMARY KEY (cd_historico),
    CONSTRAINT fk_historico_pet
        FOREIGN KEY (id_pet)
        REFERENCES pet (id_pet),
    CONSTRAINT fk_historico_clinica
        FOREIGN KEY (id_clinica)
        REFERENCES clinica(id_clinica)
);

ALTER TABLE historico ADD 
	COLUMN id_consulta int not null;

ALTER TABLE historico ADD
	FOREIGN KEY (id_consulta) REFERENCES consulta_agendada(id_consulta_agendada);

CREATE TABLE IF NOT EXISTS restricao 
( 
    id_restricao INT PRIMARY KEY AUTO_INCREMENT,  
    dt_restricao DATE NOT NULL,  
    id_agenda INT,
    CONSTRAINT fk_restricao_agenda
        FOREIGN KEY (id_agenda)
        REFERENCES agenda (id_agenda)
);

CREATE TABLE IF NOT EXISTS disponibilidade
( 
    id_disponibilidade INT PRIMARY KEY AUTO_INCREMENT,  
    id_medico INT NOT NULL,
    id_agenda INT NOT NULL,  
    hr_entrada TIME NOT NULL,  
    hr_saida TIME NOT NULL,
    tp_consulta VARCHAR(180) NULL,
    tm_intervalo int not null,
    CONSTRAINT fk_disponibilidade_medico
        FOREIGN KEY (id_medico)
        REFERENCES medico (id_medico),
    CONSTRAINT fk_disponibilidade_agenda
        FOREIGN KEY (id_agenda)
        REFERENCES agenda (id_agenda)
);

CREATE TABLE IF NOT EXISTS dia_semana (
	id_dia int not null auto_increment,
    nm_dia varchar(13) not null,
    CONSTRAINT pk_dia PRIMARY KEY (id_dia)
);

CREATE TABLE IF NOT EXISTS dias_disponiveis 
( 
    id_dia_disponivel INT not null AUTO_INCREMENT,  
    id_disponibilidade INT NOT NULL, 
    id_dia_semana int NOT NULL,
    CONSTRAINT pk_disponivel PRIMARY KEY (id_dia_disponivel),
    CONSTRAINT fk_days_disponibilidade
        FOREIGN KEY (id_disponibilidade)
        REFERENCES disponibilidade (id_disponibilidade),
	CONSTRAINT fk_dia_semana 
		FOREIGN KEY (id_dia_semana)
        REFERENCES dia_semana(id_dia)
);

CREATE TABLE IF NOT EXISTS pacientes 
( 
    id_paciente INT PRIMARY KEY AUTO_INCREMENT,  
    id_pet INT NOT NULL,
    
    id_clinica int not null,
    
    constraint fk_paciente foreign key (id_clinica) references clinica(id_clinica),

    CONSTRAINT fk_pacientes_pet
        FOREIGN KEY (id_pet)
        REFERENCES pet (id_pet)
);

CREATE TABLE IF NOT EXISTS vacinas 
( 
    id_vacina INT auto_increment,  
    nm_vacina VARCHAR(255) NOT NULL,  
    tp_vacina VARCHAR(3) NOT NULL,
    CONSTRAINT pk_vacina primary key (id_vacina)
);

CREATE TABLE IF NOT EXISTS carteira_vacinas 
( 
    id_aplicacao INT PRIMARY KEY AUTO_INCREMENT,  
    dt_aplicacao DATE NOT NULL,  
    id_pet INT NOT NULL,
    id_medico INT NOT NULL,
    dt_retorno DATE NOT NULL,  
    id_vacina INT NOT NULL,
    id_clinica INT NOT NULL,
    
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

CREATE TABLE IF NOT EXISTS carteira_vermifugo 
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

-- Insert na tabela estados
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

-- Insert na tabela raca
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
    ("Raça não definida", "dog"),
    
    ("Persa", "cat"),
    ("Siamês", "cat"),
    ("Maine Coon", "cat"),
    ("Angorá", "cat"),
    ("Sphynx", "cat"),
    ("Ragdoll", "cat"),
    ("Ashera", "cat"),
    ("American Shorthair", "cat"),
    ("Exótico", "cat"),
    ("Raça não definida", "cat");

-- Inserir dados na tabela pelagem
insert into pelagem (tp_pelagem)
values
	("Curto"),
	("Médio"),
	("Grande");

-- Inserir dados na tabela animal
insert into animal (nm_animal) values ("cachorro"), ("gato");

-- Inserir dados na tabela sexo
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

alter user 'root'@'localhost' identified with mysql_native_password by 'password';

ALTER TABLE clinica ADD status_loja boolean; 

CREATE TABLE IF NOT EXISTS tp_receita(
    id_TipoReceita INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nm_TipoReceita VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS tupla_receita(
    id_TuplaReceita INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nm_medicamento VARCHAR(255) NOT NULL,
    concentracao char(4) NOT NULL,
    via_adm varchar(255),
    qtd_medicamento char(4),
    tmp_duracao date,
    posologia varchar(300)
);

CREATE TABLE IF NOT EXISTS RECEITAS(
    id_receita INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    dt_validade DATE NOT NULL ,
    id_TipoReceita INT NOT NULL,
    id_TuplaReceita INT NOT NULL,
    id_pet INT NOT NULL,
    id_medico INT NOT NULL,
    is_valid BOOLEAN,

    CONSTRAINT fk_pet_Receita
        FOREIGN KEY (id_pet)
        REFERENCES pet (id_pet),
    CONSTRAINT fk_TipoReceita_Receita
         FOREIGN KEY (id_TipoReceita)
         REFERENCES tp_receita (id_TipoReceita),
     CONSTRAINT fk_TuplaReceita_Receita
         FOREIGN KEY (id_TuplaReceita)
         REFERENCES tupla_receita (id_TuplaReceita),
	 CONSTRAINT fk_TuplaReceita_Medico
         FOREIGN KEY (id_medico)
         REFERENCES medico (id_medico)
);

insert into tp_receita(nm_TipoReceita)
values
    ('Simples'),
    ('Controle especial'),
    ('Receita azul'),
    ('Receita amarela'),
    ('Receita branca de Talidomida'),
    ('Receita branca de Retinóides');
    
CREATE TABLE IF NOT EXISTS ANUNCIO(
	id_anuncio INT NOT NULL auto_increment primary key,
    nm_anuncio varchar(50) NOT NULL
);

insert into ANUNCIO(nm_anuncio)
values
	('Campanha de vacinação'),
    ('Campanha de castração'),
    ('Doação'),
    ('Promoção');

CREATE TABLE IF NOT EXISTS MARKETING(
	id_marketing INT NOT NULL auto_increment primary key,
    nm_titulo varchar(180) NOT NULL,
    nm_descricao varchar(300) NOT NULL,
    tmp_inicial datetime null,
    tmp_final datetime null,
    img_marketing varchar(300) not null,
    tm_qnt_dias int not null,
    id_anuncio int not null,
    id_clinica int not null,
    CONSTRAINT fk_id_anuncio
        FOREIGN KEY (id_anuncio)
        REFERENCES ANUNCIO (id_anuncio),
	CONSTRAINT fk_id_clinica
        FOREIGN KEY (id_clinica)
        REFERENCES clinica (id_clinica)
);

-- ALTER TABLE pet
-- 	ADD COLUMN tx_alergia VARCHAR(264) default "não informado",
--     ADD COLUMN bl_castrado BOOL,
--     ADD COLUMN tx_comportamento VARCHAR(64) default "não informado",
--     ADD COLUMN tx_tratamento VARCHAR(264) default "não informado",
--     ADD COLUMN num_altura DECIMAL(4,2) default 0,
--     MODIFY COLUMN num_peso DECIMAL(4,2) default 0;
    
ALTER TABLE pet 
	ADD COLUMN passeio DATETIME null;
    
ALTER TABLE receitas
add column dt_emisao date,
DROP FOREIGN KEY fk_TuplaReceita_Receita,
drop column id_tuplaReceita;

ALTER TABLE tupla_receita
add column id_receita int not null,
ADD CONSTRAINT fk_Receita_TuplaReceita
FOREIGN KEY (id_receita)
REFERENCES receitas (id_receita),
modify column tmp_duracao int not null;
