<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->


Project Title
QuickAI — A SaaS AI Toolkit
1. Problem Statement
Content creators, freelancers, and teams often rely on multiple scattered AI tools for writing,
design, and career help (e.g., article writers, image editors, resume analyzers). However:
 Each tool requires separate authentication and billing
 There is no unified dashboard to track usage or files
 Deployment and backend integration (AI models, database, storage, billing) require
engineering skills
 Existing AI platforms lack CRUD management, filtering, and centralized data control
QuickAI solves this by providing a single SaaS platform with modular AI utilities,
subscription billing, secure JWT authentication, database-backed usage tracking, and scalable
infrastructure.
2. Project Objectives
 Build a full-stack AI SaaS platform with authentication, billing, and AI services
 Implement JWT-based Authentication & Authorization
 Implement CRUD operations with PostgreSQL + Prisma (including PUT and
DELETE)
 Add searching, sorting, filtering, and pagination for AI-generated content
 Integrate AI services (OpenAI/Replicate) for article, image, and resume features
 Deploy production-ready app (Frontend, Backend, Database, File Storage)
3. System Architecture (High-Level)
Frontend (React + JWT)
↓
Backend REST API (Node + Express)
↓
Database (Neon PostgreSQL + Prisma ORM)
↓
Storage (AWS S3 / DigitalOcean Spaces)
↓
AI Providers (OpenAI / Replicate API)
↓
Billing (Stripe Subscriptions + Webhooks)
Responsibilities Breakdown
Layer Responsibilities
Frontend (React) UI, JWT auth, role-based access, dashboard, CRUD UI
Backend (Express) JWT validation, CRUD API, Stripe billing, AI orchestration
Database (Postgres / Neon) Users, subscriptions, AI jobs, usage logs
Storage (S3 / Spaces) Uploaded images, resume files, generated images
Deployment Frontend → Vercel, Backend → Render/Railway, DB → Neon
4. Key Features
Authentication & Authorization (Revised)
 Login/Signup using email and password
 Backend protected using JWT access tokens and refresh tokens
 Middleware validation for all routes under /api/* except public ones
 Role-based access control: User, Admin
 JWT is stored in localStorage (for access token) and renewed using refresh token
 Protected routes require Authorization: Bearer <token> header
CRUD Operations (Revised)
CRUD will be implemented for the following entities:
Entity Fields CRUD Usage
AI Jobs id, type, status,
createdAt, userId Articles Generated
Uploaded Files id, title, content, userId id, fileUrl, type, userId Track article/image/resume generation tasks
Create, read, update (PUT), delete (DELETE),
list with pagination
Manage uploaded resumes, images, and logs
CRUD API Endpoints:
 POST → Create
 GET → Read/List
 PUT → Update
 DELETE → Remove
All CRUD routes are secured with JWT middleware.
Search, Sort, Filter, Pagination (Revised)
Example API:
GET /api/jobs?search=blog&sort=date_desc&page=2&limit=10&type=article
Supports:
 Search by title or filename
 Sort by date or status
 Filter by AI tool type (article, image, resume)
 Pagination using limit and skip parameters
5. AI Feature Modules
Feature Description
Article Generator Generate long-form articles based on topic + length
Blog Title Generator SEO-optimized titles using AI
Image Generator Convert text prompts → generated images
Background Remover Upload image → return PNG with transparent background
Object Remover Remove unwanted objects using AI inpainting
Resume Analyzer Upload resume → extract skills, weaknesses, and generate score
6. Tech Stack
Frontend
 React.js, React Router
 JWT Auth (localStorage + Refresh Token)
 Tailwind CSS
 Axios for API requests
 Vercel hosting
Backend
 Node.js, Express.js
 JSON Web Tokens (JWT) for authentication
 Stripe Billing + Webhooks for subscription management
 OpenAI + Replicate API SDK for AI services
 Multer (for file uploads)
 Prisma ORM for database interaction
Database / Infrastructure
 Neon Serverless PostgreSQL
 Prisma ORM models
 AWS S3 / DigitalOcean Spaces for storage
 Redis + BullMQ (optional for background job queue)
7. API Overview (Sample)
Endpoint Method Description Auth
/api/auth/login POST Login and return JWT Public
/api/auth/signup POST Register a new user Public
/api/auth/refresh POST Refresh access token Public
/api/jobs GET List AI jobs (supports search, filter,
pagination) JWT
/api/jobs POST Create new AI job JWT
/api/jobs/:id PUT Update existing job JWT
/api/jobs/:id DELETE Delete job JWT
/api/ai/article POST Generate AI article JWT
/api/ai/image POST Generate AI image JWT
/api/billing/checkout POST Create Stripe checkout session JWT
/api/billing/webhook POST Stripe webhook Public (Stripe
only)