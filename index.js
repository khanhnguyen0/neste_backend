const express = require('express')
const app = express()
const server = require('http').Server(app)
const cors = require('cors')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

var PORT = process.env.PORT || 5000

const Application = require('./models/application.js');

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
