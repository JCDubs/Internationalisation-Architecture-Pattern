# Internationalization Order Service Example Project

## Introduction

This project demonstrates a Serverless Order Service API that implements a robust internationalization software architecture pattern. The pattern enables a "develop once, deploy many" approach, allowing the service to be developed as a single codebase but deployed to multiple regions with region-specific customizations.

This repository accompanies the blog post "Develop Once, Deploy Many: An Internationalization Software Pattern 🌎".

## Architecture Overview

The project follows a hexagonal (ports and adapters) architecture pattern, which separates the core business logic from external concerns:

- **Core Domain**: Contains the business logic and use cases for order management
- **Primary Adapters**: Handle incoming requests (API Gateway + Lambda)
- **Secondary Adapters**: Manage outgoing interactions (DynamoDB, external services)
- **Region-specific Code**: Customizations for different regions (ES, GB, US)

The architecture enables:
- Clear separation of concerns
- Region-specific customizations without duplicating code
- Consistent implementation of business rules across all regions
- Simplified maintenance and feature development

## Technologies Used

- **AWS CDK**: Infrastructure as Code for AWS resource provisioning
- **AWS Lambda**: Serverless compute for API handlers
- **Amazon API Gateway**: REST API management
- **Amazon DynamoDB**: NoSQL database using single-table design
- **Amazon Cognito**: User authentication and authorization
- **Node.js**: Runtime environment
- **TypeScript**: Programming language
- **Jest**: Testing framework

## Project Structure

```
├── infra/                  # CDK infrastructure code
│   ├── global/             # Shared infrastructure components
│   ├── es/                 # Spain-specific infrastructure
│   ├── gb/                 # UK-specific infrastructure
│   └── us/                 # US-specific infrastructure
├── src/                    # Application source code
│   ├── global/             # Shared application components
│   │   ├── adapters/       # Primary and secondary adapters
│   │   ├── use-cases/      # Business logic use cases
│   │   ├── models/         # Domain models
│   │   └── schemas/        # Validation schemas
│   ├── es/                 # Spain-specific code
│   ├── gb/                 # UK-specific code
│   └── us/                 # US-specific code
├── scripts/                # Utility scripts
└── test/                   # Test files
```

## Prerequisites

- Node.js (version specified in `.nvmrc`)
- AWS CLI configured with appropriate credentials
- AWS CDK installed globally (`npm install -g aws-cdk`)

## Deployment

The Order API can be deployed to an AWS account using the CDK deploy command:

```bash
# Install dependencies
npm install

# Bootstrap CDK (if not already done)
npx cdk bootstrap

# Deploy all stacks
npx cdk deploy --all
```

This will create three CloudFormation stacks:
- `auth`: Cognito user pool and identity providers
- `stateful`: DynamoDB tables and other persistent resources
- `stateless`: Lambda functions, API Gateway, and other compute resources

The API will be available through the auto-generated, public API Gateway URL provided in the deployment output.

## Data Initialization

The project includes utility scripts to populate the database and user pool with test data.

### Order and Customer Data Initialization

After deployment, initialize the database with sample order and customer data:

```bash
# For global data
node scripts/hydrate-global.js

# For UK-specific data
node scripts/hydrate-gb.js
```

These scripts insert customers and orders with static IDs that are referenced in the included Postman tests.

### User and Group Data Initialization

Populate the Cognito user pool with test users and groups:

1. Edit `scripts/create-users.js` and replace `{USER_POOL_ID}` with the ID of the user pool created during deployment
2. Run the script:

```bash
node scripts/create-users.js
```

This creates various users with different roles for testing the API's authorization controls.

## Using the API

### Authentication

The API requires authentication via Cognito. Login utility scripts are provided in the `scripts/login` directory for each test user:

1. Edit the login scripts in `scripts/login/` and replace `{CLIENT_ID}` with the ID of the user pool client created during deployment
2. Run a login script to obtain an ID token:

```bash
# Example: Login as user "Aron"
./scripts/login/aron.sh
```

The script will display the user's ID token in the console, which can be used in API requests.

### API Testing with Postman

A Postman collection (`postman_collection.json`) is included in the project that contains all possible API requests with annotations indicating whether each request should be allowed or denied based on the user's permissions.

To use the collection:

1. Import the collection into Postman
2. Create a Postman environment with two variables:
   - `api_url`: The URL of your deployed API Gateway
   - `id_token`: The ID token obtained from the login script
3. Run the requests to test the API functionality and authorization rules

You can also run the tests using Newman (Postman's command-line collection runner) as described in the `test/integration/README.md` file:

```bash
COUNTRY={country} API_URL={complete API url including environment stage} npm run test:integration
```

For example:

```bash
COUNTRY=gb API_URL=https://9c16xt6wzj.execute-api.eu-west-1.amazonaws.com/prod/ npm run test:integration
```

## Running Tests

```bash
# Run all tests
npm test

# Run integration tests
npm run test:integration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
