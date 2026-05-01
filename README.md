<div align="center">

# 🛡️ Dhaman Dashboard

### Freelancer Dashboard & Client Portal — Structured Payment Protection for Freelance Work

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-4-18181B?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=react-query&logoColor=white)](https://tanstack.com/query)
[![Axios](https://img.shields.io/badge/Axios-1-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
[![Zod](https://img.shields.io/badge/Zod-4-3068B0?logo=zod&logoColor=white)](https://zod.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7-EC5993?logo=react-hook-form&logoColor=white)](https://react-hook-form.com/)
[![License](https://img.shields.io/badge/License-Private-red)]()

</div>

---

> **Core Principle:**
> Dhaman creates balanced financial protection between clients and freelancers: clients pay with confidence, and freelancers work with secured payment assurance.

---

## 📚 Table of Contents

- [🚧 Current Project Status](#-current-project-status)
- [🧾 Overview](#-overview)
- [🎯 Project Purpose](#-project-purpose)
- [💡 Product Concept](#-product-concept)
- [🧩 Core Application Areas](#-core-application-areas)
- [✨ Main Features](#-main-features)
- [🔁 System Flow](#-system-flow)
- [📌 Agreement and Payment States](#-agreement-and-payment-states)
- [🛠️ Technology Stack](#-technology-stack)
- [📂 Project Structure](#-project-structure)
- [🔑 Key Files](#-key-files)
- [🔐 Environment Variables](#-environment-variables)
- [🎓 Demo Access](#-demo-access)
- [🚀 Getting Started](#-getting-started)
- [🧭 Usage Flow](#-usage-flow)
- [🔌 API Integration](#-api-integration)
- [📜 Available Scripts](#-available-scripts)
- [🚢 Deployment](#-deployment)
- [🗺️ Roadmap](#-roadmap)
- [🔗 Related Repositories](#-related-repositories)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🚧 Current Project Status

The Dhaman system is actively under development.

The primary and most important flows are already implemented and ready, including:

- Freelancer login
- Access to the dashboard
- Creating new agreements
- Creating project milestones
- Sending agreement invitations to clients
- Client access through secure invitation links
- Backend API routes for core modules

Some secondary features may not be fully connected yet from the frontend because the integration between the frontend and backend is still in progress for all modules.

However, the backend API already exposes the full system capabilities through Swagger.

You can explore and test all available backend routes here:

**Swagger API Documentation:**
https://backend.dhaman.wasmsoft.com/docs

From Swagger, you can view all available modules, routes, request bodies, responses, and test the backend functionality directly.

---

## 🧾 Overview

**Dhaman Dashboard** is the main frontend application for the Dhaman MVP.

It provides a complete interface for freelancers to create and manage payment agreements, define milestones, invite clients, submit deliveries, track project progress, and handle disputes through AI-supported review workflows.

The application also includes a **Client Portal**, where clients can access a secure project-specific link without creating a full account. Through this portal, clients can review agreements, approve or request changes, track project progress, review submitted work, and participate in dispute resolution.

The dashboard is designed to make freelance payments more structured, transparent, and trustworthy.

---

## 🎯 Project Purpose

Freelance projects often fail because payment terms, scope, milestones, and delivery expectations are not clearly documented.

Common problems include:

- Clients hesitate to pay before seeing progress.
- Freelancers hesitate to work without payment assurance.
- Project scope is often discussed informally.
- Milestone acceptance criteria are unclear.
- Payment release conditions are not transparent.
- Disputes are hard to evaluate fairly.
- There is no reliable timeline of actions and approvals.

Dhaman Dashboard solves this by giving freelancers and clients a structured workflow for managing agreements, milestones, deliveries, and payments.

The dashboard turns freelance work into a traceable process where every important step is connected to agreement terms, milestone conditions, payment status, and timeline evidence.

---

## 💡 Product Concept

Dhaman is not a marketplace.

It is a financial protection layer for freelance agreements.

The system helps freelancers and clients organize work into structured payment contracts where each payment is connected to:

- A specific milestone
- Clear acceptance criteria
- Delivery evidence
- Client review
- Payment status
- Timeline history
- AI-assisted dispute analysis when needed

The main product flow is:

```text
Agreement → Milestones → Protected Payments → Delivery → Review → Release or Hold
```

This allows both parties to work with more confidence, clarity, and accountability.

---

## 🧩 Core Application Areas

### 1. Freelancer Dashboard

The freelancer is the primary authenticated user.

The freelancer can:

- Log in to the platform
- Create agreements
- Add client information
- Define milestones
- Configure payment terms
- Send client invitations
- Submit milestone deliveries
- Track project and payment states
- View dashboard analytics
- Handle client change requests
- Review AI dispute recommendations

### 2. Client Portal

The client does not need a full dashboard account in the MVP.

The client receives a secure invitation link and can:

- Review the agreement
- Approve or request changes
- Track project progress
- Review submitted deliveries
- Accept work
- Request revisions
- Open AI-assisted dispute review
- View timeline and payment status

This keeps the client experience simple while still providing transparency and protection.

---

## ✨ Main Features

### Authentication Flow

Freelancers can log in and access a protected dashboard experience.

The authentication flow connects the user to their agreements, clients, dashboard overview, and active project workflows.

### Agreement Management

Freelancers can create structured agreements that include:

- Project title
- Project description
- Client information
- Total amount
- Currency
- Project scope
- Milestones
- Payment rules
- Review policies

Agreement management is the foundation of the Dhaman workflow.

### Milestone Builder

Freelancers can divide projects into clear milestones.

Each milestone can include:

- Title
- Description
- Amount
- Due date
- Acceptance criteria
- Delivery expectations
- Payment connection

Milestones make the project easier to track and make payment release decisions more transparent.

### Client Invitations

Freelancers can send agreement invitations to clients.

The client receives a secure link that opens the agreement review page or client portal.

This removes the need for clients to create a full account during the MVP stage.

### Client Portal

The client portal works like a project tracking page.

It shows the client:

- Agreement summary
- Project status
- Milestones
- Payment states
- Delivery submissions
- Timeline events
- Required actions

The portal is designed to feel simple, direct, and trustworthy.

### Delivery Submission

Freelancers can submit milestone deliveries with details such as:

- Delivery description
- Work summary
- Links
- Optional attachments
- Submission status

Once a delivery is submitted, the client can review it from the portal.

### Payment Tracking

Dhaman uses protected demo payment states to simulate a real payment protection flow.

Payment states help users understand whether a payment is waiting, reserved, under review, ready to release, released, or on hold.

### AI-Powered Dispute Review

When a client disagrees with a delivery, the system can support the dispute process using AI review.

The AI review compares:

- Agreement scope
- Milestone acceptance criteria
- Delivery evidence
- Client objection
- Project policies

The AI provides a recommendation, but the system can still keep the final decision transparent and explainable.

### Timeline Evidence

Every important action should be recorded in the timeline.

Examples include:

- Agreement created
- Invitation sent
- Client approved
- Payment reserved
- Delivery submitted
- Client requested changes
- AI review opened
- Payment released

This gives both parties a reliable history of what happened.

---

## 🔁 System Flow

The complete Dhaman dashboard flow can be summarized as:

```text
1.  Freelancer logs in
2.  Freelancer creates an agreement
3.  Freelancer adds client details
4.  Freelancer defines milestones and payment terms
5.  Freelancer sends an invitation to the client
6.  Client opens the secure invitation link
7.  Client reviews the agreement
8.  Client approves or requests changes
9.  Agreement becomes active
10. Freelancer submits milestone delivery
11. Client reviews the delivery
12. Client accepts, requests changes, or opens a dispute
13. AI reviews the dispute based on the agreement and delivery evidence
14. Payment becomes ready to release, released, or placed on hold
15. Timeline records all important actions
```

This flow is designed to demonstrate the main fintech value of Dhaman: payment protection through structured agreements and transparent review logic.

---

## 📌 Agreement and Payment States

Clear states are very important in Dhaman because they show that the system is not just a project management tool, but a financial workflow product.

### Agreement States

| State             | Description                                        |
| ----------------- | -------------------------------------------------- |
| Draft             | Agreement is being created by the freelancer       |
| Sent              | Agreement invitation has been sent to the client   |
| Change Requested  | Client requested edits before approval             |
| Active            | Client approved and project execution started      |
| Disputed          | A milestone or payment is under dispute            |
| Completed         | All milestones are completed and payments released  |
| Archived          | Agreement is no longer active                      |

### Payment States

| State              | Description                                              |
| ------------------- | -------------------------------------------------------- |
| Waiting             | Payment is not yet reserved                              |
| Reserved            | Payment is protected or reserved for the milestone       |
| Client Review       | Delivery was submitted and is waiting for client review   |
| AI Review           | Dispute is being analyzed by AI                           |
| Ready to Release    | Payment can be released                                  |
| Released            | Payment has been released                                |
| On Hold             | Payment is temporarily blocked due to dispute or issue   |

### Delivery States

| State              | Description                                   |
| ------------------- | --------------------------------------------- |
| Draft               | Delivery is being prepared                    |
| Submitted           | Delivery was submitted to the client          |
| Accepted            | Client accepted the delivery                  |
| Changes Requested   | Client requested modifications               |
| Disputed            | Delivery is under dispute review              |

---

## 🛠️ Technology Stack

### Frontend

| Technology          | Purpose                                  |
| ------------------- | ---------------------------------------- |
| Next.js 16          | React framework with App Router          |
| React 19            | UI library                               |
| TypeScript          | Type-safe development                    |
| Tailwind CSS 4      | Utility-first CSS styling                |
| shadcn/ui           | Accessible component system              |
| Radix UI            | Headless UI primitives                   |
| TanStack Query 5    | Server state management                  |
| Axios                | HTTP client                              |
| Zod 4               | Schema validation                        |
| React Hook Form 7   | Form state management                    |
| Lucide React        | Icon library                             |

### Backend Integration

| Technology          | Purpose                                  |
| ------------------- | ---------------------------------------- |
| NestJS              | Backend API framework                   |
| Prisma              | Database ORM                             |
| PostgreSQL / Neon   | Database                                 |
| JWT                 | Freelancer authentication                |
| Portal Tokens       | Client access authentication              |
| Google Gemini AI    | AI-powered dispute review                 |
| Resend              | Email delivery service                   |

### Development & Testing

| Technology          | Purpose                                  |
| ------------------- | ---------------------------------------- |
| Vitest              | Unit and integration testing             |
| Testing Library     | React component testing                  |
| ESLint              | Code linting                             |
| TypeScript 5       | Static type checking                     |

---

## 📂 Project Structure

```text
dhaman_dashboard/
├── public/                  # Static assets organized by feature
│   ├── auth/                # Auth images and icons
│   ├── dashboard/           # Dashboard images and icons
│   └── ...                  # Feature-specific public assets
├── src/
│   ├── app/                 # Next.js App Router (routes, layouts, pages)
│   │   ├── (auth)/         # Authentication route group (login, sign-up)
│   │   ├── (admin)/        # Admin dashboard route group
│   │   └── (client-portal)/ # Client portal route group
│   ├── components/          # Reusable UI components
│   │   └── shared/          # Shared reusable components (Button, Card, etc.)
│   ├── constants/           # Static data, navigation, labels, routes
│   ├── hooks/               # Custom React hooks (TanStack Query, mutations, UI state)
│   ├── lib/                 # Helpers, schemas, actions, API logic
│   │   ├── axios-instance.ts # Shared Axios client
│   │   ├── api-paths.ts     # Centralized API endpoint registry
│   │   └── {feature}/       # Feature-scoped actions, helpers, schemas
│   ├── test/                # Test files organized by feature
│   └── types/               # TypeScript type definitions
├── .env                     # Environment variables (gitignored)
├── AGENTS.md                # Agent collaboration instructions
├── components.json          # shadcn/ui configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies and scripts
├── postcss.config.mjs       # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
└── vitest.config.ts         # Vitest test configuration
```

---

## 🔑 Key Files

| File                       | Purpose                                              |
| -------------------------- | ---------------------------------------------------- |
| `src/lib/axios-instance.ts` | Shared Axios client with base URL and headers       |
| `src/lib/api-paths.ts`     | Centralized API endpoint registry                    |
| `src/app/layout.tsx`       | Root layout with providers and global structure      |
| `src/app/(admin)/layout.tsx` | Admin dashboard layout with sidebar and auth      |
| `src/app/(client-portal)/layout.tsx` | Client portal layout with token access  |
| `src/components/shared/`   | Reusable UI components built on shadcn/ui            |
| `src/constants/`           | Static navigation, routes, and content data          |
| `src/types/`               | TypeScript type definitions by feature               |
| `src/hooks/`               | TanStack Query hooks, mutations, and UI hooks       |
| `next.config.ts`           | Next.js configuration including rewrites             |
| `vitest.config.ts`         | Vitest test runner configuration                     |

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory and configure the required environment variables.

```env
# Application
NEXT_PUBLIC_APP_URL="http://localhost:3032"

# Backend API
NEXT_PUBLIC_API_BASE_URL="http://localhost:8080/api/v1"

# API Documentation
NEXT_PUBLIC_SWAGGER_URL="https://backend.dhaman.wasmsoft.com/docs"
```

> Depending on the current integration stage, additional variables may be added later.

---

## 🎓 Demo Access

**Swagger API Documentation:**

https://backend.dhaman.wasmsoft.com/docs

From Swagger, you can:

- View all available API routes
- Test authentication endpoints
- Create agreements and milestones
- Send client invitations
- Explore client portal routes
- Test payment and delivery workflows
- Inspect request and response structures

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** 18+
- **npm**, yarn, pnpm, or bun
- **Git**

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/dhaman_dashboard.git
```

Navigate into the project directory:

```bash
cd dhaman_dashboard
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env.local
```

Run the development server:

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:3032
```

---

## 🔑 Demo Login

For demo and testing purposes, you can access the freelancer dashboard using the following credentials:

```json
{
  "email": "demo@demo.com",
  "password": "temporary123"
}
```

---

Use this account to test the main dashboard flows, including agreement creation, milestone creation, and client invitation workflows.

## 🧭 Usage Flow

### Freelancer Flow

```text
1.  Log in to the dashboard
2.  Create a new agreement
3.  Add client information
4.  Add milestones and acceptance criteria
5.  Send invitation to the client
6.  Wait for client approval
7.  Submit milestone delivery
8.  Track review and payment status
9.  Handle change requests or disputes
10. Review AI recommendation if dispute occurs
```

### Client Flow

```text
1. Open invitation link
2. Review agreement details
3. Approve or request changes
4. Track project progress from the portal
5. Review submitted delivery
6. Accept, request changes, or open AI review
7. Follow payment status and timeline updates
```

---

## 📜 Available Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start development server (port 3032) |
| `npm run build`   | Build for production               |
| `npm run start`   | Start production server            |
| `npm run lint`    | Run ESLint                         |
| `npm run test`    | Run tests with Vitest              |
| `npm run test:watch` | Run tests in watch mode         |

---

## 🔌 API Integration

The dashboard communicates with the Dhaman backend API for authentication, agreement management, client portal access, milestones, payments, deliveries, timeline events, and AI review workflows.

All API endpoints are defined in `src/lib/api-paths.ts` and called through the shared Axios instance in `src/lib/axios-instance.ts`.

The backend Swagger documentation is available here:

```text
https://backend.dhaman.wasmsoft.com/docs
```

Swagger allows developers to:

- View all available API routes
- Test authentication endpoints
- Create agreements, milestones, and invitations
- Explore client portal routes
- Test payment workflows
- Submit and review deliveries
- Trigger AI review workflows
- Inspect request and response structures

---

## 🧪 Current Functional Status

### ✅ Ready

The main product flows are ready and available:

- Freelancer login
- Dashboard access
- Create new agreement
- Create milestones
- Send invitation to client
- Client access through secure invitation link
- Core backend API routes
- Swagger API documentation

### 🔄 Partially Integrated

Some secondary features may still be under frontend-backend integration, including:

- Some advanced dashboard analytics
- Some delivery review screens
- Some AI review UI states
- Some payment history screens
- Some settings and policy management flows
- Some timeline visualization improvements

### 📡 Testable Through Swagger

Even if a specific frontend screen is not fully connected yet, the backend route may already be available and testable through Swagger.

```text
https://backend.dhaman.wasmsoft.com/docs
```

---

## 🚢 Deployment

The project can be deployed to platforms such as:

- **Vercel**
- **Netlify**
- **Render**
- Any Node.js-compatible hosting provider

### Production Build

```bash
npm run build
```

### Production Start

```bash
npm run start
```

### Vercel Deployment

1. Connect the GitHub repository.
2. Add the required environment variables.
3. Deploy the project.
4. Make sure the backend API URL is correctly configured.

---

## 🗺️ Roadmap

Planned improvements may include:

- Full frontend-backend integration for all modules
- Improved dashboard analytics
- Advanced payment history UI
- Full delivery review experience
- Better AI review visualization
- Improved client portal tracking design
- Settings page for default policies
- Notification center
- Timeline improvements
- File upload integration
- Multi-language support
- More polished mobile experience
- Role-based access improvements
- Production-ready error handling

---

## 🔗 Related Repositories

Dhaman is organized into multiple repositories:

| Repository              | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `dhaman_landing_page`  | Public product landing page                             |
| `dhaman_dashboard`     | Freelancer dashboard and client portal frontend          |
| `dhaman_backend`        | NestJS backend API with Prisma and PostgreSQL            |

---

## 🤝 Contributing

Contributions are welcome.

Recommended contribution areas:

- Dashboard UI improvements
- Client portal UX improvements
- Frontend-backend integration
- API client structure
- State management improvements
- Responsive design enhancements
- Accessibility improvements
- Error handling
- Loading states
- Empty states
- Form validation
- Component refactoring

### Contribution Flow

Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

Commit your changes:

```bash
git commit -m "feat: add improved dashboard section"
```

Push your branch:

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request.

---

## 📄 License

This project is part of the Dhaman MVP.

License details can be added based on the final project decision.

---

<div align="center">

**Dhaman Dashboard** — *A financial protection layer for freelance payments.*

</div>
