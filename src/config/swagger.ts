// Swagger options
const SWAGGER_OPTIONS = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Bridge Real Estate Rental and Payment Platform API',
      version: '1.0.0',
      description:
        'The Bridge Real Estate Rental and Payment Platform API simplifies property rental and payments, connecting landlords and tenants. Manage your properties efficiently and securely, seamlessly integrating the API into your applications.',
      contact: {
        name: 'Orji Michael',
        email: 'orjimichael4886@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1', // Development environment
        description: 'Development Environment',
      },
      {
        url: 'https://api.example.com/api/v1', // Staging environment
        description: 'Staging Environment',
      },
      {
        url: 'https://api.example.com/api/v1', // Production environment
        description: 'Production Environment',
      },
    ],
    tags: [
      {
        name: 'Authentication',
        description:
          'API operations related to user login and authorization with cookie-based sessions.',
      },
    ],
  },
  apis: ['**/*.jsdoc.ts'], // Define the paths to your API routes
};

export default SWAGGER_OPTIONS;
