const Invoice = require("../models/invoiceModel");
const authMiddleware = require("../middleware/authMiddleware"); // Import the auth middleware

exports.createInvoice = [
    authMiddleware, // Add middleware for user verification
    async (req, res) => {
        try {
            const {
                customerName,
                customerAddress,
                customerMobile,
                partyGSTNo,
                products
            } = req.body;

            let totalAmount = 0;
            let cgstAmount = 0;
            let sgstAmount = 0;

            products.forEach(product => {
                product.amount = product.quantity * product.rate;
                product.cgst = product.amount * 0.09;
                product.sgst = product.amount * 0.09;

                totalAmount += product.amount;
                cgstAmount += product.cgst;
                sgstAmount += product.sgst;
            });

            const totalAfterTax = totalAmount + cgstAmount + sgstAmount;

            const newInvoice = await Invoice.create({
                customerName,
                customerAddress,
                customerMobile,
                partyGSTNo,
                products,
                totalAmount,
                cgstAmount,
                sgstAmount,
                totalAfterTax
            });

            res.status(201).json({
                message: "Invoice Created Successfully",
                invoice: newInvoice
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create invoice" });
        }
    }
];

exports.getAllInvoices = [
    authMiddleware, // Add middleware for user verification
    async (req, res) => {
        try {
            const invoices = await Invoice.findAll();
            res.status(200).json({ invoices });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch invoices" });
        }
    }
];

// Get Invoice by ID
exports.getInvoiceById = [
    authMiddleware, // Add middleware for user verification
    async (req, res) => {
        try {
            const invoiceId = req.params.id;
            const invoice = await Invoice.findOne({ where: { id: invoiceId } });

            if (!invoice) {
                return res.status(404).json({ message: "Invoice not found!" });
            }

            res.status(200).json(invoice);
        } catch (error) {
            console.error("Error fetching invoice:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
];