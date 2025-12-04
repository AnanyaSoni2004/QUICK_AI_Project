// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";

// // Routes
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js";


// dotenv.config();
// connectDB();

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
// app.use(express.json());

// // Test Route
// app.get("/", (req, res) => {
//   res.send("✅ API is running...");
// });

// // Auth Routes
// app.use("/api/auth", authRoutes);

// // User Routes (you imported this but forgot to use it)
// app.use("/api/users", userRoutes);

// // AI Routes
// app.use("/api/ai", aiRoutes);

// // Start server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js";

// dotenv.config();

// // CONNECT TO DB BEFORE STARTING SERVER
// connectDB();

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/ai", aiRoutes);

// const PORT = process.env.PORT || 5001;

// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
import dotenv from "dotenv";
dotenv.config();

import express from "express";
// import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

// dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());

app.use(express.json());
import creationsRoutes from "./routes/creationsRoutes.js";

app.use("/api/creations", creationsRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);

// Start server
const PORT = process.env.PORT || 5001;
const HOST = "0.0.0.0"; // bind to all network interfaces

app.listen(PORT, HOST, (error) =>{
  if(error){
    return console.log(error)
  }
  console.log(`🚀 Server running on http://${HOST}:${PORT}`)}
);
