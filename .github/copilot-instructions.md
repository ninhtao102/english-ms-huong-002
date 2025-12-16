# Copilot Instructions

AI agents should use this guide to be immediately productive in the English Miss Huong educational platform codebase. This is an Angular 12 + Fuse admin dashboard for managing homework assignments and student submissions.

## Architecture Overview

**Tech Stack**: Angular 12, Material Design, Fuse Admin Template, Tailwind CSS, Transloco (i18n)

**Core Startup Path**:
1. [src/app/app.module.ts](../src/app/app.module.ts) bootstraps with [src/app/app.routing.ts](../src/app/app.routing.ts)
2. Routes protected by `AuthGuard` resolve [src/app/app.resolvers.ts](../src/app/app.resolvers.ts) `InitialDataResolver` (loads nav, user, notifications)
3. [src/app/layout/layout.component.ts](../src/app/layout/layout.component.ts) renders the `classy` layout (configured in [src/app/core/config/app.config.ts](../src/app/core/config/app.config.ts))
4. Feature modules lazy-load from [src/app/modules/admin/](../src/app/modules/admin/) (content, homeworks, submissions)

## Run & Build

Angular 12 requires legacy OpenSSL provider:
```bash
npm install
npm run pre                    # Sets NODE_OPTIONS=--openssl-legacy-provider
npm start                      # Dev server (http://localhost:4200)
npm run build                  # Production build
npm test                       # Karma/Jasmine tests
npm run lint                   # ESLint
```

## API Layer & Services

**HTTP Foundation**: [src/app/shared/base-service/base.service.ts](../src/app/shared/base-service/base.service.ts) provides generic CRUD with centralized error handling.
- Construct: `super(http, '/endpoint')` (e.g., `super(http, '/homeworks')`)
- Methods: `getAll()`, `search(payload)`, `get(id)`, `save(item)`, `delete(id)`, `requestGet(path)`, `requestPost(path, payload)`
- Base URL from [src/environments/environment.ts](../src/environments/environment.ts) `apiUrl` (default: `http://192.168.1.216:8081/api/v1`)
- All responses typed as `BaseResponse<T>` with shape: `{ status, code, message, body, timestamp }`

**Service Pattern**: All entity services extend `BaseService` and are in [src/app/shared/service/](../src/app/shared/service/) (e.g., `HomeworkAssignmentService`, `ClassesService`, `PersonsService`). This centralizes domain logic outside components.

**Response Shapes**: Import from [src/app/utils/constants/common.ts](../src/app/utils/constants/common.ts):
- `BaseResponse<T>` - Standard API wrapper
- `PageResponse<T>` - Paginated list: `{ content: T[], pageable, totalElements, totalPages }`
- Pagination defaults: `pageIndex=0, pageSize=10`

## Authentication & Interceptors

**Auth Service** ([src/app/core/auth/auth.service.ts](../src/app/core/auth/auth.service.ts)):
- Extends `BaseService` with endpoint `/auth`
- Token stored in `localStorage` keys: `accessToken`, `refreshToken`
- Methods: `signIn(credentials)`, `signOut()`, `refreshToken()`, check via `isAuthenticated`

**HTTP Interceptor** ([src/app/core/auth/auth.interceptor.ts](../src/app/core/auth/auth.interceptor.ts)):
- Adds `Authorization: Bearer {accessToken}` to requests
- Refreshes token if expired (uses `AuthUtils.isTokenExpired`)
- Returns 401 → triggers sign-out

**Route Guards** ([src/app/core/auth/guards/](../src/app/core/auth/guards/)):
- `AuthGuard` blocks unauthenticated access to admin routes
- `NoAuthGuard` redirects logged-in users from login page

## UI & Components

**List Pattern**: Components extend [src/app/shared/base-list/base-list.component.ts](../src/app/shared/base-list/base-list.component.ts)
- Includes MatTable + MatPaginator wired for search/filter
- Example: [src/app/modules/admin/homeworks/homeworks-list/homeworks-list.component.ts](../src/app/modules/admin/homeworks/homeworks-list/homeworks-list.component.ts) shows reactive form for filters, `search(params)` calls service, `MatTableDataSource` binds results
- Filter shape matches service payload (e.g., `{ classId, title, isOutDate, pageIndex, pageSize }`)
- Call `this.cdr.detectChanges()` after async updates to UI

**Dialog & Detail Pattern**: Use `MatDialog` with reactive forms
- Import at module level: `MatDialogModule`, `ReactiveFormsModule`
- Pass data via `dialog.open(DetailComponent, { data: { id, readonly } })`
- On close, parent reloads list via `searchHandler()`
- Example path: [src/app/modules/admin/content/](../src/app/modules/admin/content/)

**Toast Feedback** ([src/app/shared/base-service/toast-message.service.ts](../src/app/shared/base-service/toast-message.service.ts)):
- Inject `ToastMessageService`
- Call: `this.toast.actionSuccess('common.add', 'homeworks.field')` or `actionFailed(action, field, optionalMessage)`
- Auto-hides after 3 seconds; uses Transloco i18n keys

**Confirm Dialog** ([src/app/shared/confirm-dialog/](../src/app/shared/confirm-dialog/)):
- Pre-built delete confirmation; shows `{{ field }} {{ value }}`
- Usage: `this.dialog.open(ConfirmDialogComponent, { data: { field: 'homework', value: homework.title } })`

## Internationalization (i18n)

**Transloco Setup**: Config in [src/app/core/transloco/](../src/app/core/transloco/)
- Translation files: [src/assets/i18n/en.json](../src/assets/i18n/en.json), [tr.json](../src/assets/i18n/tr.json), [vi.json](../src/assets/i18n/vi.json)
- Usage: `this.transloco.translate('common.add')` or `{{ 'common.add' | transloco }}`
- Structure: `common.*` for shared keys, feature-specific keys under domain (e.g., `homeworks.field`, `categories.label.name`)
- **Never hardcode text** — always use i18n keys

**Mock vs Real APIs**
- **Mock**: Fuse mock APIs registered in [src/app/mock-api/index.ts](../src/app/mock-api/index.ts) and subfolders power example dashboards.
- **Real**: Admin modules call backend via `BaseService`. Remove/disable conflicting mock imports when wiring real endpoints.

**Styling & Assets**
- **Styles**: Tailwind + Fuse SCSS at [src/@fuse/styles](../src/@fuse/styles) and [src/styles](../src/styles). Follow existing utility classes; avoid inline styles.
- **Assets**: Icons/images in [src/assets](../src/assets). Fonts in [src/assets/fonts](../src/assets/fonts). Prefer existing assets.

## Data Models & Constants

Path alias mapping (in `tsconfig.json`):
- `@shared` → [src/app/shared/](../src/app/shared/)
- `@utils` → [src/app/utils/](../src/app/utils/)
- `@environments` → [src/environments/](../src/environments/)

Key entity models live in [src/app/shared/model/](../src/app/shared/model/):
- `HomeworksDto` - Homework with `title, description, classId, assignedDate, dueDate`
- `ClassesDto` - Class with `className, classCode, teacherId, academicYear`
- `PersonsDto` - User (student/teacher) with `firstName, lastName, email, phoneNumber`
- Add TypeScript `.model.ts` files here when introducing new entities

## Adding a New Admin Entity

1. **Create folder** under [src/app/modules/admin/YOUR_ENTITY/](../src/app/modules/admin/) with `list` and optionally `detail` subfolders
2. **List Component**: Extend `BaseListComponent`, inject service, implement `searchHandler()` 
3. **Service**: Create in [src/app/shared/service/YOUR_ENTITY.service.ts](../src/app/shared/service/), extend `BaseService('/YOUR_ENDPOINT')`
4. **Model**: Add `YOUR_ENTITY.model.ts` in [src/app/shared/model/](../src/app/shared/model/)
5. **Module**: Create `YOUR_ENTITY.module.ts` with declarations, imports (`SharedModule`, `MatX`)
6. **Routing**: Add to [src/app/app.routing.ts](../src/app/app.routing.ts) under admin routes: `{ path: 'YOUR_ENTITY', loadChildren: () => import('app/modules/admin/YOUR_ENTITY/YOUR_ENTITY.module').then(m => m.YOURENTITYModule) }`
7. **i18n**: Add keys in [src/assets/i18n/en.json](../src/assets/i18n/en.json) under `YOUR_ENTITY.{ field, label, placeholders, columns }`

## Mock API vs Real Backend

- **Mock APIs** ([src/app/mock-api/](../src/app/mock-api/)) are used for dashboards and examples
- **Real Backend**: Admin feature modules call real services; mock API registration won't interfere if endpoints are distinct
- **Disabling Mocks**: If adding real endpoint and mock conflicts, remove/comment the mock import from [src/app/mock-api/index.ts](../src/app/mock-api/index.ts)

## Common Workflows

**Search/Filter**: Set filter form, call `service.search(payload)`, update `MatTableDataSource`, detect changes  
**CRUD Dialog**: Open dialog with `MatDialog.open(DetailComponent, { data: { id } })`, on close reload list  
**Error Handling**: Inject `ToastMessageService`, call `actionFailed(action, field, message)` on error  
**Form Validation**: Use reactive forms (`FormBuilder`), add validators, show error with `*ngIf` on field

## Development Debugging Tips

- Tokens expire → `AuthInterceptor` triggers refresh; check `localStorage` for `accessToken`
- Component not detecting changes → Call `this.cdr.detectChanges()` after async updates
- Service returns empty → Check `response.body.content` is array; map if needed (see [src/app/modules/admin/homeworks/homeworks-list/homeworks-list.component.ts](../src/app/modules/admin/homeworks/homeworks-list/homeworks-list.component.ts) line ~67)
- Translation missing → Verify key in JSON file and locale config in Transloco service
