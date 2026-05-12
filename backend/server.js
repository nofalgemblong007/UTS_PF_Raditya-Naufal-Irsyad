const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests, please try again later."
  }
});
app.use('/api/', limiter);

// Swagger Documentation Setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Eco-Share Platform API',
      version: '1.0.0',
      description: 'API documentation for the Eco-Share Platform - Used Electronics Rental System',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(__dirname, 'routes', '*.js')], // Use absolute path
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Route Imports
const authRoutes = require('./routes/authRoutes');

// API Routes
app.use('/api/auth', authRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: "Eco-Share Backend Service is Operational",
    version: "1.0.0"
  });
});

// Global Error Handler (to be refined later)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

app.listen(PORT, () => {
  console.log(`[Eco-Share] Server running on port ${PORT}`);
  console.log(`[Eco-Share] API Documentation available at http://localhost:${PORT}/api-docs`);
});
