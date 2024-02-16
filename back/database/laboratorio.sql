-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-02-2024 a las 08:28:18
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `laboratorio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bioanalistas`
--

CREATE TABLE `bioanalistas` (
  `id` int(11) NOT NULL,
  `cedula` int(12) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `ingreso` date NOT NULL DEFAULT current_timestamp(),
  `telefono` varchar(12) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `colegio` varchar(15) NOT NULL,
  `pre_cedula` varchar(2) NOT NULL,
  `foto_carnet` mediumblob DEFAULT NULL,
  `foto_firma` mediumblob DEFAULT NULL,
  `status` varchar(9) NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bioanalistas`
--

INSERT INTO `bioanalistas` (`id`, `cedula`, `nombre`, `ingreso`, `telefono`, `direccion`, `colegio`, `pre_cedula`, `foto_carnet`, `foto_firma`, `status`) VALUES
(27, 123, 'fabi', '2002-12-17', '0111', 'ssan ', '111', 'V', NULL, NULL, 'activo'),
(28, 1231, 'fas', '2002-12-17', '212', 'fsa', '121', 'V', NULL, NULL, 'activo'),
(29, 1231, 'fas', '2024-01-26', 'fdas', 'saf', '121', 'V', NULL, NULL, 'activo'),
(30, 123, 'fas', '2024-01-26', '21312', 'fas', '1231', 'V', NULL, NULL, 'activo'),
(31, 123, 'saf', '2024-01-26', '11', 'fa', '12das', 'V', NULL, NULL, 'activo'),
(32, 12, 'fas', '2024-01-26', '12', 'fas', '123', 'V', NULL, NULL, 'activo'),
(33, 123, 'fas', '2024-01-26', '21312', 'fsa', '1231', 'V', NULL, NULL, 'activo'),
(34, 1231, 'fas', '2024-01-26', 'asf', '123', '12312', 'V', NULL, NULL, 'activo'),
(35, 123, 'fas', '2024-01-26', 'fas', '12', '1231', 'V', NULL, NULL, 'activo'),
(36, 123, 'fdsa', '2024-01-26', '212', 'fas', '12', 'V', NULL, NULL, 'activo'),
(37, 123, 'fas', '2024-01-26', '1212', 'fasa', '12112', 'V', NULL, NULL, 'activo'),
(38, 123, 'fas', '2024-01-26', '1231', 'fas', '121', 'V', NULL, NULL, 'activo'),
(39, 12, 'fas', '2024-01-26', '12', 'fas', '123', 'V', NULL, NULL, 'activo'),
(40, 123, 'fas', '2024-01-26', '1231', 'fasas', '12', 'V', NULL, NULL, 'activo'),
(41, 1231, 'fasf', '2024-01-26', '12312', 'fasf', '1231', 'V', NULL, NULL, 'activo'),
(42, 1231, 'fasf', '2024-01-26', '12312', 'fasf', '1231', 'V', NULL, NULL, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_examen`
--

CREATE TABLE `detalles_examen` (
  `id` int(11) NOT NULL,
  `id_ex` int(11) NOT NULL,
  `nombre` tinytext NOT NULL,
  `inferior` decimal(8,2) DEFAULT NULL,
  `superior` decimal(8,2) DEFAULT NULL,
  `posicion` int(11) NOT NULL DEFAULT 0,
  `unidad` varchar(30) DEFAULT NULL,
  `impsiempre` tinyint(1) NOT NULL,
  `resultados` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles_examen`
--

INSERT INTO `detalles_examen` (`id`, `id_ex`, `nombre`, `inferior`, `superior`, `posicion`, `unidad`, `impsiempre`, `resultados`) VALUES
(1, 3, 'TRANSAMINASA  P (PIRUVICA) HOMBRES ', 0.00, 41.00, 0, 'U/L ', 0, '[]'),
(2, 5, 'PERFIL LIPIDICO ', 0.00, 0.00, 0, ' ', 0, '[]'),
(3, 7, 'UROCULTIVO ', 0.00, 0.00, 0, ' ', 0, '[]'),
(4, 7, 'HERMOCULTIVO ', 0.00, 0.00, 0, ' ', 0, '[]'),
(5, 7, 'COPROCULTIVO ', 0.00, 0.00, 0, ' ', 0, '[]'),
(6, 7, 'BK (DIRECTO CULTIVO) ', 0.00, 0.00, 0, ' ', 0, '[]'),
(7, 7, 'ANTIBIOTICOGRAMA ', 0.00, 0.00, 0, ' ', 0, '[]'),
(8, 7, 'DIRECTO (GRAM) ', 0.00, 0.00, 0, ' ', 0, '[]'),
(9, 7, 'EN FRESCO ', 0.00, 0.00, 0, ' ', 0, '[]'),
(10, 7, 'INV. DE CLAMYDIAS ', 0.00, 0.00, 0, ' ', 0, '[]'),
(11, 3, 'GAMMA GLUTAMIL TRANSPEPTIDASA  (GGTP) HOMBRES ', 9.00, 54.00, 0, 'U/L ', 0, '[]'),
(12, 3, 'GAMMA GLUTAMIL TRANSPEPTIDASA  (GGTP)  MUJERES ', 8.00, 35.00, 0, 'U/L ', 0, '[]'),
(13, 8, 'REACCION DE BRUCELLA ABORTUS ', 0.00, 0.00, 0, ' ', 0, '[]'),
(14, 9, 'LIPIDOGRAMA ', 50.00, 0.00, 0, ' ', 0, '[]'),
(15, 9, 'COLESTEROL TOTAL ', 0.00, 200.00, 0, 'MG/DL ', 0, '[]'),
(16, 9, 'HDL COLESTEROL ', 30.00, 65.00, 0, 'MG/DL ', 0, '[]'),
(17, 9, 'VLDL COLESTEROL ', 10.00, 30.00, 0, 'MG/DL ', 0, '[]'),
(18, 9, 'RELACION COL TOT/HDL COL HOMBRE ', 0.00, 4.97, 0, 'MG/DL ', 0, '[]'),
(19, 9, 'RELACION COL TOT/HDL COL MUJERES ', 0.00, 4.44, 0, 'MG/DL ', 0, '[]'),
(20, 9, 'FACTOR DE RIESGO ', 0.00, 1.00, 0, '% ', 0, '[]'),
(21, 10, 'GLUCOSA EN AYUNAS ', 0.00, 0.00, 0, 'MG/DL ', 0, '[]'),
(22, 10, 'GLUCOSA 30 MINUTOS ', 0.00, 0.00, 0, 'MG/DL ', 0, '[]'),
(23, 10, 'GLUCOSA 60 MINUTOS ', 0.00, 0.00, 0, 'MG/DL ', 0, '[]'),
(24, 10, 'GLUCOSA 120 MINUTOS ', 0.00, 0.00, 0, 'MG/DL ', 0, '[]'),
(25, 11, 'GLUCOSA EN AYUNAS ', 0.00, 0.00, 0, 'MG/DL ', 0, '[]'),
(26, 11, 'GLUCOSA 30 MINUTOS ', 0.00, 0.00, 0, 'MG/DL ', 0, '[]'),
(27, 11, 'GLUCOSA 60 MINUTOS ', 0.00, 0.00, 0, 'MG/DL ', 0, '[]'),
(28, 11, 'GLUCOSA 120 MINUTOS ', 0.00, 0.00, 0, 'MG/DL ', 0, '[]'),
(29, 12, 'HIERRO SERICO ', 35.00, 140.00, 0, 'NG/DL ', 0, '[]'),
(30, 12, 'WIBC ', 130.00, 375.00, 0, 'NG/DL ', 0, '[]'),
(31, 12, 'TIBC ', 245.00, 400.00, 0, 'NG/DL ', 0, '[]'),
(32, 12, 'SATURACION ', 13.00, 45.00, 0, '% ', 0, '[]'),
(33, 15, 'PH ', 7.35, 7.45, 0, 'MML/DG ', 0, '[]'),
(34, 15, 'PCO2 ', 3.30, 4.70, 0, 'MML/DG ', 0, '[]'),
(35, 15, 'PO2 ', 0.00, 0.00, 0, 'MML/DG ', 0, '[]'),
(36, 15, 'HCO3 ', 21.30, 24.80, 0, 'MML/DG ', 0, '[]'),
(37, 15, 'TCO2 ', 23.00, 32.00, 0, 'MML/DL ', 0, '[]'),
(38, 15, 'B.E. ', 0.00, 0.00, 0, 'MML/L ', 0, '[]'),
(39, 15, 'SAT ', 0.00, 0.00, 0, '% ', 0, '[]'),
(40, 16, 'ASPECTO: ', 0.00, 0.00, 0, ' ', 0, '[Resultado # 1,Resultado # 2,]'),
(41, 16, 'COLOR ', 0.00, 0.00, 0, ' ', 0, '[]'),
(42, 16, 'DENSIDAD: ', 0.00, 0.00, 0, ' ', 0, '[]'),
(43, 17, 'CONTAJE DE CELULAS AD ', 0.00, 10.00, 0, 'MM3 ', 0, '[]'),
(44, 17, 'RECUENTO DIFERENCIAL N: ', 0.00, 20.00, 0, 'MM3 ', 0, '[]'),
(45, 18, 'GLUCOSA ', 45.00, 80.00, 0, ' ', 0, '[]'),
(46, 18, 'PROTEINAS (LUMBAR) ', 15.00, 25.00, 0, ' ', 0, '[]'),
(47, 18, 'PANDY (LISTOMAL) ', 15.00, 25.00, 0, ' ', 0, '[]'),
(48, 18, 'PANDY (VENTRICULAR) ', 5.00, 16.00, 0, ' ', 0, '[]'),
(49, 19, 'COLOR ', 0.00, 0.00, 0, ' ', 0, '[]'),
(50, 19, 'ASPECTO ', 0.00, 0.00, 0, ' ', 0, '[]'),
(51, 19, 'VISCOSIDAD ', 0.00, 0.00, 0, ' ', 0, '[]'),
(52, 19, 'DENSIDAD ', 0.00, 0.00, 0, ' ', 0, '[]'),
(53, 19, 'PH ', -1005.00, 1015.00, 0, ' ', 0, '[]'),
(54, 19, 'COAGULO DE FIBRINA ', 7.40, 0.00, 0, ' ', 0, '[]'),
(55, 19, 'TEST DE MUCINA ', 0.00, 0.00, 0, ' ', 0, '[]'),
(56, 20, 'CONTAJE DE CELULAS ', 0.00, 0.00, 0, ' ', 0, '[]'),
(57, 20, 'RECUENTO DIFERENCIAL ', 0.00, 0.00, 0, ' ', 0, '[]'),
(58, 21, 'PROTEINAS ', 0.00, 0.00, 0, ' ', 0, '[]'),
(59, 21, 'GLUCOSA ', 0.00, 0.00, 0, ' ', 0, '[]'),
(60, 21, 'ACIDO URICO ', 0.00, 0.00, 0, ' ', 0, '[]'),
(61, 21, 'COLESTEROL ', 0.00, 0.00, 0, ' ', 0, '[]'),
(62, 22, 'ASPECTO ', 0.00, 0.00, 0, ' ', 0, '[]'),
(63, 22, 'COLOR ', 0.00, 0.00, 0, ' ', 0, '[]'),
(64, 22, 'PH ', 0.00, 0.00, 0, ' ', 0, '[]'),
(65, 22, 'DENSIDAD ', 0.00, 0.00, 0, ' ', 0, '[]'),
(66, 22, 'FORMACION DE COAGULO ', 0.00, 0.00, 0, ' ', 0, '[]'),
(67, 23, 'CONTAJE CELULAR ', 0.00, 0.00, 0, ' ', 0, '[]'),
(68, 23, 'RECUENTO DIFERENCIAL ', 0.00, 0.00, 0, ' ', 0, '[]'),
(69, 24, 'REACCION DE RIVALTA ', 0.00, 0.00, 0, ' ', 0, '[]'),
(70, 24, 'PROTEINAS ', 0.00, 0.00, 0, ' ', 0, '[]'),
(71, 24, 'GLUCOSA ', 0.00, 0.00, 0, ' ', 0, '[]'),
(72, 24, 'ENZIMAS LDH ', 0.00, 0.00, 0, ' ', 0, '[]'),
(73, 24, 'COLESTEROL ', 0.00, 0.00, 0, ' ', 0, '[]'),
(74, 25, 'VOLUMEN ', 0.00, 0.00, 0, ' ', 0, '[]'),
(75, 25, 'COLOR ', 0.00, 0.00, 0, ' ', 0, '[]'),
(76, 25, 'ASPECTO ', 0.00, 0.00, 0, ' ', 0, '[]'),
(77, 25, 'DENSIDAD ', 0.00, 0.00, 0, ' ', 0, '[]'),
(78, 25, 'PH ', 0.00, 0.00, 0, ' ', 0, '[]'),
(79, 25, 'PRESENCIA DE COAGULOS ', 0.00, 0.00, 0, ' ', 0, '[]'),
(80, 26, 'RECUENTO CELULAR ', 0.00, 0.00, 0, ' ', 0, '[]'),
(81, 26, 'RECUENTO DIFERENCIAL ', 0.00, 0.00, 0, ' ', 0, '[]'),
(82, 27, 'RIVALTA ', 0.00, 0.00, 0, ' ', 0, '[]'),
(83, 27, 'PROTEINAS ', 0.00, 0.00, 0, ' ', 0, '[]'),
(84, 27, 'GLUCOSA ', 0.00, 0.00, 0, ' ', 0, '[]'),
(85, 28, 'ASPECTO ', 0.00, 0.00, 0, ' ', 0, '[]'),
(86, 28, 'COLOR ', 0.00, 0.00, 0, ' ', 0, '[]'),
(87, 28, 'REACCION ', 0.00, 0.00, 0, ' ', 0, '[]'),
(88, 28, 'DENSIDAD ', 10.00, 20.00, 0, ' ', 0, '[Positivo,Negativo,Que mas\r\nasi,]'),
(89, 28, 'PRESENCIA DE COAGULOS ', 0.00, 0.00, 0, ' ', 0, '[]'),
(90, 29, 'CONTAJE CELULAR ', 0.00, 0.00, 0, ' ', 0, '[]'),
(91, 29, 'RECUENTO DIFERENCIAL ', 0.00, 0.00, 0, ' ', 0, '[]'),
(92, 30, 'RIVALTA ', 0.00, 0.00, 0, ' ', 0, '[]'),
(93, 30, 'PROTEINAS ', 0.00, 0.00, 0, ' ', 0, '[]'),
(94, 30, 'ENZIMAS ', 0.00, 0.00, 0, ' ', 0, '[]'),
(95, 30, 'GLUCOSA ', 0.00, 0.00, 0, ' ', 0, '[]'),
(96, 35, 'PRUEBA DE EMBARAZO EN ORINA ', 0.00, 0.00, 0, ' ', 0, '[]'),
(97, 36, 'VOLUMEN TOTAL ', 0.00, 0.00, 0, ' ', 0, '[]'),
(98, 36, 'PROTEINAS CUALITATIVAS ', 0.00, 0.00, 0, ' ', 0, '[]'),
(99, 36, 'PROTEINAS CUANTITATIVAS ', 31.00, 120.00, 0, 'MG/24H ', 0, '[]'),
(100, 37, 'VOLUMEN TOTAL ', 0.00, 0.00, 0, ' ', 0, '[]'),
(101, 37, 'CALCIO EN ORINA DE 24 HORAS ', 0.10, 0.20, 0, 'GR/24H ', 0, '[]'),
(102, 38, 'VOLUMEN TOTAL ', 0.00, 0.00, 0, ' ', 0, '[]'),
(103, 38, 'FOSFORO EN ORINA DE 24 HORAS ', 340.00, 1000.00, 0, 'ML/24H ', 0, '[]'),
(104, 39, 'ACIDO URICO EN ORINA DE 24 HORAS ', 0.00, 0.00, 0, '9MG/24H ', 0, '[Dolor nivel I,Dolor Nivel II,Dolor Nivel III,Dolor Nivel VI,Dolor Nivel V,Dolor Nivel VI,Dolor Nivel VII,Dolor Nivel VIII,Dolor Nivel IX,Dolor Nivel X,]'),
(105, 40, 'VOLUMEN TOTAL ', 0.00, 0.00, 0, ' ', 0, '[]'),
(106, 40, 'UREA EN ORINA DE 24 HORAS ', 12.00, 20.00, 0, 'GR/24H ', 0, '[]'),
(107, 41, 'VOLUMEN TOTAL ', 0.00, 0.00, 0, ' ', 0, '[]'),
(108, 41, 'SODIO EN ORINA DE 24 HORAS ', 75.00, 200.00, 0, 'MEG/24H ', 0, '[]'),
(109, 42, 'VOLUMEN TOTAL ', 0.00, 0.00, 0, ' ', 0, '[]'),
(110, 42, 'POTASIO EN ORINA DE 24 HORAS ', 40.00, 80.00, 0, 'MEG/24 ', 0, '[]'),
(111, 43, 'VOLUMEN TOTAL ', 0.00, 0.00, 0, ' ', 0, '[]'),
(112, 43, 'CLORO EN ORINA DE 24 HORAS  NIÑOS ', 14.00, 42.00, 0, 'MEG/24H ', 0, '[]'),
(113, 43, 'CLORO EN ORINA DE 24 HORAS  ADULTOS ', 280.00, 420.00, 0, 'MEG/24H ', 0, '[]'),
(114, 44, 'VOLUMEN TOTAL ', 0.00, 0.00, 0, ' ', 0, '[]'),
(115, 44, 'AMILASA ', 40.00, 160.00, 0, 'U/HORA ', 0, '[]'),
(116, 46, 'CELULAS ', 0.00, 0.00, 0, ' ', 0, '[]'),
(117, 46, 'HEMATIES ', 0.00, 0.00, 0, ' ', 0, '[]'),
(118, 46, 'LEUCOCITOS ', 0.00, 0.00, 0, ' ', 0, '[]'),
(119, 46, 'CILINDROS ', 0.00, 0.00, 0, ' ', 0, '[]'),
(120, 46, 'VOLUMEN TOTAL ', 0.00, 0.00, 0, ' ', 0, '[]'),
(121, 48, 'KATO ', 0.00, 0.00, 0, ' ', 0, '[]'),
(122, 48, 'AZUCARES REDUCTORES ', 0.00, 0.00, 0, ' ', 0, '[]'),
(123, 48, 'SUDAN III ', 0.00, 0.00, 0, ' ', 0, '[]'),
(124, 48, 'SANGRE OCULTA ', 0.00, 0.00, 0, ' ', 0, '[]'),
(125, 8, 'SALMONELLA THYPOID H= ', 0.00, 0.00, 0, ' ', 0, '[]'),
(126, 8, 'REACCION DE WIDAL SALMONELLA THYPOID 0= ', 0.00, 0.00, 0, ' ', 0, '[]'),
(127, 8, 'SALMONELLA PARA THYPOID B= ', 0.00, 0.00, 0, ' ', 0, '[]'),
(128, 8, 'SALMONELLA PARA THYPOID A= ', 0.00, 0.00, 0, ' ', 0, '[]'),
(129, 39, 'VOLUMEN TOTAL2', 0.00, 0.00, 0, '', 0, '[]'),
(130, 9, 'LDL COLESTEROL                                                                  ', 20.00, 150.00, 0, 'mg/dl               ', 0, '[]'),
(131, 9, 'TRIGLICERIDOS                                                                   ', 40.00, 150.00, 0, 'mg/dl               ', 0, '[]'),
(132, 13, 'GLUCOSA EN AYUNAS                                                               ', 70.00, 100.00, 0, 'mg/dl               ', 0, '[]'),
(133, 13, 'GLUCOSA SEGUNDA HORA                                                            ', 70.00, 140.00, 0, 'mg/dl               ', 0, '[]'),
(134, 34, 'CREATININA EN SANGRE                                                            ', 0.50, 1.60, 0, 'mg/dl               ', 0, '[]'),
(135, 34, 'DEPURACION                                                                      ', 70.00, 140.00, 0, 'ml/24H              ', 0, '[]'),
(136, 34, 'VOLUMEN MINUTO                                                                  ', 0.00, 0.00, 0, 'ml/Min              ', 0, '[]'),
(137, 34, 'VOLUMEN TOTAL                                                                   ', 0.00, 0.00, 0, 'ml                  ', 0, '[]'),
(138, 58, 'UREA                                                                            ', 10.00, 50.00, 0, 'mg/dl               ', 0, '[]'),
(139, 57, 'CREATININA                                                                      ', 0.50, 1.40, 0, 'mg/dl               ', 0, '[]'),
(140, 55, 'CALCIO SERICO                                                                   ', 8.50, 10.50, 0, 'mg/dl               ', 0, '[]'),
(141, 54, 'LDH                                                                             ', 230.00, 460.00, 0, 'U/I                 ', 0, '[]'),
(142, 51, 'BILIRRUBINA TOTAL                                                               ', 0.00, 1.00, 0, 'mg/dl               ', 0, '[]'),
(143, 52, 'BILIRRUBINA DIRECTA                                                             ', 0.00, 0.35, 0, 'mg/dl               ', 0, '[]'),
(144, 53, 'BILIRRUBINA INDIRECTA                                                           ', 0.00, 0.65, 0, 'mg/dl               ', 0, '[]'),
(145, 47, 'ASPECTO                                                                         ', 0.00, 0.00, 1, '                    ', 0, '[HOMOGENEO,HETEROGENEO,]'),
(146, 47, 'COLOR                                                                           ', 0.00, 0.00, 2, '                    ', 0, '[AMARILLA,MARRON,VERDOSA,]'),
(147, 47, 'REACCION                                                                        ', 0.00, 0.00, 5, '                    ', 0, '[ACIDA,ALCALINA,]'),
(148, 47, 'MOCO                                                                            ', 0.00, 0.00, 6, '                    ', 0, '[PRESENTE,NO,]'),
(149, 47, 'SANGRE                                                                          ', 0.00, 0.00, 7, '                    ', 0, '[PRESENTE,NO,]'),
(150, 47, 'EXAMEN MICROSCOPICO                                                             ', 0.00, 0.00, 9, '                    ', 0, '[HELMINTOS,PROTROZOARIOS,NO SE OBSERVARON FORMAS EVOLUTIVAS PARASITARIAS EN LA MUESTRA ANALIZADA,]'),
(151, 49, 'TGO                                                                             ', 0.00, 32.00, 0, 'U/L                 ', 0, '[]'),
(152, 50, 'TGP                                                                             ', 0.00, 34.00, 0, 'U/L                 ', 0, '[]'),
(153, 31, 'ASPECTO                                                                         ', 0.00, 0.00, 2, '                    ', 0, '[LIG TURBIO,TURBIO,TRANSPARENTE,]'),
(154, 31, 'OLOR                                                                            ', 0.00, 0.00, 4, '                    ', 0, '[SUI GENERI,FETIDA,]'),
(155, 32, 'PROTEINAS                                                                       ', 0.00, 0.00, 2, '                    ', 0, '[NEGATIVA,TRAZAS,POSITIVA +,POSITIVA ++,POSITIVA +++,]'),
(156, 32, 'GLUCOSA                                                                         ', 0.00, 0.00, 1, '                    ', 0, '[TRAZAS,NEGATIVA,POSITIVA +,POSITIVA ++,POSITIVA +++,]'),
(157, 32, 'BILIRRUBINA                                                                     ', 0.00, 0.00, 3, '                    ', 0, '[NEGATIVA,POSITIVA (+),POSITIVA (++),POSITIVA (+++),]'),
(158, 32, 'UROBILINOGENO                                                                   ', 0.00, 0.00, 4, '                    ', 0, '[NORMAL,2 mg/dl,4 mg/dl,8 mg/dl,12 mg/dl,]'),
(159, 32, 'CETONA                                                                          ', 0.00, 0.00, 5, '                    ', 0, '[NEGATIVA,TRAZAS,POSITIVA (+),POSITIVA (++),POSITIVA (+++),]'),
(160, 32, 'NITRITOS                                                                        ', 0.00, 0.00, 6, '                    ', 0, '[NEGATIVO,TRAZAS,POSITIVO +,POSITIVO ++,POSITIVO +++,]'),
(161, 32, 'SANGRE                                                                          ', 0.00, 0.00, 7, '                    ', 0, '[NEGATIVA,TRAZAS,POSITIVA (+),POSITIVA (++),POSITIVA (+++),]'),
(162, 47, 'OLOR', 0.00, 0.00, 4, '', 0, '[FECAL,FETIDO,]'),
(163, 31, 'REACCION O PH', 0.00, 0.00, 6, '', 0, '[ACIDA (5),ACIDA (6),ACIDA (6,5),NEUTRA (7),ALCALINA (8),ALCALINA (9),]'),
(164, 31, 'DENSIDAD', 0.00, 0.00, 5, '', 0, '[1000,1005,1010,1015,1.020\r\n,1025,1030,]'),
(165, 32, 'LEUCOCITOS', 0.00, 0.00, 8, '', 0, '[NEGATIVO,TRAZAS,POSITIVO (+),POSITIVO (++),POSITIVO (+++),]'),
(166, 6, 'CALCIO', 8.50, 10.50, 1, 'mg/dl', 0, '[]'),
(167, 6, 'POTASIO', 3.50, 4.50, 2, 'mEq/L', 0, '[]'),
(168, 6, 'SODIO', 135.00, 145.00, 3, 'mEq/L', 0, '[]'),
(169, 6, 'MAGNESIO', 2.30, 4.60, 4, 'mg/dl', 0, '[]'),
(170, 6, 'FOSFORO ADULTO', 1.60, 2.60, 6, 'mg/dl', 0, '[]'),
(171, 6, 'FOSFORO NIÑOS', 3.00, 7.00, 7, 'mg/dl', 0, '[]'),
(172, 6, 'CLORO', 95.00, 108.00, 8, 'mEq/L', 0, '[]'),
(173, 8, 'VDRL (Cuantitativo)', 0.00, 0.00, 3, '', 0, '[]'),
(174, 8, 'CELULA LE', 0.00, 0.00, 0, '', 0, '[]'),
(175, 56, 'ACIDO URICO', 2.50, 7.20, 6, 'mg/dl', 0, '[]'),
(176, 31, 'CANTIDAD', 0.00, 0.00, 1, 'ml', 0, '[10 ml,20 ml,30 ml,40 ml,50 ml,60 ml,70 ml,80 ml,90 ml,100 ml,]'),
(177, 47, 'ALMIDON INDIGERIDO', 0.00, 0.00, 12, '', 0, '[AUSENTE,PRESENTE,ABUNDANTE,]'),
(178, 47, 'RESTOS ALIMENTICIOS', 0.00, 0.00, 8, '', 0, '[PRESENTE,NO,AUSENTE,]'),
(179, 47, 'LEUCOCITOS', 0.00, 0.00, 14, '', 0, '[ESCASOS,MODERADOS,ABUNDANTES,NO,PRESENTES,AUSENTES,]'),
(180, 47, 'HEMATIES', 0.00, 0.00, 15, '', 0, '[ESCASOS,MODERADOS,ABUNDANTES,NO,PRESENTES,AUSENTES,]'),
(181, 47, 'CONSISTENCIA', 0.00, 0.00, 3, '', 0, '[FORMADA,PASTOSA,BLANDA,DIARREICA,LIQUIDA,DURA,]'),
(182, 47, 'GLOBULOS DE GRASA', 0.00, 0.00, 13, '', 0, '[NO,PRESENTES,AUSENTES,]'),
(183, 47, 'LEVADURAS', 0.00, 0.00, 11, '', 0, '[PRSENTES,AUSENTES,ESCASAS,MODERADAS,ABUNDANTES,]'),
(184, 8, 'V.D.R.L. (Cualitativo)', 0.00, 0.00, 2, '', 0, '[NO REACTIVO,REACTIVO,]'),
(185, 8, 'MONOTEST', 0.00, 0.00, 6, '', 0, '[NEGATIVA,POSITIVO,]'),
(186, 8, 'ANTIESTREPTOLISINA \"O\"', 0.00, 0.00, 8, '', 0, '[NEGATIVO,POSITIVO,]'),
(187, 5, 'COLESTEROL TOTAL', 0.00, 0.00, 1, 'mg/dl', 0, '[]'),
(188, 5, 'TRIGLICERIDOS', 40.00, 150.00, 2, 'mg/dl', 0, '[]'),
(189, 5, 'H.D.L. COLESTEROL', 40.00, 60.00, 3, 'mg/dl', 0, '[]'),
(190, 5, 'L.D.L. COLESTEROL', 0.00, 0.00, 5, 'mg/dl', 0, '[]'),
(191, 2, 'GLICEMIA BASAL', 70.00, 100.00, 1, 'mg/dl', 0, '[]'),
(192, 2, 'UREA', 10.00, 50.00, 3, 'mg/dl', 0, '[]'),
(193, 2, 'CREATININA SERICA', 0.50, 1.40, 4, 'mg/dl', 0, '[]'),
(194, 2, 'TRIGLICERIDOS', 40.00, 150.00, 6, 'mg/dl', 0, '[]'),
(195, 2, 'ACIDO URICO', 2.50, 7.20, 7, 'mg/dl', 0, '[]'),
(196, 2, 'TGO', 0.00, 32.00, 8, 'U/L', 0, '[]'),
(197, 2, 'TGP', 0.00, 34.00, 9, 'U/L', 0, '[]'),
(198, 2, 'BILIRRUBINA TOTAL', 0.00, 1.00, 10, 'mg/dl', 0, '[]'),
(199, 2, 'BILIRRUBINA DIRECTA', 0.00, 0.35, 11, 'mg/dl', 0, '[]'),
(200, 2, 'BILIRRUBINA INDIRECTA', 0.00, 0.65, 12, 'mg/dl', 0, '[]'),
(201, 2, 'PROTEINAS TOTALES', 6.00, 8.30, 13, 'g/dl', 0, '[]'),
(202, 2, 'ALBUMINA', 3.30, 5.50, 14, 'g/dl', 0, '[]'),
(203, 2, 'GLOBULINA', 0.70, 3.30, 15, 'g/dl', 0, '[]'),
(204, 2, 'GGT', 6.00, 42.00, 17, 'U/l', 0, '[]'),
(205, 2, 'LDH', 80.00, 258.00, 16, 'U/l', 0, '[]'),
(206, 2, 'FOSF. ALCALINA', 65.00, 300.00, 18, 'U/l', 0, '[]'),
(207, 2, 'FOSFORO', 2.30, 4.60, 19, 'mg/dl', 0, '[]'),
(208, 2, 'CALCIO', 8.50, 10.50, 21, 'mg/dl', 0, '[]'),
(209, 2, 'AMILASA', 0.00, 0.00, 22, 'U/L', 0, '[]'),
(210, 2, 'COLESTEROL', 0.00, 0.00, 5, 'mg/dl', 0, '[]'),
(211, 2, 'TROPONINA I', 0.10, 50.00, 23, 'ng/mL', 0, '[]'),
(212, 14, 'LH FASE FOLICULAR', 1.48, 12.40, 0, 'mUl/ml', 0, '[]'),
(213, 14, 'LH FASE OVULATORIA', 16.47, 73.87, 0, 'mUl/ml', 0, '[]'),
(214, 14, 'LH HOMBRE', 1.79, 7.68, 0, 'mUl/ml', 0, '[]'),
(215, 14, 'LH POSTMENOPAUSICA', 11.49, 40.62, 0, 'mUl/ml', 0, '[]'),
(216, 14, 'FSH FASE FOLICULAR', 3.00, 11.00, 0, 'mlU/mL', 0, '[]'),
(217, 14, 'FSH CICLO MEDIO', 6.00, 21.00, 0, 'mlU/mL', 0, '[]'),
(218, 14, 'FSH HOMBRE', 1.00, 11.00, 0, 'mlU/mL', 0, '[]'),
(219, 14, 'FSH FASE LUTEA', 1.00, 9.00, 0, 'mlU/mL', 0, '[]'),
(220, 14, 'FSH POSTMENOPAUSICA', 22.00, 153.00, 0, 'mlU/mL', 0, '[]'),
(221, 14, 'LH FASE LUTEAL', 0.64, 14.67, 0, 'mUl/ml', 0, '[]'),
(222, 14, 'PROGESTERONA EMBARAZADA 2DO TRIMESTRE', 0.00, 29.73, 0, 'ng/ml', 0, '[]'),
(223, 14, 'PROGESTERONA FASE FOLICULAR', 0.00, 0.69, 0, 'ng/ml', 0, '[]'),
(224, 14, 'PROGESTERONA FASE LUTEA MEDIA', 0.00, 11.42, 0, 'ng/ml', 0, '[]'),
(225, 14, 'PROGESTERONA MASCULINO', 0.00, 0.84, 0, 'ng/ml', 0, '[]'),
(226, 14, 'PROGESTERONA POSMENOPAUSICA', 0.00, 0.25, 0, 'ng/ml', 0, '[]'),
(227, 14, 'PROLACTINA HOMBRE', 3.00, 25.00, 0, 'ng/mL', 0, '[]'),
(228, 14, 'PROLACTINA  CICLO MESTRUAL', 5.00, 35.00, 0, 'ng/mL', 0, '[]'),
(229, 14, 'PROLACTINA FASE MENOPAUSICA', 5.00, 35.00, 0, 'ng/mL', 0, '[]'),
(230, 14, 'PSA TOTAL', 0.00, 4.00, 0, 'ng/mL', 0, '[]'),
(231, 14, 'FERRITINA MUJER', 20.00, 250.00, 0, 'ng/mL', 0, '[]'),
(232, 14, 'TROPONINA I', 0.36, 0.66, 0, 'ng/mL', 0, '[]'),
(233, 14, 'TSH', 0.34, 5.60, 0, 'uUl/Ml', 0, '[]'),
(234, 14, 'PROGESTERONA EMBARAZADA 1ER TRIMESTRE', 0.00, 22.17, 0, 'ng/ml', 0, '[]'),
(235, 14, 'HEPATITIS C', 0.00, 0.00, 0, 'COI', 0, '[]'),
(236, 14, 'T3 TOTAL ADULTO', 0.80, 2.00, 0, 'ng/ml', 0, '[]'),
(237, 14, 'T3 TOTAL NIÑO DE 1 - 10 AÑOS', 0.82, 2.82, 0, 'ng/ml', 0, '[]'),
(238, 14, 'T3 TOTAL (11 - 15 AÑOS)', 0.60, 2.33, 0, 'ng/ml', 0, '[]'),
(239, 14, 'T3 TOTAL ( 16 - 17 )', 0.61, 2.12, 0, 'ng/ml', 0, '[]'),
(240, 14, 'T4 TOTAL', 60.00, 120.00, 0, 'nmol/L', 0, '[]'),
(241, 14, 'INMUNOSEROLOGIA', 0.00, 0.00, 30, 'mg/L', 0, '[PROTEINA C REACTIVA: NEGATIVO MENOR A 10,PROTEINA C REACTIVA: POSITIVA MAYOR A 10,]'),
(242, 14, 'FERRITINA HOMBRE', 30.00, 350.00, 0, 'ng/mL', 0, '[]'),
(243, 34, 'CREATININA EN ORINA', 60.00, 170.00, 0, 'mg/24H', 0, '[]'),
(244, 4, 'INR', 0.00, 0.00, 5, '', 0, '[]'),
(245, 33, 'ESPERMATOZOIDES', 0.00, 0.00, 11, '', 0, '[]'),
(246, 33, 'CELULAS EPITELIALES', 0.00, 0.00, 1, '', 0, '[ESCASAS,MODERADAS,ABUNDANTES,]'),
(247, 33, 'BACTERIAS', 0.00, 0.00, 2, '', 0, '[ESCASAS,MODERADAS,ABUNDANTES,]'),
(248, 33, 'MUCINA', 0.00, 0.00, 3, '', 0, '[ESCASA,MODERADA,ABUNDANTE,]'),
(249, 33, 'CRISTALES DE URATOS AMORFOS', 0.00, 0.00, 6, '', 0, '[ESCASOS,MODERADOS,ABUNDANTES,]'),
(250, 33, 'CRISTALES DE FOSFATOS AMORFOS', 0.00, 0.00, 7, '', 0, '[ESCASOS,MODERADOS,ABUNDANTES,]'),
(251, 1, 'HEMOGLOBINA HOMBRES', 13.00, 17.00, 1, 'g/dl', 0, '[]'),
(252, 1, 'HEMOGLOBINA MUJERES', 11.50, 15.00, 2, 'g/dl', 0, '[]'),
(253, 1, 'HEMOGLOBINA NIÑOS', 11.20, 12.90, 3, 'g/dl', 0, '[]'),
(254, 1, 'HEMATOCRITO HOMBRES', 36.00, 48.00, 4, '%', 0, '[]'),
(255, 1, 'HEMATOCRITO MUJERES', 35.00, 48.00, 5, '%', 0, '[]'),
(256, 1, 'HEMATOCRITO NIÑOS', 35.00, 48.00, 6, '%', 0, '[]'),
(257, 1, 'LEUCOCITOS ADULTOS', 5000.00, 10000.00, 7, 'mm3', 0, '[]'),
(258, 1, 'LEUCOCITOS NIÑOS', 4500.00, 12000.00, 8, 'mm3', 0, '[]'),
(259, 1, 'FORMULA LEUCOCITARIA', 0.00, 0.00, 9, '%', 0, '[]'),
(260, 1, 'NEUTROFILOS', 50.00, 70.00, 10, '%', 0, '[]'),
(261, 1, 'LINFOCITOS', 20.00, 40.00, 11, '%', 0, '[]'),
(262, 1, 'EOSINOFILOS', 0.00, 3.00, 12, '%', 0, '[]'),
(263, 1, 'MONOCITOS', 0.00, 2.00, 13, '%', 0, '[]'),
(264, 1, 'BASOFILOS', 0.00, 1.00, 14, '%', 0, '[]'),
(265, 1, 'PLAQUETAS', 150000.00, 450000.00, 15, 'mm3', 0, '[]'),
(266, 33, 'CILINDRO LEUCOCITARIO', 0.00, 0.00, 14, '', 0, '[]'),
(267, 33, 'CILINDRO HIALINO', 0.00, 0.00, 13, '', 0, '[]'),
(268, 33, 'CILINDRO GRANULOSO', 0.00, 0.00, 15, '', 0, '[]'),
(269, 45, 'PROTEINA DE BENCE - JONES', 0.00, 0.00, 0, '', 0, '[]'),
(270, 60, 'GLOBULINA', 0.70, 3.30, 3, 'g/dl', 0, '[]'),
(271, 60, 'ALBUMINA', 3.30, 5.50, 2, 'g/dl', 0, '[]'),
(272, 60, 'PROTEINAS TOTALES', 6.00, 8.30, 1, 'g/dl', 0, '[]'),
(273, 60, 'RLCION ALB/GLOB', 1.20, 2.20, 4, '', 0, '[]'),
(274, 61, 'HEMOGLOBINA', 0.00, 0.00, 1, 'g/dl', 0, '[\r\n,]'),
(275, 61, 'HEMATOCRITO', 0.00, 0.00, 2, '%', 0, '[]'),
(276, 61, 'LEUCOCITOS', 0.00, 0.00, 3, 'mm3', 0, '[]'),
(277, 61, 'PLAQUETAS', 150000.00, 450000.00, 5, 'mm3', 0, '[]'),
(278, 62, 'BILIRRUBINA DIRECTA', 0.00, 0.35, 1, 'mg/dl', 0, '[]'),
(279, 62, 'BILIRRUBINA INDIRECTA', 0.00, 0.65, 2, 'mg/dl', 0, '[]'),
(280, 62, 'BILIRRUBINA TOTAL', 0.00, 1.00, 3, 'mg/dl', 0, '[]'),
(281, 33, 'ACUMULOS LEUCOCITARIOS', 0.00, 0.00, 6, '', 0, '[0 - 1 x cp.,0 - 2 x cp.,1 - 3 x cp.,]'),
(282, 31, 'COLOR', 0.00, 0.00, 3, '', 0, '[AMBAR,VERDOSO,AMARILLO,ROJIZO,AMARILLO CLARO,]'),
(283, 33, 'LEUCOCITOS', 0.00, 0.00, 4, '', 0, '[0 - 2 x cp.,0 - 4 x cp.,1 - 3 x cp.,1 - 5 x cp.,2 - 4 x cp.,2 - 6 x cp.,3 - 6 x cp.,5 - 10 x cp.,10 - 20 x cp.,INCONTABLES x cp.,]'),
(284, 33, 'HEMATIES', 0.00, 0.00, 5, '', 0, '[0 - 2 x cp.,0 - 4 x cp.,1 - 3 x cp.,1 - 6 x cp.,2 - 4 x cp.,2 - 6 x cp.,3 - 8 x cp.,5 - 10 x cp.,10 - 20 x cp.,INCONTABLES x cp.,]'),
(285, 33, 'CRISTALES DE OXALATO DE CALCIO', 0.00, 0.00, 8, '', 0, '[ESCASOS,MODERADOS,ABUNDANTES,]'),
(286, 33, 'CRISTALES DE ACIDO URICO', 0.00, 0.00, 9, '', 0, '[ESCASOS,MODERADOS,ABUNDANTES,]'),
(287, 33, 'LEVADURAS', 0.00, 0.00, 10, '', 0, '[PRESENTES,ABUNDANTES,ESCASAS,MODERADAS,]'),
(288, 2, 'MAGNESIO', 1.60, 2.60, 24, 'mg/dl', 0, '[]'),
(289, 2, 'HIERRO', 50.00, 170.00, 25, 'ng/dl', 0, '[]'),
(290, 68, 'LH', 0.00, 0.00, 0, 'mUI/ml', 0, '[]'),
(291, 69, 'HEPATITIS C', 0.00, 0.00, 0, 'COI', 0, '[]'),
(292, 8, 'H.I.V.', 0.00, 0.00, 1, '', 0, '[DETECTABLE,NO DETECTABLE,]'),
(293, 64, 'CALCIO IONICO', 4.00, 5.40, 0, 'mg/dl', 0, '[]'),
(294, 71, 'TROPONINA I CUALITATIVA', 0.00, 0.00, 0, '', 0, '[POSITIVA,NEGATIVA,]'),
(295, 66, 'PROGESTERONA', 0.00, 0.00, 0, 'ng/ml', 0, '[]'),
(296, 33, 'CELULAS RENALES', 0.00, 0.00, 16, '', 0, '[ESCASAS,MODERADAS,ABUNDANTES,]'),
(297, 33, 'CRISTALES DE FOSFATO AMONIACO', 0.00, 0.00, 17, '', 0, '[ESCASOS,MODERADOS,ABUNDANTES,]'),
(298, 63, 'GRUPO SANGUINEO', 0.00, 0.00, 1, '', 0, '[\"A\",\"B\",\"AB\",\"O\",]'),
(299, 63, 'FACTOR RH', 0.00, 0.00, 2, '', 0, '[POSITIVO,NEGATIVO,]'),
(300, 47, 'HECES SERIADAS', 0.00, 0.00, 0, '', 0, '[MUESTRA N° 1,MUESTRA N° 2,MUESTRA N° 3,]'),
(301, 59, 'PROLACTINA', 5.00, 35.00, 0, 'mg/dl', 0, '[MUJERES V.R:,HOMBRES V.R:,V.R NIÑOS:,]'),
(302, 67, 'FSH                                                                                                                                                   ', 0.00, 0.00, 0, 'mUI/ml              ', 0, '[]'),
(303, 14, 'TESTOSTERONA TOTAL                                                                                                                                    ', 1.00, 10.00, 0, 'ng/ml               ', 0, '[]'),
(304, 33, 'LEVADURAS Y PSEUDOHIFAS', 0.00, 0.00, 19, '', 0, '[ESCASAS,MODERADAS,ABUNDANTES,]'),
(305, 33, 'CELULAS DE TRANSCISION', 0.00, 0.00, 18, '', 0, '[0-2 x cpo,1-2 x cpo,1-3 x cpo\r\n,2-4 x cpo,3--5 x cpo,4-6 x cpo,]'),
(306, 47, 'FLORA BACTERIANA', 0.00, 0.00, 10, '', 0, '[ESCASA,NORMAL,AUMENTADA,]'),
(307, 61, 'FORMULA LEUCOCITARIA', 0.00, 0.00, 4, '%', 0, '[NEUTROFILOS 70%,LINFOCITOS 30%,ESOSINOFILOS,MONOCITOS,BASOFILOS,LINFOCITOS ATIPICOS,]'),
(308, 2, 'GLICEMIA POSTPRANDIAL', 0.00, 0.00, 2, 'mg/dl', 0, '[]'),
(309, 1, 'RETICULOCITOS ADULTOS', 0.00, 0.00, 32, '%', 0, '[]'),
(310, 1, 'FROTIS DE SANGRE PERIFERICA', 0.00, 0.00, 33, '', 0, '[]'),
(311, 1, 'RBC', 4.00, 5.50, 16, '10^6/uL', 0, '[]'),
(312, 1, 'MCV', 82.00, 95.00, 17, 'fL', 0, '[]'),
(313, 1, 'MCH', 28.00, 34.00, 18, 'Pg', 0, '[]'),
(314, 1, 'MCHC', 32.00, 36.00, 19, 'g/dL', 0, '[]'),
(315, 1, 'TIEMPOS DE COAGULACION', 0.00, 0.00, 31, '', 0, '[]'),
(316, 1, 'CAYADO', 0.00, 0.00, 22, '%', 0, '[]'),
(317, 1, 'ERITROBLASTOS', 0.00, 0.00, 23, '%', 0, '[]'),
(318, 1, 'MIELOBLASTO', 0.00, 0.00, 24, '%', 0, '[]'),
(319, 1, 'CELULAS INMADURAS', 0.00, 0.00, 25, '%', 0, '[]'),
(320, 1, 'PROMIELOBLASTO', 0.00, 0.00, 26, '%', 0, '[]'),
(321, 1, 'T.P. (CONTROL)', 0.00, 0.00, 27, 'Seg.', 0, '[]'),
(322, 1, 'T.P (PACIENTE)', 0.00, 0.00, 28, 'Seg.', 0, '[]'),
(323, 1, 'T.P.T. (PACIENTE)', 0.00, 0.00, 30, 'Seg.', 0, '[]'),
(324, 1, 'T.P.T. (CONTROL)', 0.00, 0.00, 29, 'Seg.', 0, '[]'),
(325, 1, 'RDW-CV', 11.00, 15.00, 20, '%', 0, '[]'),
(326, 1, 'RDW-SD', 39.90, 46.30, 21, 'fL', 0, '[]'),
(327, 5, 'VLDL', 2.00, 30.00, 6, 'mg/dl', 0, '[]'),
(328, 8, 'PROTEINA C REACTIVA cualitativa', 0.00, 0.00, 4, '', 0, '[NEGATIVA,POSITIVA,]'),
(329, 8, 'RA- TEST', 0.00, 0.00, 9, '', 0, '[NEGATIVA,POSITIVA,]'),
(330, 8, 'PRUEBA DE EMBARAZO EN SANGRE (BHCG)', 0.00, 0.00, 7, '', 0, '[NEGATIVA,POSITIVA,]'),
(331, 47, 'SANGRE OCULTA EN HECES', 0.00, 0.00, 16, '', 0, '[NEGATIVO,POSITIVO,]'),
(332, 14, 'T3 LIBRE', 2.80, 7.30, 0, 'pg/ml', 0, '[]'),
(333, 14, 'T4 LIBRE', 8.50, 22.50, 0, 'pmol/L', 0, '[]'),
(334, 14, 'TSH (ELISA)', 0.37, 5.10, 0, 'uIU/ml', 0, '[]'),
(335, 14, 'PSA LIBRE', 0.00, 0.00, 0, 'ng/mL', 0, '[]'),
(336, 65, 'ESTRADIOL (ESTROGENO)', 0.00, 0.00, 0, 'pg/mL', 0, '[]'),
(337, 70, 'HEMOGLOBINA GLICOSILADA', 0.00, 0.00, 0, '%', 0, '[]'),
(338, 1, 'VSG', 0.00, 22.00, 34, 'x mm3', 0, '[]'),
(339, 14, 'PROLACTINA EN NIÑOS', 3.20, 20.00, 31, 'ng/ml', 0, '[]'),
(340, 2, 'FOSFORO EN NIÑOS', 4.00, 7.00, 26, 'mg/dl', 0, '[]'),
(341, 4, 'T.P (C)', 0.00, 0.00, 1, 'Seg.', 0, '[]'),
(342, 4, 'T.P (P)', 0.00, 0.00, 1, 'Seg.', 0, '[]'),
(343, 4, 'T.P.T (C)', 0.00, 0.00, 2, 'Seg.', 0, '[]'),
(344, 4, 'T.P.T (P)', 0.00, 0.00, 2, 'Seg.', 0, '[]'),
(345, 8, 'PROTEINA C REACTIVA Cuantitativa', 0.00, 0.00, 5, 'mg/L', 0, '[]'),
(346, 75, 'aiooj', 250.00, 600.00, 15, 'ml', 0, '99'),
(347, 76, 'aiooj', 250.00, 600.00, 15, 'ml', 0, '99'),
(348, 76, 'Leuco', 250.00, 600.00, 15, 'ml', 0, '99'),
(349, 76, 'Leuco3', 250.00, 600.00, 15, 'ml', 0, '22,66');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_examenes_paciente`
--

CREATE TABLE `detalles_examenes_paciente` (
  `id` int(11) NOT NULL,
  `id_dt` int(11) NOT NULL,
  `id_ex` int(11) NOT NULL,
  `id_ex_pac` int(11) NOT NULL,
  `resultado` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes`
--

CREATE TABLE `examenes` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `examenes`
--

INSERT INTO `examenes` (`id`, `nombre`) VALUES
(1, 'HEMATOLOGIA COMPLETA'),
(2, 'QUIMICA SANGUINEA'),
(3, 'GLOBULINAS'),
(4, 'COAGULACION SANGUINEA'),
(5, 'LIPIDOS'),
(6, 'ELECTROLITOS SERICOS'),
(7, 'BACTERIOLOGIA '),
(8, 'SEROLOGIA'),
(9, 'PRUEBAS ESPECIALES                                          '),
(10, 'CURVA DE TOLERANCIA GLUCOSADA '),
(11, 'TEST DE LACTOSA '),
(12, 'HIERRO SERICO '),
(13, 'GLUCOSA POS-PANDRIAL                                        '),
(14, 'PRUEBAS HORMONALES'),
(15, 'PH Y GASES ARTERIALES '),
(16, 'ANALISIS MACROSCOPICO DE LIQUIDO CEFALORRAQUIDEO '),
(17, 'ANALISIS MICROSCOPICO DE LIQUIDO CEFALORRAQUIDEO: '),
(18, 'ANALISIS QUIMICO DE LIQUIDO CEFALORRAQUIDEO: '),
(19, 'ANALISIS MACROSCOPICO LIQUIDO SINOVIAL '),
(20, 'ANALISIS MICROSCOPICO DE LIQUIDO SINOVIAL '),
(21, 'ANALISIS QUIMICO DE LIQUIDO SINOVIAL '),
(22, 'ANALISIS MACROSCOPICO DE LIQUIDO PLEURAL '),
(23, 'ANALISIS MICROSCOPICO DE LIQUIDO PLEURAL '),
(24, 'ANALISIS QUIMICO DE LIQUIDO PLEURAL '),
(25, 'ANALISIS MACROSCOPICO DE LIQUIDO PERICARDIO '),
(26, 'ANALISIS MICROSCOPICO DE LIQUIDO PERICARDIO '),
(27, 'ANALISIS QUIMICO DE LIQUIDO PERICARDIO '),
(28, 'ANALISIS MACROSCOPICO DE LIQUIDO PERITONEAL O ASCITICO '),
(29, 'ANALISIS MICROSCOPICO DE LIQUIDO PERITONEAL O ASCITICO '),
(30, 'ANALISIS QUIMICO DE LIQUIDO PERITONEAL O ASCITICO'),
(31, 'EXAMEN MACROSCOPICO DE ORINA'),
(32, 'CARACTERISTICAS QUIMICAS DE EXAMEN DE ORINA'),
(33, 'EXAMEN MICROSCOPICO DE LA ORINA'),
(34, 'DEPURACION DE CREATININA EN ORINA DE 24 HORAS'),
(35, 'PRUEBA DE EMBARAZO EN ORINA '),
(36, 'PROTEINAS EN ORINA DE 24 HORAS '),
(37, 'CALCIO EN ORINA DE 24 HORAS '),
(38, 'FOSFORO EN ORINA DE 24 HORAS '),
(39, 'ACIDO URICO EN ORINA DE 24 HORAS'),
(40, 'UREA EN ORINA DE 24 HORAS '),
(41, 'SODIO EN ORINA DE 24 HORAS '),
(42, 'POTASIO EN ORINA DE 24 HORAS '),
(43, 'CLORO EN ORINA DE 24 HORAS '),
(44, 'AMILASURIA'),
(45, 'PROTEINA DE BENCE - JONES'),
(46, 'RECUENTO MINUTADO '),
(47, 'EXAMEN DE HECES'),
(48, 'EXAMEN MICROSCOPICO DE HECES METODO DIRECTO '),
(49, 'TRANSAMINASA OXALACETICA                                    '),
(50, 'TRANSAMINASA PIRUVICA                                       '),
(51, 'BILIRRUBINA TOTAL                                           '),
(52, 'BILIRRUBINA DIRECTA                                         '),
(53, 'BILIRRUBINA INDIRECTA                                       '),
(54, 'LACTATO DESHIDROGENASA                                      '),
(55, 'CALCIO SERICO                                               '),
(56, 'ACIDO URICO'),
(57, 'CREATININA                                                  '),
(58, 'UREA                                                        '),
(59, 'PROLACTINA'),
(60, 'PROTEOGRAMA'),
(61, 'HEMATOLOGIA COMPLETA'),
(62, 'BILIRRUBINAS'),
(63, 'GRUPO SANGUINEO'),
(64, 'CALCIO IONICO'),
(65, 'ESTRADIOL'),
(66, 'PROGESTERONA'),
(67, 'FSH                                                                                                                                                   '),
(68, 'LH'),
(69, 'HEPATITIS C'),
(70, 'HEMOGLOBINA GLICOSILADA'),
(71, 'TROPONINA I CUALITATIVA'),
(72, 'Antony'),
(73, 'Antony'),
(74, 'Antony'),
(75, 'daasdads'),
(76, 'daasdads');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes_paciente`
--

CREATE TABLE `examenes_paciente` (
  `id` int(11) NOT NULL,
  `id_ex` int(11) NOT NULL,
  `id_pac` int(11) NOT NULL,
  `id_bio` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NULL DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `niveles_usuario`
--

CREATE TABLE `niveles_usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `niveles_usuario`
--

INSERT INTO `niveles_usuario` (`id`, `nombre`, `descripcion`) VALUES
(1, 'admin', 'Mayor nivel de usuario'),
(2, 'bioanalista', 'Menor nivel de usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `cedula` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` text NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `correo` varchar(40) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `pre_cedula` varchar(2) NOT NULL,
  `genero` varchar(10) DEFAULT NULL,
  `foto_carnet` mediumblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id`, `cedula`, `nombre`, `direccion`, `telefono`, `correo`, `fecha_nacimiento`, `pre_cedula`, `genero`, `foto_carnet`) VALUES
(1, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(2, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(3, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(4, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(5, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(6, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(7, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(8, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(9, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(10, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(11, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(12, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(13, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(14, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(15, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(16, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(17, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(18, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(19, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(20, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(21, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(22, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(23, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL),
(24, 28582670, 'Antony11', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Hombre', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `cedula` int(11) NOT NULL,
  `password` varchar(30) NOT NULL,
  `nivel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `cedula`, `password`, `nivel`) VALUES
(1, 123, '123', 2),
(2, 0, '123', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bioanalistas`
--
ALTER TABLE `bioanalistas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalles_examen`
--
ALTER TABLE `detalles_examen`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalles_examenes_paciente`
--
ALTER TABLE `detalles_examenes_paciente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `examenes`
--
ALTER TABLE `examenes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `examenes_paciente`
--
ALTER TABLE `examenes_paciente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `niveles_usuario`
--
ALTER TABLE `niveles_usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_nivel_usuario` (`nivel`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bioanalistas`
--
ALTER TABLE `bioanalistas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `detalles_examen`
--
ALTER TABLE `detalles_examen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=350;

--
-- AUTO_INCREMENT de la tabla `detalles_examenes_paciente`
--
ALTER TABLE `detalles_examenes_paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `examenes`
--
ALTER TABLE `examenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT de la tabla `examenes_paciente`
--
ALTER TABLE `examenes_paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `niveles_usuario`
--
ALTER TABLE `niveles_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_nivel_usuario` FOREIGN KEY (`nivel`) REFERENCES `niveles_usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
