# Fullstack Technical Test Solution

This repository contains the solution for the Full-stack Technical Test.

## Background

The project is a Full-stack application with the following components:

- Frontend: React Typescript
- Backend: AWS Services (Lambda, Appsync GraphQL, DynamoDB, etc)
- 3rd Party API: Xero - Accounting software

The application authenticates Xero using oauth 2, calls the Xero API to retrieve the user's invoices and displays them in the web application.

## Setup

### Pre-Requisites

Before you start, please ensure you have the following:

1. An Amazon Web Services account for deploying the back-end ([Get started here](https://console.aws.amazon.com))
2. A Xero developer account for accessing Xero APIs ([Get started here](https://www.xero.com/au/signup/developers))
3. A Github account for version control.

### Installation

1. Clone the project from GitHub.

2. To install dependencies:

   ```
   yarn install && cd backend/src/layers/dependencyLayer/nodejs && yarn install
   ```

3. To serve react app:
   ```
   npx nx serve react-app
   ```

### Project Structure

The project structure is as follows:

- backend: Contains all the backend code including AWS CDK scripts, Lambda function code and DynamoDB setup
- react-app: Contains the React frontend application code
- package.json: Specifies project metadata and dependencies

### Setting up Xero App

After you have created a Xero developer account, set up a new Xero app and obtain the client ID and Client Secret. Insert these credentials into the project.

### Setting up AWS CDK

Authenticate to your AWS account and set up AWS CDK (if not already installed). If you have never used CDK in your AWS account, you will need to bootstrap it first. You would also need to deploy the back-end services in your AWS account.

## Running the app

Please follow the instructions in the original requirements for running the app and making sure it works as expected. If you face any issues, please open an issue in the Github Repository.

## Xero Invoice

1. Create a new AWS Lambda function that uses the "xero-node" third-party API. This function should use an access token to authenticate requests.

2. Implement functionality to refresh the access token whenever it expires.

3. On the front-end, create a reusable "EnhancedTable" component. This component should be capable of handling various operations such as pagination, sorting, and filtering.

4. Develop a custom hook that manages page, order, and the logic of filtering invoices from a GraphQL endpoint.

## Testing

Our test cases have been constructed based on the provided user stories. For specific details on these test cases, please refer to sections TEST001 - TEST006 in the original requirements document.

All components have undergone unit testing using Vitest, ensuring each individual part of the application functions as expected in isolation. Additionally, the React frontend application has passed all lint checks, ensuring code consistency and detecting potential problems in the codebase.

## Conclusion

This concludes the solution for the Full-stack Technical Test. Please feel free to explore this repository further and provide any feedback if necessary.

This is live loom video: https://www.loom.com/share/eda481ed7b214bd09dda51e50578dd9c

## Bouns

I add CI/CD pipeline using amplify.
That's live url: https://main.d1xm90x2ghpxoh.amplifyapp.com 
Thank you!
