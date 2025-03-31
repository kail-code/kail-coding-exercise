# Patient Assessment Application

A full-stack application for conducting patient assessments and recommending appropriate follow-up assessments based on the patient's responses.

## Live Application

- [app.kailkeusch.com](https://app.kailkeusch.com)

## Problem & Solution

This application solves the problem of conducting patient assessments and automatically recommending appropriate follow-up assessments based on patient responses. The solution consists of two main parts:

1. **Backend API**: Handles assessment logic and recommendations

   - `/api/screener`: Provides question data for the assessment interface
   - `/api/assessment/assess`: Processes patient answers and recommends assessments

2. **Frontend Interface**: Provides an intuitive UI for conducting assessments
   - Mobile-responsive design
   - Progress tracking
   - Clear navigation
   - Confirmation steps before submitting the answers

## Technical Stack

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: React, TypeScript, Tailwind CSS
- **Build Tools**: Yarn, Vite
- **Deployment**:
  - Backend: Heroku
  - Frontend: ICDSoft VPS

## Technical Choices & Reasoning

The application is built using modern web technologies chosen for their reliability, developer experience, and maintainability. On the frontend, React with TypeScript provides a foundation with strong type safety and component reusability. React Router handles navigation and data loading, significantly simplifying state management through its loader capabilities. Tailwind CSS was selected for styling, enabling rapid development while maintaining consistent design patterns.

For the backend, Express with TypeScript offers a well-structured API layer with type safety. The current implementation uses file-based storage instead of a database, chosen for simplicity given the application's current scope. As the application grows and requires data persistence, PostgreSQL would be implemented for its reliability.

I chose to directly use React Router's data loader for this application since it aligns well with the customer-facing nature of the site. For more complex applications, especially those requiring sophisticated state management and data flow, I would prefer Redux for its centralized state management and better handling of complex data interactions.

The frontend uses React Context (SectionContext) to manage the state of user answers and question navigation. This context provides a centralized way to track answers as users progress through the assessment, while keeping the state management simple and avoiding prop drilling through multiple component levels. The context also handles answer validation and triggers navigation to the next question when appropriate, making it easier to maintain a consistent user experience throughout the assessment flow.

## Project Structure

This project is organized as a monorepo using Yarn workspaces, containing both frontend and backend applications.

`packages/frontend`

- React application built with Vite
- Components organized by feature
- Common components shared across features
- Context providers for state management

`packages/backend`

- Express server with TypeScript
- Routes organized by feature
- Services layer for business logic
- File-based storage for assessment data

## Production Strategy

For a true production deployment, the application would be hosted entirely on AWS infrastructure. The backend would run on AWS Elastic Beanstalk, with environment variables securely managing configuration for different deployment environments (development, staging, production). These variables would control settings like API endpoints, logging levels, and other environment-specific configurations. Feature flags would be implemented to enable gradual rollout of new features and quick rollback if issues are detected.

Security would be implemented through multiple layers of protection. The application servers would be placed in private subnets, accessible only through a bastion host in a public subnet. This setup ensures that direct access to the servers is restricted and all administrative access must go through this controlled entry point. Data transmission would be secured through HTTPS using AWS Certificate Manager. The API endpoints would implement rate limiting to prevent abuse, and include proper CORS configuration and security headers to prevent common web vulnerabilities. Input validation and sanitization would be implemented at both frontend and backend layers, with special attention to protecting sensitive health data in compliance with HIPAA requirements.

For effective troubleshooting in production, the application would utilize New Relic for comprehensive logging and monitoring. Error tracking would capture both frontend and backend issues through New Relic APM, providing detailed transaction traces and error context. New Relic Metrics would track key performance indicators like response times and error rates, with automated alerts.

## Trade-offs

Testing is a critical area that requires attention before production deployment. While some key frontend components have test coverage, the current test suite falls short of production requirements. Each file with any logic will need to be under unit test. Any critical business logic would need to have integration testing OR complete frontend/backend E2E testing with Cypress. This is particularly important for:

- Assessment scoring logic that determines recommendations
- Question navigation and state management
- Answer submission and validation
- API integration points

The current implementation focuses on testing core frontend components, but a production-ready version would require comprehensive test coverage to ensure reliability and prevent regressions when implementing new features or making changes to existing functionality.

There is no implementation of authentication for the app. The API endpoints are completely open, with no token-based authentication or authorization headers required. While this simplified initial development, proper authentication and API security would be essential for a production environment, particularly for handling sensitive health data.

The mobile responsiveness is not well implemented currently. The current layout works but could be improved with better touch targets, more appropriate spacing, and a more polished navigation experience on smaller screens. This would be a priority for production deployment given the likelihood of patients completing assessments on mobile devices.

## Future Improvements

Integrate this form with Blueprint's patient catalog system, allowing healthcare providers to send assessment links directly to patients through a secure mechanism. Each assessment link would be generated with a unique UUID, ensuring secure and accurate mapping of responses to the correct patient record. The UUID would be valid until the patient submits the questions or after a timeout period. When patients complete their assessment, their answers and the resulting recommendations would be securely posted back to Blueprint's system and stored in their patient portfolio. The current modular architecture provides a foundation for this feature while also focusing on HIPAA compliance and secure data persistence.

## Known Issues

- Assessment progress is not saved if the user leaves the page or refreshes
- Multiple Sections - while the app is structured in a way to handle multiple sections, the user won't be able to navigate to the additional sections and won't be able to submit answers when there are multiple sections
- API endpoints lack rate limiting and could be vulnerable to abuse
- The app does not currently require that all questions be answered
- No loading state when submitting the form to the API

## About Me

- GitHub: [kfkkail](https://github.com/kfkkail)
- LinkedIn: [Kail Keusch](https://linkedin.com/in/kailkeusch)
- Resume: [Kail Keusch](https://app.kailkeusch.com/KailKeuschResume.pdf)
