# Proyecto Final Docker y Docker Compose

Institución Universitaria EAM  

Armenia, Colombia

## Objetivo

Implementar una arquitectura basada en múltiples contenedores utilizando Docker y Docker Compose, garantizando:

- Construcción de imágenes personalizadas
- Comunicación entre contenedores
- Redes Docker personalizadas
- Persistencia de datos
- Inicialización automática de base de datos
- Orquestación completa de servicios

---

# Arquitectura

La solución está compuesta por los siguientes servicios:

| Servicio | Tecnología | Puerto | Función |
|---|---|---|---|
| java-service | Java Spring Boot | 8080 | Registro y consulta de estudiantes |
| python-service | Python 3.11 Flask | 5000 | Generación de estadísticas |
| node-service | Node.js 20 Express | 3000 | Integración y reportes |
| db | MySQL 8 | 3306 | Persistencia de datos |

---

# Estructura del Proyecto

```bash
proyecto-final/
│
├── docker-compose.yml
├── init.sql
├── README.md
│
├── java-service/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/
│
├── python-service/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app.py
│
├── node-service/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
```

## Requisitos Previos

Se debe tener instalado:

- Docker
- Docker Compose

Verificar instalación:
```bash
docker --version
docker compose version
```

## Construcción del Proyecto

Ubicarse en la raíz del proyecto y ejecutar:
```bash
docker compose build
```

## Ejecucar Proyecto

Levantar todos los servicios:

```bash
docker compose up -d
```

Verificar contenedores:

```bash
docker ps
```
## Detener Proyecto
```bash
docker compose down
```

## Redes Docker

Se implementa una red personalizada tipo bridge:

- Nombre: `proyecto_net`
- Subnet: `172.20.0.0/24`
- Gateway: `172.20.0.1`

IPs asignadas

| Servicio | IP |
| -------- | ------- |
| db             | 172.20.0.2    |
| java-service   | 172.20.0.3    |
| python-service | 172.20.0.4    |
| node-service   | 172.20.0.5    |


## Comunicación entre Servicios

### Utilizando nombres de servicio

Ejemplo:
```
http://java-service:8080
```

### Utilizando IP fija

Ejemplo:
```
http://172.20.0.4:5000
```

## Persistencia de Datos

Se implementa un volumen Docker:

```yml
volumes:
  mysql_data:
```

Montado en:
```
/var/lib/mysql
```
Esto garantiza persistencia incluso si el contenedor es eliminado.

## Inicialización Automática de Base de Datos

El archivo `db/init.sql` es montado automáticamente en:

```
/docker-entrypoint-initdb.d/
```
Al iniciar por primera vez:

- Se crea la base de datos
- Se crean tablas
- Se insertan datos semilla

## Variables de Entorno
### MySQL
|Variable	|Valor|
|------|------|
|MYSQL_ROOT_PASSWORD	|root123|
|MYSQL_DATABASE	|universidad|
## Dockerfiles

Cada servicio cuenta con:

- Imagen base adecuada
- WORKDIR
- COPY
- Instalación de dependencias
- EXPOSE
- CMD

## Endpoints
### Servicio Java
```
GET http://localhost:8080/estudiantes
```
### Servicio Python
```
GET http://localhost:5000/stats
```
### Servicio Node
```
GET http://localhost:3000/reporte
```
## Resultado Esperado
```json
{
  "estudiantes": [
    {
      "id": 1,
      "nombre": "Michael Poveda",
      "carrera": "Ingeniería de Sistemas"
    }
  ],
  "estadisticas": {
    "total_estudiantes": 2
  }
}
```
## Validaciones
### Verificar red Docker
```bash
docker network inspect proyecto-final_proyecto_net
```
### Verificar logs
```bash
docker compose logs -f
```
### Verificar persistencia
1. Insertar datos
2. Ejecutar:
```bash
docker compose down
```
3. Levantar nuevamente:
```bash
docker compose up -d
```
4. Verificar que los datos continúan almacenados.

## Healthchecks

Se implementa un healthcheck para MySQL:

```yml
healthcheck:
  test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
```
Esto evita que los servicios dependientes fallen mientras MySQL inicializa.

## Políticas de Reinicio

Se implementan políticas:
```yml
restart: always
```
y
```yml
restart: on-failure
```
para mejorar tolerancia a fallos.

## Tecnologías Utilizadas
- Docker
- Docker Compose
- Java Spring Boot
- Python Flask
- Node.js Express
- MySQL 8

# Autor
Michael Poveda

Ingeniería de Sistemas

ENSTA