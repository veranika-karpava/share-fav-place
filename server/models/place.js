const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema of place for database
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
    //place has only one user(creator)
    creator: {
        type: mongoose.Types.ObjectId, //access to the ObjectId type - special type used for unique indentifiers;
        required: true,
        ref: 'User' //ref  - "String"| "Model"| "Function" - Set the model that this path refers to. This is the option that populate looks at to determine the foreign collection it should query
    }
});

module.exports = mongoose.model('Place', placeSchema);