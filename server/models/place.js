const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// schema for places db
const placeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    //  acces to the ObjectId type - special type used for unique indentifiers;
    // ref  - "String"| "Model"| "Function" - Set the model that this path refers to. This is the option that populate looks at to determine the foreign collection it should query
    // {}  - place has only one user
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
})

module.exports = mongoose.model('Place', placeSchema);