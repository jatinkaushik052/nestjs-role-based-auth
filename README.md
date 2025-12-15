# NestJS Employee Authentication & Role-Based Authorization API

A backend REST API built with **NestJS** implementing **JWT authentication**, **role-based authorization (RBAC)**, and **restricted employee registration**.

Only authorized roles (e.g. **Admin**) are allowed to register new employees.

---

## 🚀 Features

- ✅ Secure Login with JWT
- 👮 Role-Based Access Control (RBAC)
- 🧑‍💼 **Employee Registration restricted to Admin**
- 🔐 Protected Routes using Guards
- 🔑 Password Hashing (bcrypt)
- 📦 Scalable & Modular Architecture
- 🌍 Environment Configuration using `.env`

---

## 🛠️ Tech Stack

- **NestJS**
- **Node.js**
- **TypeScript**
- **JWT & Passport**
- **bcrypt**
- **dotenv**

---

## 🔐 Authentication & Authorization Rules

### 🔑 Login
- Any registered employee can log in using credentials.
- JWT token is returned on successful login.

### 🧑‍💼 Employee Registration (Restricted)
- **Public registration is disabled**
- Only users with specific roles can register employees:
  - `ADMIN`


Example:
```ts
@Roles('ADMIN')
@UseGuards(JwtAuthGuard, RolesGuard)
@Post('register')
registerEmployee() {
  // register employee logic
}
