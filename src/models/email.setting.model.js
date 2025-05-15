import mongoose from "mongoose";

const EmailSettingsSchema = new mongoose.Schema({
    provider: { type: String, enum: ["sendgrid", "mailgun", "smtp"], default: "sendgrid" },
    sendgridApiKey: { type: String },
    mailgunApiKey: { type: String },
    mailgunDomain: { type: String },
    smtpHost: { type: String },
    smtpPort: { type: Number },
    smtpUser: { type: String },
    smtpPass: { type: String },
    fromEmail: { type: String, required: true },
    fromName: { type: String, default: "System" },
}, { timestamps: true });

export default mongoose.model("EmailSettings", EmailSettingsSchema);
