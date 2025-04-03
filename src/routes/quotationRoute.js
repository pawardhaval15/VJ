// src/routes/quotationRoute.js

const express = require('express');
const router = express.Router();
const { createQuotation, getQuotationById, getAllQuotations } = require('../controllers/quotationController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware
// Route to create a quotation
router.post('/create', authMiddleware, createQuotation);
// Route to get all quotations
router.get('/', authMiddleware, getAllQuotations);
// Route to get a quotation by ID
router.get('/:id', authMiddleware, getQuotationById);

module.exports = router;
