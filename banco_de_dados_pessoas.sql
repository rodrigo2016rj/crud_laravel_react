-- -------------------------------------------------------------------------
-- banco_de_dados_pessoas:

DROP SCHEMA IF EXISTS banco_de_dados_pessoas;

CREATE SCHEMA IF NOT EXISTS banco_de_dados_pessoas 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE banco_de_dados_pessoas;

-- -------------------------------------------------------------------------
-- Tabela setor:

DROP TABLE IF EXISTS setor;

CREATE TABLE IF NOT EXISTS setor(
  pk_setor INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(30) NOT NULL,
  descricao VARCHAR(1000) NOT NULL,
  PRIMARY KEY (pk_setor),
  UNIQUE INDEX nome_UNICA (nome ASC)
)
ENGINE = InnoDB;

-- -------------------------------------------------------------------------
-- Tabela pessoa:

DROP TABLE IF EXISTS pessoa;

CREATE TABLE IF NOT EXISTS pessoa(
  pk_pessoa INT NOT NULL AUTO_INCREMENT,
  fk_setor INT NOT NULL,
  nome VARCHAR(40) NOT NULL,
  sobrenome VARCHAR(160) NOT NULL,
  cpf VARCHAR(14) NOT NULL,
  data_de_nascimento DATE NOT NULL,
  sexo ENUM('masculino', 'feminino') NOT NULL,
  email VARCHAR(160) NOT NULL,
  telefone_fixo VARCHAR(20) NOT NULL DEFAULT '',
  telefone_movel VARCHAR(20) NOT NULL DEFAULT '',
  telefone_estrangeiro VARCHAR(30) NOT NULL DEFAULT '',
  PRIMARY KEY (pk_pessoa),
  INDEX fk_setor_INDICE (fk_setor ASC),
  CONSTRAINT fk_setor_tabela_pessoa
    FOREIGN KEY (fk_setor)
    REFERENCES setor (pk_setor)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  UNIQUE INDEX nome_todo_UNICA (nome ASC, sobrenome ASC),
  UNIQUE INDEX cpf_UNICA (cpf ASC),
  UNIQUE INDEX email_UNICA (email ASC)
)
ENGINE = InnoDB;

-- -------------------------------------------------------------------------
-- Dados de exemplo:

-- Setores:
INSERT INTO setor (nome, descricao) VALUES
('Setor Estratégico', 'Setor responsável pela gestão das tarefas e planejamento estratégico da empresa. Coordena e fiscaliza os demais setores.'),
('Setor Financeiro', 'Setor responsável pelos recursos financeiros da empresa, gerencia contas e impostos. Informa o lucro e o prejuízo das operações realizadas.'),
('Setor Recursos Humanos', 'Setor responsável pelas questões específicas dos funcionários: recrutamentos, treinamentos, horários e benefícios.'),
('Setor Comercial', 'Setor responsável por vender os produtos e os serviços aos clientes e também cuida da relação entre a empresa e eles.'),
('Setor Operacional', 'Setor responsável por confeccionar os produtos e prestar os serviços. Realiza controle de estoque, gestão de recursos materiais e logística.');

-- Pessoas:
INSERT INTO pessoa (fk_setor, nome, sobrenome, cpf, data_de_nascimento, sexo, email, telefone_fixo, telefone_movel, telefone_estrangeiro) VALUES
(1, 'Rodrigo', 'Diniz da Silva Fictício', '999.999.999-01', '1991-09-03', 'masculino', 'rodrigo@emailfalso.rds', '', '', ''),
(2, 'Gabriela', 'Diniz da Silva Fictícia', '999.999.999-02', '1984-12-26', 'feminino', 'gabriela@emailfalso.rds', '', '', ''),
(5, 'Samanta', 'Diniz da Silva Fictícia', '999.999.999-03', '1990-05-30', 'feminino', 'samanta@emailfalso.rds', '', '', ''),
(3, 'Ronaldo', 'Diniz da Silva Fictício', '999.999.999-04', '1992-01-23', 'masculino', 'ronaldo@emailfalso.rds', '', '', ''),
(3, 'Mariano', 'Diniz da Silva Fictício', '999.999.999-05', '1989-04-16', 'masculino', 'mariano@emailfalso.rds', '', '', ''),
(1, 'Breno', 'Diniz da Silva Fictício', '999.999.999-06', '1993-06-06', 'masculino', 'breno@emailfalso.rds', '', '', ''),
(3, 'Laís', 'Diniz da Silva Fictícia', '999.999.999-07', '1991-07-31', 'feminino', 'lais@emailfalso.rds', '', '', ''),
(2, 'Oliver', 'Diniz da Silva Fictício', '999.999.999-08', '1990-02-01', 'masculino', 'oliver@emailfalso.rds', '', '', ''),
(5, 'Daniela', 'Diniz da Silva Fictícia', '999.999.999-09', '1994-02-14', 'feminino', 'daniela@emailfalso.rds', '', '', ''),
(4, 'Ingrid', 'Diniz da Silva Fictícia', '999.999.999-10', '1992-09-01', 'feminino', 'ingrid@emailfalso.rds', '', '', ''),
(2, 'Vanessa', 'Diniz da Silva Fictícia', '999.999.999-11', '1991-08-26', 'feminino', 'vanessa@emailfalso.rds', '', '', ''),
(5, 'Tobias', 'Diniz da Silva Fictício', '999.999.999-12', '1992-04-28', 'masculino', 'tobias@emailfalso.rds', '', '', ''),
(4, 'Juliano', 'Diniz da Silva Fictício', '999.999.999-13', '1988-03-08', 'masculino', 'juliano@emailfalso.rds', '', '', ''),
(5, 'Carmen', 'Diniz da Silva Fictícia', '999.999.999-14', '1993-07-21', 'feminino', 'carmen@emailfalso.rds', '', '', ''),
(3, 'João Pedro', 'Diniz da Silva Fictício', '999.999.999-15', '1994-01-22', 'masculino', 'joaopedro@emailfalso.rds', '', '', ''),
(5, 'Jeremias', 'Diniz da Silva Fictício', '999.999.999-16', '1992-11-05', 'masculino', 'jeremias@emailfalso.rds', '', '', ''),
(4, 'Sabrina', 'Diniz da Silva Fictícia', '999.999.999-17', '1991-12-06', 'feminino', 'sabrina@emailfalso.rds', '', '', ''),
(3, 'Margarida', 'Diniz da Silva Fictícia', '999.999.999-18', '1990-06-20', 'feminino', 'margarida@emailfalso.rds', '', '', ''),
(2, 'Isadora', 'Diniz da Silva Fictícia', '999.999.999-19', '1993-10-08', 'feminino', 'isadora@emailfalso.rds', '', '', ''),
(2, 'Antônio', 'Diniz da Silva Fictício', '999.999.999-20', '1987-12-09', 'masculino', 'antonio@emailfalso.rds', '', '', ''),
(1, 'Cláudia', 'Diniz da Silva Fictícia', '999.999.999-21', '1989-09-30', 'feminino', 'claudia@emailfalso.rds', '', '', ''),
(4, 'Ana Vitória', 'Diniz da Silva Fictícia', '999.999.999-22', '1992-02-17', 'feminino', 'anavitoria@emailfalso.rds', '', '', ''),
(5, 'Rafael', 'Diniz da Silva Fictício', '999.999.999-23', '1990-08-09', 'masculino', 'rafael@emailfalso.rds', '', '', ''),
(4, 'Miguel', 'Diniz da Silva Fictício', '999.999.999-24', '1988-05-15', 'masculino', 'miguel@emailfalso.rds', '', '', ''),
(5, 'Liz', 'Diniz da Silva Fictícia', '999.999.999-25', '1990-03-19', 'feminino', 'liz@emailfalso.rds', '', '', ''),
(5, 'Samuel', 'Diniz da Silva Fictício', '999.999.999-26', '1991-01-27', 'masculino', 'samuel@emailfalso.rds', '', '', ''),
(2, 'Lorenzo', 'Diniz da Silva Fictício', '999.999.999-27', '1994-09-08', 'masculino', 'lorenzo@emailfalso.rds', '', '', ''),
(3, 'Alice', 'Diniz da Silva Fictícia', '999.999.999-28', '1994-01-30', 'feminino', 'alice@emailfalso.rds', '', '', ''),
(4, 'Bruno', 'Diniz da Silva Fictício', '999.999.999-29', '1992-07-01', 'masculino', 'bruno@emailfalso.rds', '', '', ''),
(5, 'Luna', 'Diniz da Silva Fictícia', '999.999.999-30', '1993-09-16', 'feminino', 'luna@emailfalso.rds', '', '', '');
