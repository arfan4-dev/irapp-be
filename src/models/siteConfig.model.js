import mongoose from 'mongoose';

const siteConfigSchema = new mongoose.Schema({
    siteTitle: { type: String },
    tagline: { type: String },
    logoUrl: { type: String }, 
    brandName: { type: String },  // store cloudinary or local path
    faviconUrl: { type: String },
    tabs: {
        T1: { type: String },
        T2: { type: String },
        T3: { type: String },
        T4: { type: String }
    }
}, { timestamps: true });

export default mongoose.model('SiteConfig', siteConfigSchema);
