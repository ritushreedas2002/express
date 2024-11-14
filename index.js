require("dotenv").config()
const express = require("express");
const connectDB = require("./config/db");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const app = express();

// Connect to Database
connectDB();

// Allowed Origins for CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://car-management-frontend-xi.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
};

// Use JSON parser and CORS
app.use(express.json());
app.use(cors(corsOptions));

// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Car Management API",
      version: "1.0.0",
      description: "API for managing car inventory",
    },
    servers: [
      {
        url: "https://express-dun-sigma.vercel.app/", 
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

// Initialize Swagger Docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
// const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const CSS_URL="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
// app.use(
//   "/api/docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocs, { customCssUrl: CSS_URL })
// );

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    customCss:
        '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL
})
)

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Car Management API");
});

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cars", require("./routes/carRoutes"));

port=process.env.PORT;

app.listen(port,()=>{
  console.log("server listening");
})
