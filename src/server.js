const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // ✅ ADD THIS LINE
const authRoutes = require('./routes/authRoutes');
const invoiceRoute = require("./routes/invoiceRoute");
const quotationRoutes = require('./routes/quotationRoute');
require('dotenv').config();
 
const app = express();
 
// Middleware
app.use(bodyParser.json());
 
// ✅ Proper CORS config
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend origin
  credentials: true               // Optional: only needed if sending cookies/auth headers
}));
 
// Routes
app.use('/api/auth', authRoutes);
app.use("/api/invoice", invoiceRoute);
app.use('/api/quotations', quotationRoutes);
 
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 
 
