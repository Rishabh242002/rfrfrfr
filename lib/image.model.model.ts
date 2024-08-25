import mongoose from 'mongoose';

const PDFSchema = new mongoose.Schema({
    pdf_url: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

export const PDFGalleryModel = mongoose.models.pdf || mongoose.model("pdf", PDFSchema);
