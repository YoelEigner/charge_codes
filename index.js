const express = require('express');
const  sql = require("mssql");
const app = express();
const cors = require('cors');

//enables cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));


// config for your database
var config = {
  server: 'servedraddress',
  user: 'user',
  password: 'pass',
  database: 'db',
  port:port#,
  trustServerCertificate: true,
};


// connect to your database
function connectToBD(query, res){
  sql.connect(config, function (err) {
    if (err) console.log(err);
    const request = new sql.Request();
    request.query(query,function (err, recordset) {
      if (err) console.log(err)
      res.send(recordset)
    });
  });
}

//search users
app.get('/api/users/', function (req, res) {
  const query = "select *, [AD ID] AS ntid, Programme as description, [INTL Domain Categorisation] as domainCategorisation, BA as ba, ["  +
    req.query.country  + " labor] AS labor, [" +
    req.query.country  + " procurement] AS procurement , ["  +
    req.query.country  + " travel] AS travel " +
    "from [Charge_codes].[dbo].[Charge_Codes_View] where DISPLAYNAME like '%"
    + req.query.usr +"%'" +" OR [AD ID] = " + '\'' + req.query.usr + '\'' + "OR Programme like '%" + req.query.rmS +"%' OR Programme like '%" + req.query.greenvillE +"%'";
    connectToBD(query, res)
});

//get countries for dropdown
app.get('/api/countylist', function (req,res){
  const quary = 'Select * from country'
  connectToBD(quary, res)
})

//get Popup data RMS and Greenville
app.get('/api/all/', function (req,res){
  const quary = "select Programme AS description, Scope AS scope, ["+
    req.query.country  + " labor] AS labor, [" +
    req.query.country  + " procurement] AS procurement , ["  +
    req.query.country  + " travel] AS travel from dbo.Charge_Codes where Programme like '%" + req.query.str +"%' OR Programme like '%" + req.query.strBA +"%'";
    connectToBD(quary, res)

})
//search by program
app.get('/api/program/', function (req,res){
  const quary = "select Programme AS description, Scope AS scope, [" +
    req.query.country + " labor] AS labor, [" +
    req.query.country + " procurement] AS procurement , [" +
    req.query.country + " travel] AS travel from dbo.Charge_Codes where dbo.Charge_Codes.Programme like '%" + req.query.program +"%'" ;
    connectToBD(quary, res)
})

const server = app.listen(2446, function () {
    console.log('Server is running..');
});

