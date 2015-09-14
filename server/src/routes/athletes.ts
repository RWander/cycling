import express = require('express');

var router = express.Router();

/* GET current athlete. */
router.get('/', function(req, res, next) {
  res.send('Roman');
});

export = router;
