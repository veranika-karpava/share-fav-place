const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: true },
    // add [] to access places to have many places in property - one user has many places
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]
});

// add for the schema uniqie Validator that check unique email
userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);
