var mongoose = require('mongoose');
var applicationSchema = mongoose.Schema({
  "code": {type:String},
  "supplier_name": {type:String},
  "feedstock_type": {type:String},
  "company_name": {type:String},
  "country": {type:String},
  "province": {type:String},
  "current_status": {type:String},
  "current_team": {type:String},
  "processed team": {type:String},
  "latest_update": {type:String},
  "risk": {type:Number},
  "doc_fulfilled": {type:Number},
  "cert_no": {type:Number},
  "attachment": {type:Number}
})

module.exports  = mongoose.model('Application', applicationSchema);
