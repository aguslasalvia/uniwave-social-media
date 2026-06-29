# 🌊 uniwave — Red Social Universitaria Uruguaya

**uniwave** es una **red social universitaria uruguaya** creada para conectar a **estudiantes de distintas universidades** que comparten **gustos, intereses y conocimientos**.  
Su propósito es fomentar la colaboración, el intercambio de ideas y la creación de comunidades dentro del entorno académico. 🎓🇺🇾

---

## 🧠 Descripción

uniwave busca ofrecer una experiencia moderna y accesible donde los estudiantes puedan:
- 👥 Conectarse con otros usuarios universitarios.
- 📝 Compartir publicaciones, pensamientos e intereses.
- 💬 Interactuar mediante comentarios y reacciones.
- 🔔 Mantenerse actualizados con lo que sucede en su entorno educativo.

---

## ⚙️ Tecnologías utilizadas

### 📱 **Aplicación móvil**
- **React Native** — interfaz móvil multiplataforma.
- **Expo** — entorno de desarrollo, testing y build.
- **TypeScript** — tipado estático y mejor mantenimiento del código.

### 🔙 **Backend**
- **Go (Golang)** — API REST ligera y eficiente.
- **Gin** — framework para manejo de rutas, controladores y middlewares.
- **PostgreSQL** — base de datos relacional para la persistencia de los datos.
- **GORM** — ORM para el acceso a datos y las migraciones del esquema.
- **MinIO** — sistema de almacenamiento tipo *object storage* autoalojado, utilizado como alternativa local a AWS S3 para el manejo de imágenes y archivos multimedia.

---

## 🧩 Arquitectura general

La arquitectura del proyecto está dividida en capas principales:
1. **Frontend móvil (React Native + Expo)** — experiencia de usuario.
2. **Backend (Go + Gin)** — gestión de usuarios, publicaciones y autenticación.
3. **PostgreSQL** — persistencia de datos relacional.
4. **MinIO** — almacenamiento de imágenes y archivos multimedia.

---

## 🚀 Objetivo del proyecto
Crear una **plataforma digital para estudiantes universitarios uruguayos**, promoviendo el aprendizaje compartido, la interacción y la conexión entre personas con intereses y conocimientos similares.

---

## 🛠️ Puesta en marcha (desarrollo)

### Requisitos
- Go 1.24+
- Bun (o npm) para el cliente y la landing
- **PostgreSQL** (base de datos relacional)
- **MinIO** o un bucket S3 compatible (para imágenes)
- Una cuenta de Gmail con *app password* para los correos de activación

> Opcional: `docker compose up` levanta PostgreSQL y MinIO listos para usar.
> El backend se ejecuta de forma nativa (no se containeriza), así que podés
> correr la app con o sin Docker.

### Backend (`server/`)
1. Copiá las variables de entorno: `cp server/.env.example server/.env` y completalas.
2. Asegurate de tener PostgreSQL corriendo (nativo o con `docker compose up`).
3. Iniciá la API: `cd server && go run ./cmd/uniwave` (corre en `:8080`).

Al arrancar, el servidor crea/actualiza las tablas automáticamente (GORM
AutoMigrate) y, si la tabla de universidades está vacía, carga algunas de ejemplo.

### Cliente móvil (`client/`)
1. `cd client && bun install`
2. Ajustá `extra.apiUrl` en `client/app.json` con la IP/host de tu backend
   (en dispositivo físico usá la IP de tu PC en la LAN, no `localhost`).
3. `bun run start` y abrí la app con Expo Go.

### Endpoints principales
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/auth/register` | — | Registro + correo de activación |
| POST | `/auth/activate` | — | Activa la cuenta con el token del correo |
| POST | `/auth/login` | — | Login, devuelve JWT + tema |
| GET | `/posts/latest` | ✅ | Feed con autor, likes y nº de comentarios |
| POST | `/posts/create` | ✅ | Crea post (JSON o multipart con imágenes) |
| POST | `/posts/like` | ✅ | Da like |
| DELETE | `/posts/dislike` | ✅ | Quita like |
| PUT | `/posts/update` | ✅ | Edita contenido/privacidad (solo autor) |
| DELETE | `/posts/delete` | ✅ | Borra post (solo autor) |
| GET | `/comments/?postId=` | ✅ | Lista comentarios de un post |
| POST | `/comments/create` | ✅ | Crea comentario |
| GET | `/user/stats` | ✅ | Posts / seguidores / seguidos |
| POST | `/user/avatar` | ✅ | Sube foto de perfil (multipart) |
| PATCH | `/user/update` | ✅ | Actualiza el perfil propio |
| GET | `/settings/` | ✅ | Configuración del usuario |
| GET | `/universities/all` | — | Universidades activas |

> Las imágenes se suben a MinIO y se sirven por su URL pública
> (`MINIO_PUBLIC_URL`). Los buckets `avatars` y `posts` se crean
> automáticamente con política de lectura pública al iniciar el servidor.

---

📍 *Proyecto en desarrollo con fines académicos y sociales.*  
👨‍💻 Autor: [AgusLasalvia](https://github.com/AgusLasalvia)
