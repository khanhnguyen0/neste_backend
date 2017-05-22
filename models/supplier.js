const mongoose  = require('mongoose');

const supplierSchema = mongoose.Schema({
   "code": {type:String},
   "supplier_name": {type:String},
   "feedstock_type": {type:String},
   "company_name": {type:String},
   "country": {type:String},
   "province": {type:String},
   "contract_date": {type:String},
   "certification_no": {type:Number},
   "certification_name": {type:String},
   "capacity": {type:Number},
   "volume": {type:Number},
   "no_estate": {type:Number},
   "sustainability_commitment": {type:Number},
   "traceability_logistics": {type:Number},
   "stakeholder_engagement": {type:Number},
   "social_resp": {type:Number},
   "environment": {type:Number},
   "GHG": {type:Number},
   "expired_certification_no": {type:Number},
   "rank": {type:Number},
   "quality_rate": {type:Number},
   "Traceability": {type:Number},
   "ontime_delivery": {type:Number},
   "updated_document": {type:Number},
   "current_GHG": {type:Number},
   sus_rating:{type:Number},
   fin_rating:{type:Number},
   sec_rating:{type:Number},
   sup_rating:{type:Number},
   bio_rating:{type:Number}
})


module.exports  = mongoose.model('Supplier', supplierSchema);
