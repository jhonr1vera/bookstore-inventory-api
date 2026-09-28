# Bookstore Inventory API

API REST para gestión de inventario de una librería, construida con NestJS, TypeORM y PostgreSQL.

## Elección del Proyecto

Elegí NestJS porque es el framework con el que tengo mayor experiencia y me permite desarrollar la solución de forma eficiente, manteniendo una arquitectura modular y buenas prácticas de separación de responsabilidades. Además, sus módulos nativos, inyección de dependencias, validación mediante DTOs y facilidad de integración con TypeORM y PostgreSQL se ajustan directamente a los requerimientos de la prueba. Aunque se indica una preferencia por Django, el enunciado no lo establece como requisito obligatorio, por lo que consideré NestJS una alternativa adecuada para entregar una solución sólida y mantenible.

## Requisitos Previos

- [Docker](https://www.docker.com/) y Docker Compose
- Node.js >= 20.x (solo si se desea ejecutar sin Docker)
- [PostgreSQL](https://www.postgresql.org/download/) 16
- Git

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd bookstore-inventory-api
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Las variables principales en `.env`:

| Variable                | Descripción                      | Default                                          |
| ----------------------- | -------------------------------- | ------------------------------------------------ |
| `PORT`                  | Puerto de la API                 | `3000`                                           |
| `DB_HOST`               | Host de PostgreSQL               | `localhost`                                      |
| `DB_PORT`               | Puerto de PostgreSQL             | `5432`                                           |
| `DB_USERNAME`           | Usuario de la base de datos      | `postgres`                                       |
| `DB_PASSWORD`           | Contraseña de la base de datos   | `postgres`                                       |
| `DB_DATABASE`           | Nombre de la base de datos       | `bookstore_db`                                   |
| `EXCHANGE_RATE_API_URL` | URL de la API de tasas de cambio | `https://api.exchangerate-api.com/v4/latest/USD` |

### 3. Ejecutar con Docker (recomendado)

```bash
docker compose up --build -d
```

Esto levanta dos contenedores:

- **bookstore-api** — la aplicación NestJS en el puerto configurado (default `3000`)
- **bookstore-postgres** — PostgreSQL 16

Verificar que la API está corriendo:

```bash
docker compose logs api
```

### 4. Ejecutar sin Docker (desarrollo local)

```bash
npm install
npm run start:dev
```

> Requiere una instancia de PostgreSQL corriendo localmente con las credenciales del `.env`.

## Flujo de Desarrollo

Para aplicar cambios en el código con Docker:

```bash
docker compose down
docker compose up --build -d
```

## Ejemplos de Uso de los Endpoints

Base URL: `http://localhost:3000`

### Crear un libro

```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Cien años de soledad",
    "author": "Gabriel García Márquez",
    "isbn": "978-00-608-8328-7",
    "cost_usd": 15.99,
    "stock_quantity": 25,
    "category": "Literatura Clásica",
    "supplier_country": "CO"
  }'
```

### Obtener todos los libros (con paginación)

```bash
curl http://localhost:3000/books?page=1&limit=10
```

### Obtener un libro por ID

```bash
curl http://localhost:3000/books/1
```

### Actualizar un libro

```bash
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "stock_quantity": 30,
    "cost_usd": 17.99
  }'
```

### Eliminar un libro

```bash
curl -X DELETE http://localhost:3000/books/1
```

### Calcular precio de venta local

Calcula el precio de venta aplicando la tasa de cambio USD → moneda local y un margen de ganancia del 40%.

```bash
curl -X POST http://localhost:3000/books/1/calculate-price
```

Respuesta:

```json
{
  "book_id": 1,
  "cost_usd": 15.99,
  "exchange_rate": 3334.28,
  "cost_local": 53315.34,
  "margin_percentage": 40,
  "selling_price_local": 74641.48,
  "currency": "COP",
  "calculation_timestamp": "2025-01-15T10:30:00Z"
}
```

### Buscar libros por categoría

```bash
curl "http://localhost:3000/books/search?category=Ficción"
```

Categorías disponibles: `Literatura Clásica`, `Ficción`, `Fantasía`, `Ciencia Ficción`, `Historia`, `Biografía`, `Misterio`, `Otro`.

### Obtener libros con bajo stock

```bash
curl "http://localhost:3000/books/low-stock?threshold=10"
```

## Tests

```bash
npm run test
```
