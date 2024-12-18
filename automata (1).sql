-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-12-2024 a las 17:16:09
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `automata`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auditoria`
--

CREATE TABLE `auditoria` (
  `ID_AUDITORIA` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `FECHA_HORA` datetime NOT NULL,
  `ACCION` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `ID_CAT` int(11) NOT NULL,
  `NOM_CAT` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_ventas`
--

CREATE TABLE `detalle_ventas` (
  `id_detalle` int(11) NOT NULL,
  `id_venta` int(11) NOT NULL,
  `cod_barra` varchar(255) NOT NULL,
  `nom_produ` varchar(255) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_ventas`
--

INSERT INTO `detalle_ventas` (`id_detalle`, `id_venta`, `cod_barra`, `nom_produ`, `cantidad`, `precio`, `subtotal`) VALUES
(1, 1, '2432432', 'DFSDFF', 56, 14.00, 784.00),
(2, 2, '2432432', 'DFSDFF', 84, 14.00, 1176.00),
(3, 3, '2432432', 'DFSDFF', 21, 14.00, 294.00),
(4, 3, '1234564', 'coca 1000', 16, 25.00, 400.00),
(5, 4, '2432432', 'DFSDFF', 11, 14.00, 154.00),
(6, 5, '2432432', 'DFSDFF', 10, 14.00, 140.00),
(7, 7, '2432432', 'DFSDFF', 10, 14.00, 140.00),
(8, 9, '2432432', 'DFSDFF', 10, 14.00, 140.00),
(9, 11, '2432432', 'DFSDFF', 10, 14.00, 140.00),
(10, 14, '2432432', '', 6, 14.00, 84.00),
(11, 15, '2432432', '', 6, 14.00, 84.00),
(12, 16, '123456', '', 2, 24.00, 48.00),
(13, 17, '2432432', '', -1, 14.00, -14.00),
(14, 18, '123456', '', 7, 24.00, 168.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos_inventario`
--

CREATE TABLE `movimientos_inventario` (
  `ID_MOVIMIENTO` int(11) NOT NULL,
  `ID_PROD` int(11) NOT NULL,
  `TIPO_MOVIMIENTO` enum('entrada','salida') NOT NULL,
  `CANTIDAD` int(11) NOT NULL,
  `FECHA` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `ID_PROD` int(11) NOT NULL,
  `COD_BARRA` varchar(50) NOT NULL,
  `NOM_PRODU` varchar(100) NOT NULL,
  `CANT_PROD` int(11) NOT NULL DEFAULT 0,
  `PROVEEDOR` varchar(100) DEFAULT NULL,
  `ESPECIFICACIONES` text DEFAULT NULL,
  `EC_CAD_PROD` date DEFAULT NULL,
  `COST_COMP` decimal(10,2) DEFAULT NULL,
  `COST_VENT` decimal(10,2) DEFAULT NULL,
  `ID_CAT` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`ID_PROD`, `COD_BARRA`, `NOM_PRODU`, `CANT_PROD`, `PROVEEDOR`, `ESPECIFICACIONES`, `EC_CAD_PROD`, `COST_COMP`, `COST_VENT`, `ID_CAT`) VALUES
(1, '2432432', 'DFSDFF', 0, 'SDFEFD', 'DFSDFS', '2024-12-11', 12.00, 14.00, NULL),
(2, '123456', 'coca 600', 45, 'coca', 'dfwfwf', '2025-02-12', 18.00, 24.00, NULL),
(3, '1234564', 'coca 1000', 24, 'coca', 'fwdedveg', '2024-12-26', 20.00, 25.00, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID_USER` int(11) NOT NULL,
  `NOM_USER` varchar(100) NOT NULL,
  `AP_USER` varchar(100) NOT NULL,
  `AM_USER` varchar(100) DEFAULT NULL,
  `TIPO_USER` enum('admin','cliente','empleado') NOT NULL,
  `CLAVE_USER` varchar(255) NOT NULL,
  `TEL_USER` varchar(15) DEFAULT NULL,
  `MAIL_USER` varchar(100) DEFAULT NULL,
  `DIRECCION` text DEFAULT NULL,
  `FECHA_CREACION` datetime DEFAULT current_timestamp(),
  `FECHA_MODIFICACION` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID_USER`, `NOM_USER`, `AP_USER`, `AM_USER`, `TIPO_USER`, `CLAVE_USER`, `TEL_USER`, `MAIL_USER`, `DIRECCION`, `FECHA_CREACION`, `FECHA_MODIFICACION`) VALUES
(1, 'Juan', 'Pérez', 'Gómez', 'admin', '12345', '1234567890', 'juan@mail.com', NULL, '2024-12-16 02:28:38', '2024-12-16 02:28:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id_venta`, `id_user`, `total`, `fecha`) VALUES
(1, 1, 784.00, '2024-12-17 18:24:17'),
(2, 1, 1176.00, '2024-12-17 18:28:31'),
(3, 1, 694.00, '2024-12-17 18:29:50'),
(4, 1, 154.00, '2024-12-17 18:39:04'),
(5, 1, 140.00, '2024-12-17 18:43:14'),
(7, 1, 140.00, '2024-12-17 18:43:16'),
(9, 1, 140.00, '2024-12-17 18:43:16'),
(11, 1, 140.00, '2024-12-17 18:43:16'),
(14, 1, 84.00, '2024-12-17 18:44:56'),
(15, 1, 84.00, '2024-12-17 18:45:14'),
(16, 1, 48.00, '2024-12-17 18:45:32'),
(17, 1, -14.00, '2024-12-17 18:52:26'),
(18, 1, 168.00, '2024-12-17 18:52:58');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auditoria`
--
ALTER TABLE `auditoria`
  ADD PRIMARY KEY (`ID_AUDITORIA`),
  ADD KEY `fk_auditoria_usuario` (`ID_USER`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`ID_CAT`);

--
-- Indices de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_venta` (`id_venta`);

--
-- Indices de la tabla `movimientos_inventario`
--
ALTER TABLE `movimientos_inventario`
  ADD PRIMARY KEY (`ID_MOVIMIENTO`),
  ADD KEY `fk_movimientos_producto` (`ID_PROD`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`ID_PROD`),
  ADD KEY `fk_productos_categoria` (`ID_CAT`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID_USER`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `auditoria`
--
ALTER TABLE `auditoria`
  MODIFY `ID_AUDITORIA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `ID_CAT` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `movimientos_inventario`
--
ALTER TABLE `movimientos_inventario`
  MODIFY `ID_MOVIMIENTO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `ID_PROD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID_USER` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `auditoria`
--
ALTER TABLE `auditoria`
  ADD CONSTRAINT `fk_auditoria_usuario` FOREIGN KEY (`ID_USER`) REFERENCES `usuario` (`ID_USER`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD CONSTRAINT `detalle_ventas_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`);

--
-- Filtros para la tabla `movimientos_inventario`
--
ALTER TABLE `movimientos_inventario`
  ADD CONSTRAINT `fk_movimientos_producto` FOREIGN KEY (`ID_PROD`) REFERENCES `productos` (`ID_PROD`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_productos_categoria` FOREIGN KEY (`ID_CAT`) REFERENCES `categorias` (`ID_CAT`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`ID_USER`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
