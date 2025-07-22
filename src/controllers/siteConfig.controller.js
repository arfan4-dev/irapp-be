import SiteConfig from '../models/siteConfig.model.js';
import { asyncHandler, ApiResponse, ApiError } from '../utils/api.utils.js';

// Get site config
export const getSiteConfig = async (req, res) => {
    try {
        const config = await SiteConfig.find();
        console.log("config:", config);

        if (!config) {
            return res.status(404).json({
                success: false,
                message: "Site config not found",
            });
        }

        res.status(200).json({
            success: true,
            data: config,
            message: "Site Config fetched successfully",
        });
    } catch (error) {
        console.error("Error fetching site config:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch site config",
            error: error.message,
        });
    }
};


export const updateSiteConfig = asyncHandler(async (req, res) => {
    try {
        const { siteTitle, tagline, tabs, brandName } = req.body;

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
            if (siteTitle?.trim()) config.siteTitle = siteTitle.trim();
            if (tagline?.trim()) config.tagline = tagline.trim();
            if (brandName?.trim()) config.brandName = brandName.trim();

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
            config = await SiteConfig.create({
                siteTitle: siteTitle?.trim() || "",
                tagline: tagline?.trim() || "",
                brandName: brandName?.trim() || "",
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
