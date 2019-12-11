const mongoose = require('mongoose');
const url = require('url');

mongoose.Promise = global.Promise;

const VitalSignSchema = mongoose.Schema({
  bloodPressureTop: { type: Number, required: false, },
  bloodPressureBottom: { type: Number, required: false, },
  heartRate: { type: Number, required: false, },
  weightKg: { type: Number, required: false, },
  userName: { type: String, required: false },
  publishedAt: { type: Date, default: new Date() },
  notes: { type: String, required: true },
});

VitalSignSchema.methods.serialize = function() {
  return {
    id: this._id,
    bloodPressureTop: this.bloodPressureTop,
    bloodPressureBottom: this.bloodPressureBottom,
    heartRate: this.heartRate,
    weightKg: this.weightKg,
    userName: this.userName,
    publishedAt: this.publishedAt,
    notes: this.notes,
  };
};

const VitalSign = mongoose.model('VitalSign', VitalSignSchema);

module.exports = { VitalSign };
