# 🛍️ E-Commerce Platform

A scalable, production-grade e-commerce platform using Next.js, Node.js/Express microservices, MongoDB, Stripe, and TypeScript.

## 🚀 Tech Stack
- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Node.js (Express), TypeScript, REST (microservices)
- **Database:** MongoDB (Mongoose)
- **Payments:** Stripe
- **Auth:** JWT (access/refresh tokens)
- **Admin Panel:** Next.js dashboard
- **Deployment:** Vercel (frontend), Docker (backend), GitHub Actions (CI/CD)

## 📦 Features
- Product listing, filtering, and detail pages
- Add to cart, checkout, order confirmation
- Real-time inventory updates
- Stripe payment flow and webhooks
- Order history and user profile
- Admin dashboard (CRUD for products, orders, users)
- Responsive, mobile-first design
- Modular, reusable UI components
- Protected routes with role-based access

## 🧑‍💻 Local Development

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- MongoDB (if not using Docker Compose)

### 1. Clone the repo
```sh
git clone https://github.com/Ronnie434/ecommerce-platform.git
cd ecommerce-platform
```

### 2. Start backend microservices & MongoDB
```sh
docker-compose up --build
```
- All services will be available on ports 4001-4005, MongoDB on 27017.

### 3. Start the frontend
```sh
cd frontend
npm install
npm run dev
```
- Visit [http://localhost:3000](http://localhost:3000)

### 4. Environment Variables
- Copy `.env.example` files to `.env` and fill in secrets as needed.

## 🐳 Docker Image Publishing
- To publish images, log in to your registry (e.g., Docker Hub):
  ```sh
  docker login
  ```
- Tag and push each service:
  ```sh
  docker build -t youruser/products-service backend/products
  docker push youruser/products-service
  # Repeat for other services
  ```
- Update `docker-compose.yml` to use your published images for deployment.

## 🛡️ Contribution Guidelines
- Fork the repo and create a feature branch.
- Use conventional commits and descriptive PRs.
- Run `npm run lint` and `npm test` before pushing.
- Add/Update tests for new features.

## 📄 License
MIT 