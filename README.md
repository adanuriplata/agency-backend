# Agency Backend

Backend system for a digital agency to manage client accounts, collaborator access, and automate operations using AI.

## 🚀 Main Features

* ✅ Manage clients and their service accounts (CPanel, WordPress, etc.)
* ✅ Manage internal collaborators and their tool access (Slack, Asana, etc.)
* ✅ Reassign accounts to new collaborators
* ✅ (Planned) PDF generation with liability clauses
* ✅ (Planned) Smart automation tasks: reminders, access audits, auto-responses

---

## 🧱 Tech Stack

* **Node.js + Express** – Lightweight HTTP server
* **TypeScript** – Type-safe development
* **Prisma ORM** – Database modeling and PostgreSQL access
* **PostgreSQL** – Relational database
* **Railway** – Backend & DB hosting
* **Zod (optional)** – Data validation

---

## 📁 Project Structure

```
src/
├── index.ts               # Main app entrypoint
├── routes/                # Organized endpoints
│   ├── collaborators.ts
│   ├── accessRecords.ts
│   └── reassignAccess.ts
prisma/
├── schema.prisma          # Data models
.env                       # Environment variables (not committed)
```

---

## 🛠 Setup & Development

1. Clone the repository:

```bash
git clone https://github.com/your-username/agency-backend.git
cd agency-backend
```

2. Install dependencies:

```bash
npm install
```


3. Create a `.env` file with your PostgreSQL connection string and API token:

```env
DATABASE_URL=postgresql://user:password@host:port/db
CORS_ORIGIN=http://localhost:3000
API_TOKEN=your-secret-token
```

4. Push the schema to your database:

```bash
npx prisma db push
```

5. Start the development server:

```bash
npm run dev
```

---
## 🔐 Authentication

All endpoints (except `/health`) require a bearer token set via the `Authorization` header.

```http
Authorization: Bearer <your-token>
```

---


## API Endpoints

### Access Records

| Method | Endpoint | Body Fields |
| ------ | -------- | ----------- |
| `GET`  | `/access-records` | – |
| `GET`  | `/access-records/:id` | – |
| `POST` | `/access-records` | `service`, `username`, `password`, `url`, `notes?`, `collaboratorId` |
| `PUT`  | `/access-records/:id` | Same as `POST` |
| `DELETE` | `/access-records/:id` | – |

The `/reassign-access` endpoint now also accepts an array `accessIds` to move multiple accounts in one request:

```json
{
  "accessIds": ["id1", "id2"],
  "newCollaboratorId": "colabId"
}
```

---

## 🚀 Deployment with Railway

* Connect this GitHub repo to your Railway project.
* Set the `DATABASE_URL` and `CORS_ORIGIN` environment variables in Railway.
* Railway will auto-deploy on every `git push`.

---

## 📌 Upcoming Features

* [ ] REST endpoints for clients and client accounts
* [ ] PDF generation with dynamic data
* [ ] Frontend integration with Next.js
* [ ] Access audit and task automation powered by AI (e.g., OpenAI)

---

## 📄 License

MIT © 2025 \[Your Name or Agency]
