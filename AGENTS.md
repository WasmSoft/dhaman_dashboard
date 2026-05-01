# Agent Rules

These rules must be followed by every AI agent, developer, or team member working on this project.

The purpose of this file is to keep the project architecture clean, consistent, scalable, testable, and easy to maintain.

Do not ignore these rules when building UI, adding logic, using MCP servers, generating code, integrating APIs, writing tests, or refactoring existing files.

<!-- SPECKIT START -->
Current SpecKit plan: `specs/001-payments-frontend-integration/plan.md`
<!-- SPECKIT END -->

---

## 1. Core Architecture

This project uses Next.js with the App Router.

The approved architecture is:

```txt
project-root/
  public/
  src/
    app/
    components/
    constants/
    types/
    lib/
    hooks/
    test/
```

Rules:

1. `public` must stay outside `src`.
2. `src/app` is only for routing, pages, layouts, loading files, error files, route handlers, and route-level files.
3. `src/components` is for UI components.
4. `src/components/shared` is for reusable components.
5. `src/constants` is for static content and configuration data.
6. `src/types` is for TypeScript types.
7. `src/lib` is for helpers, schemas, raw actions/API utilities, query keys, query options, formatters, transformations, and logic.
8. `src/hooks` is for React hooks, including feature hooks, UI state hooks, TanStack Query hooks, and mutation hooks used by client components.
9. `src/test` is for test cases related to functions, helpers, schemas, actions, hooks, calculations, and important system behavior.
10. Do not create `components`, `constants`, `types`, `lib`, `hooks`, or `test` inside `src/app`.
11. Do not place reusable UI components inside `src/app`.
12. Keep each feature/page organized across `app`, `components`, `constants`, `types`, `lib`, `hooks`, and `test` using the same feature name whenever possible.

---

## 2. App Router and Route Group Rules

The `src/app` folder must only contain route-related files.

This project uses Next.js App Router route groups to separate public/auth pages, client portal pages, and admin dashboard pages.

Route groups must use parentheses and must not affect the URL path.

Approved route group structure:

```txt
src/app/
  layout.tsx
  globals.css
  loading.tsx
  error.tsx
  not-found.tsx

  (auth)/
    login/
      page.tsx
    sign-up/
      page.tsx

  (client-portal)/
    layout.tsx
    page.tsx
    agreements/
      page.tsx
    profile/
      page.tsx

  (admin)/
    layout.tsx
    dashboard/
      page.tsx
    clients/
      page.tsx
    agreements/
      page.tsx
```

Rules:

1. Use `(auth)` for authentication-related pages such as login and sign-up.
2. Use `(client-portal)` for client-facing portal pages.
3. Use `(admin)` for admin dashboard and internal control pages.
4. Route group names must be descriptive and wrapped in parentheses.
5. Keep route files clean. A page file should only compose sections or feature components.
6. Do not place heavy TypeScript/JSX directly inside `page.tsx`.
7. Do not place business logic, reusable UI components, constants, schemas, or API actions inside `src/app`.
8. Use route group layouts only for layout concerns such as shell, navigation, auth guard wrapper, or dashboard frame.
9. Do not duplicate layouts if a route group layout can handle the shared structure.
10. If a page belongs to the client portal, place it under `(client-portal)`.
11. If a page belongs to admin control, place it under `(admin)`.
12. If a page is only for login, sign-up, forgot password, or authentication flow, place it under `(auth)`.

Allowed route examples:

```txt
src/app/(auth)/login/page.tsx
src/app/(auth)/sign-up/page.tsx
src/app/(client-portal)/agreements/page.tsx
src/app/(admin)/dashboard/page.tsx
src/app/(admin)/clients/page.tsx
```

Do not create these folders inside `src/app`:

```txt
src/app/components
src/app/constants
src/app/types
src/app/lib
src/app/test
```

A page file must stay clean and should only compose sections.

Correct:

```tsx
import { LoginSection } from "@/components/login";

export default function LoginPage() {
  return <LoginSection />;
}
```

Wrong:

```tsx
export default function LoginPage() {
  return (
    <main>
      {/* Huge login form JSX directly here */}
      {/* Validation and API logic directly here */}
    </main>
  );
}
```

---

## 3. Components Rules

All UI components must be placed inside:

```txt
src/components
```

Reusable components must be placed inside:

```txt
src/components/shared
```

Feature-specific or section-specific components must be placed inside:

```txt
src/components/{feature-name}
```

Example:

```txt
src/components/
  shared/
    button/
      Button.tsx
      index.ts
    section-header/
      SectionHeader.tsx
      index.ts
    container/
      Container.tsx
      index.ts

  login/
    LoginSection.tsx
    LoginForm.tsx
    index.ts

  agreements/
    AgreementsSection.tsx
    AgreementCard.tsx
    AgreementsTable.tsx
    index.ts

  dashboard/
    DashboardSection.tsx
    DashboardStats.tsx
    DashboardChart.tsx
    index.ts
```

Rules:

1. Before creating a new component, check if a suitable shared component already exists.
2. If a component is used in more than one feature or section, it must be moved to `src/components/shared`.
3. If a component is used only by one feature or section, it must stay inside that feature folder.
4. Every component folder must include an `index.ts` file.
5. Do not duplicate components.
6. Do not create unnecessary abstractions.
7. UI components should not contain large static data, schemas, API actions, or heavy logic.
8. UI components may call imported actions or hooks, but the action implementation must live in `src/lib/{feature-name}/actions`.
9. Keep components focused on rendering, composition, and user interaction.

---

## 4. Constants Rules

All static UI data must be placed inside:

```txt
src/constants
```

Static data includes:

- Section content
- Navigation items
- CTA links
- Card data
- Feature lists
- Pricing plans
- FAQ items
- Image paths
- Icon names
- Route paths
- Static configuration values
- Dashboard menu items
- Client portal menu items
- Table column labels when they are static

Each feature or section must have its own constants file.

Example:

```txt
src/constants/login.ts
src/constants/dashboard.ts
src/constants/agreements.ts
src/constants/client-portal.ts
src/constants/index.ts
```

Rules:

1. Do not keep large static arrays inside UI components.
2. Do not repeat the same static data in multiple places.
3. Export all constants from `src/constants/index.ts`.
4. Store shared route constants in a clear constants file such as `src/constants/routes.ts`.
5. Store static navigation/sidebar items outside UI components.

Example:

```ts
export * from "./login";
export * from "./dashboard";
export * from "./agreements";
export * from "./client-portal";
export * from "./routes";
```

---

## 5. Types Rules

All TypeScript types must be placed inside:

```txt
src/types
```

Each feature or section must have its own type file.

Example:

```txt
src/types/login.ts
src/types/dashboard.ts
src/types/agreements.ts
src/types/client.ts
src/types/common.ts
src/types/index.ts
```

Rules:

1. Do not define large reusable types inside components.
2. Shared types can be placed inside `src/types/common.ts` when needed.
3. Export all types from `src/types/index.ts`.
4. Use `import type` when importing types.
5. Keep API request and response types in `src/types/{feature-name}.ts` or `src/types/api.ts` when shared.
6. Keep form value types close to the related feature type file.

Example:

```ts
import type { LoginFormValues } from "@/types";
```

---

## 6. Lib Rules

All helper functions, schemas, API actions, formatters, transformations, validations, and feature-specific logic must be placed inside:

```txt
src/lib
```

This project uses a feature-based `lib` structure.

Approved structure:

```txt
src/lib/
  axios-instance.ts
  api-paths.ts
  index.ts

  login/
    helpers/
      index.ts
    schemas/
      login.schema.ts
      index.ts
    actions/
      login.actions.ts
      index.ts
    index.ts

  agreements/
    helpers/
      agreement-status.helper.ts
      index.ts
    schemas/
      agreement.schema.ts
      index.ts
    actions/
      agreement.actions.ts
      index.ts
    index.ts

  dashboard/
    helpers/
      index.ts
    schemas/
      index.ts
    actions/
      dashboard.actions.ts
      index.ts
    index.ts
```

Rules:

1. Do not place heavy logic directly inside UI components.
2. Use `helpers/` for pure helper functions.
3. Use `schemas/` for Zod validation schemas or other validator schemas.
4. Use `actions/` for API calls, server actions, data fetching functions, mutations, and integration with the backend.
5. Use `formatters/` only when formatting utilities are needed.
6. Every feature-specific lib folder must include an `index.ts` file.
7. Every inner folder such as `helpers`, `schemas`, and `actions` must include an `index.ts` file when it contains files.
8. Do not create empty helper, schema, formatter, or action files unless needed.
9. Do not write API URLs directly inside components or actions. Use `src/lib/api-paths.ts`.
10. Do not create multiple Axios instances unless there is a clear backend requirement.
11. Use the shared Axios instance from `src/lib/axios-instance.ts` for API calls.
12. Keep actions small and focused. One action should do one clear API task.
13. Keep validation schemas reusable and separate from UI JSX.
14. Keep feature logic grouped by page or domain name, not by random technical names.

---

## 7. Data Fetching and API Rules

This project uses centralized data fetching rules.

All API fetching must be implemented through feature actions inside:

```txt
src/lib/{feature-name}/actions
```

Shared API configuration must live in:

```txt
src/lib/axios-instance.ts
src/lib/api-paths.ts
```

Example:

```txt
src/lib/
  axios-instance.ts
  api-paths.ts

  login/
    actions/
      login.actions.ts
      index.ts

  agreements/
    actions/
      agreement.actions.ts
      index.ts
```

### 7.1 Axios Instance

Use one shared Axios instance for backend communication.

Example structure:

```ts
// AR: هذا الملف يجهز Axios instance موحد لكل طلبات النظام.
// EN: This file configures one shared Axios instance for all system requests.
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
```

Rules:

1. Do not call `axios.create` inside components.
2. Do not duplicate Axios configuration across feature files.
3. Configure shared headers, base URL, interceptors, auth token handling, and common error behavior in `axios-instance.ts`.
4. Use environment variables for base URLs.
5. Do not hardcode backend domains inside actions.
6. If the user provides an Axios instance file from a previous project, follow its style and adapt it to this project.

### 7.2 API Paths

All API endpoint paths must be stored in:

```txt
src/lib/api-paths.ts
```

The API paths file must expose a clear object with stable names.

Example:

```ts
// AR: هذا الملف يجمع مسارات الـ API في مكان واحد لتجنب التكرار والأخطاء.
// EN: This file centralizes API paths in one place to avoid duplication and mistakes.
export const apiPaths = {
  auth: {
    login: "/auth/login",
    signUp: "/auth/sign-up",
    logout: "/auth/logout",
  },
  agreements: {
    list: "/agreements",
    details: (id: string) => `/agreements/${id}`,
    create: "/agreements",
    update: (id: string) => `/agreements/${id}`,
    delete: (id: string) => `/agreements/${id}`,
  },
} as const;
```

Rules:

1. Do not write string API paths directly in components.
2. Do not write string API paths directly inside multiple action files.
3. If an endpoint is used by an action, add it to `api-paths.ts` first.
4. Use functions for dynamic paths such as IDs and slugs.
5. Keep endpoint names clear and related to the domain.
6. When adding a new API feature, update `api-paths.ts` and the related feature actions.
7. If the user provides a previous `api-paths.ts` file, follow the same naming style and adapt it to this project.

### 7.3 Feature Actions

Feature actions are responsible for connecting UI/features to the backend.

Example:

```ts
import { axiosInstance } from "@/lib/axios-instance";
import { apiPaths } from "@/lib/api-paths";
import type { LoginFormValues, LoginResponse } from "@/types";

// AR: ترسل بيانات تسجيل الدخول إلى الـ API وتعيد بيانات المستخدم أو التوكن.
// EN: Sends login credentials to the API and returns the user data or token.
export async function loginAction(payload: LoginFormValues) {
  const response = await axiosInstance.post<LoginResponse>(
    apiPaths.auth.login,
    payload,
  );

  return response.data;
}
```

Rules:

1. Actions must use `axiosInstance` and `apiPaths`.
2. Actions must use TypeScript request and response types.
3. Actions must handle expected errors in a consistent way.
4. Do not put UI state handling inside actions.
5. Do not put toast messages inside generic actions unless the project explicitly adopts that pattern.
6. Keep actions reusable across pages when possible.
7. If an action performs important business logic or data transformation, add tests for it.

---

## 8. Testing Rules

Testing is required for important system behavior.

All tests must be placed inside:

```txt
src/test
```

Tests must follow the same feature/page grouping used in the source code.

Approved structure:

```txt
src/test/
  login/
    login.actions.test.ts
    login.schema.test.ts
    index.ts

  agreements/
    agreement.actions.test.ts
    agreement-status.helper.test.ts
    agreement.schema.test.ts
    index.ts

  dashboard/
    dashboard.actions.test.ts
    dashboard-calculations.test.ts
    index.ts
```

Rules:

1. Add tests when creating or modifying any important function, helper, schema, action, calculation, transformation, or data-fetching behavior.
2. If a feature includes data fetching, test the related action behavior when possible.
3. If a feature includes validation, test the related schema.
4. If a feature includes calculations or transformations, test normal cases and edge cases.
5. If a component includes complex logic, move that logic to `src/lib/{feature-name}/helpers` and test it there.
6. Do not write heavy logic only inside components because it becomes harder to test.
7. Test files must use the feature name in the filename.
8. Test files must use `.test.ts` or `.test.tsx` depending on the code being tested.
9. Every feature folder under `src/test` must include an `index.ts` file when reusable test utilities or grouped exports are needed.
10. Do not create empty test files.
11. Do not skip tests for important business behavior.
12. Run the available test command after adding or changing tests when possible.
13. If the project does not yet have a test runner, recommend or add one only after checking the existing `package.json` and project setup.

Test trigger examples:

- API action for login, agreements, clients, dashboard statistics, or payments
- Helper that formats status or transforms API data
- Zod schema for forms
- Financial or date calculations
- Permission or role logic
- Data mapping between backend response and UI model
- Any function used by more than one page or component

---

## 9. Public Assets Rules

The `public` folder must stay at the project root, outside `src`.

Correct:

```txt
project-root/public
project-root/src
```

Wrong:

```txt
project-root/src/public
```

Assets must be organized by feature or section.

Example:

```txt
public/
  auth/
    images/
    icons/

  dashboard/
    images/
    icons/

  agreements/
    images/
    icons/

  client-portal/
    images/
    icons/
```

Rules:

1. Auth assets must go inside `public/auth`.
2. Dashboard assets must go inside `public/dashboard`.
3. Client portal assets must go inside `public/client-portal`.
4. Agreement assets must go inside `public/agreements`.
5. Feature-specific assets must go inside `public/{feature-name}`.
6. Do not place all assets randomly in the root of `public`.
7. Use clear and descriptive file names.
8. If asset paths are reused, store them inside the related constants file.

Example:

```ts
export const dashboardAssets = {
  logo: "/dashboard/images/dashboard-logo.png",
  emptyStateIcon: "/dashboard/icons/empty-state.svg",
};
```

---

## 10. shadcn/ui Rules

This project must use `shadcn/ui` as the base UI component system whenever suitable.

Rules:

1. Before creating any custom UI component, check whether `shadcn/ui` already provides a suitable base component.
2. Buttons, cards, dialogs, dropdowns, accordions, tabs, selects, inputs, badges, forms, tables, sheets, popovers, and tooltips should use `shadcn/ui` whenever possible.
3. Do not duplicate UI primitives.
4. Do not create a new custom button if a shared button or shadcn button already exists.
5. Custom shared components should compose shadcn components instead of replacing them randomly.
6. Styling must stay consistent with the existing theme variables and Tailwind setup.
7. Any reusable UI component built on top of shadcn must be placed inside `src/components/shared`.
8. When building dashboard UI, prefer shadcn primitives for cards, forms, tables, dialogs, tabs, and dropdowns.

---

## 11. Form Rules

If a section contains a form, follow these rules:

1. Use React Hook Form.
2. Use Zod for validation.
3. Store Zod schemas inside `src/lib/{feature-name}/schemas`.
4. Store form-related types inside `src/types/{feature-name}.ts`.
5. Store form submit API calls inside `src/lib/{feature-name}/actions`.
6. Use shadcn/ui form components when suitable.
7. Do not write validation logic directly inside JSX.
8. Add tests for validation schemas when the form is important to the system.

Example:

```txt
src/lib/login/schemas/login.schema.ts
src/lib/login/actions/login.actions.ts
src/types/login.ts
src/components/login/LoginForm.tsx
src/test/login/login.schema.test.ts
src/test/login/login.actions.test.ts
```

---

## 12. MCP Server, Stitch, Figma MCP, and Design Generation Rules

When using MCP server, Stitch, Figma MCP, screenshots, or any design-generation tool, generated code must still follow this architecture.

Before building any section:

1. Analyze the requested section.
2. Identify reusable UI parts.
3. Check `src/components/shared` before creating new reusable components.
4. Use existing shadcn/ui components where suitable.
5. Ask whether the user wants to provide a screenshot, Figma link, Stitch link, or any other design reference before implementing a new UI section.
6. Do not create a random visual style.
7. Match the current project theme, spacing, typography, layout, and color system.
8. Convert any generated design into the approved architecture.
9. Build the UI using a mobile-first approach.
10. Make sure the implementation is mobile-friendly and responsive across all screen sizes.
11. Keep the final UI visually aligned with the provided Figma, Stitch, screenshot, or design reference.
12. Do not change the design style while making the layout responsive.
13. Do not accept generated MCP/Stitch/Figma output as final until structure, responsiveness, RTL alignment, imports, and file locations are fixed.

Generated code must be separated into:

- Route files inside `src/app`
- UI components inside `src/components`
- Static data inside `src/constants`
- Types inside `src/types`
- Helpers, schemas, actions, and API logic inside `src/lib`
- Tests inside `src/test`
- Assets inside `public`

Do not allow MCP, Stitch, Figma MCP, or any generated output to create messy, duplicated, non-responsive, desktop-only, RTL-broken, or inconsistent file structures.

---

## 13. RTL and Arabic UI Alignment Rules

This project is Arabic-first and RTL-first.

The UI must preserve Arabic direction, right-side text alignment, and the correct visual order of content blocks.

This rule is strict because MCP server, Figma MCP, Stitch, or generated UI can sometimes reverse image/text positions or use wrong Flexbox alignment.

### 13.1 Direction Rules

1. The root layout must support RTL.
2. Arabic pages must use `dir="rtl"` where appropriate.
3. Prefer logical alignment utilities such as `text-start`, `items-start`, `justify-start`, `start-*`, `end-*`, `ms-*`, `me-*`, `ps-*`, and `pe-*` when supported by the Tailwind setup.
4. Do not use `text-left` for Arabic headings or paragraphs unless the design explicitly requires it.
5. Do not use `items-end` or `text-end` as a workaround without checking how it behaves in RTL.
6. For Arabic text blocks, headings, paragraphs, labels, cards, and form copy should visually align to the right.
7. A component that displays Arabic copy must be reviewed for direction and alignment before completion.

### 13.2 Flexbox and Layout Rules

1. Do not blindly use `flex-row-reverse` to fix RTL layout.
2. Do not blindly use `justify-end`, `items-end`, or `text-left` because generated designs often produce incorrect alignment.
3. When a card contains a heading, paragraph, metadata, or actions, text content should normally align to the visual right side in RTL.
4. When a design shows text on the right and an image on the left, implement it that way. Do not accidentally swap them.
5. When a design shows an image on the right and text on the left, implement it that way only if the reference clearly requires it.
6. Always compare the implemented layout with the design reference before finalizing.
7. For two-column sections, explicitly confirm which side contains text and which side contains the image in RTL.
8. Avoid fixed absolute positioning that makes RTL alignment fragile.
9. Prefer `grid` or clear `flex` layouts with responsive ordering instead of random reverse classes.
10. If using responsive order classes, define them intentionally for mobile and desktop.

Correct Arabic card example:

```tsx
// AR: بطاقة عربية بمحاذاة منطقية تبدأ من يمين الشاشة في وضع RTL.
// EN: Arabic card using logical start alignment, which appears on the right in RTL.
export function AgreementCard() {
  return (
    <article dir="rtl" className="flex flex-col items-start text-start">
      <h3>عنوان الاتفاقية</h3>
      <p>وصف مختصر للاتفاقية وحالتها الحالية.</p>
    </article>
  );
}
```

Wrong:

```tsx
<article className="flex flex-col items-end text-left">
  <h3>عنوان الاتفاقية</h3>
  <p>وصف مختصر للاتفاقية.</p>
</article>
```

### 13.3 MCP/Figma/Stitch RTL Verification

When using MCP, Stitch, Figma MCP, screenshots, or generated UI:

1. Inspect the generated Flexbox and Grid alignment.
2. Fix any reversed text/image positions.
3. Fix headings or paragraphs that appear on the wrong side.
4. Check every card, form, sidebar item, table header, modal, and dashboard widget.
5. Do not assume Figma output is fully Arabic-aware.
6. Do not assume MCP output respects RTL correctly.
7. If generated code places Arabic text on the left while the reference shows it on the right, correct it immediately.
8. If generated code reverses image and content positions, correct the layout order.
9. Do not mark UI work complete until RTL alignment is visually and structurally correct.

---

## 14. Responsive and Mobile-First UI Rules

Every UI section, component, and page must be built using a mobile-first approach.

This rule applies to all UI work, including manual coding, MCP server output, Stitch-generated UI, Figma MCP output, screenshot-based implementation, or any other design-generation workflow.

Rules:

1. Start the implementation from the smallest mobile viewport first.
2. Make sure the UI is fully usable, readable, and visually balanced on mobile screens before adding tablet or desktop styles.
3. Use Tailwind responsive utilities in a mobile-first way.
4. Add larger breakpoint styles progressively using `sm:`, `md:`, `lg:`, `xl:`, and `2xl:` only when needed.
5. Do not build the desktop layout first and then try to force it into mobile.
6. The mobile version must not look like a broken or squeezed desktop version.
7. The UI must adapt smoothly across mobile, tablet, laptop, and desktop screens.
8. When using a Figma link, Stitch link, screenshot, or MCP-generated design, the final implementation must match the provided design as closely as possible.
9. The responsive behavior must preserve the same visual identity, spacing logic, typography hierarchy, colors, and layout direction from the reference design.
10. Do not change the design style when making it responsive.
11. Do not replace the original visual direction with a different layout unless the user explicitly approves it.
12. If the reference design only shows desktop, create a mobile-friendly version that keeps the same visual identity and content hierarchy.
13. If the reference design includes mobile screens, the implementation must match the mobile reference first, then scale up to larger screens.
14. Use flexible layouts such as `flex`, `grid`, responsive columns, wrapping, and proper spacing utilities instead of fixed widths that break on smaller screens.
15. Avoid hardcoded widths, heights, margins, or positioning that can break responsiveness unless they are clearly required by the design.
16. Images, icons, cards, buttons, forms, navigation, and text blocks must resize or rearrange naturally on small screens.
17. Test the implemented UI mentally and structurally against common viewport sizes before considering the task complete.
18. Do not consider a UI task complete until the section works correctly on mobile and desktop.
19. Verify that responsive changes do not break RTL layout.

Mobile-first Tailwind example:

```tsx
<section className="px-4 py-10 md:px-8 md:py-16 lg:px-12 lg:py-24">
  <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
    {/* Content */}
  </div>
</section>
```

Wrong approach:

```tsx
<section className="w-[1200px] h-[700px] absolute left-[300px] top-[100px]">
  {/* Fixed desktop-only layout */}
</section>
```

The final UI must be:

- Mobile-first
- Mobile-friendly
- Responsive across all screen sizes
- RTL-aware
- Consistent with the provided design reference
- Consistent with the project theme
- Built using the approved architecture in `AGENTS.md`

---

## 15. Feature Building Workflow

For every new feature, page, section, component, UI, API action, or MCP/Stitch/Figma-based implementation, follow this exact workflow.

### Step 1: Analyze the feature

Identify:

- Feature name
- Route group: `(auth)`, `(client-portal)`, or `(admin)`
- Required route file
- Required components
- Reusable parts
- Static data
- Types
- Helper functions
- Required schemas
- Required API actions
- Required API paths
- Required tests
- Required assets
- Whether the feature contains forms or validation
- Whether the feature contains data fetching
- Whether the feature contains calculations or transformations
- Mobile layout requirements
- Tablet layout requirements
- Desktop layout requirements
- RTL alignment requirements

### Step 2: Check existing shared components

Before creating anything new, check:

```txt
src/components/shared
```

Reusable examples:

- Button
- Badge
- Card
- Section header
- Container
- Icon wrapper
- CTA block
- Form input
- Modal or dialog
- Table wrapper
- Empty state
- Pagination
- Sidebar item

### Step 3: Create or update the route file

Example:

```txt
src/app/(admin)/agreements/page.tsx
```

The route file must compose feature components only.

### Step 4: Create the feature component folder

Example:

```txt
src/components/agreements/
  AgreementsSection.tsx
  AgreementCard.tsx
  AgreementsTable.tsx
  index.ts
```

### Step 5: Create the feature constants file

```txt
src/constants/agreements.ts
```

### Step 6: Create the feature types file

```txt
src/types/agreements.ts
```

### Step 7: Create lib folders only if needed

```txt
src/lib/agreements/
  helpers/
    agreement-status.helper.ts
    index.ts
  schemas/
    agreement.schema.ts
    index.ts
  actions/
    agreement.actions.ts
    index.ts
  index.ts
```

Do not create empty helper, schema, or action files if the feature does not need them.

### Step 8: Add or update API paths when needed

```txt
src/lib/api-paths.ts
```

Every backend endpoint used by a feature action must be added to `api-paths.ts`.

### Step 9: Add tests when needed

```txt
src/test/agreements/
  agreement.actions.test.ts
  agreement-status.helper.test.ts
  agreement.schema.test.ts
  index.ts
```

Tests are required when the feature includes actions, helpers, schemas, calculations, transformations, or important system behavior.

### Step 10: Organize assets

```txt
public/agreements/
  images/
  icons/
```

### Step 11: Add clean exports

Example:

```ts
export { AgreementsSection } from "./AgreementsSection";
export { AgreementCard } from "./AgreementCard";
export { AgreementsTable } from "./AgreementsTable";
```

### Step 12: Use the feature in the page

The page file must stay clean.

```tsx
import { AgreementsSection } from "@/components/agreements";

export default function AgreementsPage() {
  return <AgreementsSection />;
}
```

### Step 13: Verify RTL and responsiveness

Before completing the task, verify that the feature works correctly on:

- Mobile
- Tablet
- Laptop
- Desktop
- RTL Arabic layout
- Provided design reference

Do not mark the feature as complete if it is desktop-only, if the mobile layout is broken, or if RTL alignment is wrong.

### Step 14: Run checks

When possible, run:

- TypeScript check
- Lint
- Build
- Tests

Do not ignore errors unless the user explicitly asks for a partial implementation.

---

## 16. Import Rules

Use path aliases whenever possible.

Preferred:

```ts
import { AgreementsSection } from "@/components/agreements";
import { agreementsContent } from "@/constants";
import { getAgreementsAction } from "@/lib/agreements";
import type { Agreement } from "@/types";
```

Avoid deep relative imports:

```ts
import { AgreementsSection } from "../../../components/agreements/AgreementsSection";
```

Recommended alias in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Rules:

1. Export public feature APIs through index files.
2. Avoid importing from deep internal files when an index export exists.
3. Use `import type` for TypeScript-only imports.
4. Keep imports clean and remove unused imports.

---

## 17. Naming Rules

Component files:

```txt
LoginSection.tsx
LoginForm.tsx
DashboardSection.tsx
DashboardStats.tsx
AgreementCard.tsx
AgreementsTable.tsx
ClientProfileSection.tsx
```

Constants files:

```txt
login.ts
dashboard.ts
agreements.ts
client-portal.ts
routes.ts
```

Types files:

```txt
login.ts
dashboard.ts
agreements.ts
client.ts
api.ts
common.ts
```

Lib files:

```txt
login.actions.ts
login.schema.ts
agreement-status.helper.ts
dashboard-calculations.helper.ts
index.ts
```

Test files:

```txt
login.actions.test.ts
login.schema.test.ts
agreement-status.helper.test.ts
dashboard-calculations.test.ts
```

Public assets:

```txt
dashboard-logo.png
agreement-empty-state.svg
client-avatar-placeholder.png
login-background.png
```

Rules:

1. Use clear feature-based names.
2. Do not use vague filenames such as `utils.ts`, `data.ts`, `new.tsx`, or `component.tsx` when a clearer name is available.
3. Keep names consistent across components, constants, types, lib, tests, and assets.

---

## 18. Code Quality Rules

1. Use TypeScript.
2. Use functional React components.
3. Use named exports for components.
4. Use default exports only where Next.js requires them, such as `page.tsx` and `layout.tsx`.
5. Keep files small and focused.
6. Do not mix UI, constants, types, logic, and API actions in one file.
7. Do not duplicate code.
8. Do not create unnecessary abstractions.
9. Do not create unused files.
10. Do not leave unused imports.
11. Do not break the existing design.
12. Do not change business content unless requested.
13. Do not move assets without updating their paths.
14. Do not place reusable components inside `src/app`.
15. Run lint, build, and test checks after refactoring when possible.
16. Ensure every UI implementation is responsive and mobile-first.
17. Do not use fixed desktop-only dimensions unless the design explicitly requires them.
18. Do not ignore mobile, tablet, desktop, or RTL responsiveness.
19. Do not hardcode API paths in UI components.
20. Do not skip tests for important functions, actions, schemas, and calculations.
21. Do not use MCP/Stitch/Figma generated code without reviewing structure, RTL, responsiveness, and quality.

---

## 19. Code Comments Rules

All generated or modified code must include clear comments when they help explain intent, structure, or behavior.

Rules:

1. Write comments in both Arabic and English in the same comment whenever adding meaningful UI, logic, actions, schemas, or functions.
2. UI comments must briefly explain what the interface or section is and the purpose of its design.
3. Logic or function comments must briefly explain what the function does, why it exists, and how it is used.
4. API action comments must briefly explain what endpoint behavior the action represents.
5. Test comments may explain important edge cases when needed.
6. Comments should be helpful and concise, not excessive or noisy.
7. Do not comment obvious syntax or simple self-explanatory lines.
8. Use comments to clarify design intent, interaction behavior, RTL decisions, data transformations, validation logic, and non-obvious decisions.

Example:

```tsx
// AR: هذا القسم يعرض إحصائيات لوحة التحكم بطريقة مختصرة وواضحة.
// EN: This section presents dashboard statistics in a clear and concise way.
export function DashboardStats() {
  return <section>{/* Content */}</section>;
}
```

Function example:

```ts
// AR: تقوم هذه الدالة بتنسيق حالة الاتفاقية قبل عرضها داخل الواجهة.
// EN: This function formats the agreement status before displaying it in the UI.
export function formatAgreementStatus(status: string) {
  return status.trim().toLowerCase();
}
```

Action example:

```ts
// AR: تجلب هذه الدالة قائمة الاتفاقيات من الخادم لاستخدامها في صفحة الاتفاقيات.
// EN: This function fetches the agreements list from the backend for the agreements page.
export async function getAgreementsAction() {
  // Implementation
}
```

---

## 20. Versioning Rules

The project version in `package.json` must be updated after completing any feature or fix.

This project follows semantic-style versioning using three numeric levels:

```txt
major.minor.patch
```

Rules:

1. When adding a new feature, increase the second number, also known as the minor version.
2. When fixing an existing bug, behavior, issue, or previous implementation, increase the third number, also known as the patch version.
3. Do not change the first number unless the user explicitly requests a major release.
4. Always update the `version` field inside `package.json` after the feature or fix is completed.
5. Do not update the version before the implementation is finished.
6. Mention the version change in the final response.

Examples:

```txt
Current version: 1.1.0
New feature:     1.2.0
Bug fix:         1.1.1
```

```txt
Current version: 1.2.0
New feature:     1.3.0
Bug fix:         1.2.1
```

If the current version is written with two numbers only, normalize it to three numbers before updating:

```txt
Current version: 1.1
Treat as:        1.1.0
New feature:     1.2.0
Bug fix:         1.1.1
```

---

## 21. Golden Rule

The page file should stay clean and should only compose sections or feature-level components.

Correct:

```tsx
import { DashboardSection } from "@/components/dashboard";

export default function DashboardPage() {
  return <DashboardSection />;
}
```

Wrong:

```tsx
export default function DashboardPage() {
  return (
    <main>
      {/* Huge dashboard JSX here */}
      {/* API fetching here */}
      {/* Validation schemas here */}
      {/* Complex calculations here */}
    </main>
  );
}
```

---

## 22. Short Prompt for Future Agent Tasks

Use this prompt whenever asking an agent to build a new section, component, UI, API action, test, or MCP/Stitch/Figma-based implementation.

```md
Before writing any code, read and follow `AGENTS.md` from the project root.

Build the requested feature using the approved architecture:

- Route files only inside `src/app`
- Use route groups:
  - `(auth)` for login/sign-up/auth pages
  - `(client-portal)` for client portal pages
  - `(admin)` for dashboard/admin pages
- UI components inside `src/components/{feature-name}`
- Reusable components inside `src/components/shared`
- Static data inside `src/constants/{feature-name}.ts`
- Types inside `src/types/{feature-name}.ts`
- Helpers inside `src/lib/{feature-name}/helpers`
- Schemas inside `src/lib/{feature-name}/schemas`
- API/data-fetching actions inside `src/lib/{feature-name}/actions`
- API paths inside `src/lib/api-paths.ts`
- Shared Axios instance inside `src/lib/axios-instance.ts`
- Tests inside `src/test/{feature-name}`
- Assets inside `public/{feature-name}`

Use shadcn/ui components whenever suitable.

Before creating any reusable component, check `src/components/shared` first.

Do not mix UI, constants, types, logic, schemas, actions, and tests in the same file.

Do not place components, constants, types, lib files, or tests inside `src/app`.

For any important function, helper, schema, calculation, transformation, or API action, add a related test in `src/test/{feature-name}`.

For any data fetching, add the API path to `src/lib/api-paths.ts`, implement the action in `src/lib/{feature-name}/actions`, and use the shared Axios instance.

Use a mobile-first approach for every UI implementation.

The UI must be mobile-friendly first, then progressively responsive for tablet, laptop, and desktop screens.

This project is Arabic-first and RTL-first:

- Preserve `dir="rtl"` where needed.
- Arabic headings, paragraphs, cards, labels, and form text should visually align to the right.
- Prefer logical alignment utilities like `text-start` and `items-start` instead of hardcoded `text-left` or random `items-end`.
- Do not accidentally reverse text/image positions when using MCP, Stitch, Figma MCP, or generated UI.
- Verify Flexbox/Grid alignment before completing the task.

If using MCP server, Stitch, Figma MCP, screenshots, or design links, convert the generated code into the approved architecture and make sure the implementation matches the provided reference design as closely as possible.

Do not redesign the current style unless explicitly requested.

Do not create a desktop-only layout.

Do not change the design style while making it responsive.

Run lint, type-check, build, and tests when possible.

Update `package.json` version after completing a feature or fix.
```

---

## 20. API Fetching Stack: Axios, API Paths, and TanStack Query

This project uses three coordinated layers for all API communication:

```txt
src/lib/axios-instance.ts   -> shared Axios client
src/lib/api-paths.ts        -> centralized API endpoint registry
src/lib/{feature}/actions   -> raw API functions, query keys, query options, and mutation options
src/hooks/{feature}         -> React hooks, TanStack Query hooks, mutation hooks, and feature UI hooks
```

Follow the style of the provided previous-project files: one shared Axios client, one typed API paths registry, and feature-scoped actions.

### 20.1 Required packages

Install TanStack Query using the package manager already used by the project:

```bash
npm install @tanstack/react-query
npm install -D @tanstack/react-query-devtools
```

### 20.2 Provider setup

Create:

```txt
src/components/providers/query-provider.tsx
```

Rules:

1. The provider must be a client component and include `"use client"`.
2. Create one stable `QueryClient` instance. Do not create QueryClient inside pages or feature components.
3. Wrap the root app through `layout.tsx` or a shared providers component.
4. Add React Query Devtools only in development when suitable.
5. Use sensible defaults for dashboard apps, such as `staleTime`, `retry`, and `refetchOnWindowFocus`.

### 20.3 Axios instance rules

Place the shared client in:

```txt
src/lib/axios-instance.ts
```

Rules:

1. Use only one Axios instance for the whole project.
2. Do not call `axios.create` inside components, pages, hooks, or feature actions.
3. The instance should handle base URL, JSON headers, credentials/cookies when needed, auth token injection when needed, shared response/error behavior, FormData handling, and safe response parsing when needed.
4. If previous-project logic is business-specific, adapt it to Dhaman instead of copying blindly.
5. Keep useful comments bilingual: Arabic and English.

Preferred import style:

```ts
import axiosInstance from "@/lib/axios-instance";
```

### 20.4 API paths rules

Place all endpoint paths in:

```txt
src/lib/api-paths.ts
```

Rules:

1. Every backend endpoint must be added to `API_PATHS` before writing the related action/query/mutation.
2. Do not write raw endpoint strings inside components, pages, or actions.
3. Group endpoints by domain, such as `AUTH`, `DASHBOARD`, `AGREEMENTS`, `CLIENTS`, and `PAYMENTS`.
4. Use dynamic path helpers for IDs and slugs:

```ts
DETAIL: (id: string) => `/api/agreements/${encodeURIComponent(id)}`,
```

5. Keep the object typed and easy to navigate.

Preferred import style:

```ts
import { API_PATHS } from "@/lib/api-paths";
```

### 20.5 Feature actions folder pattern

Each feature keeps all API-related code in:

```txt
src/lib/{feature}/actions
```

Recommended structure:

```txt
src/lib/agreements/
  actions/
    agreement.api.ts
    agreement.keys.ts
    agreement.queries.ts
    agreement.mutations.ts
    index.ts
  helpers/
    index.ts
  schemas/
    index.ts
  index.ts

src/hooks/agreements/
  use-agreements-query.ts
  use-create-agreement-mutation.ts
  use-agreement-filters.ts
  index.ts
```

Rules:

1. `*.api.ts` contains raw Axios functions only.
2. `*.keys.ts` contains TanStack Query keys.
3. `*.queries.ts` inside `src/lib/{feature}/actions` contains reusable query options or helper builders, not React hooks unless there is a project-level exception.
4. `*.mutations.ts` inside `src/lib/{feature}/actions` contains mutation option builders or raw mutation helpers, not React hooks unless there is a project-level exception.
5. React hooks such as `useQuery`, `useMutation`, table filters, pagination state, debounced search, and feature UI state must live in `src/hooks/{feature}`.
6. Export public action APIs from `actions/index.ts` and public hooks from `src/hooks/{feature}/index.ts`.
7. Do not duplicate query, mutation, or hook logic inside multiple components.

### 20.6 Query keys

Each feature using TanStack Query must define stable query keys:

```ts
export const agreementsQueryKeys = {
  all: ["agreements"] as const,
  lists: () => [...agreementsQueryKeys.all, "list"] as const,
  list: (filters: AgreementFilters) => [...agreementsQueryKeys.lists(), filters] as const,
  details: () => [...agreementsQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...agreementsQueryKeys.details(), id] as const,
};
```

Rules:

1. Include filters, IDs, pagination, and search values in the query key when they affect returned data.
2. Use the same keys for invalidation after mutations.
3. Keep keys colocated with the feature actions.

### 20.7 Raw API function pattern

Raw API functions call Axios and return `response.data` only:

```ts
import axiosInstance from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type { Agreement, AgreementFilters } from "@/types";

// AR: تجلب قائمة الاتفاقيات من الـ API حسب الفلاتر الحالية.
// EN: Fetches the agreements list from the API using the current filters.
export async function getAgreements(filters: AgreementFilters) {
  const response = await axiosInstance.get<Agreement[]>(API_PATHS.AGREEMENTS.LIST, {
    params: filters,
  });

  return response.data;
}
```

Rules:

1. API functions must not contain React hooks.
2. API functions must not render UI, trigger toasts, or manage component state.
3. API functions must use `API_PATHS`, typed payloads, and typed responses.
4. API functions must be easy to test independently.

### 20.8 Hooks folder and TanStack Query usage

All React hooks must live in:

```txt
src/hooks/{feature}
```

Client components should use query/mutation hooks from the feature hooks folder, while the hooks themselves depend on raw actions and keys from `src/lib/{feature}/actions`.

```ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { getAgreements, agreementsQueryKeys } from "@/lib/agreements/actions";
import type { AgreementFilters } from "@/types";

// AR: Hook مخصص لجلب الاتفاقيات داخل مكونات العميل.
// EN: Custom hook for fetching agreements inside client components.
export function useAgreementsQuery(filters: AgreementFilters) {
  return useQuery({
    queryKey: agreementsQueryKeys.list(filters),
    queryFn: () => getAgreements(filters),
  });
}
```

Rules:

1. `useQuery` and `useMutation` are only allowed in client components or hooks used by client components.
2. Do not call `useQuery` or `useMutation` inside Server Components.
3. Use query hooks for tables, filters, pagination, refetching, forms, and interactive dashboard data.
4. Mutations must invalidate or update the correct query keys after success.
5. Any custom hook created for a feature/page must be placed in `src/hooks/{feature}`.
6. Hooks that are reused across multiple features must be moved to `src/hooks/shared`.
7. Hooks must not contain raw endpoint strings. They must import raw API functions and query keys from `src/lib/{feature}/actions`.
8. Hooks must not be created inside `src/components`, `src/app`, or `src/lib` unless the hook is purely a non-React utility and does not call React hooks.

### 20.9 Server Component vs Client Component fetching

Server Components:

- Call raw async API functions directly.
- Must not use `useQuery` or `useMutation`.
- May pass initial data to a client component.

Client Components:

- Must include `"use client"`.
- Use TanStack hooks from `src/hooks/{feature}`.
- Handle loading, error, pagination, filtering, refetching, and user interaction.

### 20.10 Mutation pattern

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAgreement, agreementsQueryKeys } from "@/lib/agreements/actions";

// AR: Mutation لإنشاء اتفاقية ثم تحديث قائمة الاتفاقيات.
// EN: Mutation for creating an agreement and refreshing the agreements list.
export function useCreateAgreementMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAgreement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agreementsQueryKeys.lists() });
    },
  });
}
```

Rules:

1. Mutations must use raw API functions from the same feature actions folder.
2. Mutations must invalidate or update related query keys after success.
3. Do not duplicate mutation logic across components.
4. Keep toast messages in the component or in a clearly agreed pattern, not inside raw API functions.

### 20.11 Custom hooks structure

The hooks layer is the only place for React hooks that coordinate UI behavior and TanStack Query behavior.

Approved structure:

```txt
src/hooks/
  shared/
    use-debounce.ts
    use-pagination.ts
    index.ts

  auth/
    use-login-mutation.ts
    index.ts

  agreements/
    use-agreements-query.ts
    use-create-agreement-mutation.ts
    use-update-agreement-mutation.ts
    use-agreement-filters.ts
    index.ts

  dashboard/
    use-dashboard-stats-query.ts
    index.ts
```

Rules:

1. Feature hooks must be grouped by feature/page name.
2. Use kebab-case file names for hook files, such as `use-agreements-query.ts`.
3. Use named exports only.
4. Every feature hooks folder must include an `index.ts` file.
5. Do not put raw Axios calls inside hooks. Hooks must call raw functions from `src/lib/{feature}/actions`.
6. Do not put endpoint paths inside hooks. Endpoint paths must stay in `src/lib/api-paths.ts`.
7. Hooks may contain UI-oriented state such as filters, pagination, sorting, selected tabs, debounced search, modal state, and query/mutation coordination.
8. Keep business transformations in `src/lib/{feature}/helpers` unless the transformation is purely UI state for the hook.
9. If a hook is used by more than one feature, move it to `src/hooks/shared`.
10. Add tests for important hook helpers and query key behavior when the logic is non-trivial.


### 20.12 Testing rules for API fetching

Tests belong in:

```txt
src/test/{feature}
```

Test important API functions, query key builders, schemas, helpers, transformations, and mutation wrapper behavior when needed.

Do not test TanStack Query internals. Test our wrappers and our business logic.

Recommended examples:

```txt
src/test/agreements/agreement.keys.test.ts
src/test/agreements/agreement.api.test.ts
src/test/agreements/agreement.schema.test.ts
```

### 20.13 Adding a new API integration workflow

For every new backend integration:

1. Add the endpoint to `src/lib/api-paths.ts`.
2. Add request/response types to `src/types/{feature}.ts`.
3. Add schemas to `src/lib/{feature}/schemas` if validation is needed.
4. Add raw Axios functions to `src/lib/{feature}/actions/{feature}.api.ts`.
5. Add query keys to `src/lib/{feature}/actions/{feature}.keys.ts`.
6. Add query option builders to `src/lib/{feature}/actions/{feature}.queries.ts` if reusable query configuration is needed.
7. Add mutation option builders to `src/lib/{feature}/actions/{feature}.mutations.ts` if reusable mutation configuration is needed.
8. Add React Query hooks to `src/hooks/{feature}` for client components, such as `use-{feature}-query.ts` and `use-create-{feature}-mutation.ts`.
9. Use raw async functions in Server Components, or TanStack hooks from `src/hooks/{feature}` in Client Components.
10. Add tests when the function, schema, query key, hook helper, transformation, or business behavior is important.
11. Export everything from the relevant `index.ts` files.
12. Run lint, build, and tests when possible.
