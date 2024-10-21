# Cypress API Automation

This repository contains API automation test cases written in Cypress. The test cases cover GET, POST, PUT, and DELETE requests for different APIs such as GoRest and WeatherAPI. The automation includes token-based authentication for user operations and stores screenshots upon test failures for easy debugging.

## APIs Used
- **Get User Details** (GET request)
  - **Endpoint**: `https://gorest.co.in/public/v2/users`
  - This test verifies user details returned by the GET request.

- **Multiple Cities Weather** (POST request)
  - **Endpoint**: `https://api.weatherapi.com/v1/current.json?`
  - This test posts multiple city data, and then verifies the response using assertions.

- **Create, Update, and Verify User** (PUT request)
  - **Endpoint**: `https://gorest.co.in/public/v2/users`
  - The test first creates a new user, verifies the details, then updates the user information and verifies the updated details.

- **Delete User** (DELETE request)
  - **Endpoint**: `https://gorest.co.in/public/v2/users`
  - The test creates a user, verifies the details, deletes the user, and ensures the user is removed successfully.

## Authentication
For user-related operations (GET, POST, PUT, DELETE), an **accessToken** is required to authenticate the requests. Make sure you set the correct token in your test configuration.

## Cypress Features
- **Automatic Screenshots**: Cypress takes screenshots of the application when a test fails and stores them in the `screenshots` folder.
- **Assertions**: The test cases use Cypress's built-in assertion libraries to verify the accuracy of the API responses.
- **Test Structure**: Each test is structured to create, verify, and then update or delete resources with thorough checks after each operation.

## Folder Structure
- **cypress**: Contains the test files for each API.
- **node_modules**: Contains the project dependencies.
- **cypress.config.js**: Cypress configuration file.
- **package.json**: Project dependencies and scripts.

## How to Run
1. Clone this repository:
   ```bash
   git clone https://github.com/obaidsajjad-SQA-Engineer/Cypress-API-Automation.git
2. Change into the directory:
   cd Cypress-API-Automation

## Run Cypress Tests
You can run the Cypress tests using one of the following commands:

## To open the Cypress test runner: 
npx cypress open

## To run the tests headlessly:
npx cypress run


## Test Results

Test execution results will appear in the terminal, and screenshots of any failures will be saved in the `screenshots` folder.
