import SiteConfig from '../models/siteConfig.model.js';
import { asyncHandler, ApiResponse, ApiError } from '../utils/api.utils.js';

// Get site config
export const getSiteConfig = asyncHandler(async (req, res) => {
    const config = await SiteConfig.findOne();
    if (!config) {
        throw new ApiError(404, "Site config not found");
    }
    res.status(200).json(new ApiResponse(200, config, "Site Config fetched successfully"));
});

// Update or create site config
export const updateSiteConfig = asyncHandler(async (req, res) => {
    try {
        const { siteTitle, tagline, tabs } = req.body;

        // ✅ Safe tab parsing
        let parsedTabs;
        if (tabs) {
            try {
                parsedTabs = typeof tabs === "string" ? JSON.parse(tabs) : tabs;
            } catch (err) {
                throw new ApiError(400, "Invalid tabs format. Must be a valid JSON object.");
            }
        }

        const logoFile = req.files?.logo?.[0];
        const faviconFile = req.files?.favicon?.[0];

        const logoUrl = logoFile ? logoFile.path : req.body.logoUrl || null;
        const faviconUrl = faviconFile ? faviconFile.path : req.body.faviconUrl || null;

        let config = await SiteConfig.findOne();

        if (config) {
            // ✅ Dynamically update only if non-empty
            if (siteTitle && siteTitle.trim() !== "") {
                config.siteTitle = siteTitle.trim();
            }

            if (tagline && tagline.trim() !== "") {
                config.tagline = tagline.trim();
            }

            if (
                parsedTabs &&
                Object.keys(parsedTabs).some(key => parsedTabs[key]?.trim?.() !== "")
            ) {
                config.tabs = {
                    ...config.tabs,
                    ...Object.fromEntries(
                        Object.entries(parsedTabs).filter(([_, val]) => val?.trim?.() !== "")
                    ),
                };
            }

            if (logoUrl) config.logoUrl = logoUrl;
            if (faviconUrl) config.faviconUrl = faviconUrl;

            await config.save();
        } else {
            // ✅ Create only with provided values
            config = await SiteConfig.create({
                siteTitle: siteTitle?.trim() || "",
                tagline: tagline?.trim() || "",
                tabs: parsedTabs || {},
                logoUrl,
                faviconUrl,
            });
        }

        res.status(200).json(new ApiResponse(200, config, "Site Config updated successfully"));
    } catch (error) {
        console.error("Error updating site config:", error);
        throw new ApiError(500, "Failed to update site config");
    }
});
