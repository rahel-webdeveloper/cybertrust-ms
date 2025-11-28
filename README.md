# Cyber-Trust MS

#### 📸 Dashboard

![Dashboard Screenshot](./dashboard0.png)

## 🚀 Overview
Cyber-Trust MS is a **monorepo management system** built for learning and contribution.  
It combines a **React + Chakra UI frontend** with a **Node.js/Mongoose backend**, all managed with **Bun** as the package manager and runtime.  

The system demonstrates **role-based access control** (Admin, Manager, Developer) and includes a rich dashboard with multiple modules for employees, projects, tasks, costs, quotations, and more.

---

## 🛠 Tech Stack
- **Package Manager & Runtime:** [Bun](https://bun.sh)
- **Frontend:**
  - React
  - Chakra UI (UI components)
  - React Query (data fetching & caching)
  - Zustand (state management)
  - Axios (API calls with interceptors)
- **Backend:**
  - Node.js (via Bun runtime)
  - Express.js
  - MongoDB + Mongoose (ODM)
  - Faker.js (seed data for testing)
- **Language:** TypeScript (strict typing across client & server)

---

## 📂 Monorepo Structure

root/ ├── packages/ 
      ├── client/   # React + Chakra UI frontend
      └── server/   # Express + Mongoose backend  
      ├── package.json   # Bun workspace config  
      └── README.md      # Project documentation



---

## 🔑 Features
- **Role-based access control**
  - Admin → Full control (create, delete, filter, sort employees)
  - Manager → Limited dashboard access
  - Developer → Task/project visibility
- **Dashboard Pages**
  - Employees list (filter, sort, CRUD by Admin)
  - Top employees
  - Projects
  - Costs
  - Tasks
  - Quotations
  - Settings
  - About
- **Seed Data**
  - `/seed` endpoint (currently commented out)
  - Uses Faker.js to populate test data for all schemas
- **Authentication**
  - Login system with JWT
  - Token stored securely in **localStorage**
  - Axios interceptors handle refresh flows

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/cyber-trust-ms.git
cd cyber-trust-ms
```

### 2. Install dependencies
```bash
bun install
```

### 3. Install dependencies
The monorepo is configured with a single dev script
```bash
bun dev
#or
bun run dev
```
This runs both client and server in parallel using Bun workspaces.


### 4. Environment variables
Create a .env file in packages/server/ with

nvironment variables
Create a .env file in packages/server/ and copy name from env.example i created in server and client.


### 5. Seed data (optional)
Uncomment the /seed endpoint in server and run:
http://localhost:5000/seed


This will populate MongoDB with fake data for testing.

### 🤝 Contributing
#### Contributions are welcome!
- Fork the repo
- Create a feature branch (git checkout -b feature/your-feature)
- Commit changes (git commit -m "Add feature")
- Push to branch (git push origin feature/your-feature)
- Open a Pull Request
Coding style:
- Use TypeScript everywhere
- Follow RESTful API conventions
- Keep components modular and reusable

#### 📄 License
This project is licensed under the MIT License — free to use, modify, and distribute.





