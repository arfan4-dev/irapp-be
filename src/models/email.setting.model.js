import mongoose from "mongoose";

const EmailSettingsSchema = new mongoose.Schema({
    provider: { type: String, default: "sendgrid" },
    sendgridApiKey: { type: String, required: true },
    fromEmail: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("EmailSettings", EmailSettingsSchema);
