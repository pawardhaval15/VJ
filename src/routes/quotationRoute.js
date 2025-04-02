// src/routes/quotationRoute.js

const express = require('express');
const router = express.Router();
const { createQuotation, getQuotationById, getAllQuotations } = require('../controllers/quotationController');

// Route to create a quotation
router.post('/create', createQuotation);
// Route to get all quotations
router.get('/', getAllQuotations);
// Route to get a quotation by ID
router.get('/:id', getQuotationById);

module.exports = router;
