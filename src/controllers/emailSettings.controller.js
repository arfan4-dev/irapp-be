import EmailSettings from "../models/email.setting.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/api.utils.js";

// 🔹 GET: Fetch latest email settings
export const getEmailSettings = asyncHandler(async (req, res) => {
    const settings = await EmailSettings.findOne().sort({ updatedAt: -1 });

    if (!settings) {
        throw new ApiError(404, "Email settings not found");
    }

    return res.status(200).json(new ApiResponse(200, settings, "Email settings fetched"));
});

// 🔸 PUT: Update or create email settings
export const updateEmailSettings = asyncHandler(async (req, res) => {
    const {
        provider,
        fromEmail,
        apiKey,
        mailgunDomain,
        mailgunSecretKey,
        sesAccessKey,
        sesSecretKey,
        sesRegion,
    } = req.body;

    if (!provider || !fromEmail) {
        throw new ApiError(400, "Provider and From Email are required");
    }

    const updated = await EmailSettings.findOneAndUpdate(
        {},
        {
            provider,
            fromEmail,
            apiKey,
            mailgunDomain,
            mailgunSecretKey,
            sesAccessKey,
            sesSecretKey,
            sesRegion,
        },
        { upsert: true, new: true }
    );

    return res.status(200).json(new ApiResponse(200, updated, "Email settings updated"));
});
