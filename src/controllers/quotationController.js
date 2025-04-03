// src/controllers/quotationController.js

const Quotation = require('../models/quotationModel');
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware

// Create Quotation
exports.createQuotation = [
    authMiddleware, // Add middleware for user verification
    async (req, res) => {
        try {
            const {
                customer_name,
                address,
                mobile_no,
                party_gst_no,
                date,
                products,
                total_amount
            } = req.body;

            const quotation = await Quotation.create({
                customer_name,
                address,
                mobile_no,
                party_gst_no,
                date,
                products,
                total_amount
            });

            res.status(201).json({
                message: "Quotation created successfully!",
                quotation
            });
        } catch (error) {
            console.error("Error creating quotation:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
];

// Get All Quotations
exports.getAllQuotations = [
    authMiddleware, // Add middleware for user verification
    async (req, res) => {
        try {
            const quotations = await Quotation.findAll();

            res.status(200).json({
                message: "Quotations retrieved successfully!",
                quotations
            });
        } catch (error) {
            console.error("Error fetching quotations:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
];

// Get Quotation by ID
exports.getQuotationById = [
    authMiddleware, // Add middleware for user verification
    async (req, res) => {
        try {
            const quotationId = req.params.id;
            const quotation = await Quotation.findOne({ where: { id: quotationId } });

            if (!quotation) {
                return res.status(404).json({ message: "Quotation not found!" });
            }

            res.status(200).json(quotation);
        } catch (error) {
            console.error("Error fetching quotation:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
];