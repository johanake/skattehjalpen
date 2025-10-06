# Backend API Documentation

This document explains how to manage controllers and add endpoints in the Skattehjalpen backend.

## Testing Stripe

Test With Stripe Test Cards

Use these test card numbers in your payment form:

- Success: 4242424242424242
- Decline: 4000000000000002
- 3D Secure: 4000002500003155

## Architecture Overview

The backend uses a layered architecture with:

- **Express.js** for HTTP server
- **tRPC** for type-safe API communication
- **Controllers** for business logic
- **Services** for data operations
- **Validators** for input validation using Zod

## Project Structure

```
backend/src/
├── index.ts              # Main server file
├── router.ts             # Main tRPC router
├── trpc.ts              # tRPC configuration
├── controllers/         # Business logic handlers
├── services/            # Data services
├── validators/          # Zod schemas
├── types/              # TypeScript interfaces
└── config/             # Environment configuration
```

## Adding New Endpoints

### 1. Create a Controller

Controllers contain the business logic for your endpoints. Create a new file in `src/controllers/`:

```typescript
// src/controllers/exampleController.ts
import { publicProcedure, protectedProcedure } from "../trpc.js";
import { z } from "zod";

export const exampleController = {
  // GET-like operation (query)
  getExample: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      // Your logic here
      return { id: input.id, message: "Example data" };
    }),

  // POST-like operation (mutation)
  createExample: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // ctx contains auth info for protected procedures
      // Your logic here
      return { success: true, id: "new-id" };
    }),

  // Update operation
  updateExample: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).max(100),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Your logic here
      return { success: true, updated: true };
    }),
};
```

### 2. Add to Router

Import and add your controller to the main router in `src/router.ts`:

```typescript
import { exampleController } from "./controllers/exampleController.js";

export const appRouter = router({
  // Existing endpoints...

  // Add your new endpoint group
  example: router({
    getExample: exampleController.getExample,
    createExample: exampleController.createExample,
    updateExample: exampleController.updateExample,
  }),
});
```

### 3. Create Validation Schemas (Optional)

For complex inputs, create separate validation schemas in `src/validators/`:

```typescript
// src/validators/exampleValidators.ts
import { z } from "zod";

export const createExampleSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  category: z.enum(["type1", "type2", "type3"]),
  isActive: z.boolean().default(true),
});

export const updateExampleSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  category: z.enum(["type1", "type2", "type3"]).optional(),
  isActive: z.boolean().optional(),
});

export type CreateExampleInput = z.infer<typeof createExampleSchema>;
export type UpdateExampleInput = z.infer<typeof updateExampleSchema>;
```

Then use in your controller:

```typescript
import {
  createExampleSchema,
  updateExampleSchema,
} from "../validators/exampleValidators.js";

export const exampleController = {
  createExample: protectedProcedure
    .input(createExampleSchema)
    .mutation(async ({ input, ctx }) => {
      // Your logic here
    }),
};
```

## Procedure Types

### Public Procedures

Use `publicProcedure` for endpoints that don't require authentication:

```typescript
getPublicData: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    // No authentication required
  }),
```

### Protected Procedures

Use `protectedProcedure` for endpoints that require authentication:

```typescript
getPrivateData: protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {
    // ctx.userId is available here
    // Authentication is enforced
  }),
```

### Query vs Mutation

- **Query**: Use for GET-like operations that don't change data
- **Mutation**: Use for POST/PUT/DELETE-like operations that modify data

## Example API Calls

### Using cURL

```bash
# Query example
curl -X POST http://localhost:3001/trpc/example.getExample \
  -H "Content-Type: application/json" \
  -d '{"id": "123"}'

# Mutation example
curl -X POST http://localhost:3001/trpc/example.createExample \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Example", "description": "This is a test"}'
```

### Using Frontend (React)

```typescript
// Query
const { data, isLoading, error } = trpc.example.getExample.useQuery({
  id: "123",
});

// Mutation
const mutation = trpc.example.createExample.useMutation({
  onSuccess: (data) => {
    console.log("Created:", data);
  },
});

mutation.mutate({ name: "Test Example", description: "This is a test" });
```

## Existing Endpoints

### Health Check

- `trpc.health` - Basic health check

### User Management

- `trpc.user.getAll` - Get all users
- `trpc.user.getById` - Get user by ID
- `trpc.user.create` - Create new user (protected)

### Tax Services

- `trpc.tax.createDeclaration` - Create tax declaration
- `trpc.tax.getDeclaration` - Get tax declaration by ID
- `trpc.tax.getUserDeclarations` - Get user's declarations
- `trpc.tax.getReceipts` - Get receipts for declaration
- `trpc.tax.generateAdvice` - Generate tax advice
- `trpc.tax.createPaymentSession` - Create payment session
- `trpc.tax.completePayment` - Complete payment
- `trpc.tax.getPayment` - Get payment status

### Payment Processing

- `trpc.payment.createPaymentIntent` - Create Stripe payment intent
- `trpc.payment.confirmPayment` - Confirm payment
- `trpc.payment.getPaymentStatus` - Get payment status

### File Upload (Express endpoint)

- `POST /api/upload-receipt` - Upload receipt files

## Development

### Running the Server

```bash
# Development mode with auto-reload
npm run dev

# Debug mode with breakpoints
npm run dev:debug

# Build for production
npm run build

# Run production build
npm run start
```

### Debugging

1. Use `npm run dev:debug` to enable debugging
2. Set breakpoints in VS Code
3. Use the Debug panel to attach to the process
4. Or use console.log for quick debugging

### Error Handling

tRPC automatically handles errors. For custom errors:

```typescript
import { TRPCError } from "@trpc/server";

throw new TRPCError({
  code: "BAD_REQUEST",
  message: "Invalid input data",
});
```

## Best Practices

1. **Always validate input** using Zod schemas
2. **Use appropriate procedure types** (public vs protected)
3. **Group related endpoints** in router objects
4. **Keep controllers focused** on business logic
5. **Use services** for data operations
6. **Follow TypeScript conventions** with proper typing
7. **Handle errors gracefully** with meaningful messages

## Type Safety

The entire stack is type-safe from frontend to backend:

- Input validation with Zod
- Automatic TypeScript type inference
- End-to-end type safety with tRPC
- Frontend gets full type information automatically
