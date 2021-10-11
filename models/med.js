
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medSchema = new Schema({
    medName: {type: String, required: true },
    dosage: {type: Number, required: true},
    tpd: Number,
    morn: Boolean,
    noon: Boolean,
    night: Boolean,
    use: String,
    docFirstName: String,
    docLastName: {type: String, required: true},
    docAddress: String,
    docPhone: Number,
    author: { type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Meds', medSchema);