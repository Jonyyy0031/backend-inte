# Prueba técnica

API REST para gestionar episodios de Rick & Morty y poder añadir manualmente

## Requisitos Previos
- Node.js 18+
- MongoDB 6+
- npm o yarn

## Instalación

```bash
npm install
# Configurar variables en .env
cp .env.example .env
npm run dev
```


## Variables de Entorno
Ver `.env.example`

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