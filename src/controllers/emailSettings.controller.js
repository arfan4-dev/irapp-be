import EmailSettings from "../models/email.setting.model.js";
// GET /api/email-settings
export const getEmailSettings = async (req, res) => {
    try {
        const settings = await EmailSettings.findOne().sort({ updatedAt: -1 });
        if (!settings) return res.status(404).json({ message: "Email settings not found." });
        res.json(settings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching email settings." });
    }
};

// PUT /api/email-settings
export const updateEmailSettings = async (req, res) => {
    const { sendgridApiKey, fromEmail } = req.body;

    if (!sendgridApiKey || !fromEmail) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const updated = await EmailSettings.findOneAndUpdate(
            {},
            { sendgridApiKey, fromEmail },
            { upsert: true, new: true }
        );

        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to save email settings." });
    }
};
