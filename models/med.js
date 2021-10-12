
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medSchema = new Schema({
    medName: {type: String, required: true },
    dosage: {type: Number, required: true},
    measure: {type: String, required: true},
    tpd: Number,
    morn: Boolean,
    noon: Boolean,
    night: Boolean,
    use: String,
    docFirstName: String,
    docLastName: {type: String, required: true},
    docOffice: String,
    docStreet: String,
    docTown: String,
    docState: String,
    docZip: Number,
    docPhone: Number,
    author: { type: Schema.Types.ObjectId, ref: 'User'}
});

// User Model
const Meds = mongoose.model("Meds", medSchema)

// Export User Model
module.exports = Meds