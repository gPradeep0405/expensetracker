# SpendSmart - Personal & Team Expense Tracker

SpendSmart is a full-stack web application designed for tracking personal expenses, setting monthly budgets, and managing shared expenses within groups.

## Features

*   **JWT Authentication:** Secure user registration and login using Spring Security and JWT.
*   **Personal Expenses:** Add, edit, delete, and view expenses. The dashboard includes beautiful charts showing spending trends (via Recharts).
*   **Budgeting:** Set monthly limits per category. The system tracks spending against limits and triggers an automated email alert when 80% is breached.
*   **Group Expenses:** Create groups, add members, log shared expenses, and track who owes what with automated split settlements.
*   **Reporting:** Export your monthly spending reports instantly to PDF and CSV formats.
*   **Responsive UI:** A clean, modern, and fully responsive user interface built with React, Tailwind CSS, and Lucide React icons.

## Tech Stack

*   **Frontend:** React (Vite), Tailwind CSS, Redux Toolkit, React Router v6, Axios, Recharts, Lucide React.
*   **Backend:** Java 17, Spring Boot 3, Spring Security, Spring Data JPA.
*   **Database:** MySQL.
*   **Libraries:** iText (PDF Generation), JavaMailSender (Email notifications).

## Project Structure
- `/backend`: The Spring Boot application.
- `/frontend`: The React Vite application.

## Setup Instructions

### Prerequisites
- Java 17
- Node.js (v18+)
- MySQL Server

### 1. Database Setup
1. Create a MySQL database named `spendsmart`:
   ```sql
   CREATE DATABASE spendsmart;
   ```
2. The application will automatically create the tables via Hibernate (`spring.jpa.hibernate.ddl-auto=update`).

### 2. Backend Setup
1. Navigate to the `backend` directory.
2. Update the `src/main/resources/application.properties` file with your MySQL credentials and Mail server credentials (e.g., Mailtrap for testing).
3. Build and run the project:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   The backend will run on `http://localhost:8080`.

### 3. Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

## API Endpoints (Quick Reference)
- `POST /auth/register`: Register new user
- `POST /auth/login`: Authenticate and receive JWT
- `GET /api/expenses`: Get user expenses (supports pagination, category filters)
- `POST /api/budgets`: Set a monthly budget
- `GET /api/groups`: Get user groups
- `GET /api/exports/pdf`: Download PDF report

## License
MIT License
