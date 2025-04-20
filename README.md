# Jest API Framework

## Practice API
A TypeScript-based API testing framework for practicing API testing with Jest and Supertest.
Setup

Clone this repository:
 ```
git clone https://github.com/qualicion/jest-api
 
cd jest-api
```


## Install dependencies:
```
npm install
```

## Project Structure

```
practice-api/
├── config/              # Configuration files
├── controller/          # API controllers
├── data/                # Test data
├── node_modules/        # Dependencies
├── specs/               # Test specifications
│   ├── brands.spec.ts   # Brand API tests
│   ├── categories.spec.ts # Category API tests
│   ├── poc.spec.ts      # Proof of concept tests
│   └── upload.spec.ts   # File upload tests
├── utils/               # Utility functions
├── jest.config.js       # Jest configuration
├── package-lock.json
├── package.json
└── README.md
```


## Running Tests
### Run all tests
```
npm test
```

### Run tests in watch mode
```
npm run test:watch
```
### Run specific test suites

####  Tests to retrieve, create, update and delete brands
```
npm run test:brands
```

####  Tests to retrieve, create, update and delete categories
```
npm run test:categories
```
####  POC tests
```
npm run test:poc
```
####  Tests to upload files
```
npm run test:upload
```

## Features

- TypeScript support
- Jest testing framework integration
- Supertest for HTTP assertions
- JWT authentication support
- HTML and JUnit test reports

## Dependencies

- Jest: Testing framework
- Supertest: HTTP assertions library
- ts-jest: TypeScript integration for Jest
- jsonwebtoken: JWT authentication