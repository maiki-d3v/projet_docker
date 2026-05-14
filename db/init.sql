
CREATE DATABASE IF NOT EXISTS universidad;

USE universidad;

CREATE TABLE IF NOT EXISTS estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    carrera VARCHAR(100)
);

INSERT INTO estudiantes(nombre, carrera)
VALUES
('Michael Poveda', 'Ingeniería de Sistemas'),
('Adelle Picart', 'Ingeniera agronoma');