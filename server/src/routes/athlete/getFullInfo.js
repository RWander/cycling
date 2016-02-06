var Athlete = require('../../models').Athlete;
var Training = require('../../models').Training;

function getFullInfo(req, res, next) {
  Promise.all([
    Athlete.loadCurrent(),
    Training.loadCurrent(), // TODO (rwander): return only recent training log.
    Training.loadStatisticCurrent()
  ]).then(results => {
    res.send({
      athlete: results[0],
      trainings: results[1],
      statistic: results[2]
    });
  })
  .catch(next);
}

module.exports = getFullInfo;
