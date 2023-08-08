CREATE DATABASE pawsy_dump;

USE pawsy_dump;

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
 PRIMARY KEY (id_clinica, cd_crmv),  
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
 CONSTRAINT fk_endereco
    FOREIGN KEY (id_endereco)
    REFERENCES endereco (id_endereco)
);


