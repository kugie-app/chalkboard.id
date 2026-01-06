# Testing & CI/CD Setup

This document describes the comprehensive testing and CI/CD setup for the Chalkboard billiard hall management system.

## 🧪 Testing Infrastructure

### Test Framework
- **Jest** - Primary test runner with TypeScript support
- **Testing Library** - React component testing utilities  
- **Supertest** - API endpoint testing
- **PostgreSQL** - Test database for integration tests

### Test Structure
```
src/
├── test/
│   ├── utils/
│   │   ├── db.ts         # Database utilities & cleanup
│   │   ├── auth.ts       # Authentication mocks
│   │   └── api.ts        # API testing helpers
│   ├── factories/
│   │   └── index.ts      # Data factory functions
│   └── mocks/            # Mock implementations
├── app/api/*/            # API route tests (*.test.ts)
```

### Running Tests
```bash
# Run all tests
bun run test

# Run tests with coverage
bun run test:coverage

# Run tests in CI mode
bun run test:ci

# Watch mode for development
bun run test:watch
```

## 📊 Test Coverage

### API Routes Tested
- **Table Management** (`/api/tables/*`)
  - Table CRUD operations
  - Session start/end lifecycle
  - Pricing package integration
  - Authorization checks

- **F&B Order Processing** (`/api/fnb/orders`)
  - Order creation (standalone, table, draft contexts)
  - Inventory management & stock deduction
  - Multi-item orders
  - Payment integration

- **Payment Processing** (`/api/payments`)
  - Consolidated billing (table + F&B)
  - Multiple payment methods
  - Legacy format compatibility
  - Session/order linking

- **Analytics** (`/api/analytics/revenue`)
  - Revenue calculations & aggregations
  - Time-based grouping (daily/weekly/monthly)
  - Table utilization metrics
  - Payment method breakdowns

### Business Logic Coverage
- ✅ Pricing calculations
- ✅ Stock management
- ✅ Session billing
- ✅ Order processing
- ✅ Payment handling
- ✅ Data integrity
- ✅ Authorization flows

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow (`.github/workflows/test-pr.yml`)

#### Triggers
- Pull requests to `main` branch
- Pushes to `main` branch

#### Jobs Overview
1. **Test** - Unit tests with PostgreSQL
2. **Build** - Standard Next.js build
3. **Build Windows** - Standalone Windows executable
4. **Build Docker** - Container build (no push)
5. **Summary** - Aggregate results

#### Test Job
```yaml
services:
  postgres:
    image: postgres:15
    env:
      POSTGRES_PASSWORD: postgres
      POSTGRES_USER: postgres
      POSTGRES_DB: chalkboard_test
```

- Sets up PostgreSQL service container
- Runs database migrations
- Executes full test suite with coverage
- Uploads coverage to Codecov

#### Build Jobs
- **Standard Build**: `bun run build` with auto deployment mode
- **Windows Build**: `bun run build:standalone` + `bun run package:windows`
- **Docker Build**: Multi-stage build without registry push

### Local Testing

#### Prerequisites
```bash
# Install dependencies
bun install

# Optional: Set up local PostgreSQL
createdb chalkboard_test
```

#### Manual Testing Script
```bash
# Run comprehensive local test
./test-workflow-locally.sh
```

This script tests:
1. Dependency installation
2. Database migrations
3. Test execution
4. Build processes (standard, standalone, Docker)

## 🔧 Configuration

### Jest Configuration (`jest.config.js`)
- TypeScript support with `ts-jest`
- Separate test environment configuration
- Module path mapping for `@/` imports
- Coverage collection from `src/` directory

### Test Environment Variables
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/chalkboard_test"
NEXTAUTH_SECRET="test-secret-key"
NEXTAUTH_URL="http://localhost:3000"
DEPLOYMENT_MODE="test"
```

### TypeScript Configuration
- **`tsconfig.json`** - Excludes test files from main build
- **`tsconfig.test.json`** - Dedicated config for test files
- **Jest integration** - Uses test-specific TypeScript config

## 🛡️ Quality Gates

### Required Checks
- ✅ All unit tests pass
- ✅ Code coverage meets threshold
- ✅ Standard build succeeds
- ✅ Windows standalone build succeeds
- ✅ Docker build succeeds
- ✅ No TypeScript errors (in production code)
- ✅ ESLint validation (when configured)

### Deployment Readiness
The workflow ensures that every PR:
1. Maintains code quality through testing
2. Can be deployed to all target environments
3. Doesn't break existing functionality
4. Maintains database schema compatibility

## 🔍 Testing Best Practices

### Database Testing
- Each test runs in isolated transactions
- Test data factories ensure consistency
- Comprehensive cleanup between tests
- Real PostgreSQL for integration accuracy

### API Testing
- Authentication mocking for different roles
- Request/response validation
- Error scenario coverage
- Business logic verification

### Mock Strategy
- NextAuth sessions for auth testing
- Database transaction isolation
- External service mocking
- Environment variable management

## 📈 Monitoring & Reporting

### Coverage Reports
- Line coverage tracking
- Branch coverage analysis
- Function coverage metrics
- Codecov integration for PR feedback

### CI/CD Feedback
- Clear pass/fail indicators
- Detailed error reporting
- Build time optimization
- Parallel job execution

## 🚨 Troubleshooting

### Common Issues

#### Database Connection
```bash
# Check PostgreSQL is running
brew services start postgresql

# Create test database
createdb chalkboard_test

# Test connection
psql postgresql://postgres:postgres@localhost:5432/chalkboard_test
```

#### TypeScript Errors
- Test files excluded from main build via `tsconfig.json`
- Separate test configuration in `tsconfig.test.json`
- Missing type dependencies added to `devDependencies`

#### Build Issues
- ESLint temporarily disabled during builds
- TypeScript errors temporarily ignored for migration
- Environment-specific configurations handled

### Local Development
```bash
# Run tests continuously during development
bun run test:watch

# Test specific files
bun run test tables

# Debug test failures
bun run test --verbose --no-coverage
```

This comprehensive testing setup ensures code quality, deployment readiness, and confidence in releases while maintaining fast feedback cycles for development teams.