-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23/11/2025 às 18:27
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sange`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `avulso`
--

CREATE TABLE `avulso` (
  `avuCodigo` int(11) NOT NULL,
  `avuSesCodigo` int(11) NOT NULL,
  `avuDtConsulta` date DEFAULT NULL,
  `avuHorario` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `consulta`
--

CREATE TABLE `consulta` (
  `conCodigo` int(11) NOT NULL,
  `conDiaCodigo` int(11) NOT NULL,
  `conDiaAgendado` date DEFAULT NULL,
  `conStatusDiaAgendado` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `diahoraagendado`
--

CREATE TABLE `diahoraagendado` (
  `diaCodigo` int(11) NOT NULL,
  `diaSesCodigo` int(11) NOT NULL,
  `diaSegunda` tinyint(1) DEFAULT NULL,
  `diaTerca` tinyint(1) DEFAULT NULL,
  `diaQuarta` tinyint(1) DEFAULT NULL,
  `diaQuinta` tinyint(1) DEFAULT NULL,
  `diaSexta` tinyint(1) DEFAULT NULL,
  `diaQtdSessao` int(11) DEFAULT NULL,
  `diaTotalSessao` int(11) DEFAULT NULL,
  `diaHorario` time DEFAULT NULL,
  `diaDtInicioSessao` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `endereco`
--

CREATE TABLE `endereco` (
  `endCodigo` int(11) NOT NULL,
  `endPacCodigo` int(11) NOT NULL,
  `endCEP` int(11) DEFAULT NULL,
  `endBairro` varchar(255) DEFAULT NULL,
  `endRua` varchar(255) DEFAULT NULL,
  `endCidade` varchar(255) DEFAULT NULL,
  `endNumero` int(11) DEFAULT NULL,
  `endComplemento` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `examefisico`
--

CREATE TABLE `examefisico` (
  `exaCodigo` int(11) NOT NULL,
  `exaSesCodigo` int(11) NOT NULL,
  `exaPA` varchar(255) DEFAULT NULL,
  `exaFR` varchar(255) DEFAULT NULL,
  `exaFC` varchar(255) DEFAULT NULL,
  `exaInspecao` varchar(255) DEFAULT NULL,
  `exaPalpacao` varchar(255) DEFAULT NULL,
  `exaDorPalpacao` tinyint(1) DEFAULT NULL,
  `exaDorPalpacaoDesc` varchar(255) DEFAULT NULL,
  `exaEdema` tinyint(1) DEFAULT NULL,
  `exaEdemaDesc` varchar(255) DEFAULT NULL,
  `exaTestesEspecificos` varchar(255) DEFAULT NULL,
  `exaADM` tinyint(1) DEFAULT NULL,
  `exaADMDesc` varchar(255) DEFAULT NULL,
  `exaFM` tinyint(1) DEFAULT NULL,
  `exaFMDesc` varchar(255) DEFAULT NULL,
  `exaTonusMuscular` int(1) DEFAULT NULL,
  `exaTonusMuscularDesc` varchar(255) DEFAULT NULL,
  `exaMovimento` int(1) DEFAULT NULL,
  `exaFazUsoOrtese` tinyint(1) DEFAULT NULL,
  `exaFazUsoOrteseDesc` varchar(255) DEFAULT NULL,
  `exaDesviosPosturais` tinyint(1) DEFAULT NULL,
  `exaDesviosPosturaisDesc` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `paciente`
--

CREATE TABLE `paciente` (
  `pacCodigo` int(11) NOT NULL,
  `pacNumCarteirinha` varchar(255) DEFAULT NULL,
  `pacTipoConvenio` varchar(255) NOT NULL,
  `pacDesativado` tinyint(1) DEFAULT NULL,
  `pacDtDesativado` date DEFAULT NULL,
  `pacNome` varchar(255) NOT NULL,
  `pacDtNascimento` date DEFAULT NULL,
  `pacSexo` char(1) DEFAULT NULL,
  `pacEstadoCivil` varchar(63) DEFAULT NULL,
  `pacPeso` float DEFAULT NULL,
  `pacAltura` float DEFAULT NULL,
  `pacProfissao` varchar(255) DEFAULT NULL,
  `pacFumante` tinyint(1) DEFAULT NULL,
  `pacNivelImportancia` int(1) DEFAULT NULL,
  `pacEmail` varchar(255) DEFAULT NULL,
  `pacTelefone` varchar(23) DEFAULT NULL,
  `pacCpf` varchar(14) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `patologia`
--

CREATE TABLE `patologia` (
  `patCodigo` int(11) NOT NULL,
  `patSesCodigo` int(11) NOT NULL,
  `patDiagnosticoClinico` varchar(255) DEFAULT NULL,
  `patHMA` varchar(255) DEFAULT NULL,
  `patAntecedentesPessoais` varchar(255) DEFAULT NULL,
  `patPatologiaAssociada` varchar(255) DEFAULT NULL,
  `patTomaMedicamento` varchar(255) DEFAULT NULL,
  `patQuandoDorComecou` varchar(255) DEFAULT NULL,
  `patQualPosicaoDorMaisIntensa` varchar(255) DEFAULT NULL,
  `patQualPosicaoTrabalho` varchar(255) DEFAULT NULL,
  `patFezCirurgia` varchar(255) DEFAULT NULL,
  `patExamesComplementares` varchar(255) DEFAULT NULL,
  `patHaComprometimentoAVS` varchar(255) DEFAULT NULL,
  `patLimitacaoFuncional` varchar(255) DEFAULT NULL,
  `patComprometimentoMarcha` varchar(255) DEFAULT NULL,
  `patDataCirurgia` varchar(63) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `sessao`
--

CREATE TABLE `sessao` (
  `sesCodigo` int(11) NOT NULL,
  `sesPacCodigo` int(11) NOT NULL,
  `sesParteSuperior` tinyint(1) DEFAULT NULL,
  `sesParteInferior` tinyint(1) DEFAULT NULL,
  `sesColuna` tinyint(1) DEFAULT NULL,
  `sesDtAvaliacao` datetime DEFAULT NULL,
  `sesDescricao` varchar(8191) DEFAULT NULL,
  `sesUltimaEdicao` varchar(255) DEFAULT NULL,
  `sesGravidadePSuperior` varchar(255) DEFAULT NULL,
  `sesGravidadePInferior` varchar(255) DEFAULT NULL,
  `sesGravidadeColuna` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tratamentofisioterapico`
--

CREATE TABLE `tratamentofisioterapico` (
  `traCodigo` int(11) NOT NULL,
  `traSesCodigo` int(11) NOT NULL,
  `traObjetivoTratamento` varchar(255) DEFAULT NULL,
  `traTratamentoProposto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `avulso`
--
ALTER TABLE `avulso`
  ADD PRIMARY KEY (`avuCodigo`),
  ADD KEY `fk_avulso_sessao` (`avuSesCodigo`);

--
-- Índices de tabela `consulta`
--
ALTER TABLE `consulta`
  ADD PRIMARY KEY (`conCodigo`),
  ADD KEY `fk_consulta_diahoraagendado` (`conDiaCodigo`);

--
-- Índices de tabela `diahoraagendado`
--
ALTER TABLE `diahoraagendado`
  ADD PRIMARY KEY (`diaCodigo`),
  ADD KEY `fk_diaHoraAgendado_sessao` (`diaSesCodigo`);

--
-- Índices de tabela `endereco`
--
ALTER TABLE `endereco`
  ADD PRIMARY KEY (`endCodigo`),
  ADD KEY `fk_endereco_paciente` (`endPacCodigo`);

--
-- Índices de tabela `examefisico`
--
ALTER TABLE `examefisico`
  ADD PRIMARY KEY (`exaCodigo`),
  ADD KEY `fk_exameFisico_sessao` (`exaSesCodigo`);

--
-- Índices de tabela `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`pacCodigo`);

--
-- Índices de tabela `patologia`
--
ALTER TABLE `patologia`
  ADD PRIMARY KEY (`patCodigo`),
  ADD KEY `fk_patologia_sessao` (`patSesCodigo`);

--
-- Índices de tabela `sessao`
--
ALTER TABLE `sessao`
  ADD PRIMARY KEY (`sesCodigo`),
  ADD KEY `fk_sessao_paciente` (`sesPacCodigo`);

--
-- Índices de tabela `tratamentofisioterapico`
--
ALTER TABLE `tratamentofisioterapico`
  ADD PRIMARY KEY (`traCodigo`),
  ADD KEY `fk_tratamentoFisioterapico_sessao` (`traSesCodigo`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `avulso`
--
ALTER TABLE `avulso`
  MODIFY `avuCodigo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `consulta`
--
ALTER TABLE `consulta`
  MODIFY `conCodigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT de tabela `diahoraagendado`
--
ALTER TABLE `diahoraagendado`
  MODIFY `diaCodigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `endereco`
--
ALTER TABLE `endereco`
  MODIFY `endCodigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `examefisico`
--
ALTER TABLE `examefisico`
  MODIFY `exaCodigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `paciente`
--
ALTER TABLE `paciente`
  MODIFY `pacCodigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `patologia`
--
ALTER TABLE `patologia`
  MODIFY `patCodigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `sessao`
--
ALTER TABLE `sessao`
  MODIFY `sesCodigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `tratamentofisioterapico`
--
ALTER TABLE `tratamentofisioterapico`
  MODIFY `traCodigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `avulso`
--
ALTER TABLE `avulso`
  ADD CONSTRAINT `fk_avulso_sessao` FOREIGN KEY (`avuSesCodigo`) REFERENCES `sessao` (`sesCodigo`);

--
-- Restrições para tabelas `consulta`
--
ALTER TABLE `consulta`
  ADD CONSTRAINT `fk_consulta_diahoraagendado` FOREIGN KEY (`conDiaCodigo`) REFERENCES `diahoraagendado` (`diaCodigo`);

--
-- Restrições para tabelas `diahoraagendado`
--
ALTER TABLE `diahoraagendado`
  ADD CONSTRAINT `fk_diaHoraAgendado_sessao` FOREIGN KEY (`diaSesCodigo`) REFERENCES `sessao` (`sesCodigo`);

--
-- Restrições para tabelas `endereco`
--
ALTER TABLE `endereco`
  ADD CONSTRAINT `fk_endereco_paciente` FOREIGN KEY (`endPacCodigo`) REFERENCES `paciente` (`pacCodigo`);

--
-- Restrições para tabelas `examefisico`
--
ALTER TABLE `examefisico`
  ADD CONSTRAINT `fk_exameFisico_sessao` FOREIGN KEY (`exaSesCodigo`) REFERENCES `sessao` (`sesCodigo`);

--
-- Restrições para tabelas `patologia`
--
ALTER TABLE `patologia`
  ADD CONSTRAINT `fk_patologia_sessao` FOREIGN KEY (`patSesCodigo`) REFERENCES `sessao` (`sesCodigo`);

--
-- Restrições para tabelas `sessao`
--
ALTER TABLE `sessao`
  ADD CONSTRAINT `fk_sessao_paciente` FOREIGN KEY (`sesPacCodigo`) REFERENCES `paciente` (`pacCodigo`);

--
-- Restrições para tabelas `tratamentofisioterapico`
--
ALTER TABLE `tratamentofisioterapico`
  ADD CONSTRAINT `fk_tratamentoFisioterapico_sessao` FOREIGN KEY (`traSesCodigo`) REFERENCES `sessao` (`sesCodigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
