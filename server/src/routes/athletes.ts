import express = require('express');

var router = express.Router();

/* GET current athlete. */
router.get('/', function(req: express.Request, res: express.Response, next: Function) {
  res.send('Roman');
});

export = router;
