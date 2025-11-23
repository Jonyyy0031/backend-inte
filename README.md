# Prueba técnica

API REST para gestionar episodios de Rick & Morty y poder añadir manualmente

## Requisitos Previos
- Node.js 18+
- MongoDB 6+
- Docker
- Docker-compose (aunque ya deberia venir con docker)
- npm o yarn

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Jonyyy0031/backend-inte.git
# Entrar a la carpeta
cd backend-inte
# Instalar dependencias
npm install
# Configurar variables en .env
cp .env.example .env
```

## Comandos de docker (mongodb)
```bash
# Iniciar el servicio de base de datos
npm run docker
# Detener docker
npm run docker:stop
# Ver logs de docker
npm run docker:logs
```

## Correr el proyecto
```bash
# Iniciar docker
npm run docker
# Iniciar el servidor
npm run dev
```




## Variables de Entorno
```
### MONGO DB CONFIGURATION
MONGO_INITDB_ROOT_USERNAME=exampleuser
MONGO_INITDB_ROOT_PASSWORD=examplepass
MONGODB_URI=mongodb://exampleuser:examplepass@localhost:27017/apidb?authSource=admin

### PORT CONFIGURATION
PORT=3000
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/sync | Sincroniza episodios |
| GET | /api/episodes | Lista todos |
| GET | /api/episodes/:id | Obtiene uno |
| POST | /api/episodes | Crea episodio |
| PATCH | /api/episodes/:id/favorite | Marca favorito |
| DELETE | /api/episodes/:id | Elimina episodio |

## Tecnologías
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- Docker

## Dependencias
- Typescript
- Mongoose
- tsx para desarrollo