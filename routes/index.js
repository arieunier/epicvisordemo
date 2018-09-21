var express = require('express');
const { Pool } = require('pg');
const { DATABASE_URL } = process.env;

var router = express.Router();

const pool = new Pool({
  connectionString: DATABASE_URL
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('routing in index');
  res.render('locator', {success: false});
});

/* form handling */
router.post('/leadform', async function (req, res, next) {
  console.log('routing on post form');
  console.log(req.body);
  const result = await pool.query(`insert into salesforce.lead(firstname, lastname, doctor__c, mobilephone, postalcode, date_of_birth__c, email, company) Values ('${req.body.txtFirstName}', '${req.body.txtLastName}', '${process.env.DOCTOR_ID}', '${req.body.txtPhoneNumber}', '${req.body.txtZipDC}', '${req.body.txtDOB}', '${req.body.txtEmail}', 'Invisalign')`);
  console.log(result);
  res.render('locator', { success: true });
});

module.exports = router;
