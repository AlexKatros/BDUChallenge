var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShipmentSchema = new Schema({

    ship_date: { type: Number, required: true },
    tracking_number: { type: String, required: true },
    shipping_carrier: String,
    shipping_method: String,
    tracking_url: String

});

ShipmentSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

//Create mongoose model for database
var Shipment = mongoose.model('Shipment', ShipmentSchema);
module.exports = Shipment;
