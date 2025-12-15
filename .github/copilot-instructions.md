# Copilot Instructions

These notes make AI agents productive immediately in this Angular + Fuse workspace. Link to referenced files to jump fast.

- **Stack & Boot**: Angular 12 + Fuse template. App bootstraps [src/app/app.module.ts](../src/app/app.module.ts) → [src/app/layout/layout.module.ts](../src/app/layout/layout.module.ts) via routes in [src/app/app.routing.ts](../src/app/app.routing.ts). Default redirect to `/dashboard` uses Fuse mock example.
- **Run & Build**: Install deps then run the legacy OpenSSL shim. Use:
	- `npm install`
	- `npm run pre` (sets `NODE_OPTIONS=--openssl-legacy-provider`)
	- `npm start` (dev server)
	- `npm run build` (production build)
	- `npm test` (Karma/Jasmine)
- **Environments**: API base from [src/environments/environment.ts](../src/environments/environment.ts) and [.prod.ts](../src/environments/environment.prod.ts) as `apiUrl`.

**Layouts & Routing**
- **Layout host**: [src/app/layout/layout.component.ts](../src/app/layout/layout.component.ts) with `classy` layout; configured in app config under [src/app/core/config](../src/app/core/config).
- **Initial data**: [src/app/app.resolvers.ts](../src/app/app.resolvers.ts) `InitialDataResolver` preloads nav, user, notifications, shortcuts, quick-chat before admin routes.
- **Lazy features**: Each admin feature lives under [src/app/modules/admin](../src/app/modules/admin) and exposes a child route `path: ''` mapped to its list component. Auth/guest/landing reuse the same layout host with `data: { layout: 'empty' }`.

**Auth & Interceptors**
- **Guards**: Admin routes protected by guards in [src/app/core/auth](../src/app/core/auth).
- **Service**: `AuthService` extends shared base; endpoints under `/auth`. Tokens persisted in `localStorage` keys `accessToken` and `refreshToken`.
- **HTTP Interceptor**: `AuthInterceptor` attaches `Authorization: Bearer …` when token not expired using `AuthUtils.isTokenExpired`; handles `401` by sign-out.

**HTTP & Base Service**
- **Shared CRUD**: Use [src/app/shared/base-service/base.service.ts](../src/app/shared/base-service/base.service.ts). Construct with endpoint segment (e.g., `/categories`). Methods: `getAll`, `search`/`searchPages`, `get`, `save` (POST), `delete`, `requestGet`, `requestPost`. URLs built from environment `apiUrl` with centralized error handling.

**UI Patterns**
- **Lists**: Extend `BaseListComponent` in [src/app/shared/base-list](../src/app/shared/base-list). MatTable + paginator defaults wired from [src/app/utils/constants](../src/app/utils/constants).
- **Dialogs**: Detail dialogs use `MatDialog` + reactive forms; see canonical flow at [src/app/modules/admin/categories](../src/app/modules/admin/categories) (pagination, CRUD, reload on close, readonly via dialog data).
- **Feedback**: Use `ToastMessageService` for Fuse alerts with Transloco keys (`actionSuccess`/`actionFailed`). Confirm deletes via [src/app/shared/confirm-dialog](../src/app/shared/confirm-dialog).

**i18n**
- **Transloco**: Config at [src/app/core/transloco](../src/app/core/transloco). Strings live in [src/assets/i18n/en.json](../src/assets/i18n/en.json), [tr.json](../src/assets/i18n/tr.json), [vi.json](../src/assets/i18n/vi.json). Prefer `common.*`, feature keys like `categories.field`; avoid hardcoded text.

**Mock vs Real APIs**
- **Mock**: Fuse mock APIs registered in [src/app/mock-api/index.ts](../src/app/mock-api/index.ts) and subfolders power example dashboards.
- **Real**: Admin modules call backend via `BaseService`. Remove/disable conflicting mock imports when wiring real endpoints.

**Styling & Assets**
- **Styles**: Tailwind + Fuse SCSS at [src/@fuse/styles](../src/@fuse/styles) and [src/styles](../src/styles). Follow existing utility classes; avoid inline styles.
- **Assets**: Icons/images in [src/assets](../src/assets). Fonts in [src/assets/fonts](../src/assets/fonts). Prefer existing assets.

**Path Aliases & Models**
- **Aliases**: TS paths map to `@fuse`, `@shared`, `@utils`, `@environments`; prefer these over relative imports.
- **Responses**: Shared shapes in [src/app/utils/constants](../src/app/utils/constants) like `BaseResponse`, `PageResponse`, and pagination defaults. List payloads typically `{ keyword, pageIndex, pageSize }` plus feature filters.

**Adding a New Entity (example)**
- Scaffold under `src/app/modules/admin/<entity>` with list component + detail dialog.
- Create service extending `BaseService('/<entity>')` and add admin route in [src/app/app.routing.ts](../src/app/app.routing.ts) behind `AuthGuard` and `InitialDataResolver`.

Questions or unclear workflows? Tell me what to refine here and I’ll update this doc.