const express = require('express')
const app = express()
const server = require('http').Server(app)
const cors = require('cors')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

var PORT = process.env.PORT || 5000

const Application = require('./models/application.js');
const Supplier = require('./models/supplier.js');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://root:root@ds133241.mlab.com:33241/neste')

const corsOption = {
    origin: "*",
    credentials: true
}

app.use(bodyparser.json())
app.use('/', cors(corsOption))

app.get('/application/list',(req,res)=>{
  Application.find({},(err,a)=>{
    if (err) return res.status(500).send('Database error');
    return res.json(a);
  })
})


app.get('/supplier/list',(req,res)=>{
  Supplier.find({},(err,a)=>{
    if (err) return res.status(500).send('Database error');
    return res.json(a);
  })
})




app.post('/application/new',(req,res)=>{
  console.log(req.body);
  var a = new Application({
    "code": req.body.application.code,
    "supplier_name": req.body.application.supplier_name,
    "feedstock_type": req.body.application.feedstock_type,
    "company_name": req.body.application.company_name,
    "country": req.body.application.country,
    "province": req.body.application.province,
    "current_status": req.body.application.current_status,
    "current_team": req.body.application.current_team,
    "processed_team": req.body.application.processed_team,
    "latest_update": req.body.application.latest_update,
    "risk": req.body.application.risk,
    "doc_fulfilled": req.body.application.doc_fulfilled,
    "cert_no": req.body.application.cert_no,
    "attachment": req.body.application.attachment,
    submission_date: "01.01.2017"
  });

  a.save((err,a)=>{
    if (err) return res.status(500).send('Database Error');

    return res.json({id:a._id});
  })
});



app.post('/supplier/new',(req,res)=>{
  console.log(req.body);
  var a = new Supplier({
    "code": req.body.supplier.code,
    "supplier_name": req.body.supplier.supplier_name,
    "feedstock_type": req.body.supplier.feedstock_type,
    "company_name": req.body.supplier.company_name,
    "country": req.body.supplier.country,
    "province": req.body.supplier.province,
    "contract_date": req.body.supplier.contract_date,
    "certification_no": req.body.supplier.certification_no,
    "certification_name": req.body.supplier.certification_name,
    "capacity": req.body.supplier.capacity,
    "volume": req.body.supplier.volume,
    "no_estate": req.body.supplier.no_estate,
    "sustainability_commitment": req.body.supplier.sustainability_commitment,
    "traceability_logistics": req.body.supplier.traceability_logistics,
    "stakeholder_engagement": req.body.supplier.stakeholder_engagement,
    "social_resp": req.body.supplier.social_resp,
    "environment": req.body.supplier.environment,
    "GHG": req.body.supplier.GHG,
    "expired_certification_no": req.body.supplier.expired_certification_no,
    "rank": req.body.supplier.rank,
    "quality_rate": req.body.supplier.quality_rate,
    "traceability": req.body.supplier.traceability,
    "ontime_delivery": req.body.supplier.ontime_delivery,
    "updated_document": req.body.supplier.updated_document,
    "current_GHG": req.body.supplier.current_GHG
  });

  a.save((err,a)=>{
    if (err) return res.status(500).send('Database Error');
    return res.json({id:a._id});
  })
});

app.post('/supplier/bulk',(req,res)=>{
  var suppliers = req.body.supplier.map(s=>{
    return new Supplier({
      "code": s.code,
      "supplier_name": s.supplier_name,
      "feedstock_type": s.feedstock_type,
      "company_name": s.company_name,
      "country": s.country,
      "province": s.province,
      "contract_date": s.contract_date,
      "certification_no": s.certification_no,
      "certification_name": s.certification_name,
      "capacity": s.capacity,
      "volume": s.volume,
      "no_estate": s.no_estate,
      "sustainability_commitment": s.sustainability_commitment,
      "traceability_logistics": s.traceability_logistics,
      "stakeholder_engagement": s.stakeholder_engagement,
      "social_resp": s.social_resp,
      "environment": s.environment,
      "GHG": s.GHG,
      "expired_certification_no": s.expired_certification_no,
      "rank": s.rank,
      "quality_rate": s.quality_rate,
      "traceability": s.traceability,
      "ontime_delivery": s.ontime_delivery,
      "updated_document": s.updated_document,
      "current_GHG": s.current_GHG
    })
  });
  console.log(suppliers);
  Supplier.insertMany(suppliers)
  .then(a=>{
    console.log(a);
    return res.status(200).send('done');
  })
  .catch(err=>{
    console.log(err);
    return res.status(500).send('Database error');
  })
})




app.post('/application/bulk',(req,res)=>{
  var applications = req.body.application.map(a=>{
    return new Application({
      "code": a.code,
      "supplier_name": a.supplier_name,
      "feedstock_type": a.feedstock_type,
      "company_name": a.company_name,
      "country": a.country,
      "province": a.province,
      "current_status": a.current_status,
      "current_team": a.current_team,
      "processed_team": a.processed_team,
      "latest_update": a.latest_update,
      "risk": a.risk,
      "doc_fulfilled": a.doc_fulfilled,
      "cert_no": a.cert_no,
      "attachment": a.attachment,
      submission_date: "01.01.2017"
    })
  });
  console.log(applications);
  Application.insertMany(applications)
  .then(a=>{
    console.log(a);
    return res.status(200).send('done');
  })
  .catch(err=>{
    console.log(err);
    return res.status(500).send('Database error');
  })
})



server.listen(PORT, () => {
    console.log('Running on port', PORT)
})
