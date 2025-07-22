import mongoose from "mongoose";

const EmailSettingsSchema = new mongoose.Schema(
    {
        provider: {
            type: String,
            enum: ["sendgrid", "mailgun", "ses", "resend", "postmark"],
            required: true,
            default: "sendgrid",
        },
        fromEmail: {
            type: String,
            required: true,
        },

        // Generic API key (used by SendGrid, Resend, Postmark, etc.)
        apiKey: {
            type: String,
        },

        // Mailgun-specific
        mailgunDomain: {
            type: String,
        },
        mailgunSecretKey: {
            type: String,
        },

        // Amazon SES-specific
        sesAccessKey: {
            type: String,
        },
        sesSecretKey: {
            type: String,
        },
        sesRegion: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("EmailSettings", EmailSettingsSchema);
