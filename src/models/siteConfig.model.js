import mongoose from 'mongoose';

const siteConfigSchema = new mongoose.Schema({
    siteTitle: { type: String, required: true },
    tagline: { type: String },
    logoUrl: { type: String },    // store cloudinary or local path
    faviconUrl: { type: String },
    tabs: {
        T1: { type: String },
        T2: { type: String },
        T3: { type: String }
    }
}, { timestamps: true });

export default mongoose.model('SiteConfig', siteConfigSchema);
