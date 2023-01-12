const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    cloudinary_id: { type: String },
    image: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    creator: {
        //access to the ObjectId type - special type used for unique indentifiers;
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Place', placeSchema);