# Dhaman Dashboard

A professional web application dashboard for **Dhaman**, a fintech MVP designed to protect freelance payments through structured agreements, milestone-based payment contracts, protected payment flows, client tracking portals, delivery reviews, and AI-powered dispute resolution.

The dashboard represents the main operational interface of the Dhaman system. It allows freelancers to manage agreements, clients, milestones, deliveries, and payment states, while clients can access a secure portal link to review agreements, track project progress, approve deliveries, request changes, or open AI-assisted dispute reviews.

> **Core Principle:**  
> Dhaman creates balanced financial protection between clients and freelancers: clients pay with confidence, and freelancers work with secured payment assurance.

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

## 📚 Table of Contents

- [Overview](#overview)
- [Project Purpose](#project-purpose)
- [Product Concept](#product-concept)
- [Core Application Areas](#core-application-areas)
- [Main Features](#main-features)
- [Freelancer Dashboard](#freelancer-dashboard)
- [Client Portal](#client-portal)
- [System Flow](#system-flow)
- [Agreement and Payment States](#agreement-and-payment-states)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Integration](#api-integration)
- [Current Functional Status](#current-functional-status)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Related Repositories](#related-repositories)
- [Contributing](#contributing)
- [License](#license)

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

The dashboard is built around two main user experiences:

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

## 🧑‍💼 Freelancer Dashboard

The Freelancer Dashboard is the main workspace for managing all projects and payment agreements.

### Main Dashboard Responsibilities

The dashboard helps the freelancer:

- View active agreements
- Track total protected payments
- See pending client actions
- Monitor deliveries under review
- View recent timeline activity
- Manage project statuses
- Access agreement details
- Submit deliverables
- Review disputes and AI recommendations

### Recommended Pages

The dashboard may include the following pages:

```text
/dashboard
/dashboard/agreements
/dashboard/agreements/new
/dashboard/agreements/[id]
/dashboard/agreements/[id]/builder
/dashboard/agreements/[id]/workspace
/dashboard/clients
/dashboard/deliveries
/dashboard/payments
/dashboard/reviews
/dashboard/settings
```

### Dashboard Overview

The overview page should provide a clear summary of:

- Active agreements
- Pending client approvals
- Payments under review
- Released payments
- Disputed milestones
- Recent activity
- Required actions

### Agreement Workspace

The agreement workspace is where the freelancer manages a single agreement after creation.

It may include:

- Agreement summary
- Client information
- Milestones
- Payment status
- Delivery actions
- Timeline
- AI review status
- Change requests

### Create Agreement Flow

The create agreement flow allows the freelancer to define the project and client details.

Typical steps:

```text
1. Enter project details
2. Add client information
3. Define total project amount
4. Add milestones
5. Configure acceptance criteria
6. Review agreement draft
7. Send invitation to the client
```

### Submit Delivery Flow

When a milestone is ready, the freelancer can submit work for review.

Typical steps:

```text
1. Select active milestone
2. Add delivery description
3. Attach links or files
4. Submit delivery
5. Client receives review request
6. Payment moves to client review state
```

---

## 👤 Client Portal

The Client Portal is a secure, token-based experience for clients.

The client does not need to register or log in with a password in the MVP.

The client accesses the agreement using a secure invitation link.

### Recommended Client Portal Routes

```text
/invite/[token]
/portal/[token]
/portal/[token]/deliveries/[deliveryId]
/portal/[token]/payment-history
```

### Client Portal Responsibilities

The portal allows the client to:

- Review the agreement
- Approve the agreement
- Request changes before approval
- View project progress
- Track milestones
- View payment status
- Review submitted deliveries
- Accept delivery
- Request changes
- Open AI review
- View timeline evidence

### Client Review Flow

The client review flow may look like this:

```text
1. Client receives invitation email
2. Client opens secure agreement link
3. Client reviews agreement details
4. Client approves or requests changes
5. Agreement becomes active after approval
6. Client tracks progress from the portal
7. Client reviews milestone delivery
8. Client accepts, requests changes, or opens AI review
```

### Why Token-Based Access?

Token-based access makes the MVP faster and easier to use.

It avoids forcing clients to create accounts before they understand the product value.

In future versions, Dhaman can support:

- Magic links
- OTP verification
- Full client accounts
- Multi-project client dashboards

---

## 🔁 System Flow

The complete Dhaman dashboard flow can be summarized as:

```text
1. Freelancer logs in
2. Freelancer creates an agreement
3. Freelancer adds client details
4. Freelancer defines milestones and payment terms
5. Freelancer sends an invitation to the client
6. Client opens the secure invitation link
7. Client reviews the agreement
8. Client approves or requests changes
9. Agreement becomes active
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

```text
Draft              → Agreement is being created by the freelancer
Sent               → Agreement invitation has been sent to the client
Change Requested   → Client requested edits before approval
Active             → Client approved and project execution started
Disputed           → A milestone or payment is under dispute
Completed          → All milestones are completed and payments released
Archived           → Agreement is no longer active
```

### Payment States

```text
Waiting            → Payment is not yet reserved
Reserved           → Payment is protected or reserved for the milestone
Client Review      → Delivery was submitted and is waiting for client review
AI Review          → Dispute is being analyzed by AI
Ready to Release   → Payment can be released
Released           → Payment has been released
On Hold            → Payment is temporarily blocked due to dispute or issue
```

### Delivery States

```text
Draft              → Delivery is being prepared
Submitted          → Delivery was submitted to the client
Accepted           → Client accepted the delivery
Changes Requested  → Client requested modifications
Disputed           → Delivery is under dispute review
```

---

## 🛠️ Technology Stack

This repository is focused on the dashboard and client portal frontend.

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Application Architecture

- App Router structure
- Protected dashboard routes
- Token-based client portal routes
- Reusable UI components
- Modular feature sections
- API integration layer
- Responsive interface

### Backend Integration

The dashboard connects to the Dhaman backend API.

The backend is built with:

- NestJS
- Prisma
- PostgreSQL / Neon
- JWT authentication
- Portal tokens
- Gemini AI
- Resend email service

Backend API documentation is available here:

```text
https://backend.dhaman.wasmsoft.com/docs
```

---

## 📂 Project Structure

The project structure may follow a typical Next.js dashboard application format:

```text
dhaman_dashboard/
├── public/                 # Static assets such as images, icons, logos, and public files
├── src/                    # Main application source code
│   ├── app/                # Next.js App Router pages, layouts, route groups, and page-level logic
│   ├── components/         # Reusable UI components used across the dashboard and client portal
│   ├── constants/          # Shared constants such as routes, labels, statuses, config values, and static options
│   ├── hooks/              # Custom React hooks for reusable frontend logic
│   ├── lib/                # Utility functions, API clients, helpers, formatters, and shared logic
│   ├── test/               # Test setup, test utilities, or frontend test files
│   └── types/              # Shared TypeScript types and interfaces
├── .codex                  # Codex-related configuration or project notes
├── .gitignore              # Git ignored files and folders
├── AGENTS.md               # Agent instructions or project collaboration notes
├── CLAUDE.md               # Claude-related project instructions or development notes
├── README.md               # Project documentation
├── components.json         # Component/UI configuration, commonly used with shadcn/ui
├── eslint.config.mjs       # ESLint configuration for code quality and consistency
├── next.config.ts          # Next.js configuration
├── opencode.json           # OpenCode configuration
├── package-lock.json       # Locked npm dependency versions
├── package.json            # Project dependencies, metadata, and available scripts
├── postcss.config.mjs      # PostCSS configuration, commonly used with Tailwind CSS
├── tsconfig.json           # TypeScript compiler configuration
└── vitest.config.ts        # Vitest configuration for testing
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18+
- npm, yarn, pnpm, or bun
- Git

---

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
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory and configure the required environment variables.

Example:

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="https://backend.dhaman.wasmsoft.com"
NEXT_PUBLIC_SWAGGER_URL="https://backend.dhaman.wasmsoft.com/docs"
```

Depending on the current integration stage, additional variables may be added later.

---

## 📜 Available Scripts

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Run Linting

```bash
npm run lint
```

---

## 🔌 API Integration

The dashboard communicates with the Dhaman backend API for authentication, agreement management, client portal access, milestones, payments, deliveries, timeline events, and AI review workflows.

The backend Swagger documentation is available here:

```text
https://backend.dhaman.wasmsoft.com/docs
```

Swagger allows developers to:

- View all available API routes
- Test authentication endpoints
- Create agreements
- Create milestones
- Send client invitations
- Explore client portal routes
- Test payment workflows
- Submit and review deliveries
- Trigger AI review workflows
- Inspect request and response structures

---

## 🧪 Current Functional Status

### Ready

The main product flows are ready and available:

- Freelancer login
- Dashboard access
- Create new agreement
- Create milestones
- Send invitation to client
- Client access through secure invitation link
- Core backend API routes
- Swagger API documentation

### Partially Integrated

Some secondary features may still be under frontend-backend integration, including:

- Some advanced dashboard analytics
- Some delivery review screens
- Some AI review UI states
- Some payment history screens
- Some settings and policy management flows
- Some timeline visualization improvements

### Testable Through Swagger

Even if a specific frontend screen is not fully connected yet, the backend route may already be available and testable through Swagger.

Use:

```text
https://backend.dhaman.wasmsoft.com/docs
```

---

## 🧭 Usage Flow

### Freelancer Flow

```text
1. Log in to the dashboard
2. Create a new agreement
3. Add client information
4. Add milestones and acceptance criteria
5. Send invitation to the client
6. Wait for client approval
7. Submit milestone delivery
8. Track review and payment status
9. Handle change requests or disputes
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

## 🚢 Deployment

The project can be deployed to platforms such as:

- Vercel
- Netlify
- Render
- Any Node.js-compatible hosting provider

### Production Build

```bash
npm run build
```

### Production Start

```bash
npm run start
```

For Vercel deployment:

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

```text
dhaman_landing_page   # Public product landing page
dhaman_dashboard      # Freelancer dashboard and client portal frontend
dhaman_backend        # NestJS backend API with Prisma and PostgreSQL
```

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

## 👥 Team Note

Dhaman Dashboard is being developed as the operational frontend for a focused fintech MVP:

```text
A financial protection layer for freelance payments.
```

The goal of this repository is to provide a clear, reliable, and professional interface where freelancers can manage agreements and clients can review project progress through a secure portal.
