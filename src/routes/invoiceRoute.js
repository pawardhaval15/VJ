const express = require("express");
const { createInvoice, getAllInvoices, getInvoiceById } = require("../controllers/invoiceController");
const router = express.Router();

router.post("/create", createInvoice);
router.get("/getAll", getAllInvoices);
// Route to get an invoice by ID
router.get('/:id', getInvoiceById);
module.exports = router;
