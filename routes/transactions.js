var express = require('express');
var router = express.Router();
const { getPostgresClient } = require('../database/conn');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const db = await getPostgresClient();
  try {
    const sql = `SELECT name FROM users`;
    const result = await db.execute(sql);
    const users = result.rows.map(x => x.name);
    res.send({
      users: users,
    });

  } catch (e) {
    await db.rollback();
    console.log(e);
    res.send({
      message: e
    });
  } finally {
    await db.release();
  }
  // res.send('respond with a resource');
});

router.post('/', async (req, res, next)=> {
  var payer = req.body['payer'];
  var amount = req.body['amount'];
  var purpose = req.body['purpose'];
  var payee = req.body['payee'];

  var sqlPayment = "INSERT INTO payment "
    + "(payer_id, amount, purpose, date) "
    + "values ("
    + "(select id from users where name = '" + payer + "'), "
    + amount + ", "
    + "'" + purpose + "', "
    + "now() at time zone 'JST'"
    + ")";
  var sqlPayee = "INSERT INTO payee "
    + "(payment_id, user_id) "
    + "values ";

  if (payee != null && typeof payee === 'object'){
    for(user of payee){
      sqlPayee = sqlPayee 
        + "((select currval('payment_id_seq')), "
        + "(select id from users where name = '" + user + "')"
        + "),";
    }
    sqlPayee = sqlPayee.slice(0,-1);
    payee = payee.reduce((acc, x) => acc+', ' + x);
  }else if (typeof payee === 'string'){
    let user = payee;
    sqlPayee = sqlPayee 
      + "((select currval('payment_id_seq')), "
      + "(select id from users where name = '" + user + "')"
      + ")";
  }

  console.log(sqlPayment);
  console.log(sqlPayee);

  const db = await getPostgresClient();
  try {
    await db.begin();
    await db.execute(sqlPayment);
    // await db.execute(sqlPayee);
    await db.commit();
    await console.log('payment records inserted');
    await res.send({
      title: 'Entry Completed',
      payer: payer,
      amount: amount,
      purpose: purpose,
      payee: payee
    });
  } catch (e) {
    await db.rollback();
    console.log(e);
    res.send({
      message: e
    });
  } finally {
    await db.release();
  }
});


module.exports = router;
