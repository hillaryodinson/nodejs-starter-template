# 🧱 Node Boiler Template

A **Node.js + TypeScript** boilerplate designed for **fast prototyping** of scalable backend applications. It comes preconfigured with best practices, security middleware, environment setup, and commonly used developer tools.

---

## 🚀 Features

-   **TypeScript Ready** – Full TypeScript support for better type safety.
-   **Express.js** – Lightweight, flexible, and fast web framework.
-   **Prisma ORM** – Type-safe database management.
-   **EJS View Engine** – For rendering dynamic templates.
-   **Environment Variables** – Managed with `dotenv`.
-   **Authentication Ready** – JWT-based authentication support.
-   **Security Middleware** – Includes `helmet`, `rate-limiter`, and input validation.
-   **File Uploads** – Supports file uploads with `multer`.
-   **Email Support** – Configured with `nodemailer`.
-   **Cron Jobs** – Automate recurring tasks with `node-cron`.
-   **API Documentation** – Built-in Swagger support for API docs.
-   **Zod Validation** – Runtime schema validation for payloads.

---

## 🧩 Project Structure

```bash
├── prisma/              # Prisma schema and migrations
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── config/          # Config files (env, db, etc.)
│   ├── middlewares/     # Express middlewares
│   ├── routes/          # API routes definitions
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   ├── types/           # TypeScript custom types
│   └── index.ts         # App entry point
├── .env                 # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Scripts

| Command            | Description                                 |
| ------------------ | ------------------------------------------- |
| `npm run generate` | Generate Prisma client                      |
| `npm run migrate`  | Run Prisma migrations                       |
| `npm run seed`     | Seed the database                           |
| `npm run dev`      | Start development server with `ts-node-dev` |
| `npm run build`    | Compile TypeScript into JavaScript          |

---

## 🧰 Tech Stack

-   **Node.js** – Runtime environment
-   **TypeScript** – Superset of JavaScript
-   **Express.js** – Web framework
-   **Prisma** – ORM for database access
-   **EJS** – Template engine
-   **Zod** – Validation library
-   **JWT** – Authentication tokens
-   **Nodemailer** – Email service
-   **Helmet** – Security middleware
-   **Multer** – File uploads
-   **Swagger** – API documentation
-   **Node-cron** – Scheduled jobs

---

## 🔧 Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/node-boiler-template.git
cd node-boiler-template
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and define:

```env
PORT=4000
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
JWT_SECRET=your_jwt_secret
APPNAME=Node Boiler Template
EMAIL_USER=example@email.com
EMAIL_PASS=yourpassword
```

### 4️⃣ Run Database Migrations & Seed

```bash
npm run migrate
npm run seed
```

### 5️⃣ Start Development Server

```bash
npm run dev
```

Your app should now be running at [http://localhost:4000](http://localhost:4000)

---

## 🧪 API Documentation (Swagger)

Once the server is running, visit:

```
http://localhost:4000/api-docs
```

---

## 🧱 Example EJS Template

```ejs
<p class="text-center text-muted">
  &copy; Copyright <%= new Date().getFullYear() %> <%= process.env.APPNAME %>
</p>
```

---

## 🧠 Notes

-   Modify `prisma/schema.prisma` to suit your database models.
-   Use `Zod` or `express-validator` for payload validation.
-   Define reusable services under `src/services`.
-   Use `morgan` for request logging during development.

---

## 🪪 License

MIT © 2025 **Node Boiler Template**
