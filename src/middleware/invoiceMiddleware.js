exports.validateInvoice = (req, res, next) => {
    const { customerName, customerAddress, customerMobile, products } = req.body;

    if (!customerName || !customerAddress || !customerMobile || !products || products.length === 0) {
        return res.status(400).json({ error: "All fields are required!" });
    }
    next();
};
