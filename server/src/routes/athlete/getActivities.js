var Training = require('../../models').Training;

function getActivities(req, res, next) {
  Training.loadCurrent()
    .then(trainings => { res.send(trainings); })
    .catch(next);
}

module.exports = getActivities;
