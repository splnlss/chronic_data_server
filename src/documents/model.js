const mongoose = require('mongoose');
const url = require('url');

mongoose.Promise = global.Promise;

const DocumentSchema = mongoose.Schema({
  documentName: { type: String, required: true },
  notes: { type: String, required: true },
  healthProviderName: { type: String, required: false },
  address: { type: String, required: false },
  phone: { type: String, required: false },
  documentURL: { type: String, required: false },
  documentTardigradeId: { type: String, required: false },
  userName: { type: String, required: false },
  publishedAt: { type: Date, default: new Date() },
});

DocumentSchema.statics.findByDocumentName = function(documentName) {
  return this.where('documentName', documentName);
};

DocumentSchema.methods.serialize = function() {
  return {
    id: this._id,
    documentName: this.documentName,
    notes: this.notes,
    healthProviderName: this.healthProviderName,
    address: this.address,
    phone: this.phone,
    documentURL: this.documentURL,
    documentTardigradeId: this.documentTardigradeId,
    userName: this.userName,
    publishedAt: this.publishedAt,
  };
};

const Document = mongoose.model('Document', DocumentSchema);

module.exports = { Document };
