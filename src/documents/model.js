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
  userName: { type: String, required: false },
  publishedAt: { type: Date, default: new Date() },
});

DocumentSchema.statics.findByDocumentName = function(documentName) {
  return this.where('documentName', documentName);
};

DocumentSchema.methods.serialize = function() {
  let documentURL = this.documentURL;
  if (typeof this.documentURL === 'string') {
    const urlParsed = url.parse(this.documentURL);
    // TODO: 0. Should probably just save the correct URL in the first place:
    if (urlParsed.host === 'localhost:7777') {
      // TODO: 0. Don't hardcode localhost:8080:
      documentURL = 'http://localhost:8080/api/documents/' + this._id + '/document';
    }
  }

  return {
    id: this._id,
    documentName: this.documentName,
    notes: this.notes,
    healthProviderName: this.healthProviderName,
    address: this.address,
    phone: this.phone,
    documentURL: documentURL,
    userName: this.userName,
    publishedAt: this.publishedAt,
  };
};

const Document = mongoose.model('Document', DocumentSchema);

module.exports = { Document };
