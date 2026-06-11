const supplement = require('../models/SupplementPost');
const Admin = require('../models/Admin');

// --- 01. Create a new supplement Post --- //

exports.Supplement_Create = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { supplementName, supplementBrand, supplementType, supplementDescription, supplementPrice, supplementStock, supplementImage } = req.body;

        let admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (!admin.Approve) {
            return res.status(400).json({ message: 'Admin is not approved, So you cant create supplement post' });
        }

        if (supplementPrice <= 0) {
            return res.status(400).json({ message: 'Supplement price must be greater than 0' });
        }

        if (supplementStock < 0) {
            return res.status(400).json({ message: 'Supplement stock must be greater than 0' });
        }

        let Available
        if (supplementStock == 0) {
            Available = false;
        } else {
            Available = true;
        }

        const newSupplement = new supplement({ supplementName, supplementBrand, supplementType, supplementDescription, supplementPrice, supplementStock, supplementAvailable: Available, supplementImage });
        await newSupplement.save();

        res.status(201).json({ message: 'Supplement created successfully', supplement: newSupplement });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// --- 02. Update Supplement Name --- //

exports.Supplement_Update_Name = async (req, res) => {
    try {
        const { supplementPostId, adminId } = req.params;
        const { supplementName } = req.body;

        let admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (!admin.Approve) {
            return res.status(400).json({ message: 'Admin is not approved, So you cant create supplement post' });
        }

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
        const { supplementPostId, adminId } = req.params;
        const { supplementBrand } = req.body;

        let admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (!admin.Approve) {
            return res.status(400).json({ message: 'Admin is not approved, So you cant create supplement post' });
        }

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
        const { supplementPostId, adminId } = req.params;
        const { supplementType } = req.body;

        let admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (!admin.Approve) {
            return res.status(400).json({ message: 'Admin is not approved, So you cant create supplement post' });
        }

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
        const { supplementPostId, adminId } = req.params;
        const { supplementDescription } = req.body;

        let admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (!admin.Approve) {
            return res.status(400).json({ message: 'Admin is not approved, So you cant create supplement post' });
        }

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
        const { supplementPostId, adminId } = req.params;
        const { supplementPrice } = req.body;

        let admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (!admin.Approve) {
            return res.status(400).json({ message: 'Admin is not approved, So you cant create supplement post' });
        }

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
        const { supplementPostId, adminId } = req.params;
        const { supplementStock } = req.body;

        let admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (!admin.Approve) {
            return res.status(400).json({ message: 'Admin is not approved, So you cant create supplement post' });
        }

        if (supplementStock < 0) {
            return res.status(400).json({ message: 'Supplement stock must be greater than 0' });
        }

        let Available
        if (supplementStock == 0) {
            Available = false;
        } else {
            Available = true;
        }

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

        // Update supplement available
        let update_supplementAvailable = await supplement.findByIdAndUpdate(
            supplementPostId,
            { $set: { supplementAvailable: Available } },
            { new: true }
        );

        if (!update_supplementAvailable) {
            return res.status(404).json({ message: 'Failed to update supplement available' });
        }

        res.status(200).json({ message: 'Supplement stock updated successfully', update_supplementStock, update_supplementAvailable });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// --- 08. Update Supplement Image --- //

exports.Supplement_Update_Image = async (req, res) => {
    try {
        const { supplementPostId, adminId } = req.params;
        const { supplementImage } = req.body;

        let admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (!admin.Approve) {
            return res.status(400).json({ message: 'Admin is not approved, So you cant create supplement post' });
        }

        // Check if supplement is exist or not
        let supplement = await supplement.findById(supplementPostId);
        if (!supplement) {
            return res.status(404).json({ message: 'Supplement post not found' });
        }

        // Update supplement image
        let update_supplementImage = await supplement.findByIdAndUpdate(
            supplementPostId,
            { $set: { supplementImage: supplementImage } },
            { new: true }
        );

        if (!update_supplementImage) {
            return res.status(404).json({ message: 'Failed to update supplement image' });
        }

        res.status(200).json({ message: 'Supplement image updated successfully', update_supplementImage });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// --- 09. Get Supplement Details By Supplement post Id -- //

exports.Supplement_Get_Details_By_Supplement_Id = async (req, res) => {
    try {
        const { supplementId } = req.params;

        // Check if supplement is exist or not
        let supplement = await supplement.findById(supplementId);
        if (!supplement) {
            return res.status(404).json({ message: 'Supplement not found' });
        }

        res.status(200).json({ message: 'Supplement details found successfully', supplement });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// --- 10. Get All Supplement Posts -- //

exports.Supplement_Get_All = async (req, res) => {
    try {
        let supplement = await supplement.find();

        if (!supplement) {
            return res.status(404).json({ message: 'Supplement not found' });
        }

        res.status(200).json({ message: 'Supplement details found successfully', supplement });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// --- 11. Delete Supplement Post --- //

exports.Supplement_Delete = async (req, res) => {
    try {
        const { supplementPostId, adminId } = req.params;

        let admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (!admin.Approve) {
            return res.status(400).json({ message: 'Admin is not approved, So you cant create supplement post' });
        }

        // Check if supplement is exist or not
        let supplement = await supplement.findById(supplementPostId);
        if (!supplement) {
            return res.status(404).json({ message: 'Supplement post not found' });
        }

        // Delete supplement
        let delete_supplement = await supplement.findByIdAndDelete(supplementPostId);

        if (!delete_supplement) {
            return res.status(404).json({ message: 'Failed to delete supplement' });
        }

        res.status(200).json({ message: 'Supplement deleted successfully', delete_supplement });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// --- 12.   Buy Supplement -- //

exports.Supplement_Buy = async (req, res) => {
    try {
        const { supplementPostId } = req.params;
        const { CradNumber, ExpiryDate, CVV, Amount } = req.body;

        // Check if supplement is exist or not
        let supplement = await supplement.findById(supplementPostId);
        if (!supplement) {
            return res.status(404).json({ message: 'Supplement not found' });
        }

        // Check supplement available
        if (!supplement.supplementAvailable) {
            return res.status(404).json({ message: 'Supplement not available' });
        }

        // Check supplement stock
        if (supplement.supplementStock == 0) {
            return res.status(404).json({ message: 'Supplement stock is 0' });
        }

        // Check Card  Details
        if (!CradNumber == 1234123412341234) {
            return res.status(404).json({ message: 'Invalid Card Number' });
        }

        if (!ExpiryDate == 12 / 2024) {
            return res.status(404).json({ message: 'Invalid Expiry Date' });
        }

        if (!CVV == 123) {
            return res.status(404).json({ message: 'Invalid CVV' });
        }

        if (!Amount == supplement.SupplementPrice) {
            return res.status(404).json({ message: 'Invalid Amount' });
        }

        // Update supplement stock
        let update_supplementStock = await supplement.findByIdAndUpdate(
            supplementPostId,
            { $set: { supplementStock: supplement.supplementStock - 1 } },
            { new: true }
        );

        if (!update_supplementStock) {
            return res.status(404).json({ message: 'Failed to update supplement stock' });
        }

        // Update supplement available
        if (supplement.supplementStock == 0) {
            let update_supplementAvailable = await supplement.findByIdAndUpdate(
                supplementPostId,
                { $set: { supplementAvailable: false } },
                { new: true }
            );

            if (!update_supplementAvailable) {
                return res.status(404).json({ message: 'Failed to update supplement available' });
            }
        }

        res.status(200).json({ message: 'Supplement stock updated successfully', update_supplementStock });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};