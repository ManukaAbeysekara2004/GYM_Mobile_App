const supplement = require('../models/SupplementPost');

// --- 01. Create a new supplement Post --- //

exports.Supplement_Create = async (req, res) => {
    try {
        const { supplementName, supplementBrand, supplementType, supplementDescription, supplementPrice, supplementStock, supplementAvailable, supplementImage } = req.body;

        if (supplementPrice <= 0) {
            return res.status(400).json({ message: 'Supplement price must be greater than 0' });
        }

        if (supplementStock < 0) {
            return res.status(400).json({ message: 'Supplement stock must be greater than 0' });
        }

        const newSupplement = new supplement({ supplementName, supplementBrand, supplementType, supplementDescription, supplementPrice, supplementStock, supplementAvailable, supplementImage });
        await newSupplement.save();

        res.status(201).json({ message: 'Supplement created successfully', supplement: newSupplement });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// --- 02. Update Supplement Name --- //

exports.Supplement_Update_Name = async (req, res) => {
    try {
        const { supplementPostId } = req.params;
        const { supplementName } = req.body;

        // Check if supplement is exist or not
        let supplement = await supplement.findById(supplementPostId);
        if (!supplement) {
            return res.status(404).json({ message: 'Supplement post not found' });
        }

        // Update supplement name
        let update_supplementName = await supplement.findByIdAndUpdate(
            supplementPostId,
            { $set: { supplementName: supplementName } },
            { new: true }
        );

        if (!update_supplementName) {
            return res.status(404).json({ message: 'Failed to update supplement name' });
        }

        res.status(200).json({ message: 'Supplement name updated successfully', update_supplementName });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// --- 03. Update Supplement Brand --- //

exports.Supplement_Update_Brand = async (req, res) => {
    try {
        const { supplementPostId } = req.params;
        const { supplementBrand } = req.body;

        // Check if supplement is exist or not
        let supplement = await supplement.findById(supplementPostId);
        if (!supplement) {
            return res.status(404).json({ message: 'Supplement post not found' });
        }

        // Update supplement brand
        let update_supplementBrand = await supplement.findByIdAndUpdate(
            supplementPostId,
            { $set: { supplementBrand: supplementBrand } },
            { new: true }
        );

        if (!update_supplementBrand) {
            return res.status(404).json({ message: 'Failed to update supplement brand' });
        }

        res.status(200).json({ message: 'Supplement brand updated successfully', update_supplementBrand });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// --- 04. Update Supplement Type --- //

exports.Supplement_Update_Type = async (req, res) => {
    try {
        const { supplementPostId } = req.params;
        const { supplementType } = req.body;

        // Check if supplement is exist or not
        let supplement = await supplement.findById(supplementPostId);
        if (!supplement) {
            return res.status(404).json({ message: 'Supplement post not found' });
        }

        // Update supplement type
        let update_supplementType = await supplement.findByIdAndUpdate(
            supplementPostId,
            { $set: { supplementType: supplementType } },
            { new: true }
        );

        if (!update_supplementType) {
            return res.status(404).json({ message: 'Failed to update supplement type' });
        }

        res.status(200).json({ message: 'Supplement type updated successfully', update_supplementType });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// --- 05. Update Supplement Description --- //

exports.Supplement_Update_Description = async (req, res) => {
    try {
        const { supplementPostId } = req.params;
        const { supplementDescription } = req.body;

        // Check if supplement is exist or not
        let supplement = await supplement.findById(supplementPostId);
        if (!supplement) {
            return res.status(404).json({ message: 'Supplement post not found' });
        }

        // Update supplement description
        let update_supplementDescription = await supplement.findByIdAndUpdate(
            supplementPostId,
            { $set: { supplementDescription: supplementDescription } },
            { new: true }
        );

        if (!update_supplementDescription) {
            return res.status(404).json({ message: 'Failed to update supplement description' });
        }

        res.status(200).json({ message: 'Supplement description updated successfully', update_supplementDescription });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// --- 06. Update Supplement Price --- //

exports.Supplement_Update_Price = async (req, res) => {
    try {
        const { supplementPostId } = req.params;
        const { supplementPrice } = req.body;

        // Check if supplement is exist or not
        let supplement = await supplement.findById(supplementPostId);
        if (!supplement) {
            return res.status(404).json({ message: 'Supplement post not found' });
        }

        // Update supplement price
        let update_supplementPrice = await supplement.findByIdAndUpdate(
            supplementPostId,
            { $set: { supplementPrice: supplementPrice } },
            { new: true }
        );

        if (!update_supplementPrice) {
            return res.status(404).json({ message: 'Failed to update supplement price' });
        }

        res.status(200).json({ message: 'Supplement price updated successfully', update_supplementPrice });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// --- 07. Update Supplement Stock --- //

exports.Supplement_Update_Stock = async (req, res) => {
    try {
        const { supplementPostId } = req.params;
        const { supplementStock } = req.body;

        // Check if supplement is exist or not
        let supplement = await supplement.findById(supplementPostId);
        if (!supplement) {
            return res.status(404).json({ message: 'Supplement post not found' });
        }

        // Update supplement stock
        let update_supplementStock = await supplement.findByIdAndUpdate(
            supplementPostId,
            { $set: { supplementStock: supplementStock } },
            { new: true }
        );

        if (!update_supplementStock) {
            return res.status(404).json({ message: 'Failed to update supplement stock' });
        }

        res.status(200).json({ message: 'Supplement stock updated successfully', update_supplementStock });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};