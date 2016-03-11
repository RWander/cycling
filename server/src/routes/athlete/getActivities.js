var Training = require('../../models').Training;

function getActivities(req, res, next) {
  const pageCount = req.query.pageCount;
  const types = req.query.types;

  Training.loadCurrent(types, pageCount)
    .then(trainings => { res.send(trainings); })
    .catch(next);
}

module.exports = getActivities;
