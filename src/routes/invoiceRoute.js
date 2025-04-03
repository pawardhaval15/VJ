const express = require("express");
const { createInvoice, getAllInvoices, getInvoiceById } = require("../controllers/invoiceController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Import the auth middleware

router.post("/create",authMiddleware, createInvoice);
router.get("/getAll",authMiddleware, getAllInvoices);
// Route to get an invoice by ID
router.get('/:id',authMiddleware, getInvoiceById);
module.exports = router;
