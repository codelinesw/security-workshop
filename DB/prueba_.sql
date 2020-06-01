-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 01-06-2020 a las 03:37:21
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba_`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `mensajes_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `mensajes` text COLLATE utf8_spanish_ci NOT NULL,
  `estado` int(11) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`mensajes_id`, `users_id`, `mensajes`, `estado`, `fecha`) VALUES
(1, 3, 'Tengo un problema con mi conexion al wi-fi como lo puedo solucionar, necesito ayuda', 1, '2020-05-30 00:00:00'),
(2, 3, 'Pero sr usted al comienzo me dijo que el servicio de internet era lo mejor que tenia este hostal', 1, '2020-05-31 00:00:00'),
(3, 2, 'Sr tengo problemas para pagar los servicios publicos', 1, '2020-05-31 08:10:00'),
(4, 2, 'Sr tambien quiero tener una cuenta en google cloud', 1, '2020-05-31 17:10:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `respuesta_id` int(11) NOT NULL,
  `mensaje_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `mensaje` text COLLATE utf8_spanish_ci NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`respuesta_id`, `mensaje_id`, `users_id`, `mensaje`, `fecha`) VALUES
(9, 1, 1, 'Cualquier cosa dice Diego', '2020-05-31 11:53:29'),
(10, 1, 1, 'Otra vez', '2020-05-31 11:53:47'),
(11, 2, 1, 'Hablamos luego', '2020-05-31 11:54:23'),
(12, 1, 1, 'Otra prueba nueva', '2020-05-31 11:54:43'),
(13, 3, 1, 'Si, disculpeme', '2020-06-01 12:54:13'),
(14, 4, 1, 'Ya le ayudo', '2020-06-01 12:54:20'),
(15, 4, 1, 'Por favor deme 5 minutos', '2020-06-01 12:54:31'),
(16, 3, 1, 'Ya vuelvo', '2020-06-01 12:54:42'),
(17, 3, 1, 'Otra respuesta para jhon murillo', '2020-06-01 12:57:13'),
(18, 4, 1, 'Otra prueba', '2020-06-01 03:15:42'),
(21, 2, 1, 'Final prueba', '2020-06-01 03:16:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `rol_id` int(11) NOT NULL,
  `name` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`rol_id`, `name`) VALUES
(1, 'Admin'),
(2, 'Cliente'),
(3, 'Guarda');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` int(10) NOT NULL,
  `user` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `pass` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `status` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `fechacreacion` date NOT NULL,
  `fechaactualizacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `telefono`, `user`, `pass`, `status`, `rol_id`, `fechacreacion`, `fechaactualizacion`) VALUES
(1, '', 0, 'diego', '123456', 1, 1, '0000-00-00', '0000-00-00'),
(2, 'jhondember0424@gmail.com', 154665, 'Jhon Denver', '12345677', 1, 2, '0000-00-00', '0000-00-00'),
(3, 'codelinesw@gmail.com ', 109876, 'Pepito', '123456', 1, 2, '0000-00-00', '0000-00-00'),
(4, 'jhon.murillo03@gmail.com ', 109876, 'pedro', '123456', 1, 3, '0000-00-00', '0000-00-00'),
(5, 'anzi123@gmail.com', 123456789, 'Ancizar', '123456', 1, 2, '2020-06-01', '2020-06-01');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`mensajes_id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`respuesta_id`),
  ADD KEY `mensaje_id` (`mensaje_id`),
  ADD KEY `respuestas_id` (`users_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`rol_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `mensajes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `respuesta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `respuestamensaje_id` FOREIGN KEY (`mensaje_id`) REFERENCES `mensajes` (`mensajes_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `respuestas_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `rol_id` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`rol_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
