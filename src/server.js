const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const invoiceRoute = require("./routes/invoiceRoute");
const quotationRoutes = require('./routes/quotationRoute');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/invoice", invoiceRoute);
app.use('/api/quotations', quotationRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
